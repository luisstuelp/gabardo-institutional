-- Give /caminhoes its own database-backed users and opaque server sessions.
-- The administrative login continues to use Supabase Auth in the public schema.

CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS trucks.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL CHECK (btrim(email) <> ''),
  password_hash TEXT NOT NULL,
  full_name TEXT,
  email_verified_at TIMESTAMPTZ,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE trucks.users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE;

CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_unique
  ON trucks.users (lower(email));

CREATE TABLE IF NOT EXISTS trucks.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES trucks.users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  last_seen_at TIMESTAMPTZ,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trucks.password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES trucks.users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS user_sessions_user_expires_idx
  ON trucks.user_sessions (user_id, expires_at);
CREATE INDEX IF NOT EXISTS password_reset_tokens_user_expires_idx
  ON trucks.password_reset_tokens (user_id, expires_at);

-- Keep current account IDs and passwords for existing customers. Supabase
-- bcrypt hashes are copied as hashes; the application verifies them against
-- trucks.users without calling Supabase Auth. OAuth-only accounts stay disabled.
INSERT INTO trucks.users (id, email, password_hash, full_name, email_verified_at)
SELECT
  auth_user.id,
  lower(coalesce(nullif(btrim(auth_user.email), ''), 'legacy-' || auth_user.id::text || '@invalid.local')),
  CASE
    WHEN auth_user.encrypted_password LIKE '$2%' THEN auth_user.encrypted_password
    ELSE 'disabled$no-local-password'
  END,
  auth_user.raw_user_meta_data ->> 'full_name',
  auth_user.email_confirmed_at
FROM auth.users AS auth_user
ON CONFLICT DO NOTHING;

-- Mark accounts already designated as admins in either role table. Runtime
-- customer login then checks trucks.users only.
UPDATE trucks.users AS account
SET is_admin = TRUE
FROM trucks.user_roles AS account_role
WHERE account_role.user_id = account.id
  AND account_role.role::TEXT = 'admin';

DO $$
BEGIN
  IF to_regclass('public.user_roles') IS NOT NULL THEN
    EXECUTE $sync_admins$
      UPDATE trucks.users AS account
      SET is_admin = TRUE
      FROM public.user_roles AS account_role
      WHERE account_role.user_id = account.id
        AND account_role.role::TEXT = 'admin'
    $sync_admins$;
  END IF;
END;
$$;

-- Move truck-module profiles, roles, favorites, proposals, and chats to local
-- users. The separate public.user_roles table remains the admin login authority.
ALTER TABLE trucks.user_profiles DROP CONSTRAINT IF EXISTS user_profiles_user_id_fkey;
ALTER TABLE trucks.user_roles DROP CONSTRAINT IF EXISTS user_roles_user_id_fkey;
ALTER TABLE trucks.favorites DROP CONSTRAINT IF EXISTS favorites_user_id_fkey;
ALTER TABLE trucks.leads DROP CONSTRAINT IF EXISTS leads_user_id_fkey;
ALTER TABLE trucks.chats DROP CONSTRAINT IF EXISTS chats_user_id_fkey;

ALTER TABLE trucks.user_profiles
  ADD CONSTRAINT user_profiles_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES trucks.users(id) ON DELETE CASCADE;
ALTER TABLE trucks.user_roles
  ADD CONSTRAINT user_roles_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES trucks.users(id) ON DELETE CASCADE;
ALTER TABLE trucks.favorites
  ADD CONSTRAINT favorites_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES trucks.users(id) ON DELETE CASCADE;
ALTER TABLE trucks.leads
  ADD CONSTRAINT leads_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES trucks.users(id) ON DELETE SET NULL;
ALTER TABLE trucks.chats
  ADD CONSTRAINT chats_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES trucks.users(id) ON DELETE CASCADE;

-- The old auth.users trigger inserted profiles tied to auth.users. New Supabase
-- Auth identities are administrative identities and must not create customers.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE OR REPLACE FUNCTION trucks.create_local_user_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = trucks, public
AS $$
BEGIN
  INSERT INTO trucks.user_profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.full_name)
  ON CONFLICT (user_id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = EXCLUDED.full_name;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS users_create_profile_and_role ON trucks.users;
DROP TRIGGER IF EXISTS users_create_local_profile ON trucks.users;
CREATE TRIGGER users_create_local_profile
  AFTER INSERT OR UPDATE OF email, full_name ON trucks.users
  FOR EACH ROW EXECUTE FUNCTION trucks.create_local_user_profile();

CREATE OR REPLACE FUNCTION trucks.verify_local_user_bcrypt(p_email TEXT, p_password TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public, extensions, trucks
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM trucks.users AS account
    WHERE lower(account.email) = lower(p_email)
      AND account.is_active
      AND NOT account.is_admin
      AND account.password_hash LIKE '$2%'
      AND crypt(p_password, account.password_hash) = account.password_hash
  );
$$;

REVOKE ALL ON FUNCTION trucks.verify_local_user_bcrypt(TEXT, TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION trucks.verify_local_user_bcrypt(TEXT, TEXT) TO service_role;

ALTER TABLE trucks.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.password_reset_tokens ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON trucks.users, trucks.user_sessions, trucks.password_reset_tokens FROM anon, authenticated;
GRANT ALL ON trucks.users, trucks.user_sessions, trucks.password_reset_tokens TO service_role;
GRANT USAGE ON SCHEMA trucks TO service_role;

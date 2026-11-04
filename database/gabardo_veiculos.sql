-- Banco PostgreSQL local para o módulo de venda de veículos.
-- Crie e selecione o banco "gabardo_veiculos" antes de executar este arquivo.
-- Todas as tabelas e tipos deste módulo pertencem ao schema trucks, isolado
-- das tabelas gerais do site que permanecem no schema public.
--
-- O servidor da aplicação deve ser o único a conectar neste banco. Não exponha
-- a credencial de conexão no navegador.

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE SCHEMA IF NOT EXISTS trucks;

DO $$ BEGIN
  CREATE TYPE trucks.vehicle_status AS ENUM ('available', 'reserved', 'sold');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE trucks.fuel_type AS ENUM ('diesel', 'gas', 'electric', 'hybrid');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE trucks.transmission_type AS ENUM ('manual', 'automatic', 'automated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE trucks.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS trucks.branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL CHECK (char_length(state) = 2),
  region TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  is_headquarters BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contas locais do módulo. password_hash deve ser produzido pela aplicação
-- usando Argon2id ou bcrypt; nunca armazene senhas em texto simples.
CREATE TABLE IF NOT EXISTS trucks.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL CHECK (btrim(email) <> ''),
  password_hash TEXT NOT NULL,
  full_name TEXT,
  email_verified_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_unique
  ON trucks.users (lower(email));

CREATE TABLE IF NOT EXISTS trucks.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES trucks.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trucks.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES trucks.users(id) ON DELETE CASCADE,
  role trucks.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

CREATE TABLE IF NOT EXISTS trucks.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year_manufacture INTEGER NOT NULL CHECK (year_manufacture > 0),
  year_model INTEGER NOT NULL CHECK (year_model >= year_manufacture),
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  mileage INTEGER NOT NULL CHECK (mileage >= 0),
  fuel trucks.fuel_type NOT NULL DEFAULT 'diesel',
  transmission trucks.transmission_type NOT NULL DEFAULT 'manual',
  axle_config TEXT,
  power TEXT,
  color TEXT,
  description TEXT,
  specs JSONB,
  fipe_code TEXT,
  fipe_value NUMERIC(12, 2) CHECK (fipe_value IS NULL OR fipe_value >= 0),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_special_offer BOOLEAN NOT NULL DEFAULT FALSE,
  is_semi_new BOOLEAN NOT NULL DEFAULT FALSE,
  is_single_owner BOOLEAN NOT NULL DEFAULT FALSE,
  status trucks.vehicle_status NOT NULL DEFAULT 'available',
  branch_id UUID REFERENCES trucks.branches(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trucks.vehicle_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES trucks.vehicles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  storage_path TEXT,
  alt TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trucks.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES trucks.users(id) ON DELETE CASCADE,
  vehicle_id UUID NOT NULL REFERENCES trucks.vehicles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, vehicle_id)
);

CREATE TABLE IF NOT EXISTS trucks.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES trucks.vehicles(id) ON DELETE SET NULL,
  branch_id UUID REFERENCES trucks.branches(id) ON DELETE SET NULL,
  user_id UUID REFERENCES trucks.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL CHECK (btrim(name) <> ''),
  phone TEXT NOT NULL CHECK (btrim(phone) <> ''),
  email TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trucks.chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES trucks.users(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trucks.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES trucks.chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Sessões e recuperação de senha substituem a autenticação gerenciada pelo
-- provedor. Somente hashes dos tokens devem ser persistidos nestas tabelas.
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

CREATE INDEX IF NOT EXISTS vehicles_brand_idx ON trucks.vehicles (brand);
CREATE INDEX IF NOT EXISTS vehicles_model_idx ON trucks.vehicles (model);
CREATE INDEX IF NOT EXISTS vehicles_status_created_idx ON trucks.vehicles (status, created_at DESC);
CREATE INDEX IF NOT EXISTS vehicles_year_model_idx ON trucks.vehicles (year_model);
CREATE INDEX IF NOT EXISTS vehicles_price_idx ON trucks.vehicles (price);
CREATE INDEX IF NOT EXISTS vehicles_mileage_idx ON trucks.vehicles (mileage);
CREATE INDEX IF NOT EXISTS vehicles_fuel_transmission_idx ON trucks.vehicles (fuel, transmission);
CREATE INDEX IF NOT EXISTS vehicles_featured_idx ON trucks.vehicles (created_at DESC) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS vehicles_special_offer_idx ON trucks.vehicles (created_at DESC) WHERE is_special_offer = TRUE;
CREATE INDEX IF NOT EXISTS vehicles_semi_new_idx ON trucks.vehicles (created_at DESC) WHERE is_semi_new = TRUE;
CREATE INDEX IF NOT EXISTS vehicles_branch_id_idx ON trucks.vehicles (branch_id);
CREATE INDEX IF NOT EXISTS vehicle_images_vehicle_order_idx ON trucks.vehicle_images (vehicle_id, display_order);
CREATE UNIQUE INDEX IF NOT EXISTS vehicle_images_one_primary_per_vehicle_idx
  ON trucks.vehicle_images (vehicle_id) WHERE is_primary = TRUE;
CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON trucks.favorites (user_id);
CREATE INDEX IF NOT EXISTS favorites_vehicle_id_idx ON trucks.favorites (vehicle_id);
CREATE INDEX IF NOT EXISTS leads_vehicle_id_idx ON trucks.leads (vehicle_id);
CREATE INDEX IF NOT EXISTS leads_branch_id_idx ON trucks.leads (branch_id);
CREATE INDEX IF NOT EXISTS leads_user_id_idx ON trucks.leads (user_id);
CREATE INDEX IF NOT EXISTS leads_status_created_idx ON trucks.leads (status, created_at DESC);
CREATE INDEX IF NOT EXISTS chats_user_updated_idx ON trucks.chats (user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS chat_messages_chat_created_idx ON trucks.chat_messages (chat_id, created_at);
CREATE INDEX IF NOT EXISTS user_sessions_user_expires_idx ON trucks.user_sessions (user_id, expires_at);
CREATE INDEX IF NOT EXISTS password_reset_tokens_user_expires_idx
  ON trucks.password_reset_tokens (user_id, expires_at);

CREATE OR REPLACE FUNCTION trucks.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS branches_set_updated_at ON trucks.branches;
CREATE TRIGGER branches_set_updated_at
  BEFORE UPDATE ON trucks.branches
  FOR EACH ROW EXECUTE FUNCTION trucks.set_updated_at();

DROP TRIGGER IF EXISTS users_set_updated_at ON trucks.users;
CREATE TRIGGER users_set_updated_at
  BEFORE UPDATE ON trucks.users
  FOR EACH ROW EXECUTE FUNCTION trucks.set_updated_at();

DROP TRIGGER IF EXISTS user_profiles_set_updated_at ON trucks.user_profiles;
CREATE TRIGGER user_profiles_set_updated_at
  BEFORE UPDATE ON trucks.user_profiles
  FOR EACH ROW EXECUTE FUNCTION trucks.set_updated_at();

DROP TRIGGER IF EXISTS vehicles_set_updated_at ON trucks.vehicles;
CREATE TRIGGER vehicles_set_updated_at
  BEFORE UPDATE ON trucks.vehicles
  FOR EACH ROW EXECUTE FUNCTION trucks.set_updated_at();

DROP TRIGGER IF EXISTS leads_set_updated_at ON trucks.leads;
CREATE TRIGGER leads_set_updated_at
  BEFORE UPDATE ON trucks.leads
  FOR EACH ROW EXECUTE FUNCTION trucks.set_updated_at();

DROP TRIGGER IF EXISTS chats_set_updated_at ON trucks.chats;
CREATE TRIGGER chats_set_updated_at
  BEFORE UPDATE ON trucks.chats
  FOR EACH ROW EXECUTE FUNCTION trucks.set_updated_at();

CREATE OR REPLACE FUNCTION trucks.create_vehicle_sales_user_records()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO trucks.user_profiles (user_id, full_name, email)
  VALUES (NEW.id, NEW.full_name, NEW.email)
  ON CONFLICT (user_id) DO UPDATE
    SET full_name = EXCLUDED.full_name,
        email = EXCLUDED.email;

  INSERT INTO trucks.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS users_create_profile_and_role ON trucks.users;
CREATE TRIGGER users_create_profile_and_role
  AFTER INSERT ON trucks.users
  FOR EACH ROW EXECUTE FUNCTION trucks.create_vehicle_sales_user_records();

COMMENT ON TABLE trucks.vehicles IS 'Anúncios de veículos disponíveis para venda.';
COMMENT ON TABLE trucks.vehicle_images IS 'URLs e metadados das imagens; os arquivos ficam em armazenamento de arquivos, não no banco.';
COMMENT ON TABLE trucks.leads IS 'Solicitações de contato e propostas relacionadas à venda de veículos.';
COMMENT ON TABLE trucks.users IS 'Contas locais do módulo de venda de veículos; não compartilha usuários com outros módulos do site.';

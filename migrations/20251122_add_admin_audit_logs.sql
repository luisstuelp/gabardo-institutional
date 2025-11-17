create table if not exists admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  actor_id uuid references auth.users (id) on delete set null,
  actor_email text,
  role text,
  action text not null,
  route text,
  method text,
  entity_type text,
  entity_id text,
  description text,
  metadata jsonb not null default '{}',
  ip_address inet,
  user_agent text
);

create index if not exists admin_audit_logs_created_at_idx on admin_audit_logs (created_at desc);
create index if not exists admin_audit_logs_action_idx on admin_audit_logs (action);
create index if not exists admin_audit_logs_actor_idx on admin_audit_logs (actor_id);

begin;

create type public.contact_status as enum ('new', 'in_progress', 'completed', 'archived');

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status public.contact_status not null default 'new',
  name text not null,
  email text not null,
  phone text,
  company text,
  sector text,
  interest text,
  subject text not null,
  message text not null,
  privacy_accepted boolean not null default false,
  raw_data jsonb not null default '{}'::jsonb
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index if not exists contact_messages_status_idx on public.contact_messages (status);
create index if not exists contact_messages_email_idx on public.contact_messages (email);

create function public.set_contact_messages_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql security definer;

create trigger set_contact_messages_updated_at
before update on public.contact_messages
for each row
execute function public.set_contact_messages_updated_at();

commit;

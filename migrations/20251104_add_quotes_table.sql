begin;

create type public.quote_status as enum ('new', 'in_progress', 'completed', 'archived');

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status public.quote_status not null default 'new',
  name text not null,
  company text,
  email text not null,
  phone text not null,
  vehicle_category text not null,
  vehicle_brand text not null,
  vehicle_model text not null,
  vehicle_year text not null,
  vehicle_value text not null,
  vehicle_observation text,
  origin_state text not null,
  origin_city text not null,
  destination_state text not null,
  destination_city text not null,
  route_observation text,
  message text,
  privacy_accepted boolean not null default false,
  raw_data jsonb not null default '{}'::jsonb
);

create index if not exists quotes_created_at_idx on public.quotes (created_at desc);
create index if not exists quotes_status_idx on public.quotes (status);

create function public.set_quotes_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql security definer;

create trigger set_quotes_updated_at
before update on public.quotes
for each row
execute function public.set_quotes_updated_at();

commit;

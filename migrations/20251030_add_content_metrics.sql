begin;

create table if not exists public.post_metrics (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts (id) on delete cascade,
  views integer not null default 0,
  external_clicks integer not null default 0,
  shares integer not null default 0,
  last_viewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint post_metrics_post_id_unique unique (post_id)
);

create table if not exists public.midia_metrics (
  id uuid primary key default gen_random_uuid(),
  midia_id uuid references public.midia (id) on delete cascade,
  views integer not null default 0,
  external_clicks integer not null default 0,
  shares integer not null default 0,
  last_viewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint midia_metrics_midia_id_unique unique (midia_id)
);

create or replace function public.increment_post_metric(
  target_post_id uuid,
  view_increment integer default 0,
  click_increment integer default 0,
  share_increment integer default 0
) returns void as $$
begin
  insert into public.post_metrics (post_id, views, external_clicks, shares, last_viewed_at)
  values (target_post_id, view_increment, click_increment, share_increment, now())
  on conflict (post_id)
  do update set
    views = public.post_metrics.views + excluded.views,
    external_clicks = public.post_metrics.external_clicks + excluded.external_clicks,
    shares = public.post_metrics.shares + excluded.shares,
    last_viewed_at = case
      when excluded.views > 0 then now()
      else public.post_metrics.last_viewed_at
    end,
    updated_at = now();
end;
$$ language plpgsql security definer;

create or replace function public.increment_midia_metric(
  target_midia_id uuid,
  view_increment integer default 0,
  click_increment integer default 0,
  share_increment integer default 0
) returns void as $$
begin
  insert into public.midia_metrics (midia_id, views, external_clicks, shares, last_viewed_at)
  values (target_midia_id, view_increment, click_increment, share_increment, now())
  on conflict (midia_id)
  do update set
    views = public.midia_metrics.views + excluded.views,
    external_clicks = public.midia_metrics.external_clicks + excluded.external_clicks,
    shares = public.midia_metrics.shares + excluded.shares,
    last_viewed_at = case
      when excluded.views > 0 then now()
      else public.midia_metrics.last_viewed_at
    end,
    updated_at = now();
end;
$$ language plpgsql security definer;

commit;

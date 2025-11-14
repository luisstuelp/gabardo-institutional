begin;

alter table if exists public.content_metric_events
  alter column content_id type text using content_id::text;

alter table if exists public.content_metric_events
  drop constraint if exists content_metric_events_content_type_check;

alter table if exists public.content_metric_events
  add constraint content_metric_events_content_type_check
  check (content_type in ('post', 'midia', 'page'));

create table if not exists public.page_metrics (
  id uuid primary key default gen_random_uuid(),
  page_path text not null,
  views integer not null default 0,
  last_viewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint page_metrics_path_unique unique (page_path)
);

create index if not exists page_metrics_path_idx on public.page_metrics (page_path);

create or replace function public.increment_post_metric(
  content_id uuid,
  metric_type text
) returns void as $$
declare
  view_inc integer := case when metric_type = 'view' then 1 else 0 end;
  click_inc integer := case when metric_type = 'external_click' then 1 else 0 end;
  share_inc integer := case when metric_type = 'share' then 1 else 0 end;
begin
  perform set_config('search_path', 'public', true);

  if metric_type not in ('view', 'external_click', 'share') then
    raise exception 'Unsupported metric type: %', metric_type;
  end if;

  insert into public.post_metrics (post_id, views, external_clicks, shares, last_viewed_at)
  values (content_id, view_inc, click_inc, share_inc, now())
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

  insert into public.content_metric_events (content_type, content_id, metric_type)
  values ('post', content_id::text, metric_type);
end;
$$ language plpgsql security definer;

create or replace function public.increment_midia_metric(
  content_id uuid,
  metric_type text
) returns void as $$
declare
  view_inc integer := case when metric_type = 'view' then 1 else 0 end;
  click_inc integer := case when metric_type = 'external_click' then 1 else 0 end;
  share_inc integer := case when metric_type = 'share' then 1 else 0 end;
begin
  perform set_config('search_path', 'public', true);

  if metric_type not in ('view', 'external_click', 'share') then
    raise exception 'Unsupported metric type: %', metric_type;
  end if;

  insert into public.midia_metrics (midia_id, views, external_clicks, shares, last_viewed_at)
  values (content_id, view_inc, click_inc, share_inc, now())
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

  insert into public.content_metric_events (content_type, content_id, metric_type)
  values ('midia', content_id::text, metric_type);
end;
$$ language plpgsql security definer;

create or replace function public.increment_page_metric(
  content_id text,
  metric_type text
) returns void as $$
declare
  view_inc integer := case when metric_type = 'view' then 1 else 0 end;
begin
  perform set_config('search_path', 'public', true);

  if metric_type <> 'view' then
    raise exception 'Unsupported metric type for page: %', metric_type;
  end if;

  if content_id is null or length(trim(content_id)) = 0 then
    raise exception 'Page path is required';
  end if;

  insert into public.page_metrics (page_path, views, last_viewed_at)
  values (content_id, view_inc, now())
  on conflict (page_path)
  do update set
    views = public.page_metrics.views + excluded.views,
    last_viewed_at = now(),
    updated_at = now();

  insert into public.content_metric_events (content_type, content_id, metric_type)
  values ('page', content_id, metric_type);
end;
$$ language plpgsql security definer;

commit;

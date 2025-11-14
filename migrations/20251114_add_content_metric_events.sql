begin;

create table if not exists public.content_metric_events (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('post', 'midia')),
  content_id uuid not null,
  metric_type text not null check (metric_type in ('view', 'external_click', 'share')),
  occurred_at timestamptz not null default now()
);

create index if not exists content_metric_events_occurred_at_idx on public.content_metric_events (occurred_at);
create index if not exists content_metric_events_content_idx on public.content_metric_events (content_type, content_id);
create index if not exists content_metric_events_metric_idx on public.content_metric_events (metric_type);

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
  values ('post', content_id, metric_type);
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
  values ('midia', content_id, metric_type);
end;
$$ language plpgsql security definer;

create or replace function public.get_metrics_timeseries(
  start_date date,
  end_date date,
  metric_filter text default 'view',
  content_filter text default 'all'
)
returns table(event_date date, total bigint) as $$
  with params as (
    select
      greatest(start_date, '1970-01-01'::date) as start_date,
      greatest(end_date, start_date) as end_date
  ),
  series as (
    select generate_series(params.start_date, params.end_date, interval '1 day')::date as event_date
    from params
  ),
  aggregated as (
    select date_trunc('day', occurred_at)::date as event_date,
           count(*) as total
    from public.content_metric_events
    where occurred_at >= (select start_date from params)
      and occurred_at < (select end_date from params) + interval '1 day'
      and (metric_filter = 'all' or metric_type = metric_filter)
      and (content_filter = 'all' or content_type = content_filter)
    group by 1
  )
  select s.event_date,
         coalesce(a.total, 0)::bigint as total
  from series s
  left join aggregated a on a.event_date = s.event_date
  order by s.event_date;
$$ language sql stable;

create or replace function public.get_metrics_summary(
  start_date date,
  end_date date
)
returns table(metric_type text, content_type text, total bigint, unique_contents bigint) as $$
  with bounds as (
    select
      greatest(start_date, '1970-01-01'::date) as start_date,
      greatest(end_date, start_date) as end_date
  ),
  base as (
    select *
    from public.content_metric_events
    where occurred_at >= (select start_date from bounds)
      and occurred_at < (select end_date from bounds) + interval '1 day'
  ),
  per_content as (
    select metric_type,
           content_type,
           count(*)::bigint as total,
           count(distinct content_id)::bigint as unique_contents
    from base
    group by metric_type, content_type
  ),
  overall as (
    select metric_type,
           'all'::text as content_type,
           count(*)::bigint as total,
           count(distinct content_id)::bigint as unique_contents
    from base
    group by metric_type
  )
  select * from per_content
  union all
  select * from overall;
$$ language sql stable;

commit;

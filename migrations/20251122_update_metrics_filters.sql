begin;

create or replace function public.get_metrics_timeseries(
  start_date date,
  end_date date,
  metric_filter text default 'view',
  content_filter text default 'all',
  content_ids text[] default null
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
      and (content_ids is null or content_id = any(content_ids))
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
  end_date date,
  content_filter text default 'all',
  content_ids text[] default null
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
      and (content_filter = 'all' or content_type = content_filter)
      and (content_ids is null or content_id = any(content_ids))
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

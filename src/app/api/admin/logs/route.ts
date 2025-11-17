import { NextRequest, NextResponse } from 'next/server';

import { requireAdminSession } from '@/lib/adminAccess';

const DEFAULT_PER_PAGE = 50;
const MAX_PER_PAGE = 100;

function clampPerPage(value: number): number {
  if (Number.isNaN(value) || value <= 0) {
    return DEFAULT_PER_PAGE;
  }

  return Math.min(value, MAX_PER_PAGE);
}

function parsePage(value: number): number {
  if (Number.isNaN(value) || value < 1) {
    return 1;
  }

  return Math.floor(value);
}

function isValidISODate(value: string | null): value is string {
  if (!value) {
    return false;
  }

  const date = new Date(value);
  return Number.isFinite(date.getTime());
}

export async function GET(request: NextRequest) {
  const adminContext = await requireAdminSession();

  if ('error' in adminContext) {
    return NextResponse.json({ error: adminContext.error.message }, { status: adminContext.error.status });
  }

  const {
    supabase,
    session: { userId: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
  } = adminContext;

  const searchParams = new URL(request.url).searchParams;

  const page = parsePage(Number(searchParams.get('page')));
  const perPage = clampPerPage(Number(searchParams.get('perPage')));
  const actionFilter = searchParams.get('action')?.trim() || null;
  const actorFilter = searchParams.get('actor')?.trim() || null;
  const searchTerm = searchParams.get('search')?.trim() || null;
  const fromDate = searchParams.get('from');
  const toDate = searchParams.get('to');

  const offset = (page - 1) * perPage;
  const limitEnd = offset + perPage - 1;

  let query = supabase
    .from('admin_audit_logs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (actionFilter) {
    query = query.eq('action', actionFilter);
  }

  if (actorFilter) {
    query = query.ilike('actor_email', `%${actorFilter}%`);
  }

  if (searchTerm) {
    const sanitized = searchTerm.replace(/%/g, '\\%').replace(/_/g, '\\_');
    const orParts = [
      `action.ilike.%${sanitized}%`,
      `route.ilike.%${sanitized}%`,
      `description.ilike.%${sanitized}%`,
      `actor_email.ilike.%${sanitized}%`,
      `entity_type.ilike.%${sanitized}%`,
      `entity_id.ilike.%${sanitized}%`,
      `ip_address.ilike.%${sanitized}%`,
    ];

    query = query.or(orParts.join(','));
  }

  if (isValidISODate(fromDate)) {
    query = query.gte('created_at', new Date(fromDate).toISOString());
  }

  if (isValidISODate(toDate)) {
    query = query.lte('created_at', new Date(toDate).toISOString());
  }

  const { data, error, count } = await query.range(offset, limitEnd);

  if (error) {
    return NextResponse.json({ error: 'Não foi possível carregar os logs administrativos.', details: error.message }, { status: 500 });
  }

  const logs = (data ?? []).map((log) => ({
    id: log.id,
    created_at: log.created_at,
    actor_id: log.actor_id,
    actor_email: log.actor_email,
    role: log.role,
    action: log.action,
    description: log.description,
    route: log.route,
    method: log.method,
    entity_type: log.entity_type,
    entity_id: log.entity_id,
    metadata: typeof log.metadata === 'object' && log.metadata !== null ? log.metadata : {},
    ip_address: log.ip_address,
    user_agent: log.user_agent,
  }));

  const total = count ?? 0;
  const totalPages = total === 0 ? 1 : Math.max(1, Math.ceil(total / perPage));

  return NextResponse.json({
    logs,
    pagination: {
      page,
      perPage,
      total,
      totalPages,
    },
    filters: {
      action: actionFilter,
      actor: actorFilter,
      search: searchTerm,
      from: isValidISODate(fromDate) ? new Date(fromDate).toISOString() : null,
      to: isValidISODate(toDate) ? new Date(toDate).toISOString() : null,
    },
    currentAdmin: {
      id: currentAdminId,
      email: currentAdminEmail,
      role: currentAdminRole,
    },
  });
}

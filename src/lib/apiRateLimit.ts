import { NextResponse } from 'next/server';

export class RequestBodyTooLargeError extends Error {
  constructor() {
    super('Request body exceeds the allowed size.');
    this.name = 'RequestBodyTooLargeError';
  }
}

const localRateLimitWindows = new Map<string, number[]>();

export function resolveClientIp(headers: Headers): string {
  const realIp = headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  const forwardedIps = headers.get('x-forwarded-for')
    ?.split(',')
    .map((ip) => ip.trim())
    .filter(Boolean);

  return forwardedIps?.at(-1) ?? 'unknown';
}

export async function enforceLocalRateLimit(
  request: Request,
  scope: string,
  maxRequests: number,
  windowSeconds: number,
): Promise<NextResponse | null> {
  const now = Date.now();
  const key = `${scope}:${resolveClientIp(request.headers)}`;
  const windowDuration = windowSeconds * 1000;
  const recentRequests = (localRateLimitWindows.get(key) ?? [])
    .filter((timestamp) => now - timestamp < windowDuration);

  if (recentRequests.length >= maxRequests) {
    const retryAfter = Math.max(1, Math.ceil((recentRequests[0] + windowDuration - now) / 1000));
    return NextResponse.json(
      { error: 'Muitas solicitações. Tente novamente mais tarde.', code: 'RATE_LIMIT_EXCEEDED' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    );
  }

  recentRequests.push(now);
  localRateLimitWindows.set(key, recentRequests);
  if (localRateLimitWindows.size > 1000) {
    const cutoff = now - windowDuration;
    for (const [storedKey, timestamps] of localRateLimitWindows) {
      const validTimestamps = timestamps.filter((timestamp) => timestamp > cutoff);
      if (validTimestamps.length === 0) {
        localRateLimitWindows.delete(storedKey);
      } else {
        localRateLimitWindows.set(storedKey, validTimestamps);
      }
    }
  }

  return null;
}
async function readBodyBytes(request: Request, maxBytes: number): Promise<Uint8Array> {
  const contentLengthHeader = request.headers.get('content-length');
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : null;
  if (contentLength !== null && Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new RequestBodyTooLargeError();
  }

  if (!request.body) return new Uint8Array();

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > maxBytes) {
      await reader.cancel();
      throw new RequestBodyTooLargeError();
    }

    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return body;
}

export async function readJsonBodyWithLimit<T>(request: Request, maxBytes: number): Promise<T> {
  const body = await readBodyBytes(request, maxBytes);
  const parsed: unknown = JSON.parse(new TextDecoder().decode(body));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new TypeError('Expected a JSON object.');
  }
  return parsed as T;
}

export async function readFormDataWithLimit(request: Request, maxBytes: number): Promise<FormData> {
  const contentType = request.headers.get('content-type');
  if (!contentType?.toLowerCase().startsWith('multipart/form-data;')) {
    throw new TypeError('Expected multipart/form-data request.');
  }

  const body = await readBodyBytes(request, maxBytes);
  return new Response(body, { headers: { 'content-type': contentType } }).formData();
}

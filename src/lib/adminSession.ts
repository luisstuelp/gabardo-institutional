import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

export const SESSION_COOKIE_NAME = 'gabardo_admin_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 6; // 6 hours

export type AdminSession = {
  email: string;
  userId: string;
  expiresAt: number;
};

const TOKEN_SEPARATOR = '::';

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.trim().length === 0) {
    throw new Error('ADMIN_SESSION_SECRET environment variable is not configured.');
  }

  return secret;
}

export function createSessionToken(email: string, userId: string): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = JSON.stringify({ email, userId, expiresAt });
  const signature = createHmac('sha256', getSessionSecret()).update(payload).digest('hex');

  return Buffer.from(`${payload}${TOKEN_SEPARATOR}${signature}`).toString('base64url');
}

export function verifySessionToken(token: string): AdminSession | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const separatorIndex = decoded.lastIndexOf(TOKEN_SEPARATOR);

    if (separatorIndex === -1) {
      return null;
    }

    const payload = decoded.slice(0, separatorIndex);
    const signature = decoded.slice(separatorIndex + TOKEN_SEPARATOR.length);

    if (!payload || !signature) {
      return null;
    }

    const expectedSignature = createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
    const providedBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (providedBuffer.length !== expectedBuffer.length) {
      return null;
    }

    if (!timingSafeEqual(providedBuffer, expectedBuffer)) {
      return null;
    }

    const parsed = JSON.parse(payload) as AdminSession;

    if (!parsed?.email || typeof parsed.email !== 'string') {
      return null;
    }

    if (!parsed?.userId || typeof parsed.userId !== 'string') {
      return null;
    }

    if (!parsed?.expiresAt || typeof parsed.expiresAt !== 'number') {
      return null;
    }

    if (Date.now() > parsed.expiresAt) {
      return null;
    }

    return parsed;
  } catch (error) {
    void error;
    return null;
  }
}

export async function readAdminSessionFromCookies(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

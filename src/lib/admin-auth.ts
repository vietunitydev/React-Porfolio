export const ADMIN_PASSWORD = '123456';
export const ADMIN_SESSION_COOKIE = 'portfolio_admin_session';
const ADMIN_SESSION_VALUE = 'authenticated';

export function verifyAdminPassword(password: string) {
  return password === ADMIN_PASSWORD;
}

export function getAdminSessionValue() {
  return ADMIN_SESSION_VALUE;
}

export function isValidAdminSession(token: string | undefined | null) {
  return token === ADMIN_SESSION_VALUE;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  };
}

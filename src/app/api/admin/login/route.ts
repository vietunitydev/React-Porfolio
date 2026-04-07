import {NextResponse} from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  getAdminCookieOptions,
  getAdminSessionValue,
  verifyAdminPassword,
} from '../../../../lib/admin-auth';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const password = typeof payload?.password === 'string' ? payload.password : '';

  if (!verifyAdminPassword(password)) {
    return NextResponse.json(
      {success: false, message: 'Invalid password.'},
      {status: 401}
    );
  }

  const response = NextResponse.json({success: true, message: 'Login successful.'});
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    getAdminSessionValue(),
    getAdminCookieOptions()
  );

  return response;
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccessToken, revokeSession } from '@/lib/auth';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token')?.value;
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (authToken) {
      const verified = verifyAccessToken(authToken);
      if (verified?.sessionId) {
        await revokeSession(verified.sessionId);
      }
    }

    if (refreshToken) {
      const parts = refreshToken.split('.');
      if (parts[0]) {
        await revokeSession(parts[0]);
      }
    }

    const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });

    response.cookies.set('auth_token', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
    });

    response.cookies.set('refresh_token', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    const response = NextResponse.json({ success: true, message: 'Logged out.' });
    response.cookies.set('auth_token', '', { httpOnly: true, maxAge: 0, path: '/' });
    response.cookies.set('refresh_token', '', { httpOnly: true, maxAge: 0, path: '/' });
    return response;
  }
}

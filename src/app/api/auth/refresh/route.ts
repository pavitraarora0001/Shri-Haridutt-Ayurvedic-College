import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { rotateRefreshTokenSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || undefined;

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: 'No refresh token provided.' },
        { status: 401 }
      );
    }

    const rotated = await rotateRefreshTokenSession(refreshToken, clientIp, userAgent);

    if (!rotated) {
      // Clear invalid cookies
      const response = NextResponse.json(
        { success: false, error: 'Session has expired, been revoked, or is invalid.' },
        { status: 401 }
      );
      response.cookies.set('auth_token', '', { httpOnly: true, maxAge: 0, path: '/' });
      response.cookies.set('refresh_token', '', { httpOnly: true, maxAge: 0, path: '/' });
      return response;
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: rotated.user.id,
        name: rotated.user.name,
        email: rotated.user.email,
        role: rotated.user.role,
        type: rotated.user.type,
      },
    });

    // Set updated short-lived access token cookie (15 mins)
    response.cookies.set('auth_token', rotated.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60,
      path: '/',
    });

    // Set updated rotated refresh token cookie (7 days)
    response.cookies.set('refresh_token', rotated.newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal error processing token refresh.' },
      { status: 500 }
    );
  }
}

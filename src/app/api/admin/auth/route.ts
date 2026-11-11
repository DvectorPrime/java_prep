import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();
    const correctPasscode = process.env.ADMIN_PASSCODE || 'admin2026';

    if (passcode === correctPasscode) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_token', correctPasscode, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      return response;
    }

    return NextResponse.json({ error: 'Incorrect passcode' }, { status: 401 });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

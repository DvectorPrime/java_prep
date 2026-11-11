import { NextRequest } from 'next/server';

export function isAuthorizedAdmin(req: NextRequest): boolean {
  const correctPasscode = process.env.ADMIN_PASSCODE || 'admin2026';
  
  // Check Authorization header: Bearer <passcode>
  const authHeader = req.headers.get('authorization');
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (token === correctPasscode) return true;
  }

  // Check admin_token cookie
  const cookie = req.cookies.get('admin_token');
  if (cookie && cookie.value === correctPasscode) {
    return true;
  }

  // Check x-admin-passcode header
  const customHeader = req.headers.get('x-admin-passcode');
  if (customHeader === correctPasscode) {
    return true;
  }

  return false;
}

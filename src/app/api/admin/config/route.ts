import { NextRequest, NextResponse } from 'next/server';
import { isAuthorizedAdmin } from '@/lib/adminAuth';
import { getGroqPool } from '@/lib/groqPool';
import { clearGradingCache } from '@/lib/gradingCache';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, configUpdates } = body;

    if (action === 'clear-cache') {
      clearGradingCache();
      return NextResponse.json({ success: true, message: 'Grading cache cleared.' });
    }

    if (configUpdates) {
      const pool = getGroqPool();
      const updated = pool.updateConfig(configUpdates);
      return NextResponse.json({ success: true, config: updated });
    }

    return NextResponse.json({ error: 'No valid action or config provided.' }, { status: 400 });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

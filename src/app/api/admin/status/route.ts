import { NextRequest, NextResponse } from 'next/server';
import { isAuthorizedAdmin } from '@/lib/adminAuth';
import { getGroqPool } from '@/lib/groqPool';
import { getCacheStats } from '@/lib/gradingCache';
import { getFullUsageStats } from '@/lib/rateLimiter';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const pool = getGroqPool();
  const keys = pool.getKeys(true);
  const config = pool.getConfig();
  const cacheStats = getCacheStats();
  const usageStats = getFullUsageStats();

  return NextResponse.json({
    keys,
    config,
    cacheStats,
    usageStats
  });
}

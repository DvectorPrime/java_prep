import { NextRequest, NextResponse } from 'next/server';
import { isAuthorizedAdmin } from '@/lib/adminAuth';
import { getGroqPool } from '@/lib/groqPool';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action } = body;
    const pool = getGroqPool();

    if (action === 'bulk-add') {
      const { text } = body;
      if (!text || typeof text !== 'string') {
        return NextResponse.json({ error: 'Text input required for bulk add' }, { status: 400 });
      }

      const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      let addedCount = 0;

      for (const line of lines) {
        let key = line;
        let label = `Key`;

        if (line.includes('-')) {
          const parts = line.split('-').map(s => s.trim());
          label = parts[0];
          key = parts[1];
        } else if (line.includes('=')) {
          const parts = line.split('=').map(s => s.trim());
          label = parts[0];
          key = parts[1];
        }

        if (key.startsWith('gsk_') || key.length > 20) {
          pool.addKey(key, label);
          addedCount++;
        }
      }

      return NextResponse.json({ success: true, addedCount });
    }

    if (action === 'add') {
      const { key, label } = body;
      if (!key) {
        return NextResponse.json({ error: 'Key is required' }, { status: 400 });
      }
      const record = pool.addKey(key, label);
      return NextResponse.json({ success: true, key: record });
    }

    if (action === 'remove') {
      const { id } = body;
      if (!id) return NextResponse.json({ error: 'Key ID required' }, { status: 400 });
      const ok = pool.removeKey(id);
      return NextResponse.json({ success: ok });
    }

    if (action === 'toggle') {
      const { id, status } = body;
      if (!id || !status) return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
      const ok = pool.updateKeyStatus(id, status);
      return NextResponse.json({ success: ok });
    }

    if (action === 'test') {
      const { id, key } = body;
      let keyToTest = key;
      if (!keyToTest && id) {
        // Find in pool
        const fullKeys = pool.getKeys(false);
        const match = fullKeys.find(k => k.id === id);
        if (match && match.key) keyToTest = match.key;
      }

      if (!keyToTest) {
        return NextResponse.json({ error: 'No key provided for test' }, { status: 400 });
      }

      const result = await pool.testSingleKey(keyToTest);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { readJsonSafe } from '@/lib/storage';
import { MetaData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const meta = readJsonSafe<MetaData | null>('meta.json', null);
    if (!meta) {
      return NextResponse.json({ error: 'Meta configuration not found.' }, { status: 404 });
    }
    return NextResponse.json(meta);
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { readJsonSafe } from '@/lib/storage';
import { QuestionPublic } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const questions = readJsonSafe<QuestionPublic[]>('questions.public.json', []);
    return NextResponse.json(questions);
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

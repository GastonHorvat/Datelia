// src/app/api/tags/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: tags, error } = await supabase
      .from('tags')
      .select('id, name, slug, created_at, updated_at')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching tags from Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(tags || [], { status: 200 });
  } catch (error: any) {
    console.error('Unexpected error in GET /api/tags:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

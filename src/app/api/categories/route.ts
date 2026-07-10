// src/app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('id, name, slug, description, created_at, updated_at')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories from Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(categories || [], { status: 200 });
  } catch (error: any) {
    console.error('Unexpected error in GET /api/categories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

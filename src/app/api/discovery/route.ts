// src/app/api/discovery/route.ts

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadId, step, data } = body;

    if (!data) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    let result;

    if (!leadId) {
      // Step 1: Create a new lead
      result = await supabase
        .from('leads')
        .insert([{
          empresa: data.empresa,
          cantidad_empleados: data.cantidadEmpleados,
          facturacion: data.facturacion,
          nombre: data.nombre || 'Lead en progreso',
          email: data.email || null,
        }])
        .select()
        .single();
    } else {
      // Steps 2 or 3: Update existing lead
      const updateData: any = {};
      
      if (step === 2) {
        updateData.ecosistema = data.ecosistema;
        updateData.desafio = data.desafio;
      } else if (step === 3) {
        updateData.nombre = data.nombre;
        updateData.cargo = data.cargo;
        updateData.email = data.email;
      }

      result = await supabase
        .from('leads')
        .update(updateData)
        .eq('id', leadId)
        .select()
        .single();
    }

    if (result.error) {
      console.error('Supabase error:', result.error);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Lead updated successfully', 
      leadId: result.data.id 
    }, { status: 200 });

  } catch (error) {
    console.error('Discovery sync error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

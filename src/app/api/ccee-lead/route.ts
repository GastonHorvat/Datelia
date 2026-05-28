// src/app/api/ccee-lead/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, empresa, cargo, email, whatsapp } = body;

    // 1. Validation
    if (!nombre || !empresa || !cargo || !email || !whatsapp) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'El email ingresado no es válido.' }, { status: 400 });
    }

    // Argentine WhatsApp validation (we normalize it first)
    const sanitizedWhatsapp = whatsapp.replace(/(?!\+)[^\d]/g, '');
    const isDomestic = /^\d{10}$/.test(sanitizedWhatsapp);
    const isInternational = /^\+549?\d{10}$/.test(sanitizedWhatsapp);
    if (!isDomestic && !isInternational) {
      return NextResponse.json({ error: 'El número de Whatsapp no es un número válido de Argentina (debe tener 10 dígitos con código de área, ej: 11 1234 5678).' }, { status: 400 });
    }

    // 2. Connect to Odoo via JSON-RPC
    const odooUrl = process.env.ODOO_URL;
    const odooDb = process.env.ODOO_DB;
    const odooUser = process.env.ODOO_USER;
    const odooKey = process.env.ODOO_KEY;

    if (!odooUrl || !odooDb || !odooUser || !odooKey) {
      console.error('Odoo environment variables are missing in env process');
      return NextResponse.json({ error: 'Error de configuración del servidor de CRM.' }, { status: 500 });
    }

    // A. Authenticate to get uid
    const authPayload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'common',
        method: 'authenticate',
        args: [odooDb, odooUser, odooKey, {}]
      },
      id: Math.floor(Math.random() * 1000000)
    };

    const authRes = await fetch(`${odooUrl}/jsonrpc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authPayload)
    });

    if (!authRes.ok) {
      const text = await authRes.text();
      console.error('Odoo auth HTTP error:', authRes.status, text);
      return NextResponse.json({ error: 'Error de comunicación con el CRM.' }, { status: 500 });
    }

    const authJson = await authRes.json();
    if (authJson.error) {
      console.error('Odoo auth error payload:', authJson.error);
      return NextResponse.json({ error: 'Error de autenticación con el CRM.' }, { status: 500 });
    }

    const uid = authJson.result;
    if (!uid || typeof uid !== 'number') {
      console.error('Odoo auth failed, no numeric UID returned:', authJson);
      return NextResponse.json({ error: 'Autenticación con el CRM fallida.' }, { status: 500 });
    }

    // B. Create lead
    const leadData = {
      name: `[Kit CCEE] - ${empresa}`,
      partner_name: empresa,
      contact_name: nombre,
      function: cargo,
      email_from: email,
      phone: sanitizedWhatsapp,
      user_id: 5, // Assigned to Jimena Garcia Pinto
      description: 'Lead registrado desde la descarga del Kit de Implementación CCEE.'
    };

    const createPayload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [odooDb, uid, odooKey, 'crm.lead', 'create', [leadData]]
      },
      id: Math.floor(Math.random() * 1000000)
    };

    const createRes = await fetch(`${odooUrl}/jsonrpc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createPayload)
    });

    if (!createRes.ok) {
      const text = await createRes.text();
      console.error('Odoo create lead HTTP error:', createRes.status, text);
      return NextResponse.json({ error: 'Error al enviar lead al CRM.' }, { status: 500 });
    }

    const createJson = await createRes.json();
    if (createJson.error) {
      console.error('Odoo create lead error payload:', createJson.error);
      return NextResponse.json({ error: 'Error al registrar el lead en el CRM.' }, { status: 500 });
    }

    const leadId = createJson.result;
    return NextResponse.json({ success: true, leadId });

  } catch (error: any) {
    console.error('Odoo sync error:', error);
    return NextResponse.json({ error: 'Error interno del servidor al procesar la solicitud.' }, { status: 500 });
  }
}

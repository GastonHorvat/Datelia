// src/lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
  throw new Error('Supabase URL is not defined in environment variables (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL)');
}

// Inicializar el cliente administrativo de Supabase
// Se usa supabaseServiceRoleKey para saltarse las RLS (Row-Level Security) en inserciones backend
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey || 'placeholder-or-missing-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

// Helper para validar si la configuración del cliente admin es correcta
export function isSupabaseAdminConfigured() {
  return (
    !!supabaseServiceRoleKey &&
    supabaseServiceRoleKey !== 'placeholder_replace_with_actual_service_role_key' &&
    supabaseServiceRoleKey !== 'your-secret-key' &&
    supabaseServiceRoleKey !== ''
  );
}

import { createClient } from '@supabase/supabase-js';

// Robust environment variable access for multiple execution contexts
const getEnvVar = (name: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    return process.env[name];
  }
  // Fallback to import.meta.env for Vite-compatible environments
  return (import.meta as any).env?.[name];
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || getEnvVar('SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || getEnvVar('SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'DeepSync Connectivity Warning: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. ' +
    'The application may fail to authenticate or sync with the Neural Mesh.'
  );
}

// In production, ensure these are provided via process.env or import.meta.env
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
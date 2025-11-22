import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las credenciales de Supabase en las variables de entorno');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para las estaciones
export interface EstacionData {
  id?: number;
  slug: string;
  remontes_abiertos?: string;
  remontes_totales?: string;
  kilometros_abiertos?: string;
  kilometros_totales?: string;
  nieve?: string;
  timestamp?: string;
}

// Funciones para interactuar con Supabase
export async function guardarEstacion(estacion: EstacionData) {
  const { data, error } = await supabase
    .from('estaciones')
    .insert([estacion])
    .select();

  if (error) {
    console.error('Error al guardar estación:', error);
    throw error;
  }

  return data;
}

export async function obtenerEstaciones(limite = 50) {
  const { data, error } = await supabase
    .from('estaciones')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(limite);

  if (error) {
    console.error('Error al obtener estaciones:', error);
    throw error;
  }

  return data;
}

export async function obtenerEstacionPorSlug(slug: string) {
  const { data, error } = await supabase
    .from('estaciones')
    .select('*')
    .eq('slug', slug)
    .order('timestamp', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 es "no rows returned"
    console.error('Error al obtener estación:', error);
    throw error;
  }

  return data;
}

export async function obtenerUltimasEstaciones(slugs: string[]) {
  const { data, error } = await supabase
    .from('estaciones')
    .select('*')
    .in('slug', slugs)
    .order('timestamp', { ascending: false });

  if (error) {
    console.error('Error al obtener últimas estaciones:', error);
    throw error;
  }

  // Agrupar por slug y obtener solo la más reciente de cada una
  const estacionesUnicas = new Map<string, EstacionData>();
  data?.forEach((estacion: EstacionData) => {
    if (!estacionesUnicas.has(estacion.slug)) {
      estacionesUnicas.set(estacion.slug, estacion);
    }
  });

  return Array.from(estacionesUnicas.values());
}

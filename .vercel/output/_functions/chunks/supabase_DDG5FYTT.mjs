import { createClient } from '@supabase/supabase-js';

const supabaseUrl = undefined                                   ;
const supabaseAnonKey = undefined                                        ;
{
  throw new Error("Faltan las credenciales de Supabase en las variables de entorno");
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);
async function guardarEstacion(estacion) {
  const { data, error } = await supabase.from("estaciones").insert([estacion]).select();
  if (error) {
    console.error("Error al guardar estación:", error);
    throw error;
  }
  return data;
}
async function obtenerEstaciones(limite = 50) {
  const { data, error } = await supabase.from("estaciones").select("*").order("timestamp", { ascending: false }).limit(limite);
  if (error) {
    console.error("Error al obtener estaciones:", error);
    throw error;
  }
  return data;
}
async function obtenerEstacionPorSlug(slug) {
  const { data, error } = await supabase.from("estaciones").select("*").eq("slug", slug).order("timestamp", { ascending: false }).limit(1).single();
  if (error && error.code !== "PGRST116") {
    console.error("Error al obtener estación:", error);
    throw error;
  }
  return data;
}
async function obtenerUltimasEstaciones(slugs) {
  const { data, error } = await supabase.from("estaciones").select("*").in("slug", slugs).order("timestamp", { ascending: false });
  if (error) {
    console.error("Error al obtener últimas estaciones:", error);
    throw error;
  }
  const estacionesUnicas = /* @__PURE__ */ new Map();
  data?.forEach((estacion) => {
    if (!estacionesUnicas.has(estacion.slug)) {
      estacionesUnicas.set(estacion.slug, estacion);
    }
  });
  return Array.from(estacionesUnicas.values());
}

export { obtenerUltimasEstaciones as a, obtenerEstaciones as b, guardarEstacion as g, obtenerEstacionPorSlug as o };

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ilnqnxrrxzdjpuzegron.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsbnFueHJyeHpkanB1emVncm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MjczMjksImV4cCI6MjA3OTQwMzMyOX0.uOEWLKxUA8cgfOIaOFX2m1kZ1R0qLVBJZC5b0K_rF1o";
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

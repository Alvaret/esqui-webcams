const API_BASE = 'https://api-esqui-scraping-production.up.railway.app';

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

// Para compatibilidad con código legacy
export interface EstacionDataLegacy {
  slug: string;
  nombre: string;
  remontes: string | null;
  kilometros: string | null;
  nieve: string | null;
  timestamp: string;
  estado: 'success' | 'error';
  error?: string;
}

export interface TodasEstacionesResponse {
  estaciones: EstacionData[];
  total: number;
  ultima_actualizacion: string;
}

/**
 * Obtiene los datos de una estación específica
 */
export async function getEstacion(slug: string): Promise<EstacionData> {
  try {
    const response = await fetch(`${API_BASE}/estacion/${slug}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener datos de ${slug}:`, error);
    throw error;
  }
}

/**
 * Obtiene los datos de todas las estaciones
 */
export async function getTodasEstaciones(): Promise<TodasEstacionesResponse> {
  try {
    const response = await fetch(`${API_BASE}/estaciones`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener todas las estaciones:', error);
    throw error;
  }
}

/**
 * Obtiene el estado de la API
 */
export async function getAPIStatus() {
  try {
    const response = await fetch(`${API_BASE}/status`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el estado de la API:', error);
    throw error;
  }
}

/**
 * Obtiene los datos de una estación desde Supabase (última entrada)
 */
export async function getEstacionFromDB(slug: string): Promise<EstacionData | null> {
  try {
    const response = await fetch(`/api/estacion-db/${slug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error al obtener datos de ${slug} desde DB:`, error);
    throw error;
  }
}

/**
 * Obtiene los datos de múltiples estaciones desde Supabase
 */
export async function getEstacionesFromDB(slugs: string[]): Promise<EstacionData[]> {
  try {
    const slugsParam = slugs.join(',');
    const response = await fetch(`/api/estaciones-db?slugs=${slugsParam}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error al obtener estaciones desde DB:', error);
    throw error;
  }
}

/**
 * Scrapea datos de una estación y los guarda en Supabase
 */
export async function scrapearYGuardar(slug: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    // 1. Scrapear desde Railway
    const scrapeResponse = await fetch(`${API_BASE}/estacion/${slug}`);
    
    if (!scrapeResponse.ok) {
      throw new Error(`Error al scrapear: ${scrapeResponse.status}`);
    }
    
    const scrapeData = await scrapeResponse.json();
    
    // 2. Guardar en Supabase
    const saveResponse = await fetch('/api/estaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scrapeData)
    });
    
    if (!saveResponse.ok) {
      const errorData = await saveResponse.json();
      throw new Error(errorData.error || 'Error al guardar en Supabase');
    }
    
    const saveResult = await saveResponse.json();
    return { success: true, data: saveResult.data };
    
  } catch (error: any) {
    console.error(`Error en scrapearYGuardar para ${slug}:`, error);
    return { success: false, error: error.message };
  }
}

const API_BASE = 'https://api-esqui-scraping-production.up.railway.app';

export interface EstacionData {
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

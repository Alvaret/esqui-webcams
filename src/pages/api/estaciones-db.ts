import type { APIRoute } from 'astro';
import { obtenerEstaciones, obtenerUltimasEstaciones } from '../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const slugs = url.searchParams.get('slugs');
    const limite = parseInt(url.searchParams.get('limit') || '50');

    let data;
    
    if (slugs) {
      // Si se especifican slugs, obtener solo esas estaciones
      const slugsArray = slugs.split(',').map(s => s.trim());
      data = await obtenerUltimasEstaciones(slugsArray);
    } else {
      // Si no, obtener todas las estaciones recientes
      data = await obtenerEstaciones(limite);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data,
        total: data.length 
      }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error: any) {
    console.error('Error en GET /api/estaciones-db:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error al obtener estaciones',
        details: error.message 
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};

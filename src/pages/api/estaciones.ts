import type { APIRoute } from 'astro';
import { guardarResultadoScraping } from '../../lib/scraping';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Validar que tenga los campos requeridos
    if (!body.slug) {
      return new Response(
        JSON.stringify({ 
          error: 'Falta campo requerido: slug' 
        }), 
        { status: 400 }
      );
    }

    const data = await guardarResultadoScraping(body);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data 
      }), 
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error: any) {
    console.error('Error en POST /api/estaciones:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error al guardar la estación',
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

import type { APIRoute } from 'astro';
import { guardarEstacion, type EstacionData } from '../../lib/supabase';

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

    // Extraer remontes y kilómetros si vienen en formato "X/Y"
    let remontesAbiertos = null;
    let remontesTotales = null;
    let kilometrosAbiertos = null;
    let kilometrosTotales = null;

    if (body.remontes && body.remontes.includes('/')) {
      const [abiertos, totales] = body.remontes.split('/');
      remontesAbiertos = abiertos.trim();
      remontesTotales = totales.trim();
    }

    if (body.kilometros && body.kilometros.includes('/')) {
      const [abiertos, totales] = body.kilometros.split('/');
      kilometrosAbiertos = abiertos.trim();
      kilometrosTotales = totales.trim();
    }

    const estacionData: EstacionData = {
      slug: body.slug,
      remontes_abiertos: remontesAbiertos,
      remontes_totales: remontesTotales,
      kilometros_abiertos: kilometrosAbiertos,
      kilometros_totales: kilometrosTotales,
      nieve: body.nieve || null,
      timestamp: body.timestamp || new Date().toISOString()
    };

    const data = await guardarEstacion(estacionData);

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

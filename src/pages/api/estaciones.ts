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

    const extraerValores = (valor: unknown): [string | null, string | null] => {
      if (typeof valor === 'string') {
        const separador = valor.indexOf('/');
        if (separador === -1) return [null, null];
        return [valor.slice(0, separador).trim(), valor.slice(separador + 1).trim()];
      }

      if (valor && typeof valor === 'object') {
        const datos = valor as { abiertos?: unknown; total?: unknown; totales?: unknown };
        const abiertos = datos.abiertos;
        const totales = datos.total ?? datos.totales;
        return [
          abiertos == null ? null : String(abiertos),
          totales == null ? null : String(totales)
        ];
      }

      return [null, null];
    };

    const [remontesAbiertos, remontesTotales] = extraerValores(body.remontes);
    const [kilometrosAbiertos, kilometrosTotales] = extraerValores(body.kilometros);
    const nieve = body.nieve && typeof body.nieve === 'object'
      ? [body.nieve.espesor, body.nieve.unidad].filter(Boolean).join(' ') || null
      : body.nieve ?? null;

    const estacionData: EstacionData = {
      slug: body.slug,
      remontes_abiertos: remontesAbiertos,
      remontes_totales: remontesTotales,
      kilometros_abiertos: kilometrosAbiertos,
      kilometros_totales: kilometrosTotales,
      nieve,
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

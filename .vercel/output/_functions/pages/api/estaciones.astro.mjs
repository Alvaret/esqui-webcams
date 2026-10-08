import { g as guardarEstacion } from '../../chunks/supabase_DDG5FYTT.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!body.slug) {
      return new Response(
        JSON.stringify({
          error: "Falta campo requerido: slug"
        }),
        { status: 400 }
      );
    }
    let remontesAbiertos = null;
    let remontesTotales = null;
    let kilometrosAbiertos = null;
    let kilometrosTotales = null;
    if (body.remontes && body.remontes.includes("/")) {
      const [abiertos, totales] = body.remontes.split("/");
      remontesAbiertos = abiertos.trim();
      remontesTotales = totales.trim();
    }
    if (body.kilometros && body.kilometros.includes("/")) {
      const [abiertos, totales] = body.kilometros.split("/");
      kilometrosAbiertos = abiertos.trim();
      kilometrosTotales = totales.trim();
    }
    const estacionData = {
      slug: body.slug,
      remontes_abiertos: remontesAbiertos,
      remontes_totales: remontesTotales,
      kilometros_abiertos: kilometrosAbiertos,
      kilometros_totales: kilometrosTotales,
      nieve: body.nieve || null,
      timestamp: body.timestamp || (/* @__PURE__ */ new Date()).toISOString()
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
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error en POST /api/estaciones:", error);
    return new Response(
      JSON.stringify({
        error: "Error al guardar la estación",
        details: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

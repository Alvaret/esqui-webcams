import { a as obtenerUltimasEstaciones, b as obtenerEstaciones } from '../../chunks/supabase_BYvvEQHG.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ url }) => {
  try {
    const slugs = url.searchParams.get("slugs");
    const limite = parseInt(url.searchParams.get("limit") || "50");
    let data;
    if (slugs) {
      const slugsArray = slugs.split(",").map((s) => s.trim());
      data = await obtenerUltimasEstaciones(slugsArray);
    } else {
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
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error en GET /api/estaciones-db:", error);
    return new Response(
      JSON.stringify({
        error: "Error al obtener estaciones",
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
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

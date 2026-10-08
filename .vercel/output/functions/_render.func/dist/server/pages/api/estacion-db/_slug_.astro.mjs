import { o as obtenerEstacionPorSlug } from '../../../chunks/supabase_BYvvEQHG.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      return new Response(
        JSON.stringify({
          error: "Slug no proporcionado"
        }),
        { status: 400 }
      );
    }
    const data = await obtenerEstacionPorSlug(slug);
    if (!data) {
      return new Response(
        JSON.stringify({
          error: "Estación no encontrada",
          slug
        }),
        { status: 404 }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        data
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error en GET /api/estacion-db/[slug]:", error);
    return new Response(
      JSON.stringify({
        error: "Error al obtener la estación",
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

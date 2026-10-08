import type { APIRoute } from 'astro';
import opciones from '../data/opciones.json';
import { guardarResultadoScraping } from '../lib/scraping';

export const prerender = false;

const SCRAPER_API_BASE = 'https://api-esqui-scraping.onrender.com';

function respuestaJson(data: unknown, status: number) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store'
		}
	});
}

export const POST: APIRoute = async ({ request }) => {
	const inicio = Date.now();
	const resultados = await Promise.all(
		Object.keys(opciones).map(async (slug) => {
			try {
				const response = await fetch(`${SCRAPER_API_BASE}/estacion/${slug}`, {
					signal: AbortSignal.timeout(25_000)
				});
				const payload = await response.json();

				if (!response.ok) {
					throw new Error(`El scraper respondió HTTP ${response.status}`);
				}
				if (payload.estado === 'error') {
					throw new Error(payload.error || 'El scraper no pudo obtener los datos');
				}
				if (payload.slug !== slug) {
					throw new Error(`El scraper devolvió un slug inesperado: ${payload.slug ?? 'vacío'}`);
				}

				await guardarResultadoScraping(payload);
				return { slug, success: true };
			} catch (error) {
				console.error(`Error al cargar ${slug}:`, error);
				return {
					slug,
					success: false,
					error: error instanceof Error ? error.message : 'Error desconocido'
				};
			}
		})
	);

	const exitosas = resultados.filter((resultado) => resultado.success).length;
	return respuestaJson({
		success: exitosas === resultados.length,
		procesadas: resultados.length,
		exitosas,
		fallidas: resultados.length - exitosas,
		duracionMs: Date.now() - inicio,
		resultados
	}, exitosas === resultados.length ? 200 : 207);
};
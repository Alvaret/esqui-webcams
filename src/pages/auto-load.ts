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

export const GET: APIRoute = async () => {
	const html = `<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="theme-color" content="#153d35">
		<title>Carga de estaciones | PLWinterCam</title>
		<style>
			:root { color-scheme: light; --forest: #153d35; --paper: #f2f3ec; --ink: #172b26; --muted: #697a72; --coral: #e65c42; --line: #d7ddd3; }
			* { box-sizing: border-box; }
			body { min-height: 100vh; margin: 0; display: grid; place-items: center; padding: 24px; background: var(--paper); color: var(--ink); font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
			main { width: min(100%, 520px); padding: 28px; border: 1px solid var(--line); border-radius: 8px; background: #fff; box-shadow: 0 18px 50px rgba(23, 43, 38, .08); }
			.brand { display: flex; align-items: center; gap: 10px; margin-bottom: 34px; color: var(--forest); font-size: 13px; font-weight: 800; }
			.mark { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 50%; background: var(--forest); color: #fff; font-weight: 700; }
			.spinner { width: 42px; height: 42px; margin-bottom: 20px; border: 4px solid var(--line); border-top-color: var(--coral); border-radius: 50%; animation: spin .8s linear infinite; }
			h1 { margin: 0; font-size: 23px; line-height: 1.2; }
			#message { margin: 8px 0 0; color: var(--muted); }
			#summary { margin-top: 22px; font-size: 13px; font-weight: 700; }
			#results { display: grid; gap: 8px; margin: 14px 0 0; padding: 0; list-style: none; }
			#results li { display: flex; justify-content: space-between; gap: 16px; padding: 9px 0; border-top: 1px solid var(--line); }
			.ok { color: #26724f; }
			.failed { color: #b53f2a; }
			button { min-height: 44px; margin-top: 20px; padding: 0 16px; border: 0; border-radius: 4px; background: var(--forest); color: #fff; font: inherit; font-weight: 700; cursor: pointer; }
			button[hidden], [hidden] { display: none; }
			@keyframes spin { to { transform: rotate(360deg); } }
			@media (prefers-reduced-motion: reduce) { .spinner { animation-duration: 2s; } }
		</style>
	</head>
	<body>
		<main aria-live="polite">
			<div class="brand"><span class="mark" aria-hidden="true">P</span> PLWinterCam</div>
			<div id="spinner" class="spinner" role="status" aria-label="Cargando"></div>
			<h1 id="title">Actualizando estaciones</h1>
			<p id="message">Consultando las cámaras de datos y guardando el parte más reciente. No cierres esta página.</p>
			<p id="summary" hidden></p>
			<ul id="results"></ul>
			<button id="retry" type="button" hidden>Reintentar carga</button>
		</main>
		<script>
			const spinner = document.querySelector('#spinner');
			const title = document.querySelector('#title');
			const message = document.querySelector('#message');
			const summary = document.querySelector('#summary');
			const results = document.querySelector('#results');
			const retry = document.querySelector('#retry');

			async function cargarEstaciones() {
				retry.hidden = true;
				spinner.hidden = false;
				summary.hidden = true;
				results.replaceChildren();
				title.textContent = 'Actualizando estaciones';
				message.textContent = 'Consultando el scraper y guardando los datos más recientes. No cierres esta página.';

				try {
					const response = await fetch('/auto-load', { method: 'POST' });
					const data = await response.json();
					if (!response.ok && response.status !== 207) {
						throw new Error(data.error || 'La petición no se pudo completar.');
					}

					spinner.hidden = true;
					summary.hidden = false;
					summary.textContent = data.success
						? 'Carga completada: ' + data.exitosas + ' de ' + data.procesadas + ' estaciones (' + Math.round(data.duracionMs / 1000) + ' s).'
						: 'Carga parcial: ' + data.exitosas + ' de ' + data.procesadas + ' estaciones guardadas.';
					title.textContent = data.success ? 'Todo actualizado' : 'La carga terminó con errores';
					message.textContent = data.success ? 'Los datos de las estaciones ya están al día.' : 'Revisa las estaciones que aparecen con error.';

					data.resultados.forEach((item) => {
						const row = document.createElement('li');
						const name = document.createElement('span');
						const status = document.createElement('span');
						name.textContent = item.slug;
						status.textContent = item.success ? 'Guardada' : (item.error || 'Error');
						status.className = item.success ? 'ok' : 'failed';
						row.append(name, status);
						results.append(row);
					});
					if (!data.success) retry.hidden = false;
				} catch (error) {
					spinner.hidden = true;
					title.textContent = 'No se pudo completar la carga';
					message.textContent = error instanceof Error ? error.message : 'Error de conexión. Inténtalo de nuevo.';
					retry.hidden = false;
				}
			}

			retry.addEventListener('click', cargarEstaciones);
			cargarEstaciones();
		</script>
	</body>
</html>`;

	return new Response(html, {
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			'Cache-Control': 'no-store'
		}
	});
};

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
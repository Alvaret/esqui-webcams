// Datos meteorológicos vía Open-Meteo (gratuito, sin API key).
// Una sola llamada por cycle con las 6 estaciones (la API acepta varias ubicaciones),
// con caché en memoria para no agotar la cuota gratuita en cada visita.

export const UMBRAL_NEVADA_CM = 1; // cm de nieve acumulada en un día para considerar "nevada prevista"

export interface DiaTiempo {
	/** Fecha ISO (YYYY-MM-DD) */
	fecha: string;
	/** Nieve prevista ese día, en cm */
	nieveCm: number;
	tempMax: number;
	tempMin: number;
	/** Código de condición meteorológica WMO de Open-Meteo */
	weathercode: number;
}

export interface TiempoEstacion {
	dias: DiaTiempo[];
	/** Nieve acumulada prevista en los próximos 14 días, en cm */
	nevadaTotalCm: number;
	/** true si algún día supera el umbral de nevada */
	nevadaPrevista: boolean;
	/** Fecha ISO del primer día con nevada, si la hay */
	primerDiaNevada: string | null;
	/** Nieve prevista el primer día de nevada, en cm */
	nievePrimerDiaCm: number;
}

// Coordenadas del dominio esquiable de cada estación (clave = clave de opciones.json)
export const UBICACIONES: Record<string, { lat: number; lon: number; elevation: number }> = {
	candanchu: { lat: 42.766, lon: -0.536, elevation: 2260 },
	'sierra-nevada': { lat: 37.07, lon: -3.38, elevation: 3398 },
	valdelinares: { lat: 40.281, lon: -0.529, elevation: 2160 },
	'boi-taull': { lat: 42.683, lon: 0.784, elevation: 2751 },
	astun: { lat: 42.786, lon: -0.52, elevation: 2300 },
	cauterets: { lat: 42.892, lon: -0.128, elevation: 2400 }
};

const TTL_MS = 15 * 60 * 1000; // Open-Meteo actualiza cada ~15 min

let cache: { datos: Record<string, TiempoEstacion>; expira: number } | null = null;

interface OpenMeteoDia {
	daily: {
		time: string[];
		snowfall_sum: (number | null)[];
		temperature_2m_max: (number | null)[];
		temperature_2m_min: (number | null)[];
		weathercode: (number | null)[];
	};
}

function normalizarEstacion(r: OpenMeteoDia): TiempoEstacion | null {
	const dias: DiaTiempo[] = [];
	const d = r?.daily;
	if (!d || !Array.isArray(d.time)) return null;

	for (let i = 0; i < d.time.length; i++) {
		const nieveCm = d.snowfall_sum?.[i] ?? 0;
		const tmax = d.temperature_2m_max?.[i];
		const tmin = d.temperature_2m_min?.[i];
		if (tmax == null || tmin == null) continue;
		dias.push({
			fecha: d.time[i],
			nieveCm: Math.round((nieveCm + Number.EPSILON) * 10) / 10,
			tempMax: Math.round(tmax),
			tempMin: Math.round(tmin),
			weathercode: d.weathercode?.[i] ?? 0
		});
	}
	if (dias.length === 0) return null;

	const clavesNevada = dias.filter((d) => d.nieveCm >= UMBRAL_NEVADA_CM);
	const nevadaTotalCm = Math.round(dias.reduce((acc, d) => acc + d.nieveCm, 0) * 10) / 10;
	return {
		dias,
		nevadaTotalCm,
		nevadaPrevista: clavesNevada.length > 0,
		primerDiaNevada: clavesNevada[0]?.fecha ?? null,
		nievePrimerDiaCm: clavesNevada[0]?.nieveCm ?? 0
	};
}

/**
 * Obtiene el pronóstico a 14 días de todas las estaciones.
 * Devuelve un mapa por clave de estación; una estación sin datos no aparece en el mapa.
 */
export async function obtenerTiempoEstaciones(): Promise<Record<string, TiempoEstacion>> {
	if (cache && Date.now() < cache.expira) return cache.datos;

	const claves = Object.keys(UBICACIONES);
	const latitudes = claves.map((c) => UBICACIONES[c].lat).join(',');
	const longitudes = claves.map((c) => UBICACIONES[c].lon).join(',');
	const elevations = claves.map((c) => UBICACIONES[c].elevation).join(',');
	const url =
		`https://api.open-meteo.com/v1/forecast?latitude=${latitudes}&longitude=${longitudes}&elevation=${elevations}` +
		`&daily=snowfall_sum,temperature_2m_max,temperature_2m_min,weathercode&forecast_days=14&timezone=Europe%2FMadrid`;

	let datos: Record<string, TiempoEstacion> = {};
	try {
		const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
		if (res.ok) {
			const json = (await res.json()) as OpenMeteoDia | OpenMeteoDia[];
			const respuestas = Array.isArray(json) ? json : [json];
			respuestas.forEach((r, i) => {
				const normalizado = normalizarEstacion(r);
				if (normalizado) datos[claves[i]] = normalizado;
			});
		} else {
			console.error(`Open-Meteo respondió ${res.status}:`, (await res.text()).slice(0, 300));
		}
	} catch (error) {
		console.error('Error al obtener el tiempo de las estaciones:', error);
	}

	// Si la llamada falla, conservamos datos previos caducados en lugar de mostrar nada
	if (Object.keys(datos).length === 0 && cache) {
		cache.expira = Date.now() + TTL_MS; // reintentamos más tarde igualmente
		return cache.datos;
	}

	cache = { datos, expira: Date.now() + TTL_MS };
	return datos;
}

/** Formatea una fecha ISO como día de la semana en español ("martes") */
export function formatearDiaSemana(fechaISO: string): string {
	const fecha = new Date(`${fechaISO}T12:00:00`);
	return fecha.toLocaleDateString('es-ES', { weekday: 'long' });
}

/** true si la fecha ISO es el día actual (Europe/Madrid) */
export function esHoy(fechaISO: string): boolean {
	const hoy = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
	return fechaISO === hoy;
}

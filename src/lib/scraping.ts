import { guardarEstacion } from './supabase';
import type { EstacionData } from './api';

interface ScrapingPayload {
	slug?: unknown;
	remontes?: unknown;
	kilometros?: unknown;
	nieve?: unknown;
	timestamp?: unknown;
}

function extraerValores(valor: unknown): [string | null, string | null] {
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
}

export async function guardarResultadoScraping(payload: ScrapingPayload) {
	if (typeof payload.slug !== 'string' || !payload.slug.trim()) {
		throw new Error('La respuesta del scraper no incluye un slug válido');
	}

	const [remontesAbiertos, remontesTotales] = extraerValores(payload.remontes);
	const [kilometrosAbiertos, kilometrosTotales] = extraerValores(payload.kilometros);
	const nieve = payload.nieve && typeof payload.nieve === 'object'
		? [
			(payload.nieve as { espesor?: unknown }).espesor,
			(payload.nieve as { unidad?: unknown }).unidad
		].filter(Boolean).join(' ') || null
		: typeof payload.nieve === 'string' ? payload.nieve : null;

	const estacion: EstacionData = {
		slug: payload.slug,
		remontes_abiertos: remontesAbiertos,
		remontes_totales: remontesTotales,
		kilometros_abiertos: kilometrosAbiertos,
		kilometros_totales: kilometrosTotales,
		nieve,
		timestamp: typeof payload.timestamp === 'string' ? payload.timestamp : new Date().toISOString()
	};

	return guardarEstacion(estacion);
}
import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderHead, l as renderComponent, n as renderScript } from '../chunks/astro/server_C9OXGjLV.mjs';
import 'piccolore';
import { o as opciones } from '../chunks/opciones_BIu4DXDX.mjs';
import 'clsx';
/* empty css                                 */
import { $ as $$FloatingCredit } from '../chunks/FloatingCredit_XenIU-Qr.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$OpcionCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$OpcionCard;
  const { clave, nombre, urlFoto, indice, webcams, altitudMinima, altitudMaxima } = Astro2.props;
  const nombreNormalizado = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/estacion/${clave}`, "href")} class="station-card" data-station-card${addAttribute(nombreNormalizado, "data-name")}> <span class="station-brand-plate"> <img${addAttribute(urlFoto, "src")} alt="" class="station-logo" loading="lazy"> </span> <span class="station-card-main"> <span class="station-card-kicker">ESTACIÓN <span>${String(indice).padStart(2, "0")}</span></span> <strong class="station-card-name">${nombre}</strong> <span class="station-card-meta">${altitudMinima}—${altitudMaxima} <span aria-hidden="true">·</span> ${webcams} cámaras</span> <span class="station-card-link">VER CÁMARAS <span aria-hidden="true">↗</span></span> </span> </a>`;
}, "/Users/ruizpo/Projects/esqui-webcams/src/components/OpcionCard/OpcionCard.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const estaciones = Object.entries(opciones);
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>PLWinterCam | Cámaras de montaña en directo</title><meta name="description" content="Cámaras de esquí en directo en estaciones de los Pirineos."><meta name="theme-color" content="#153d35"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="PLWinterCam"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><link rel="manifest" href="/manifest.webmanifest"><link rel="apple-touch-icon" sizes="180x180" href="/icons/plwintercam-180.png">${renderHead()}</head> <body class="page-home"> <header class="site-header"> <div class="site-header-inner"> <a class="brand" href="/" aria-label="PLWinterCam, inicio"> <span class="brand-mark" aria-hidden="true">P</span> <span class="brand-name">PLWinterCam</span> </a> <div class="header-status"><span class="signal-dot"></span>MONTAÑA EN DIRECTO</div> </div> </header> <main class="container"> <section class="directory-intro" aria-labelledby="page-title"> <p class="eyebrow"><span class="eyebrow-rule"></span>DIRECTORIO DE CÁMARAS <span class="eyebrow-divider">/</span> PIRINEOS</p> <h1 id="page-title">La montaña,<br>ahora.</h1> <p class="intro-copy">Consulta las condiciones y el ambiente en las estaciones, en tiempo real.</p> </section> <section class="station-directory" aria-label="Estaciones de esquí"> <div class="directory-toolbar"> <label class="search-field"> <span class="search-icon" aria-hidden="true"></span> <span class="visually-hidden">Buscar estación</span> <input id="station-search" type="search" placeholder="Buscar estación" autocomplete="off"> </label> <p id="station-count" class="station-count" aria-live="polite">${estaciones.length} ESTACIONES</p> </div> <div class="opciones-grid" id="station-grid"> ${estaciones.map(([clave, opcion], index) => renderTemplate`${renderComponent($$result, "OpcionCard", $$OpcionCard, { "clave": clave, "nombre": opcion.nombre, "urlFoto": opcion.urlFoto, "indice": index + 1, "webcams": opcion.webcams?.length ?? 0, "altitudMinima": opcion.altitudMinima, "altitudMaxima": opcion.altitudMaxima })}`)} </div> <p id="no-stations" class="no-stations" hidden>No hay estaciones con ese nombre.</p> </section> </main> ${renderComponent($$result, "FloatingCredit", $$FloatingCredit, {})} ${renderScript($$result, "/Users/ruizpo/Projects/esqui-webcams/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/ruizpo/Projects/esqui-webcams/src/pages/index.astro", void 0);

const $$file = "/Users/ruizpo/Projects/esqui-webcams/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

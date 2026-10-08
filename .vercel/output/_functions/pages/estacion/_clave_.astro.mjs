import { e as createComponent, f as createAstro, m as maybeRenderHead, r as renderTemplate, h as addAttribute, k as renderHead, l as renderComponent, n as renderScript } from '../../chunks/astro/server_C9OXGjLV.mjs';
import 'piccolore';
import { o as opciones } from '../../chunks/opciones_BIu4DXDX.mjs';
import 'clsx';
/* empty css                                      */
import { $ as $$FloatingCredit } from '../../chunks/FloatingCredit_XenIU-Qr.mjs';
import { o as obtenerEstacionPorSlug } from '../../chunks/supabase_BYvvEQHG.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$2 = createAstro();
const $$Webcam = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Webcam;
  const { nombre, link, descripcion, isVideo = false, isFeratel = false, isImage = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="webcam-item"> <div class="webcam-info"> <div class="webcam-title-row"> <span class="webcam-live-mark" aria-hidden="true"></span> <h3 class="webcam-nombre">${nombre}</h3> </div> ${descripcion && renderTemplate`<p class="webcam-descripcion">${descripcion}</p>`} </div> <div class="webcam-player"> ${isFeratel ? renderTemplate`<iframe${addAttribute(nombre, "title")} class="webcam-iframe" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" loading="lazy"${addAttribute(link, "src")}></iframe>` : isVideo ? renderTemplate`<video width="100%" height="300" autoplay muted loop playsinline class="webcam-video"> <source${addAttribute(link, "src")} type="video/mp4">
Tu navegador no soporta el elemento de video.
</video>` : isImage ? renderTemplate`<img${addAttribute(link, "src")}${addAttribute(nombre, "alt")} class="webcam-image" loading="lazy">` : renderTemplate`<iframe${addAttribute(nombre, "title")}${addAttribute(link, "src")} class="webcam-iframe" allow="autoplay; fullscreen; encrypted-media" allowfullscreen loading="lazy"></iframe>`} </div> </div>`;
}, "/Users/ruizpo/Projects/esqui-webcams/src/components/Webcam/Webcam.astro", void 0);

const $$Astro$1 = createAstro();
const $$InfoEstacion = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$InfoEstacion;
  const { data } = Astro2.props;
  const remontes = data.remontes_abiertos && data.remontes_totales ? `${data.remontes_abiertos}/${data.remontes_totales}` : "No disponible";
  const kilometros = data.kilometros_abiertos && data.kilometros_totales ? `${data.kilometros_abiertos}/${data.kilometros_totales} km` : "No disponible";
  const nieve = data.nieve || "No disponible";
  const fechaActualizacion = data.timestamp ? new Date(data.timestamp).toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }) : null;
  return renderTemplate`${maybeRenderHead()}<div class="datos" data-astro-cid-so4gzyfg> ${fechaActualizacion && renderTemplate`<div class="timestamp-header" data-astro-cid-so4gzyfg> <span class="icono-reloj" data-astro-cid-so4gzyfg>🕐</span> <span data-astro-cid-so4gzyfg>Última actualización: ${fechaActualizacion}</span> </div>`} <div class="dato-card" data-astro-cid-so4gzyfg> <div class="icono" data-astro-cid-so4gzyfg>🚡</div> <div class="contenido" data-astro-cid-so4gzyfg> <span class="label" data-astro-cid-so4gzyfg>Remontes</span> <span class="valor" data-astro-cid-so4gzyfg>${remontes}</span> </div> </div> <div class="dato-card" data-astro-cid-so4gzyfg> <div class="icono" data-astro-cid-so4gzyfg>⛷️</div> <div class="contenido" data-astro-cid-so4gzyfg> <span class="label" data-astro-cid-so4gzyfg>Kilómetros</span> <span class="valor" data-astro-cid-so4gzyfg>${kilometros}</span> </div> </div> <div class="dato-card" data-astro-cid-so4gzyfg> <div class="icono" data-astro-cid-so4gzyfg>❄️</div> <div class="contenido" data-astro-cid-so4gzyfg> <span class="label" data-astro-cid-so4gzyfg>Nieve</span> <span class="valor" data-astro-cid-so4gzyfg>${nieve}</span> </div> </div> </div> `;
}, "/Users/ruizpo/Projects/esqui-webcams/src/components/InfoEstacion/InfoEstacion.astro", void 0);

const $$Astro = createAstro();
function getStaticPaths() {
  return Object.keys(opciones).map((clave) => ({
    params: { clave }
  }));
}
const $$clave = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$clave;
  const { clave } = Astro2.params;
  const estacion = opciones[clave];
  if (!estacion) {
    return Astro2.redirect("/");
  }
  let datosAPI = null;
  try {
    datosAPI = await obtenerEstacionPorSlug(clave);
  } catch (error) {
    console.error(`Error al obtener datos de ${clave}:`, error);
  }
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${estacion.nombre} | PLWinterCam</title><meta name="description"${addAttribute(`C\xE1maras en directo e informaci\xF3n de ${estacion.nombre}.`, "content")}><meta name="theme-color" content="#153d35"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="PLWinterCam"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><link rel="manifest" href="/manifest.webmanifest"><link rel="apple-touch-icon" sizes="180x180" href="/icons/plwintercam-180.png">${renderHead()}</head> <body class="page-station"> <header class="site-header"> <div class="site-header-inner"> <a class="brand" href="/" aria-label="PLWinterCam, inicio"> <span class="brand-mark" aria-hidden="true">P</span> <span class="brand-name">PLWinterCam</span> </a> <a href="/" class="station-back"><span aria-hidden="true">←</span> ESTACIONES</a> </div> </header> <main class="container station-container"> <header class="station-heading"> <p class="eyebrow"><span class="eyebrow-rule"></span>ESTACIÓN DE MONTAÑA <span class="eyebrow-divider">/</span> PIRINEOS</p> <h1>${estacion.nombre}</h1> <p class="station-description">${estacion.descripcion}</p> <div class="station-heading-meta"> <span><span class="signal-dot"></span> ${estacion.webcams?.length ?? 0} CÁMARAS</span> <span>${estacion.altitudMinima}—${estacion.altitudMaxima}</span> </div> </header> ${datosAPI ? renderTemplate`<div class="datos-tiempo-real"> ${renderComponent($$result, "InfoEstacion", $$InfoEstacion, { "data": datosAPI })} </div>` : renderTemplate`<div class="datos-tiempo-real"> <div class="no-data-message"> <span class="no-data-mark" aria-hidden="true">i</span> <div> <h3>Parte de nieve no disponible</h3> <p>Consulta las cámaras para ver las condiciones actuales.</p> </div> </div> </div>`} ${estacion.webcams && estacion.webcams.length > 0 && renderTemplate`<div class="webcams-section"> <div class="section-heading"> <div> <p class="section-kicker">IMAGEN ACTUAL</p> <h2>Cámaras</h2> </div> <span class="section-count">${String(estacion.webcams.length).padStart(2, "0")} VISTAS</span> </div> <div class="webcams-list"> ${estacion.webcams.map((webcam) => renderTemplate`${renderComponent($$result, "Webcam", $$Webcam, { "nombre": webcam.nombre, "link": webcam.link, "descripcion": webcam.descripcion, "isVideo": webcam.isVideo || false, "isFeratel": webcam.isFeratel || false, "isImage": webcam.isImage || false })}`)} </div> </div>`} <div class="info-estacion"> <div class="section-heading"> <div> <p class="section-kicker">DATOS DE MONTAÑA</p> <h2>La estación</h2> </div> </div> <div class="info-grid"> <div class="info-item"> <span class="info-label">Altitud máxima</span> <span class="info-value">${estacion.altitudMaxima}</span> </div> <div class="info-item"> <span class="info-label">Altitud mínima</span> <span class="info-value">${estacion.altitudMinima}</span> </div> <div class="info-item"> <span class="info-label">Remontes</span> <span class="info-value">${estacion.remontes}</span> </div> <div class="info-item"> <span class="info-label">Pistas</span> <span class="info-value">${estacion.pistas}</span> </div> </div> </div> <div class="acciones"> <a${addAttribute(estacion.sitioWeb, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-primary">Web oficial <span aria-hidden="true">↗</span></a> <a href="/" class="btn btn-secondary">Todas las estaciones <span aria-hidden="true">→</span></a> </div> </main> ${renderComponent($$result, "FloatingCredit", $$FloatingCredit, {})} ${renderScript($$result, "/Users/ruizpo/Projects/esqui-webcams/src/pages/estacion/[clave].astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/ruizpo/Projects/esqui-webcams/src/pages/estacion/[clave].astro", void 0);

const $$file = "/Users/ruizpo/Projects/esqui-webcams/src/pages/estacion/[clave].astro";
const $$url = "/estacion/[clave]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$clave,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

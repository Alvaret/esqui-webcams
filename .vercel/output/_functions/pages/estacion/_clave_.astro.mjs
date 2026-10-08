import { e as createComponent, f as createAstro, m as maybeRenderHead, r as renderTemplate, h as addAttribute, k as renderHead, l as renderComponent } from '../../chunks/astro/server_W59XkHRe.mjs';
import 'piccolore';
import { o as opciones } from '../../chunks/opciones_B5toUabb.mjs';
import 'clsx';
/* empty css                                      */
import { $ as $$FloatingCredit } from '../../chunks/FloatingCredit_CjsAnivc.mjs';
import { o as obtenerEstacionPorSlug } from '../../chunks/supabase_DDG5FYTT.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$2 = createAstro();
const $$Webcam = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Webcam;
  const { nombre, link, descripcion, isVideo = false, isFeratel = false, isImage = false, isExternalLink = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="webcam-item"> <div class="webcam-info"> <div class="webcam-nombre">${nombre}</div> ${descripcion && renderTemplate`<div class="webcam-descripcion">${descripcion}</div>`} </div> <div class="webcam-player"> ${isExternalLink ? renderTemplate`<a class="webcam-external-link"${addAttribute(link, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(`Abrir c\xE1mara ${nombre} en el sitio oficial`, "aria-label")}>
Ver cámara oficial <span aria-hidden="true">↗</span> </a>` : isFeratel ? renderTemplate`<iframe${addAttribute(nombre, "title")} class="webcam-iframe" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" loading="lazy"${addAttribute(link, "src")}></iframe>` : isVideo ? renderTemplate`<video width="100%" height="300" autoplay muted loop playsinline class="webcam-video"> <source${addAttribute(link, "src")} type="video/mp4">
Tu navegador no soporta el elemento de video.
</video>` : isImage ? renderTemplate`<img${addAttribute(link, "src")}${addAttribute(nombre, "alt")} class="webcam-image" loading="lazy">` : renderTemplate`<iframe${addAttribute(link, "src")} width="100%" height="300" frameborder="0" allow="autoplay; encrypted-media" loading="lazy"></iframe>`} </div> </div>`;
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
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${estacion.nombre}</title>${renderHead()}</head> <body> <div class="container"> <div class="header-estacion"> <a href="/" class="btn-volver">← Volver</a> <h1>${estacion.nombre}</h1> <p>${estacion.descripcion}</p> </div> ${datosAPI ? renderTemplate`<div class="datos-tiempo-real"> ${renderComponent($$result, "InfoEstacion", $$InfoEstacion, { "data": datosAPI })} </div>` : renderTemplate`<div class="datos-tiempo-real"> <div class="no-data-message"> <div class="icono-alerta">⚠️</div> <h3>No hay datos disponibles</h3> <p>Aún no se han cargado datos para esta estación.</p> <p class="hint">Los administradores pueden cargar datos desde el panel de administración.</p> </div> </div>`} ${estacion.webcams && estacion.webcams.length > 0 && renderTemplate`<div class="webcams-section"> <h2>Webcams en vivo</h2> <div class="webcams-list"> ${estacion.webcams.map((webcam) => renderTemplate`${renderComponent($$result, "Webcam", $$Webcam, { "nombre": webcam.nombre, "link": webcam.link, "descripcion": webcam.descripcion, "isVideo": webcam.isVideo || false, "isFeratel": webcam.isFeratel || false, "isImage": webcam.isImage || false, "isExternalLink": webcam.isExternalLink || false })}`)} </div> </div>`} <div class="info-estacion"> <h2>Información de la estación</h2> <div class="info-grid"> <div class="info-item"> <span class="info-label">Altitud máxima</span> <span class="info-value">${estacion.altitudMaxima}</span> </div> <div class="info-item"> <span class="info-label">Altitud mínima</span> <span class="info-value">${estacion.altitudMinima}</span> </div> <div class="info-item"> <span class="info-label">Remontes</span> <span class="info-value">${estacion.remontes}</span> </div> <div class="info-item"> <span class="info-label">Pistas</span> <span class="info-value">${estacion.pistas}</span> </div> </div> </div> <div class="acciones"> <a${addAttribute(estacion.sitioWeb, "href")} target="_blank" class="btn btn-primary">Ir al sitio web</a> <a href="/" class="btn btn-secondary">Ver otras estaciones</a> </div> </div> ${renderComponent($$result, "FloatingCredit", $$FloatingCredit, {})} </body></html>`;
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

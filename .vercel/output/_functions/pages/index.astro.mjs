import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderHead, l as renderComponent } from '../chunks/astro/server_W59XkHRe.mjs';
import 'piccolore';
import { o as opciones } from '../chunks/opciones_B5toUabb.mjs';
import 'clsx';
/* empty css                                 */
import { $ as $$FloatingCredit } from '../chunks/FloatingCredit_CjsAnivc.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$OpcionCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$OpcionCard;
  const { clave, nombre, urlFoto } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/estacion/${clave}`, "href")} class="opcion-card"${addAttribute(`background-image: url('${urlFoto}')`, "style")}> <div class="opcion-overlay"></div> <div class="opcion-info"> <div class="opcion-nombre">${nombre}</div> </div> </a>`;
}, "/Users/ruizpo/Projects/esqui-webcams/src/components/OpcionCard/OpcionCard.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Esquí Webcams - Pl8</title>${renderHead()}</head> <body> <div class="container"> <div class="opciones-grid"> ${Object.entries(opciones).map(([clave, opcion]) => renderTemplate`${renderComponent($$result, "OpcionCard", $$OpcionCard, { "clave": clave, "nombre": opcion.nombre, "urlFoto": opcion.urlFoto })}`)} </div> </div> ${renderComponent($$result, "FloatingCredit", $$FloatingCredit, {})} </body></html>`;
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

import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CkDyvmgV.mjs';
import { manifest } from './manifest_H_VJYWJe.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/estacion-db/_slug_.astro.mjs');
const _page2 = () => import('./pages/api/estaciones.astro.mjs');
const _page3 = () => import('./pages/api/estaciones-db.astro.mjs');
const _page4 = () => import('./pages/estacion/_clave_.astro.mjs');
const _page5 = () => import('./pages/load-data.astro.mjs');
const _page6 = () => import('./pages/prueba.astro.mjs');
const _page7 = () => import('./pages/supabase-test.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/estacion-db/[slug].ts", _page1],
    ["src/pages/api/estaciones.ts", _page2],
    ["src/pages/api/estaciones-db.ts", _page3],
    ["src/pages/estacion/[clave].astro", _page4],
    ["src/pages/load-data.astro", _page5],
    ["src/pages/prueba.astro", _page6],
    ["src/pages/supabase-test.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "e811638e-61ab-4363-acc7-32703b4a2ec0",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };

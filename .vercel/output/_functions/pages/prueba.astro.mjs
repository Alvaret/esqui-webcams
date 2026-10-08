import { e as createComponent, f as createAstro, r as renderTemplate, o as defineScriptVars, k as renderHead, h as addAttribute } from '../chunks/astro/server_C9OXGjLV.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Prueba = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Prueba;
  const API_BASE = "https://api-esqui-scraping-production.up.railway.app";
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"', "><title>Prueba API - Sierra Nevada</title>", `</head> <body> <main> <div class="prueba-container"> <h1>\u{1F9EA} Prueba de API - Estaciones de Esqu\xED</h1> <p class="subtitle">Endpoints disponibles para las estaciones</p> <div class="endpoints-grid"> <!-- Sierra Nevada --> <div class="endpoint-card"> <h2>\u{1F3D4}\uFE0F Sierra Nevada</h2> <code class="endpoint-url">GET /estacion/sierra-nevada</code> <button onclick="testEndpoint('/estacion/sierra-nevada', 'result-sierra-nevada')">
Probar Endpoint
</button> <div id="result-sierra-nevada" class="result"></div> </div> <!-- Valdelinares --> <div class="endpoint-card"> <h2>\u26F0\uFE0F Valdelinares</h2> <code class="endpoint-url">GET /estacion/valdelinares</code> <button onclick="testEndpoint('/estacion/valdelinares', 'result-valdelinares')">
Probar Endpoint
</button> <div id="result-valdelinares" class="result"></div> </div> <!-- Candanch\xFA --> <div class="endpoint-card"> <h2>\u{1F3BF} Candanch\xFA</h2> <code class="endpoint-url">GET /estacion/candanchu</code> <button onclick="testEndpoint('/estacion/candanchu', 'result-candanchu')">
Probar Endpoint
</button> <div id="result-candanchu" class="result"></div> </div> <!-- Bo\xED Ta\xFCll --> <div class="endpoint-card"> <h2>\u{1F3D4}\uFE0F Bo\xED Ta\xFCll</h2> <code class="endpoint-url">GET /estacion/boi-taull</code> <button onclick="testEndpoint('/estacion/boi-taull', 'result-boi-taull')">
Probar Endpoint
</button> <div id="result-boi-taull" class="result"></div> </div> </div> <!-- Endpoint General --> <div class="general-section"> <h2>\u{1F4CA} Todas las Estaciones</h2> <div class="endpoint-card full-width"> <code class="endpoint-url">GET /estaciones</code> <button onclick="testEndpoint('/estaciones', 'result-all')">
Probar Endpoint
</button> <div id="result-all" class="result"></div> </div> </div> <!-- Test All --> <div class="test-all-section"> <button class="test-all-btn" onclick="testAllEndpoints()">
\u{1F680} Probar Todas las Estaciones
</button> </div> </div> </main> <div style="position: fixed; bottom: 24px; right: 24px; z-index: 999;"> <div style="display: flex; align-items: center; gap: 8px; padding: 12px 18px; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 50px; border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.5); font-size: 0.95rem; font-weight: 500; color: #333;"> <span style="font-weight: 400; opacity: 0.9;">By</span> <span style="font-weight: 700; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">PL8</span> <span style="font-size: 1.1rem;">\u2764\uFE0F</span> </div> </div> <script>(function(){`, "\n			window.testEndpoint = async function(path, resultId) {\n				const resultDiv = document.getElementById(resultId);\n				const url = `${API_BASE}${path}`;\n				\n				resultDiv.innerHTML = '<div class=\"loading\">\u23F3 Cargando...</div>';\n				resultDiv.classList.add('show');\n				\n				try {\n					const startTime = performance.now();\n					const response = await fetch(url);\n					const endTime = performance.now();\n					const data = await response.json();\n					\n					const responseTime = (endTime - startTime).toFixed(2);\n					\n					if (response.ok) {\n						resultDiv.innerHTML = `\n							<div class=\"success\">\n								<div class=\"status\">\u2705 ${response.status} OK (${responseTime}ms)</div>\n								<pre>${JSON.stringify(data, null, 2)}</pre>\n							</div>\n						`;\n					} else {\n						resultDiv.innerHTML = `\n							<div class=\"error\">\n								<div class=\"status\">\u274C Error ${response.status}</div>\n								<pre>${JSON.stringify(data, null, 2)}</pre>\n							</div>\n						`;\n					}\n				} catch (error) {\n					resultDiv.innerHTML = `\n						<div class=\"error\">\n							<div class=\"status\">\u274C Error de red</div>\n							<pre>${error.message}</pre>\n						</div>\n					`;\n				}\n			}\n\n			window.testAllEndpoints = async function() {\n				const endpoints = [\n					{ path: '/estacion/sierra-nevada', id: 'result-sierra-nevada' },\n					{ path: '/estacion/valdelinares', id: 'result-valdelinares' },\n					{ path: '/estacion/candanchu', id: 'result-candanchu' },\n					{ path: '/estacion/boi-taull', id: 'result-boi-taull' }\n				];\n\n				for (const endpoint of endpoints) {\n					await window.testEndpoint(endpoint.path, endpoint.id);\n					await new Promise(resolve => setTimeout(resolve, 500));\n				}\n			}\n		})();<\/script> </body> </html> "], ['<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"', "><title>Prueba API - Sierra Nevada</title>", `</head> <body> <main> <div class="prueba-container"> <h1>\u{1F9EA} Prueba de API - Estaciones de Esqu\xED</h1> <p class="subtitle">Endpoints disponibles para las estaciones</p> <div class="endpoints-grid"> <!-- Sierra Nevada --> <div class="endpoint-card"> <h2>\u{1F3D4}\uFE0F Sierra Nevada</h2> <code class="endpoint-url">GET /estacion/sierra-nevada</code> <button onclick="testEndpoint('/estacion/sierra-nevada', 'result-sierra-nevada')">
Probar Endpoint
</button> <div id="result-sierra-nevada" class="result"></div> </div> <!-- Valdelinares --> <div class="endpoint-card"> <h2>\u26F0\uFE0F Valdelinares</h2> <code class="endpoint-url">GET /estacion/valdelinares</code> <button onclick="testEndpoint('/estacion/valdelinares', 'result-valdelinares')">
Probar Endpoint
</button> <div id="result-valdelinares" class="result"></div> </div> <!-- Candanch\xFA --> <div class="endpoint-card"> <h2>\u{1F3BF} Candanch\xFA</h2> <code class="endpoint-url">GET /estacion/candanchu</code> <button onclick="testEndpoint('/estacion/candanchu', 'result-candanchu')">
Probar Endpoint
</button> <div id="result-candanchu" class="result"></div> </div> <!-- Bo\xED Ta\xFCll --> <div class="endpoint-card"> <h2>\u{1F3D4}\uFE0F Bo\xED Ta\xFCll</h2> <code class="endpoint-url">GET /estacion/boi-taull</code> <button onclick="testEndpoint('/estacion/boi-taull', 'result-boi-taull')">
Probar Endpoint
</button> <div id="result-boi-taull" class="result"></div> </div> </div> <!-- Endpoint General --> <div class="general-section"> <h2>\u{1F4CA} Todas las Estaciones</h2> <div class="endpoint-card full-width"> <code class="endpoint-url">GET /estaciones</code> <button onclick="testEndpoint('/estaciones', 'result-all')">
Probar Endpoint
</button> <div id="result-all" class="result"></div> </div> </div> <!-- Test All --> <div class="test-all-section"> <button class="test-all-btn" onclick="testAllEndpoints()">
\u{1F680} Probar Todas las Estaciones
</button> </div> </div> </main> <div style="position: fixed; bottom: 24px; right: 24px; z-index: 999;"> <div style="display: flex; align-items: center; gap: 8px; padding: 12px 18px; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 50px; border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.5); font-size: 0.95rem; font-weight: 500; color: #333;"> <span style="font-weight: 400; opacity: 0.9;">By</span> <span style="font-weight: 700; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">PL8</span> <span style="font-size: 1.1rem;">\u2764\uFE0F</span> </div> </div> <script>(function(){`, "\n			window.testEndpoint = async function(path, resultId) {\n				const resultDiv = document.getElementById(resultId);\n				const url = \\`\\${API_BASE}\\${path}\\`;\n				\n				resultDiv.innerHTML = '<div class=\"loading\">\u23F3 Cargando...</div>';\n				resultDiv.classList.add('show');\n				\n				try {\n					const startTime = performance.now();\n					const response = await fetch(url);\n					const endTime = performance.now();\n					const data = await response.json();\n					\n					const responseTime = (endTime - startTime).toFixed(2);\n					\n					if (response.ok) {\n						resultDiv.innerHTML = \\`\n							<div class=\"success\">\n								<div class=\"status\">\u2705 \\${response.status} OK (\\${responseTime}ms)</div>\n								<pre>\\${JSON.stringify(data, null, 2)}</pre>\n							</div>\n						\\`;\n					} else {\n						resultDiv.innerHTML = \\`\n							<div class=\"error\">\n								<div class=\"status\">\u274C Error \\${response.status}</div>\n								<pre>\\${JSON.stringify(data, null, 2)}</pre>\n							</div>\n						\\`;\n					}\n				} catch (error) {\n					resultDiv.innerHTML = \\`\n						<div class=\"error\">\n							<div class=\"status\">\u274C Error de red</div>\n							<pre>\\${error.message}</pre>\n						</div>\n					\\`;\n				}\n			}\n\n			window.testAllEndpoints = async function() {\n				const endpoints = [\n					{ path: '/estacion/sierra-nevada', id: 'result-sierra-nevada' },\n					{ path: '/estacion/valdelinares', id: 'result-valdelinares' },\n					{ path: '/estacion/candanchu', id: 'result-candanchu' },\n					{ path: '/estacion/boi-taull', id: 'result-boi-taull' }\n				];\n\n				for (const endpoint of endpoints) {\n					await window.testEndpoint(endpoint.path, endpoint.id);\n					await new Promise(resolve => setTimeout(resolve, 500));\n				}\n			}\n		})();<\/script> </body> </html> "])), addAttribute(Astro2.generator, "content"), renderHead(), defineScriptVars({ API_BASE }));
}, "/Users/ruizpo/Projects/esqui-webcams/src/pages/prueba.astro", void 0);

const $$file = "/Users/ruizpo/Projects/esqui-webcams/src/pages/prueba.astro";
const $$url = "/prueba";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Prueba,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

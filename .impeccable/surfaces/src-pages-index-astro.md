---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Surface brief — index.astro (directorio de estaciones)

## Scope and visitor mode
Home + tarjetas del directorio; modo Operar (el visitante llega a la cámara viva de una estación en el menor número de pasos). Mobile-first: 390×844 es el viewport canónico.

## Audience, job, action, proof, constraints
Esquiador pirenaico en móvil, quizá al aire libre o con mala conexión. Tarea: ver cómo está una estación ahora. Acción: abrir la tarjeta → página de estación → webcam. Prueba: cámaras reales oficiales y cotas reales de `opciones.json` (no se inventan datos). Constraints: datos generados pipeline-only; buscar/filtrar y aria-live intactos; PWA y service worker intactos; FloatingCredit y decisión de atribución sigue abierta.

## Chosen direction + memorable moment
`seed:ac5d1c13841c37b5` (referencia de la mano; producir de nuevo con `--from seed:ac5d1c13841c37b5 --candidate-count 7`). Form: dirección asignada nº 4 de la lista fundamentada — **Señalética de pistas**: cartelería de balizamiento (paneles de alto contraste, tinta indeleble, tipografía compacta tipo señal, chips de estado verde/ámbar/rojo como balizas de pistas). Momento memorable: la placa de cota bicolor de cada estación, a escala fija en línea base común, que compara cotas máximas de un vistazo como paneles de remonte. Señal de vida arriba: el estado EN DIRECTO vive en la cabecera, no al final.

## Unresolved decisions
- Atribución de imágenes (FloatingCredit) sin política; no se toca en este paso.

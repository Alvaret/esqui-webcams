---
name: PLWinterCam
description: Directorio móvil de webcams oficiales de estaciones de esquí del Pirineo, con lenguaje de señalética de pistas.
colors:
  ground: "#f2f0e9"
  panel: "#ffffff"
  ink: "#15130f"
  ink-soft: "#57534a"
  amber: "#f7b32b"
  amber-hover: "#ffd35e"
  signal-red: "#c23a1f"
  go-green: "#1b7a43"
  hairline: "#e4e1d6"
  seam: "rgba(21, 19, 15, 0.14)"
  placeholder: "#8a857a"
  webcam-bed: "#e9e6db"
typography:
  display:
    fontFamily: "'Archivo Black', sans-serif"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.01em"
  body:
    fontFamily: "'Archivo', sans-serif"
    fontWeight: 500
    lineHeight: 1.55
  label:
    fontFamily: "'Archivo', sans-serif"
    fontWeight: 700
    letterSpacing: "0.1em"
  value:
    fontFamily: "'Archivo', sans-serif"
    fontWeight: 800
    lineHeight: 1.1
rounded:
  card: "8px"
  plate: "6px"
  accent: "6px 6px 6px 0"
  chip: "5px"
  pill: "999px"
  media: "4px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "14px"
  lg: "30px"
  section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    typography: "{typography.label}"
    height: "48px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    typography: "{typography.label}"
    height: "48px"
  station-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  header-status:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    typography: "{typography.label}"
  closed-status:
    backgroundColor: "{colors.signal-red}"
    textColor: "#ffffff"
    rounded: "{rounded.card}"
---

# Design System: PLWinterCam

## Overview

**Creative North Star: "Señalética de pistas"**

La interfaz se comporta como la cartelería de balizamiento de una estación de esquí: paneles de alto contraste pintados sobre crema, tinta indeleble que enmarca todo, y balizas de estado (verde pistas abiertas, ámbar en directo, rojo estación cerrada). Cada elemento parece fabricado, no dibujado: bordes de 2px de tinta como el canto de una placa metálica, esquinas apenas redondeadas (8px), y sombras con offset que apoyan las placas sobre el terreno (`--ground`, #f2f0e9).

Es un sistema móvil-first, denso y compacto: tipografía tipo señal, pesos altos (500–800), etiquetas en versalitas con tracking amplio, y tamaños pequeños decididos (9–11px para etiquetas, 17–22px para valores). El momento firma es la **placa de cota bicolor** de cada tarjeta, a escala fija en línea base común, que permite comparar cotas máximas de un vistazo como paneles de remonte.

**Key Characteristics:**

- Paleta de cuatro notas: crema terreno, tinta indeleble, ámbar de acción, y dos balizas (verde/rojo).
- Todo lo interactivo lleva borde 2px tinta + radius 8px + sombra `0 2px 0` tinta al 22%.
- El estado EN DIRECTO vive en la cabecera, no al final de la página.
- Sin iconografía decorativa: solo SVG trazados a mano (stroke 1.6–2) y puntuales.
- Números en español: punto de millar (2.250), guion – entre cotas, coma decimal.

## Colors

Paleta de señalética: un terreno cálido neutro, una tinta casi negra que enmarca y tipografía-cola todo el texto, un ámbar operativo que señala acción, y verde/rojo solo como balizas de estado.

### Primary
- **Ámbar baliza** (#f7b32b): el color de acción. Chip EN DIRECTO de cabecera, botón primario "Web oficial", placa superior de la cota, placa del logo, subrayado del header (`border-bottom: 3px`), selección de texto, anillo de foco (`outline: 3px solid`). Hover tonal: #ffd35e.

### Secondary
- **Verde pistas abiertas** (#1b7a43): baliza positiva. Clavija circular del contador de cámaras (con texto blanco), punto EN DIRECTO de webcams y meta de cabecera, chip de condición "EN DIRECTO".

### Tertiary
- **Rojo señal** (#c23a1f): baliza de alerta. Punto de la baliza de cabecera, acento "ahora." del H1, y fondo del panel **Estación cerrada** (texto blanco, sello circular blanco con "!" en rojo).

### Neutral
- **Crema terreno** (#f2f0e9): fondo global de página (`html`/`body`). El terreno sobre el que se plantan las placas.
- **Blanco panel** (#ffffff): superficie de tarjetas, buscador y mensajes. La placa.
- **Tinta** (#15130f): bordes (2px), texto principal, header bar completo, banda inferior de la placa de cota. También `theme-color` de la PWA.
- **Tinta suave** (#57534a): texto secundario y descripciones (13–14px / 500).
- **Hairline** (#e4e1d6): reservado pero definido; las costuras reales usan `--seam`.
- **Seam** (rgba(21,19,15,0.14)): separadores de 1px entre filas de datos y mensajes nítidos.
- **Placeholder** (#8a857a): placeholder del buscador.
- **Lecho de webcam** (#e9e6db): fondo del reproductor mientras carga.

### Named Rules
**La Regla del Canto de Tinta.** Toda superficie interactiva o informativa se fabrica con borde de 2px sólido `--ink` y radius 8px. Sin borde no hay placa.

**La Regla de la Baliza Única.** Verde y rojo solo reportan estado (cámaras, directo, cerrada); nunca decoran ni se usan como color de interfaz. La acción es siempre ámbar.

## Typography

**Display Font:** Archivo Black (con fallback sans-serif), vía Google Fonts (`Archivo Black` + `Archivo:wght@500;600;700;800`).
**Body Font:** Archivo (500–800), fallback sans-serif.

**Character:** Una sola familia en dos cortes: Archivo Black para el grito de la señal (H1/H2, peso 400 — la Black ya es pesada) y Archivo con pesos altos para todo lo demás. Compacta, mineral, de placa pintada.

### Hierarchy
- **Display** (Archivo Black, 40px móvil / 56px ≥680px / 54px estación, line-height ~1): H1 de portada "La montaña, ahora." con "ahora." en rojo señal; H1 de estación.
- **Headline de sección** (Archivo Black, 26px, line-height 1.05): "Cámaras (n)", "La estación".
- **Title** (Archivo 800, 17–20px, line-height 1.1): nombre de estación en tarjeta, nombre de webcam.
- **Body** (Archivo 500, 11–15px, line-height 1.4–1.55, máx 420px intro / 560px descripción): texto de apoyo, en tinta suave.
- **Label** (Archivo 700–800, 8–11px, letter-spacing 0.06–0.14em, mayúsculas explícitas en el contenido): "COTA", "EN DIRECTO", contadores, etiquetas de datos.
- **Value** (Archivo 800, 19–23px, line-height ~1.1, `tabular-nums`): valores de la parte de nieve y ficha de estación.

### Named Rules
**La Regla Sin Kicker.** No hay eyebrows, kickers ni etiquetas introductorias sobre títulos. La señal empieza en el display.

## Layout

Mobile-first con viewport canónico 390×844. Contenedor fluido `min(100% - 32px, 1240px)` centrado (56px de gutura en ≥680px). Header fijo-semántico de ~58px de tinta con borde inferior ámbar de 3px; usa `env(safe-area-inset-*)` arriba y abajo.

Grillas por breakpoint:
- **<680px (móvil):** una columna. Directorio: tarjeta apilada por fila, gap 10px. Ficha: cámaras 1 col, ficha de estación 2 cols, acciones 2 botones a lo ancho.
- **≥680px:** 2 columnas de directorio y webcams; toolbar en 2 columnas (buscador máx 420px + contador); ficha de estación 4 cols; acciones en línea (botones min-width 174px).
- **≥1050px:** 3 columnas, gap 12px.

Ritmo: intro 30px padding-top móvil → 48px desktop; secciones separadas con `border-top: 2px solid --ink` o margen 26–30px; toolbar gap 8px; tarjetas gap 10px→12px. El contador usa `aria-live="polite"` y flexiona singular/plural en español.

## Elevation & Depth

Sombras neutrales derivadas de la tinta, siempre con offset y blur — el sistema nunca usa sombras difusas sin dirección ni glow coloreado.

### Shadow Vocabulary
- **Sombra de placa** (`--shadow-card`: `0 2px 0 rgba(21,19,15,0.22)`): estado de reposo de tarjetas, buscador, botones, panel cerrado. Sin blur: una pestaña sólida bajo el canto.
- **Sombra alzada** (`0 4px 0` tinta 22%): hover/focus de tarjeta y buscador (que además gana 1px de profundidad); `--shadow-float` (`0 4px 14px` + `0 1px 2px`, tinta 0.3/0.4) para el FloatingCredit flotante.

### Named Rules
**La Regla del Apoyo Sólido.** El hover de una placa la alza (translateY −2px) y engorda su apoyo de 2px a 4px. La profundidad se suma, nunca se difumina.

## Shapes

Idioma de formado: casi-cuadrado (radius 8px en placas grandes, 6px en la placa de cota y el FloatingCredit, 5px en el chip de cabecera, pill 999px solo para swatches/mini-chips, 4px para el marco del reproductor). Acento firma: **radius 6px 6px 6px 0** — esquina inferior izquierda en pico — en el brand-mark y el FloatingCredit, como chapa remachada. Bordes siempre 2px tinta (1px/hairline `--seam` solo como costura interna). Vectores de icono dibujados a mano inline, `stroke="currentColor"`, strokes de 1.6–2, tamaño 13–18px; nunca librerías de iconos ni fuentes de glifos.

## Components

### Header
- Barra completa en tinta (#15130f, `theme-color` igual), borde inferior ámbar 3px.
- Brand: marca cuadrada ámbar con "P" en Archivo Black y radius de chapa (6px 6px 6px 0); nombre en Archivo 800.
- Chip **EN DIRECTO** en cabecera: fondo ámbar, tinta, radius 5px, min-height 40px, label 10px/800/0.14em, con baliza de punto rojo de 7px. Hover tonal #ffd35e. En estación se sustituye por enlace de vuelta "← ESTACIONES" (ámbar únicamente en la flecha).
- Foco visible global: `outline: 3px solid --amber`, offset 2px.

### Placa de cota (firma)
- En cada tarjeta de estación: 58×72px, borde 2px tinta, radius 6px, bicolor vertical — ámbar hasta 76% de la altura, banda de tinta en el pie (`linear-gradient(to bottom, --amber 0 76%, --ink 76% 100%)`). Escala fija y línea base común en todas las tarjetas para comparar cotas de un vistazo. Etiqueta "COTA" (8px/800/0.14em) y valor (14px/800), ambos en tinta sobre ámbar.

### Clavija de cámaras
- Badge circular verde pistas (#1b7a43) con borde 2px tinta, 38px mínimo, número en blanco Archivo 800 (15px). Cuenta cámaras con `aria-label` singular/plural.

### Tarjetas (estación / webcam)
- **Shape:** radius 8px, borde 2px tinta, fondo blanco, padding 10–12px, gap 12–14px.
- **Shadow Strategy:** `--shadow-card` en reposo; hover `0 4px 0` + translateY(−2px) solo en tarjetas-enlace (la webcam usa `@media (hover: hover)` para no pegar estados fantasma en táctil).
- **Estructura:** enlace de tarjeta = placa + columna de texto (name Archivo 800 17px, meta 12px/600 tinta suave con cotas "1.800 – 2.250") + clavija.

### Buscador
- Campo de 48px de alto, borde 2px tinta, radius 8px, fondo blanco, `--shadow-card`; `:focus-within` engorda la sombra a `0 3px 0`. Lupa dibujada CSS (círculo 2px + mango rotado 45°). Placeholder #8a857a, texto 15px/600. El contador a la derecha (o debajo en móvil) es 11px/700/0.12em, aria-live polite.

### Chips de condición
- 11px/700/0.06em + swatch pill de 22×13px con borde 1.5px tinta y radio 999px: verde para "EN DIRECTO", ámbar para "SIN CÁMARA". Decorativos y `aria-hidden` (la verdad vive en los datos).

### Panel de estación cerrada
- Fondo rojo señal con borde 2px tinta, radius 8px, `--shadow-card`; sello circular blanco de 23px con "!" en rojo (800); título blanco 12px, cuerpo blanco al 92% 10px. `role="status"`.
- Variante sin datos: panel blanco, borde 1px seam, sello ámbar con "i" en Archivo Black.

### Parte de nieve (dato-cards)
- Tres columnas divididas por costuras de 1px `--seam` con regla superior; etiqueta 9–10px/700–800/0.08–0.1em tinta suave; valor 19–23px/800 `tabular-nums`; iconos SVG a mano de 18px en tinta. Cabecera de timestamp de 10px/600 con icono de reloj trazado en ámbar (stroke 1.8).

### Botones
- **Shape:** radius 8px, borde 2px tinta, `--shadow-card`, min-height 48px, padding 0 14px, label 13px/800, contenido justificado a ambos extremos con flecha/indicador (`↗`, `→`).
- **Primary:** fondo ámbar, texto tinta; hover #ffd35e.
- **Secondary:** transparente, texto tinta; hover lavado `rgba(21,19,15,0.06)`.

### FloatingCredit
- Chapa flotante fija abajo-derecha (insets de safe-area), ámbar, borde 2px tinta, radius 6px 6px 6px 0, `--shadow-float`, texto 11px con nombre en 800. Animación de entrada `slideIn` 0.35s ease-out. (Política de atribución aún abierta — no cambiar su patrón visual sin decidirla.)

### Movimiento
- Micro transiciones de estado: 0.15s ease-out en transform y sombra. `prefers-reduced-motion: reduce` apaga scroll suave y deja transiciones/animaciones a 0.01ms global.

## Do's and Don'ts

### Do:
- **Do** fabricar cada placa con borde 2px `--ink`, radius 8px y `--shadow-card` (`0 2px 0 rgba(21,19,15,0.22)`).
- **Do** usar ámbar solo para acción y foco; verde/rojo solo como balizas de estado.
- **Do** mantener los números en español: punto de millar (2.250), guion – entre cotas ("1.800 – 2.250"), coma decimal; `tabular-nums` en valores.
- **Do** dibujar iconos como SVG inline con `stroke="currentColor"` a 1.6–2; nada de librerías.
- **Do** mantener etiquetas pequeñas con carácter (8–11px, 700–800, tracking 0.06–0.14em) y el EN DIRECTO en la cabecera.
- **Do** mantener aria-live en el contador, `role="status"` en la estación cerrada y foco ámbar 3px visible.

### Don't:
- **Don't** usar eyebrows, kickers o pre-títulos sobre cualquier display.
- **Don't** usar gradient text, glass, blur de fondo ni sombras coloreadas/difusas sin dirección.
- **Don't** colorear interfaces con verde o rojo: son balizas, no tema.
- **Don't** inventar datos de estación ni azules/púrpuras genéricos; las cotas y cámaras vienen del pipeline (`opciones.json`).
- **Don't** romper la escala fija de la placa de cota: su alineación en línea base común es el momento firma.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Skiers and mountain visitors in the Pyrenees who check current snow and weather conditions — via live webcam images — before or while heading to a ski station.

## Product Purpose

PLWinterCam is a directory of live webcams from Pyrenean ski stations. It lets users see real-time mountain conditions and atmosphere at each station in one place, instead of visiting every station's official site. Success = fast, trustworthy view of "what's it like right now" for a chosen station.

## Positioning

A single Spanish-language, mobile-first directory aggregating live official station webcams across the Pyrenees, with direct per-station pages — a neighboring product cannot truthfully copy the aggregation of these specific official feeds with local context.

## Operating Context

- Used on mobile, likely on the move or in poor connectivity (the project ships as an installable PWA with service worker and manifest).
- Ski-season usage peaks; station data (altitude ranges, webcam lists) changes when stations update their sites.

## Capabilities and Constraints

- Data pipeline: a scraper deployed on Render extracts station data and webcam/image URLs from official station sites; `POST /auto-load` (public, in `src/pages/auto-load.ts`) ingests results into Supabase and can be triggered from GitHub Actions.
- `src/data/opciones.json` is generated station data: claves, names, photo URLs, altitudes, webcam lists. Treat it as pipeline output, not hand-edited content.
- Per-station detail pages at `/estacion/[clave]`; home page lists stations with search/filter.
- May only link to or embed what official sources permit; do not fabricate station information.

## Brand Commitments

- Name: **PLWinterCam** (used in header, PWA title, metadata).
- Voice: Spanish, concise, direct ("La montaña, ahora.").
- Domain: plwinter.pl8.es (scraper endpoint per README).

## Evidence on Hand

- Real generated data: `src/data/opciones.json` (stations, webcam URLs, altitudes).
- Logos and icons in `public/logos/` and `public/icons/`.
- No testimonials, user metrics, or press; none may be fabricated.

## Open Decisions

- Attribution/credit approach for webcam images and data from official stations is **undecided** (a `FloatingCredit` component exists; a durable policy should be set later).

## Product Principles

1. Realtime truth over marketing: show what the mountain looks like right now.
2. Reliable on mobile and weak connections.
3. Respect source stations — no invented data, no misleading claims.
4. Zero-friction access: reach a station's live view in the fewest steps.
5. Keep it a well-crafted personal utility; polish over scale.

## Accessibility & Inclusion

Spanish-first UI; maintain semantic HTML, `aria-live` for dynamic counts, and visually-hidden labels as present in the existing implementation.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev       # Development server at localhost:3000
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint
```

Requires Node.js >= 18.

## Architecture

Single-page hotel website built with **Next.js 15 App Router** (SSR). All content is composed on the home page (`src/app/page.tsx`) as a vertical stack of section components.

### Data Layer

All hotel data lives in `src/lib/constants.ts` as typed `const` exports: `HOTEL`, `NAV_LINKS`, `ROOMS`, `TESTIMONIALS`, `ATTRACTIONS`, `FACILITIES_IMAGES`. This is the single source of truth — components import directly from here. The `getWhatsAppLink(message)` helper builds WhatsApp URLs using the hotel's number.

### Component Composition

Layout (`src/app/layout.tsx`) renders: `ScrollProgress` → `Header` → `{children}` → `Footer` → `WhatsAppWidget` → `BackToTop`.

Page renders sections in order: `Hero` → `Experience` → `Rooms` → `Facilities` → `Testimonials` → `Discover`.

All components are client-side (`"use client"`) where interactivity is needed (forms, scroll animations, widgets).

### Animation System

Scroll-triggered animations use a custom `useScrollReveal` hook (Intersection Observer) in `src/hooks/useScrollReveal.ts`. Pattern:

```tsx
const { ref, isVisible } = useScrollReveal();
<div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
```

CSS classes in `globals.css`: `.reveal` (slide up), `.reveal-left`, `.reveal-right`, `.reveal-scale`, `.stagger-children`. The `useAnimatedCounter` hook animates numbers with cubic easing.

Extended Tailwind animations are defined in `tailwind.config.ts` keyframes (float, shimmer, glow, bounce-subtle, etc.).

### Design System

- **Colors**: `brand-gold` (#C8A45C), `brand-navy` (#1B2A4A), `brand-cream` (#FDF8F0) with light/dark variants in `tailwind.config.ts`
- **Fonts**: Inter (sans/body via `--font-inter`) + Playfair Display (display/headings via `--font-playfair`)
- **CSS utilities** in `globals.css` `@layer components`: `.btn-primary`, `.btn-secondary`, `.btn-outline-gold`, `.card`, `.glass`, `.glass-dark`, `.text-gradient-gold`, `.gold-line`, `.section-padding`, `.container-max`, `.heading-primary`, `.heading-secondary`

### SEO

`layout.tsx` exports Next.js `Metadata` object (OpenGraph, Twitter Cards, canonical URL) and injects JSON-LD schema (`Hotel` type with `GeoCoordinates`).

### Images

Currently using Unsplash URLs. Remote pattern allowed in `next.config.ts` for `images.unsplash.com` with WebP format optimization.

## Path Alias

`@/*` maps to `./src/*` (tsconfig.json). Always use `@/` imports.

## Conventions

- WhatsApp is the reservation channel — all CTAs use `getWhatsAppLink()` from constants
- New sections should use `.section-padding` + `.container-max` for layout and `.reveal` classes for scroll animations
- Brand color tokens (`brand-gold`, `brand-navy`, `brand-cream`) over raw hex values
- Data changes go in `constants.ts`, not hardcoded in components

## Skills

`.agents/skills/` contains reusable skills: `readme-generator`, `frontend-ui-architect`, `seo-master-mind`, `security-quality-guard`, `data-flow-manager`, `og-image-generator`, `skill-creator`.

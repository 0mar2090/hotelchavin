# Performance Engineer Memory - Hotel Chavin

## Key Findings (2026-02-12 Audit)

### Build Baseline
- First Load JS: 118 kB (page) + 102 kB shared = ~220 kB total
- Page is statically rendered (SSG) - good for TTFB
- HeroForm code-split chunk: ~81 kB (react-hook-form + zod + resolvers)

### Critical Issues Fixed
- Hero used CSS `background-image` for LCP element (bypassed next/image entirely) -> converted to `next/image` with `priority`
- All images (Rooms, Facilities, Discover) used raw `<img>` tags -> converted to `next/image` with proper `sizes` attributes
- Hero mousemove listener caused ~60fps re-renders via `useState` -> refactored to CSS custom properties via `ref.style.setProperty()` (zero re-renders)
- Form libraries (~90KB) loaded in Hero critical path -> code-split with `dynamic()` import

### Architecture Patterns
- Shared IntersectionObserver pattern in `useScrollReveal.ts` - module-level Maps cache observers by threshold+rootMargin key
- ScrollProgress uses direct DOM mutation (`ref.style.width`) instead of React state for scroll-driven animation
- Footer map iframe loaded only when visible via IntersectionObserver trigger (not just `loading="lazy"`)

### Image Optimization Config
- `next.config.ts` supports AVIF + WebP formats with 1-year cache TTL
- Preconnect hint for `images.unsplash.com` in layout.tsx `<head>`
- DNS-prefetch for Google Maps domains

### Files to Watch
- `src/components/Hero.tsx` - LCP element, parallax via CSS vars
- `src/components/HeroForm.tsx` - code-split form (ssr: false)
- `src/hooks/useScrollReveal.ts` - shared observer singleton pattern
- `src/components/ScrollProgress.tsx` - RAF-throttled, direct DOM mutation
- See [detailed audit notes](./audit-details.md)

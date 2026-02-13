# Detailed Performance Audit Notes

## Scroll Event Handling
- Three components listen to scroll: Header, ScrollProgress, BackToTop
- Header and ScrollProgress now use RAF throttling pattern
- BackToTop already had `{ passive: true }` but could benefit from RAF too (low priority)
- Pattern: `cancelAnimationFrame(rafId.current); rafId.current = requestAnimationFrame(() => { ... })`

## Animation System
- All CSS animations use GPU-friendly `transform` and `opacity` - no layout-triggering properties found
- `will-change` is NOT used anywhere, which is correct (avoid overuse)
- Float animations (6s infinite) run on decorative blurred elements - acceptable GPU cost
- stagger-children pattern uses CSS `transition-delay` - efficient

## lucide-react Impact
- Tree-shaken per-icon imports are used correctly throughout
- Estimated ~2-3KB per icon in production bundle
- Used in: Hero (7 icons), Experience (6), Rooms (3), Facilities (3), Testimonials (4), Discover (2), Header (4), Footer (4), WhatsApp (2), BackToTop (1)
- Total ~36 icon imports - acceptable, all tree-shaken

## Third-Party Bundle Analysis
- react-hook-form: ~30KB gzipped
- zod: ~13KB gzipped
- @hookform/resolvers: ~5KB gzipped
- These are now code-split into async chunk via HeroForm dynamic import

## CLS Considerations
- All images use `fill` with parent containers that have explicit height classes (h-56, h-52, aspect-[4/3])
- Font loading uses `display: swap` for both Inter and Playfair Display
- Mobile menu uses `max-h-0/max-h-96` transition - no layout shift

## Potential Future Optimizations
- Consider blur placeholder data URLs for hero image (would need build-time generation)
- BackToTop scroll handler could also use RAF throttling
- WhatsApp widget could be dynamically imported since it has a 4s delay anyway
- Consider `@next/bundle-analyzer` for ongoing bundle monitoring

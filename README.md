<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

# 🏨 Hotel Chavín – Barranca, Perú

Sitio web corporativo moderno para **Hotel Chavín**, diseñado para convertir visitantes en huéspedes a través de un flujo de reservas directo vía WhatsApp. Construido con Next.js 15, optimizado para SEO y rendimiento, con animaciones de scroll y un design system premium.

<p align="center">
  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&h=400&fit=crop" alt="Hotel Chavín Preview" width="100%" style="border-radius: 12px" />
</p>

## ✨ Features

- 🎯 **Reservas vía WhatsApp** – Formulario inteligente que envía datos del huésped directamente al chat del hotel
- 🏠 **Catálogo de habitaciones** – 4 tipos (Simple, Doble, Triple, Matrimonial) con CTAs contextuales
- 🖼️ **Galería con Lightbox** – Visualización ampliada de instalaciones con navegación por teclado
- ⭐ **Testimonios con carrusel** – Sección de reseñas con auto-play, navegación por dots, rating con estrellas y pausa al hover
- 📱 **Widget WhatsApp flotante** – Chat expandible con mensaje de bienvenida, siempre visible
- 🔝 **Botón Back to Top** – Botón flotante animado que aparece al hacer scroll, con transición suave
- 📊 **Barra de progreso de scroll** – Indicador visual con gradiente dorado en la parte superior de la página
- 🎬 **Animaciones de scroll reveal** – Efectos de entrada (fade, slide, scale, stagger) activados por Intersection Observer
- 🔢 **Contadores animados** – Números que se incrementan con easing cúbico al entrar en viewport
- 🔍 **SEO optimizado** – Meta tags, Open Graph, Twitter Cards, JSON-LD (Hotel + LocalBusiness)
- 🗺️ **Google Maps integrado** – Ubicación exacta embebida en el footer
- 🎨 **Design System corporativo** – Paleta dorada/navy con tipografía premium, efectos glass, gradientes y scrollbar personalizado
- 📐 **100% Responsive** – Mobile-first con menú hamburguesa animado
- ⚡ **Rendimiento** – SSR, lazy loading, compilación < 5s

## 🛠️ Tech Stack

| Categoría | Tecnología |
|-----------|-----------|
| Framework | Next.js 15 (App Router, SSR) |
| UI | React 19 + TypeScript 5 |
| Estilos | Tailwind CSS 3.4 + Design System personalizado |
| Formularios | React Hook Form + Zod |
| Iconos | Lucide React |
| Fuentes | Google Fonts (Inter, Playfair Display) |
| SEO | Metadata API + JSON-LD Schema.org |
| Animaciones | Intersection Observer + CSS Transitions + Custom Hooks |

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- npm

### Installation

```bash
git clone https://github.com/your-username/hotel-chavin.git
cd hotel-chavin
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + SEO + JSON-LD + ScrollProgress + BackToTop
│   ├── page.tsx            # Composición de secciones
│   └── globals.css         # Design system (tokens, components, animaciones)
├── components/
│   ├── Header.tsx          # Nav sticky con scroll transitions
│   ├── Hero.tsx            # Hero + formulario reservas → WhatsApp
│   ├── Experience.tsx      # Propuesta de valor + amenidades
│   ├── Rooms.tsx           # Catálogo 4 habitaciones
│   ├── Facilities.tsx      # Instalaciones + galería lightbox
│   ├── Testimonials.tsx    # Carrusel de testimonios con auto-play
│   ├── Discover.tsx        # Atractivos turísticos cercanos
│   ├── Footer.tsx          # 3 columnas + Google Maps
│   ├── WhatsAppWidget.tsx  # Chat flotante expandible
│   ├── ScrollProgress.tsx  # Barra de progreso de scroll
│   └── BackToTop.tsx       # Botón flotante volver arriba
├── hooks/
│   └── useScrollReveal.ts  # Hook de scroll reveal + contador animado
└── lib/
    └── constants.ts        # Datos centralizados (hotel, rooms, testimonials)
```

## 📜 Scripts

| Comando | Descripción |
|---------|------------|
| `npm run dev` | Servidor de desarrollo (localhost:3000) |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Linting con ESLint |

## 🎬 Sistema de Animaciones

El sitio incluye un sistema completo de animaciones basado en Intersection Observer:

| Clase CSS | Efecto |
|-----------|--------|
| `.reveal` | Fade in + slide up (40px) |
| `.reveal-left` | Slide desde la izquierda (60px) |
| `.reveal-right` | Slide desde la derecha (60px) |
| `.reveal-scale` | Scale in (0.85 → 1) |
| `.stagger-children` | Animación secuencial de hijos (100ms delay) |

### Custom Hooks

```typescript
// Scroll reveal con Intersection Observer
const { ref, isVisible } = useScrollReveal({
  threshold: 0.15,
  rootMargin: "0px 0px -60px 0px",
  once: true,
});

// Contador animado con easing cúbico
const count = useAnimatedCounter(72, isVisible, 2000);
```

### Animaciones Tailwind extendidas

`float`, `shimmer`, `glow`, `bounce-subtle`, `pulse-soft`, `spin-slow`, `marquee`, `scale-in`, `slide-up`, `slide-down`

## 🎨 Design System

### Paleta de colores

| Token | Color | Uso |
|-------|-------|-----|
| `brand-gold` | `#C8A45C` | Acentos, CTAs, decoraciones |
| `brand-gold-light` | `#E8D5A3` | Gradientes, hover states |
| `brand-gold-dark` | `#A67C3D` | Contraste, sombras |
| `brand-navy` | `#1B2A4A` | Texto principal, headers |
| `brand-navy-dark` | `#0F1A30` | Fondos oscuros, footer |
| `brand-cream` | `#FDF8F0` | Fondos claros, secciones alternas |

### Componentes CSS utilitarios

- `.glass` / `.glass-dark` – Efecto glassmorphism con backdrop-blur
- `.text-gradient-gold` – Texto con gradiente dorado
- `.gold-line` / `.gold-line-center` – Líneas decorativas doradas
- `.btn-primary` / `.btn-secondary` / `.btn-outline-gold` – Botones con transiciones
- `.card` – Cards con hover elevado y sombras

## 🔄 Flujo de Conversión

```mermaid
graph LR
    A[Usuario llega al sitio] --> B{¿Qué hace?}
    B --> C[Llena formulario Hero]
    B --> D[Explora habitaciones]
    B --> E[Lee testimonios]
    C --> F[Click: Enviar consulta]
    D --> G[Click: Reservar habitación]
    E --> G
    F --> H[WhatsApp con datos completos]
    G --> H
    H --> I[Conversación directa con hotel]
    I --> J[Reserva confirmada ✅]
```

## ⚙️ Configuration

### Datos del Hotel

Todos los datos se configuran en [`src/lib/constants.ts`](src/lib/constants.ts):

```typescript
export const HOTEL = {
  name: "Hotel Chavín",
  phone: "01-235-2253",
  email: "info@hotelchavin.com.pe",
  whatsapp: "51977819019",
  address: "Av. José Gálvez, 222. Barranca",
  // ...
};
```

### Testimonios

```typescript
export const TESTIMONIALS = [
  {
    id: "1",
    name: "María García",
    origin: "Lima, Perú",
    rating: 5,
    text: "Excelente atención y ubicación perfecta...",
    date: "Enero 2026",
  },
  // ...
];
```

### Imágenes

Reemplazar las URLs de Unsplash en `constants.ts` por las fotos reales del hotel:

```typescript
export const ROOMS = [
  {
    id: "simple",
    name: "Habitación Simple",
    image: "/images/room-simple.jpg", // ← tu imagen real
    // ...
  },
];
```

## 🌐 SEO

El sitio incluye optimización SEO completa:

- **Meta tags** dinámicos con `Metadata` API de Next.js
- **Open Graph** para previews en Facebook, LinkedIn
- **Twitter Cards** para previews en X/Twitter
- **JSON-LD** con schema `Hotel` y `LocalBusiness`
- **Keywords** orientadas a "hotel en barranca", "hotel cerca de caral"
- **HTML semántico** con headings jerárquicos

## 🚢 Deploy

### Vercel (recomendado)

```bash
npx vercel --prod
```

### Variables de entorno (opcional)

```env
# Si se agrega backend/CRM en el futuro
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
```

## 🤝 Contributing

1. Fork el repositorio
2. Crea tu feature branch (`git checkout -b feature/nueva-seccion`)
3. Commit tus cambios (`git commit -m 'Add: nueva sección'`)
4. Push al branch (`git push origin feature/nueva-seccion`)
5. Abre un Pull Request

## 📄 License

MIT License – ver [LICENSE](LICENSE) para más detalles.

---

<p align="center">
  Desarrollado con ❤️ por <strong>Francis Dev</strong>
</p>

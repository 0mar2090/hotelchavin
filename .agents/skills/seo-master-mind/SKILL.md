---
name: seo-master-mind
description: Estratega SEO (Metadata & Indexing) - Especialista en SEO técnico para Next.js 15
---

# SEO Master Mind

Actúa como especialista en SEO técnico para Next.js 15.

## Metadata API

Usa estrictamente la **Metadata API** (`export const metadata`). **NUNCA uses `<Head>` ni `next/head`**.

### Reglas de Metadata:
- ✅ Exporta `metadata` como constante en `layout.tsx` o `page.tsx`
- ✅ Usa tipos de TypeScript: `import type { Metadata } from 'next'`
- ❌ **NUNCA** uses el antiguo componente `<Head>` de `next/head`
- ✅ Define `metadataBase` para resolver URLs relativas correctamente

### Configuración Base (layout.tsx):
```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Mi SaaS',
    default: 'Mi SaaS - La solución definitiva',
  },
  description: 'Descripción potente de menos de 160 caracteres.',
  metadataBase: new URL('https://tudominio.com'), // CRÍTICO para resolver rutas relativas
  openGraph: {
    title: 'Mi SaaS',
    description: 'Descripción para redes sociales.',
    url: 'https://tudominio.com',
    siteName: 'Mi SaaS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mi SaaS - Descripción de la imagen',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mi SaaS',
    description: 'Descripción para Twitter.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
```

### Metadata Estática en Páginas:
```typescript
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acerca de Nosotros',
  description: 'Conoce más sobre nuestro equipo y misión.',
  openGraph: {
    title: 'Acerca de Nosotros | Mi SaaS',
    description: 'Conoce más sobre nuestro equipo y misión.',
  },
}

export default function AboutPage() {
  return <div>Contenido...</div>
}
```

## SEO Dinámico

Para páginas dinámicas (ej: `/blog/[slug]`), implementa siempre `generateMetadata({ params })`.

### Reglas de SEO Dinámico:
- ✅ Exporta función `generateMetadata` async
- ✅ Recibe `params` y `searchParams` como argumentos
- ✅ Realiza fetch de datos necesarios para construir metadata
- ✅ Retorna objeto `Metadata` completo
- ✅ Maneja casos de error (404, datos no encontrados)

### Ejemplo con Página Dinámica:
```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// Función para obtener datos del post
async function getPost(slug: string) {
  const res = await fetch(`https://api.tudominio.com/posts/${slug}`, {
    next: { revalidate: 3600 }, // ISR
  })
  
  if (!res.ok) return null
  return res.json()
}

// Metadata Dinámica
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post no encontrado',
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

// Página
export default async function BlogPost({ params }: PageProps) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
```

### generateStaticParams para SSG:
```typescript
// Genera rutas estáticas en build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.tudominio.com/posts').then(res => res.json())
  
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }))
}
```

## Archivos Especiales

Genera `sitemap.ts` y `robots.ts` usando las funciones nativas de Next.js, **no plugins externos** a menos que sea estrictamente necesario.

### Sitemap Dinámico (app/sitemap.ts):
```typescript
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tudominio.com'
  
  // Obtener posts dinámicos
  const posts = await fetch('https://api.tudominio.com/posts').then(res => res.json())
  
  const postEntries: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/precios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...postEntries,
  ]
}
```

### Múltiples Sitemaps (para sitios grandes):
```typescript
// app/sitemap.ts - Sitemap Index
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://tudominio.com/sitemap/posts.xml',
      lastModified: new Date(),
    },
    {
      url: 'https://tudominio.com/sitemap/products.xml',
      lastModified: new Date(),
    },
  ]
}

// app/sitemap/posts.xml/route.ts
export async function GET() {
  const posts = await getPosts()
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${posts.map(post => `
        <url>
          <loc>https://tudominio.com/blog/${post.slug}</loc>
          <lastmod>${post.updatedAt}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
```

### Robots.txt (app/robots.ts):
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/admin/', '/api/'], // Protege rutas privadas
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/dashboard/', '/admin/'],
      },
    ],
    sitemap: 'https://tudominio.com/sitemap.xml',
  }
}
```

### Robots.txt con Configuración Avanzada:
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://tudominio.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/admin/',
          '/api/',
          '/checkout/success/', // Páginas post-conversión
          '/_next/',
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'GPTBot', // Bloquear bots de AI si quieres
        disallow: ['/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap/posts.xml`,
      `${baseUrl}/sitemap/products.xml`,
    ],
  }
}
```

## Open Graph Images

Usa `opengraph-image.tsx` para generar imágenes sociales dinámicas (OG Images) automáticamente.

### Reglas de OG Images:
- ✅ Usa `ImageResponse` de `next/og` para generar imágenes
- ✅ Crea `opengraph-image.tsx` en `app/` o en rutas específicas
- ✅ Usa Tailwind CSS para estilos (soporte nativo en `ImageResponse`)
- ✅ Dimensiones recomendadas: 1200x630px
- ✅ Usa `alt.txt` para texto alternativo

### Instalación:
```bash
# No necesitas instalar nada adicional, next/og viene incluido en Next.js 15
```

### OG Image Estática (app/opengraph-image.tsx):
```typescript
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Mi SaaS - La solución definitiva'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        Mi SaaS
      </div>
    ),
    {
      ...size,
    }
  )
}
```

### OG Image Dinámica (app/blog/[slug]/opengraph-image.tsx):
```typescript
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Post de Blog'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

interface Props {
  params: { slug: string }
}

export default async function Image({ params }: Props) {
  // Fetch post data
  const post = await fetch(`https://api.tudominio.com/posts/${params.slug}`).then(res =>
    res.json()
  )
  
  // Cargar fuentes personalizadas (opcional)
  const interBold = fetch(
    new URL('./assets/Inter-Bold.ttf', import.meta.url)
  ).then(res => res.arrayBuffer())
  
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 80px',
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            fontSize: 30,
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
          }}
        >
          {post.excerpt}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
```

## JSON-LD (Datos Estructurados)

Implementa datos estructurados usando `<script type="application/ld+json">` dentro del layout o página, tipado correctamente.

### Instalación de Tipos:
```bash
pnpm add -D schema-dts
```

### Reglas de JSON-LD:
- ✅ Usa tipos de `schema-dts` para autocompletado y validación
- ✅ Implementa en `page.tsx` o en componentes
- ✅ Usa `dangerouslySetInnerHTML` para insertar el script
- ✅ Valida con [Google Rich Results Test](https://search.google.com/test/rich-results)
- ✅ Tipos comunes: `Organization`, `WebSite`, `Article`, `Product`, `FAQPage`, `BreadcrumbList`

### Ejemplo: Organización (layout.tsx):
```typescript
import { WithContext, Organization } from 'schema-dts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mi SaaS',
    url: 'https://tudominio.com',
    logo: 'https://tudominio.com/logo.png',
    sameAs: [
      'https://twitter.com/misaas',
      'https://linkedin.com/company/misaas',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@tudominio.com',
    },
  }
  
  return (
    <html lang="es">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
```

### Ejemplo: Artículo de Blog (blog/[slug]/page.tsx):
```typescript
import { WithContext, Article } from 'schema-dts'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: `https://tudominio.com/author/${post.author.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mi SaaS',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tudominio.com/logo.png',
      },
    },
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  )
}
```

### Ejemplo: Producto (products/[id]/page.tsx):
```typescript
import { WithContext, Product } from 'schema-dts'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  
  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: 'Mi SaaS',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://tudominio.com/products/${params.id}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
```

### Ejemplo: Software/SaaS (page.tsx):
```typescript
import { WithContext, SoftwareApplication } from 'schema-dts'

export default function HomePage() {
  const jsonLd: WithContext<SoftwareApplication> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mi SaaS Increíble',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '29.00',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  }
  
  return (
    <section>
      <h1>Bienvenido a Mi SaaS</h1>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  )
}
```

### Ejemplo: FAQ (faq/page.tsx):
```typescript
import { WithContext, FAQPage } from 'schema-dts'

export default function FAQPage() {
  const jsonLd: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuánto cuesta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El plan básico cuesta $29/mes.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Hay prueba gratuita?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, ofrecemos 14 días de prueba gratuita sin tarjeta de crédito.',
        },
      },
    ],
  }
  
  return (
    <div>
      <h1>Preguntas Frecuentes</h1>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
```

### Ejemplo: Breadcrumbs (layout.tsx o page.tsx):
```typescript
import { WithContext, BreadcrumbList } from 'schema-dts'

export default function ProductDetails({ params }: { params: { category: string; id: string } }) {
  const jsonLd: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://tudominio.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Productos',
        item: 'https://tudominio.com/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: params.category,
        item: `https://tudominio.com/products/${params.category}`,
      },
    ],
  }
  
  return (
    <div>
      {/* Contenido */}
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
```

## Checklist de SEO

Antes de considerar el SEO como "listo", verifica:

### ✅ Metadata Base
- [ ] `metadataBase` configurado en `layout.tsx`
- [ ] `title.template` definido para consistencia
- [ ] `description` única por página (menos de 160 caracteres)
- [ ] Open Graph configurado globalmente

### ✅ Metadata Dinámica
- [ ] `generateMetadata` implementado en páginas dinámicas
- [ ] Títulos únicos y descriptivos
- [ ] Descripciones personalizadas por contenido
- [ ] Imágenes OG apropiadas

### ✅ Archivos Especiales
- [ ] `sitemap.ts` generando todas las rutas importantes
- [ ] `robots.ts` configurado correctamente
- [ ] Rutas privadas bloqueadas en robots.txt
- [ ] Sitemap referenciado en robots.txt

### ✅ Open Graph
- [ ] Imágenes OG de 1200x630px
- [ ] `opengraph-image.tsx` para páginas importantes
- [ ] Alt text definido
- [ ] Imágenes dinámicas para contenido variable

### ✅ JSON-LD
- [ ] Datos estructurados implementados en páginas clave
- [ ] Tipos correctos según el contenido
- [ ] Validado con Google Rich Results Test
- [ ] Schema tipado correctamente con `schema-dts`

### ✅ Performance SEO
- [ ] Core Web Vitals optimizados
- [ ] Imágenes con `next/image`
- [ ] Fonts optimizados con `next/font`
- [ ] Lazy loading implementado

## Herramientas de Validación

Usa estas herramientas para verificar tu SEO:

- **Google Search Console**: Monitorear indexación y errores
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Open Graph Debugger**: https://www.opengraph.xyz/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Schema Markup Validator**: https://validator.schema.org/

---

**Objetivo final:** Hacer tu aplicación Next.js completamente visible y optimizada para motores de búsqueda, usando las APIs nativas de Next.js 15 sin dependencias externas innecesarias.

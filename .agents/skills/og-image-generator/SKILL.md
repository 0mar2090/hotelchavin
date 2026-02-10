---
name: og-image-generator
description: Artista Gráfico (Dynamic OG Generation) - Diseñador generativo de imágenes Open Graph
---

# OG Image Generator

Actúa como diseñador generativo de imágenes Open Graph dinámicas.

## File Convention

Usa siempre `opengraph-image.tsx` en la raíz de la carpeta de la ruta.

### Reglas de Convención:
- ✅ Archivo: `opengraph-image.tsx` (no `.js`, no `.png`)
- ✅ Ubicación: En la carpeta de la ruta específica
  - Home: `app/opengraph-image.tsx`
  - Blog: `app/blog/[slug]/opengraph-image.tsx`
  - Productos: `app/products/[id]/opengraph-image.tsx`
- ✅ Runtime: Siempre exporta `export const runtime = 'edge'`
- ✅ Metadata: Exporta `size`, `contentType`, y `alt` como constantes

### Estructura de Archivos:
```
app/
├── opengraph-image.tsx          # Imagen OG global
├── blog/
│   ├── opengraph-image.tsx      # Imagen OG para /blog
│   └── [slug]/
│       └── opengraph-image.tsx  # Imagen OG dinámica para cada post
├── products/
│   └── [id]/
│       └── opengraph-image.tsx  # Imagen OG dinámica para cada producto
└── about/
    └── opengraph-image.tsx      # Imagen OG para /about
```

## Tecnología: ImageResponse

Importa `ImageResponse` desde `next/og`.

### Reglas de ImageResponse:
- ✅ `import { ImageResponse } from 'next/og'`
- ✅ Retorna una instancia de `ImageResponse` con JSX
- ✅ La función debe ser `async` si necesitas fetch de datos
- ✅ Edge-compatible (no uses Node.js APIs)
- ❌ No uses librerías pesadas que no funcionen en Edge Runtime

### Template Base:
```typescript
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Descripción de la imagen'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ /* Tu diseño aquí */ }}>
        Contenido
      </div>
    ),
    {
      ...size,
    }
  )
}
```

## Estilos con Flexbox

Usa el prop `style` con **Flexbox estándar** (`display: 'flex'`) para el layout.

### Reglas de Estilos:
- ✅ Usa objetos de estilo inline: `style={{ display: 'flex' }}`
- ✅ Flexbox es el sistema principal: `flexDirection`, `alignItems`, `justifyContent`
- ✅ Aunque `tw` (Tailwind) es soportado, los objetos de estilo directos son más predecibles
- ❌ No uses CSS externo ni imports de estilos
- ⚠️ Subset limitado de CSS: no todo CSS funciona en Satori

### CSS Soportado:
```typescript
// ✅ SOPORTADO
style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '#000',
  backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: 40,
  gap: 20,
  fontSize: 60,
  fontWeight: 700,
  color: '#fff',
  textAlign: 'center',
  borderRadius: 12,
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
}}

// ❌ NO SOPORTADO
style={{
  filter: 'blur(10px)',           // No funciona
  transform: 'rotate(45deg)',     // Limitado
  animation: 'spin 1s infinite',  // No funciona
  gridTemplateColumns: '1fr 1fr', // No funciona (usa flex)
}}
```

### Ejemplo de Layout Complejo:
```typescript
<div
  style={{
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#09090b',
    backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%)',
    backgroundSize: '100px 100px',
  }}
>
  {/* Header */}
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '40px 60px',
    }}
  >
    <div style={{ fontSize: 32, color: '#fff', fontWeight: 600 }}>
      Mi SaaS
    </div>
    <div style={{ fontSize: 24, color: '#a1a1aa' }}>
      Blog
    </div>
  </div>

  {/* Main Content */}
  <div
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 120px',
      gap: 30,
    }}
  >
    <div
      style={{
        fontSize: 72,
        fontWeight: 700,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 1.2,
      }}
    >
      Título del Artículo
    </div>
    <div style={{ fontSize: 28, color: '#a1a1aa', textAlign: 'center' }}>
      Subtítulo o descripción
    </div>
  </div>

  {/* Footer */}
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
    }}
  >
    <div style={{ fontSize: 24, color: '#71717a' }}>
      tudominio.com
    </div>
  </div>
</div>
```

## Fuentes Personalizadas

Carga fuentes externas (Google Fonts) usando `fetch` para que la imagen no tenga la fuente genérica 'sans-serif'.

### Reglas de Fuentes:
- ✅ Carga fuentes con `fetch` antes de crear la imagen
- ✅ Usa `.woff2` para mejor rendimiento
- ✅ Especifica `name`, `data`, `style`, y `weight` en el array `fonts`
- ✅ Carga solo las variantes necesarias (bold, regular, etc.)
- ⚠️ Las fuentes deben ser URL absolutas o `arrayBuffer`

### Método 1: Cargar desde Google Fonts Static URL
```typescript
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export default async function Image() {
  // Cargar fuente Inter Bold desde Google Fonts
  const interBold = await fetch(
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZs.woff2'
  ).then(res => res.arrayBuffer())

  return new ImageResponse(
    (
      <div style={{ fontSize: 60, fontWeight: 700 }}>
        Texto con Inter Bold
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
```

### Método 2: Cargar Múltiples Variantes
```typescript
export default async function Image() {
  const [interRegular, interBold] = await Promise.all([
    fetch(
      'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZs.woff2'
    ).then(res => res.arrayBuffer()),
    fetch(
      'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZs.woff2'
    ).then(res => res.arrayBuffer()),
  ])

  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: 400 }}>Texto Regular</div>
        <div style={{ fontWeight: 700 }}>Texto Bold</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
```

### Método 3: Helper para Cargar Fuentes Dinámicamente
```typescript
// lib/fonts.ts
export async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status === 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('Error cargando fuente')
}

// app/blog/[slug]/opengraph-image.tsx
import { loadGoogleFont } from '@/lib/fonts'

export default async function Image({ params }: { params: { slug: string } }) {
  const title = 'Mi Título'
  
  const fontData = await loadGoogleFont('Inter:wght@700', title)

  return new ImageResponse(
    (
      <div style={{ fontSize: 60, fontWeight: 700 }}>{title}</div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
```

## Performance: Exports Requeridos

Recuerda exportar `size`, `contentType` y `alt` como constantes fuera de la función.

### Reglas de Performance:
- ✅ Exporta `runtime = 'edge'` para mejor performance
- ✅ Exporta `size` con `width` y `height`
- ✅ Exporta `contentType` (generalmente `'image/png'`)
- ✅ Exporta `alt` con descripción de la imagen
- ✅ Next.js cachea estas imágenes automáticamente

### Template Completo:
```typescript
import { ImageResponse } from 'next/og'

// ✅ Performance: Exports requeridos
export const runtime = 'edge'

export const alt = 'Mi SaaS - Artículo de Blog'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Función generadora
export default async function Image({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    (
      <div>Contenido</div>
    ),
    {
      ...size,
    }
  )
}
```

## Ejemplos Completos

### Ejemplo 1: Imagen OG Estática (Home)
```typescript
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Mi SaaS - La plataforma definitiva para desarrolladores'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const interBold = await fetch(
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZs.woff2'
  ).then(res => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Logo/Marca */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              marginRight: 20,
            }}
          />
          <span style={{ fontSize: 40, color: '#e4e4e7', fontWeight: 600 }}>
            Mi SaaS
          </span>
        </div>

        {/* Título */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
            padding: '0 120px',
          }}
        >
          La plataforma definitiva
        </div>

        {/* Subtítulo */}
        <div
          style={{
            marginTop: 40,
            fontSize: 30,
            color: '#a1a1aa',
          }}
        >
          Para desarrolladores modernos
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
```

### Ejemplo 2: Imagen OG Dinámica (Blog Post)
```typescript
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Artículo de Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: { slug: string }
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.tudominio.com/posts/${slug}`)
  return res.json()
}

export default async function Image({ params }: Props) {
  const post = await getPost(params.slug)

  const interBold = await fetch(
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZs.woff2'
  ).then(res => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '40px 60px',
          }}
        >
          <div style={{ fontSize: 32, color: '#fff', fontWeight: 600 }}>
            Mi Blog
          </div>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.8)' }}>
            {new Date(post.publishedAt).toLocaleDateString('es-ES')}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 120px',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#fff',
              textAlign: 'center',
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
            }}
          >
            {post.excerpt}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '40px 60px',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: '#fff',
              marginRight: 16,
            }}
          />
          <div style={{ fontSize: 24, color: '#fff', fontWeight: 500 }}>
            {post.author.name}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
```

### Ejemplo 3: Imagen OG con Degradados y Patrones
```typescript
// app/products/[id]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Producto'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { id: string } }) {
  const product = await fetch(`https://api.tudominio.com/products/${params.id}`).then(
    res => res.json()
  )

  const interBold = await fetch(
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZs.woff2'
  ).then(res => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background con patrón de puntos */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#000',
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.5) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.5) 0%, transparent 50%)',
          }}
        />

        {/* Contenido */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 80px',
          }}
        >
          {/* Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: 20,
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: 8,
              marginBottom: 40,
              alignSelf: 'flex-start',
            }}
          >
            {product.category}
          </div>

          {/* Título */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            {product.name}
          </div>

          {/* Precio */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#3b82f6',
              marginBottom: 16,
            }}
          >
            ${product.price}
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 32, color: '#fbbf24' }}>★★★★★</div>
            <div style={{ fontSize: 24, color: '#a1a1aa' }}>
              ({product.reviewCount} reseñas)
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Footer */}
          <div style={{ fontSize: 24, color: '#71717a' }}>tudominio.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
```

## Consejos y Mejores Prácticas

### ✅ DO:
- Usa degradados para fondos atractivos
- Implementa jerarquía visual clara (título > subtítulo > footer)
- Carga fuentes para branding consistente
- Usa `flexbox` para layouts responsivos
- Exporta todos los metadata (`runtime`, `size`, `alt`, `contentType`)
- Limita el texto para evitar overflow (la imagen es pequeña)
- Usa colores de alta contraste para legibilidad

### ❌ DON'T:
- No uses demasiado texto (será ilegible en previews)
- No uses imágenes externas sin validar CORS
- No uses animaciones (no funcionan)
- No uses CSS grid (no soportado, usa flexbox)
- No uses fuentes sin cargar (se verá genérico)
- No uses `transform` complejo (soporte limitado)

## Debugging

### Herramientas de Preview:
- **Local**: Navega a `/opengraph-image` en tu navegador
- **Open Graph Debugger**: https://www.opengraph.xyz/
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Inspector**: https://www.linkedin.com/post-inspector/

### Errores Comunes:

#### Error: "Font not loaded"
```typescript
// ❌ MAL: Fuente no cargada
fonts: [{ name: 'Inter', data: undefined }]

// ✅ BIEN: Fuente cargada correctamente
const fontData = await fetch('...').then(res => res.arrayBuffer())
fonts: [{ name: 'Inter', data: fontData, weight: 700, style: 'normal' }]
```

#### Error: "Unsupported CSS property"
```typescript
// ❌ MAL: Propiedad no soportada
style={{ gridTemplateColumns: '1fr 1fr' }}

// ✅ BIEN: Usa flexbox
style={{ display: 'flex', gap: 20 }}
```

#### Error: "Text overflow"
```typescript
// ❌ MAL: Texto muy largo sin truncar
<div style={{ fontSize: 80 }}>{veryLongTitle}</div>

// ✅ BIEN: Limita longitud o reduce tamaño
<div style={{ fontSize: title.length > 50 ? 60 : 80 }}>
  {title.substring(0, 100)}
</div>
```

---

**Objetivo final:** Generar imágenes Open Graph dinámicas y atractivas que aumenten el CTR en redes sociales usando el motor ImageResponse de Next.js, sin necesidad de herramientas externas como Figma o Photoshop.

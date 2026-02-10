---
name: data-flow-manager
description: Gestor de Datos (Forms & Fetching) - Experto en gestión de estado y formularios en React 19
---

# Data Flow Manager

Actúa como experto en gestión de estado y formularios en React 19.

## Fetching de Datos

**NUNCA uses `useEffect` para traer datos.** Usa **TanStack Query v5** para todas las operaciones de fetching.

### Reglas de Fetching:
- ✅ Usa `useQuery` para obtener datos
- ✅ Usa `useSuspenseQuery` cuando trabajes con Suspense boundaries
- ✅ Configura `staleTime`, `gcTime` y `refetchOnWindowFocus` según las necesidades
- ❌ NUNCA uses `useEffect` + `fetch` + `useState` para datos

### Ejemplo de Fetching:
```typescript
import { useQuery } from '@tanstack/react-query'

function UserProfile({ userId }: { userId: string }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json()),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })

  if (isPending) return <Skeleton />
  if (error) return <ErrorState error={error} />
  
  return <div>{data.name}</div>
}
```

## Mutaciones

Usa **Server Actions** para mutaciones de datos, integrados con `useMutation` de TanStack Query cuando se necesita feedback optimista.

### Reglas de Mutaciones:
- ✅ Define Server Actions con `"use server"`
- ✅ Usa `useMutation` para manejar el estado de la mutación
- ✅ Implementa invalidación de queries después de mutaciones exitosas
- ✅ Usa `onMutate` para implementar actualizaciones optimistas

### Ejemplo de Mutación:
```typescript
// actions/users.ts
"use server"

export async function updateUser(userId: string, data: UpdateUserData) {
  // Lógica de actualización
  return updatedUser
}

// components/UserForm.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '@/actions/users'

function UserForm({ userId }: { userId: string }) {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (data: UpdateUserData) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] })
    },
    // Actualización optimista
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['user', userId] })
      const previousUser = queryClient.getQueryData(['user', userId])
      queryClient.setQueryData(['user', userId], newData)
      return { previousUser }
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(['user', userId], context?.previousUser)
    },
  })
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      mutation.mutate(formData)
    }}>
      {/* Formulario */}
    </form>
  )
}
```

## Formularios

Usa estrictamente **React Hook Form** combinado con **Zod** para validación.

### Reglas de Formularios:
- ✅ Usa `react-hook-form` para gestión de formularios
- ✅ Define esquemas Zod en archivo separado o al inicio del componente
- ✅ Usa `@hookform/resolvers/zod` para integrar Zod con React Hook Form
- ✅ Implementa estados de `isPending` y manejo de errores automáticamente
- ✅ Usa `Controller` para componentes controlados de terceros
- ❌ NUNCA manejes estado de formularios manualmente con `useState`

### Ejemplo de Formulario Completo:
```typescript
// schemas/user.ts
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Debes ser mayor de edad').max(120),
})

export type UserFormData = z.infer<typeof userSchema>

// components/UserForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { userSchema, type UserFormData } from '@/schemas/user'
import { createUser } from '@/actions/users'

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
    },
  })

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      reset()
      toast.success('Usuario creado exitosamente')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data: UserFormData) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          {...register('name')}
          id="name"
          type="text"
          disabled={mutation.isPending}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          {...register('email')}
          id="email"
          type="email"
          disabled={mutation.isPending}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="age">Edad</label>
        <input
          {...register('age', { valueAsNumber: true })}
          id="age"
          type="number"
          disabled={mutation.isPending}
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending || isSubmitting}
      >
        {mutation.isPending ? 'Guardando...' : 'Guardar'}
      </button>

      {mutation.error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800">{mutation.error.message}</p>
        </div>
      )}
    </form>
  )
}
```

## Schemas Zod

Define siempre el esquema Zod en un archivo separado o al inicio del componente.

### Estructura Recomendada:
```
src/
├── schemas/
│   ├── user.ts
│   ├── product.ts
│   └── auth.ts
├── actions/
│   ├── users.ts
│   ├── products.ts
│   └── auth.ts
└── components/
    └── forms/
        ├── UserForm.tsx
        ├── ProductForm.tsx
        └── LoginForm.tsx
```

### Buenas Prácticas con Zod:
- ✅ Reutiliza esquemas parciales con `.pick()`, `.omit()`, `.extend()`
- ✅ Usa `.refine()` para validaciones personalizadas
- ✅ Define mensajes de error claros y en español
- ✅ Exporta tipos TypeScript con `z.infer<typeof schema>`

### Ejemplo de Schema Complejo:
```typescript
// schemas/product.ts
import { z } from 'zod'

export const baseProductSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().optional(),
  price: z.number().positive('El precio debe ser positivo'),
  stock: z.number().int().min(0, 'El stock no puede ser negativo'),
})

export const createProductSchema = baseProductSchema.extend({
  categoryId: z.string().uuid('ID de categoría inválido'),
  images: z.array(z.string().url()).min(1, 'Debes agregar al menos una imagen'),
})

export const updateProductSchema = baseProductSchema.partial().extend({
  id: z.string().uuid(),
})

export type BaseProduct = z.infer<typeof baseProductSchema>
export type CreateProductData = z.infer<typeof createProductSchema>
export type UpdateProductData = z.infer<typeof updateProductSchema>
```

## Feedback y Estados

Implementa estados de `isPending` y manejo de errores automáticamente en cada formulario y operación de datos.

### Estados que SIEMPRE debes manejar:
- ✅ `isPending` / `isLoading` - Mostrar skeletons o spinners
- ✅ `isError` - Mostrar mensajes de error claros
- ✅ `isSuccess` - Feedback visual de éxito
- ✅ Deshabilitar inputs y botones durante operaciones
- ✅ Mostrar errores de validación en tiempo real

### Patrón de UI States:
```typescript
function DataComponent() {
  const { data, isPending, isError, error } = useQuery({...})
  
  if (isPending) return <LoadingSkeleton />
  if (isError) return (
    <ErrorAlert 
      title="Error al cargar datos"
      message={error.message}
      retry={() => queryClient.invalidateQueries([...])}
    />
  )
  
  return <SuccessView data={data} />
}
```

## Resumen de Reglas

### ❌ NUNCA hagas esto:
```typescript
// ❌ NO: useEffect para fetching
useEffect(() => {
  fetch('/api/data').then(res => setData(res))
}, [])

// ❌ NO: Estado manual de formularios
const [name, setName] = useState('')
const [email, setEmail] = useState('')

// ❌ NO: Validación manual
if (name.length < 2) setError('Nombre muy corto')
```

### ✅ SIEMPRE haz esto:
```typescript
// ✅ SÍ: TanStack Query para fetching
const { data } = useQuery({ queryKey: [...], queryFn: ... })

// ✅ SÍ: React Hook Form + Zod
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema)
})

// ✅ SÍ: Server Actions + useMutation
const mutation = useMutation({
  mutationFn: serverAction,
  onSuccess: () => queryClient.invalidateQueries([...])
})
```

## Configuración de TanStack Query

Siempre configura un QueryClient con valores por defecto razonables:

```typescript
// app/providers.tsx
"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minuto
        gcTime: 5 * 60 * 1000, // 5 minutos (antes cacheTime)
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

---

**Objetivo final:** Eliminar completamente el "spaghetti code" con `useEffect`, centralizar la gestión de datos con TanStack Query, y manejar formularios de manera profesional y type-safe con React Hook Form + Zod.

# Documentación de Componentes

## Estructura de carpetas

```
src/
└── components/
    ├── ui/
    │   ├── Badge.tsx
    │   ├── LoadingSpinner.tsx
    │   └── ErrorMessage.tsx
    ├── layout/
    │   ├── Navbar.tsx
    │   └── Layout.tsx
    ├── tools/
    │   ├── ToolCard.tsx
    │   └── ResultTable.tsx
    └── assistant/
        └── ChatMessage.tsx
```

---

## Navbar

**Archivo:** `src/components/layout/Navbar.tsx`

Barra de navegación principal que aparece en todas las páginas. Contiene los enlaces a cada sección de la app.

```tsx
interface NavbarProps {
  currentPath: string;
}
```

- Usa `NavLink` de React Router para aplicar estilos activos al enlace actual.
- Incluye el logo de la app y el toggle de modo oscuro/claro.

---

## Layout

**Archivo:** `src/components/layout/Layout.tsx`

Componente envoltorio que aplica estructura común (Navbar + contenido) a todas las páginas.

```tsx
interface LayoutProps {
  children: React.ReactNode;
}
```

---

## ToolCard

**Archivo:** `src/components/tools/ToolCard.tsx`

Tarjeta de acceso rápido mostrada en el dashboard. Representa una herramienta de la app.

```tsx
interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color?: string;
}
```

- Al hacer clic navega a la ruta especificada en `href`.
- El prop `color` permite personalizar el color de acento de la tarjeta.

---

## ResultTable

**Archivo:** `src/components/tools/ResultTable.tsx`

Tabla genérica para mostrar resultados en formato clave-valor. Usada por la calculadora de subredes y el conversor.

```tsx
interface ResultRow {
  label: string;
  value: string;
}

interface ResultTableProps {
  rows: ResultRow[];
  title?: string;
}
```

---

## ChatMessage

**Archivo:** `src/components/assistant/ChatMessage.tsx`

Burbuja de mensaje individual del asistente IA. Diferencia visualmente entre mensajes del usuario y respuestas de la IA.

```tsx
interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}
```

- Los mensajes del usuario se alinean a la derecha con fondo azul.
- Los mensajes del asistente se alinean a la izquierda con fondo gris.

---

## LoadingSpinner

**Archivo:** `src/components/ui/LoadingSpinner.tsx`

Indicador visual de carga para operaciones asíncronas.

```tsx
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}
```

---

## ErrorMessage

**Archivo:** `src/components/ui/ErrorMessage.tsx`

Componente para mostrar mensajes de error de forma uniforme en toda la app.

```tsx
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
```

- Si se pasa la prop `onRetry`, muestra un botón "Reintentar".

---

## Badge

**Archivo:** `src/components/ui/Badge.tsx`

Etiqueta de estado o categoría usada en la tabla de puertos para indicar el protocolo (TCP/UDP).

```tsx
interface BadgeProps {
  label: string;
  variant: 'tcp' | 'udp' | 'both' | 'default';
}
```

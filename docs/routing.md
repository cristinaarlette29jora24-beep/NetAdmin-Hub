# Rutas y Navegación

## Configuración de React Router

Se usa **React Router v6** con el componente `BrowserRouter` y la API declarativa de `Routes` y `Route`.

**Archivo:** `src/App.tsx`

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SubnetCalculatorPage from './pages/SubnetCalculatorPage';
import ConverterPage from './pages/ConverterPage';
import PortsPage from './pages/PortsPage';
import AssistantPage from './pages/AssistantPage';
import GuidesPage from './pages/GuidesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="subnet" element={<SubnetCalculatorPage />} />
          <Route path="converter" element={<ConverterPage />} />
          <Route path="ports" element={<PortsPage />} />
          <Route path="assistant" element={<AssistantPage />} />
          <Route path="guides" element={<GuidesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
```

---

## Estructura de rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | `HomePage` | Dashboard con acceso a todas las herramientas |
| `/subnet` | `SubnetCalculatorPage` | Calculadora de subredes CIDR/VLSM |
| `/converter` | `ConverterPage` | Conversor de unidades de red |
| `/ports` | `PortsPage` | Tabla de puertos y protocolos |
| `/assistant` | `AssistantPage` | Chat con asistente IA |
| `/guides` | `GuidesPage` | Cheatsheets y guías de referencia |
| `*` | `NotFoundPage` | Página 404 — ruta no encontrada |

---

## Layout anidado

El componente `Layout` actúa como envoltorio para todas las rutas hijas. Usa el componente `<Outlet />` de React Router para renderizar la página activa dentro de la estructura común:

```tsx
// src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
```

---

## Navegación entre páginas

Para navegar entre páginas se usan dos enfoques:

**1. `NavLink` en la Navbar** (para navegación principal con estilos activos):
```tsx
<NavLink
  to="/subnet"
  className={({ isActive }) =>
    isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'
  }
>
  Calculadora
</NavLink>
```

**2. `useNavigate` en componentes** (para navegación programática):
```tsx
const navigate = useNavigate();
// ...
navigate('/subnet');
```

---

## Página 404

**Archivo:** `src/pages/NotFoundPage.tsx`

Se muestra cuando el usuario accede a una ruta que no existe. Incluye un botón para volver al inicio.

```tsx
export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="text-xl text-gray-500">Página no encontrada</p>
      <button onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
}
```

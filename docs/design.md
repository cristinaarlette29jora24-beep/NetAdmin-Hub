# Arquitectura y Diseño de la Aplicación

## Estructura de componentes

La aplicación se divide en:

- **Páginas (pages/):** Cada ruta de la app tiene su propia página. Son componentes de alto nivel que orquestan otros componentes más pequeños.
- **Componentes reutilizables (components/):** Piezas de UI independientes que pueden usarse en varias páginas (botones, tarjetas, modales, el chat de IA, etc.).
- **Layout:** Un componente `Layout` que envuelve todas las páginas y contiene la navegación principal (Navbar/Sidebar).

### Páginas principales

| Ruta | Componente página | Descripción |
|---|---|---|
| `/` | `HomePage` | Dashboard con acceso a todas las herramientas |
| `/subnet` | `SubnetCalculatorPage` | Calculadora de subredes CIDR |
| `/converter` | `ConverterPage` | Conversor de unidades de red |
| `/ports` | `PortsPage` | Tabla de puertos y protocolos |
| `/assistant` | `AssistantPage` | Chat con asistente IA |
| `/guides` | `GuidesPage` | Cheatsheets y guías de referencia |
| `*` | `NotFoundPage` | Página 404 |

---

## Componentes reutilizables

- `Navbar`: Navegación superior con enlaces a todas las secciones.
- `ToolCard`: Tarjeta de acceso rápido a una herramienta desde el dashboard.
- `ResultTable`: Tabla genérica para mostrar resultados calculados.
- `ChatMessage`: Burbuja de mensaje individual en el asistente IA.
- `LoadingSpinner`: Indicador de carga para estados async.
- `ErrorMessage`: Componente de error reutilizable.
- `Badge`: Etiqueta de estado o categoría.

---

## Gestión del estado

- **Estado local (`useState`):** Para formularios, inputs y estados de UI de cada componente.
- **Context API:** Para el historial del chat del asistente IA y el tema (modo oscuro/claro), que necesitan ser accesibles desde varios componentes.
- **LocalStorage:** Para persistir el historial de cálculos y preferencias del usuario entre sesiones.

---

## Diseño del Backend / API

El backend se implementa con Node.js + Express en la carpeta `server/` del mismo repositorio.

### Arquitectura por capas

```
server/
├── src/
│   ├── routes/         # Define las rutas HTTP
│   ├── controllers/    # Gestiona las peticiones y respuestas
│   ├── services/       # Lógica de negocio
│   └── config/         # Configuración (variables de entorno, etc.)
```

### Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/v1/ports` | Devuelve la lista de puertos y protocolos |
| GET | `/api/v1/guides` | Devuelve la lista de guías disponibles |
| GET | `/api/v1/guides/:id` | Devuelve el contenido de una guía |
| POST | `/api/v1/assistant` | Envía un mensaje al asistente IA y devuelve respuesta |
| POST | `/api/v1/subnet` | Calcula datos de una subred dada una IP y máscara |

### Persistencia de datos

- **En el servidor:** La lista de puertos/protocolos y las guías de referencia viven en el backend (datos estáticos o en JSON).
- **En el cliente:** El historial de cálculos y el historial del chat se guardan en LocalStorage del navegador.

---

## Diagrama de flujo de datos

```
Usuario
   │
   ▼
React (Frontend)
   │
   ├── Estado local (useState/useContext)
   │       └── Formularios, historial chat, tema
   │
   ├── src/api/client.ts  ──────►  Express API (server/)
   │       │                              │
   │       │                    ┌─────────┴──────────┐
   │       │                 routes/           services/
   │       │                    │                   │
   │       ◄────────────────────┘            Lógica de negocio
   │                                      (cálculos, IA proxy, datos)
   │
   └── LocalStorage
           └── Historial, preferencias
```

---

## Decisiones de arquitectura

1. **Monorepo (frontend + backend en el mismo repo):** Simplifica el despliegue y el desarrollo al tener todo en un único repositorio.
2. **Tailwind CSS v4:** Permite estilar rápidamente sin salir del JSX/TSX, con utilidades de bajo nivel.
3. **React Router v6:** Manejo declarativo de rutas con componentes `<Routes>` y `<Route>`.
4. **TypeScript:** Aporta seguridad de tipos en las interfaces de la API y los props de componentes, evitando errores en tiempo de ejecución.
5. **Context API en lugar de Redux:** El estado global de la app es simple (tema + historial de chat), lo que no justifica una librería externa como Redux.
6. **API proxy para IA:** La clave de la API de IA nunca se expone en el frontend; todas las llamadas pasan por el backend.

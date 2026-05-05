# Despliegue

## Plataforma: Vercel

El frontend (y el backend con Express como Serverless Functions) está desplegado en **Vercel**.

**URL del proyecto:** *(añade aquí la URL de Vercel una vez desplegado)*

---

## Proceso de despliegue del frontend

### 1. Preparar el proyecto

Asegurarse de que el proyecto compila correctamente en local:

```bash
npm run build
```

Si hay errores de TypeScript o de build, corregirlos antes de seguir.

### 2. Conectar el repositorio a Vercel

1. Acceder a [vercel.com](https://vercel.com) y hacer login con GitHub.
2. Hacer clic en **"Add New Project"**.
3. Seleccionar el repositorio `NetAdmin-Hub`.
4. Vercel detecta automáticamente que es un proyecto Vite.
5. Configurar:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Añadir las variables de entorno necesarias (ver siguiente sección).
7. Hacer clic en **"Deploy"**.

### 3. Variables de entorno en Vercel

En el panel de Vercel → Settings → Environment Variables, añadir:

| Variable | Valor |
|---|---|
| `VITE_API_URL` | URL de la API (puede ser la misma URL de Vercel si el backend está en el mismo proyecto) |

---

## Configuración del backend en Vercel

El backend Express se despliega como **Vercel Serverless Functions** mediante el archivo `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/server/src/index.ts" }
  ]
}
```

Esto redirige todas las peticiones a `/api/*` hacia el servidor Express.

Las variables de entorno del servidor (como la API key de la IA) se añaden también en Vercel:

| Variable | Descripción |
|---|---|
| `ANTHROPIC_API_KEY` | Clave de la API del asistente IA |

> ⚠️ Las variables sin prefijo `VITE_` son solo accesibles en el servidor (Node.js), no en el frontend. Esto protege las claves de API.

---

## Despliegue automático (CI/CD)

Vercel está configurado para hacer **deploy automático** cada vez que se hace un push a la rama `main`. Esto significa que cada commit en `main` desencadena un nuevo build y despliegue sin intervención manual.

Para los pull requests, Vercel genera automáticamente un **preview deployment** con una URL temporal para revisar los cambios antes de mergear.

---

## Comprobaciones post-despliegue

Una vez desplegado, se verificó que:

- [ ] La URL de producción carga correctamente.
- [ ] La navegación entre rutas funciona (SPA routing con React Router).
- [ ] Las llamadas a la API funcionan en producción (revisar CORS si hay errores).
- [ ] El asistente IA responde correctamente.
- [ ] El diseño responsive se mantiene en producción.
- [ ] No hay errores en la consola del navegador.

---

## Posibles problemas comunes

**Página en blanco al navegar directamente a una ruta:**
React Router es client-side. Hay que asegurarse de que `vercel.json` redirige todas las rutas al `index.html`:

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

**Error de CORS en producción:**
El backend Express debe incluir CORS configurado para aceptar peticiones del dominio de Vercel:

```ts
import cors from 'cors';
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
```

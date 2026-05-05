# Retrospectiva del Proyecto

## ¿Qué aprendí durante el proyecto?

### Conexión frontend–backend–API
Este proyecto fue la primera vez que integré de forma completa los tres niveles de una aplicación web: el frontend en React/TypeScript, un backend propio en Express y el consumo de una API externa (el asistente IA). Entender cómo fluyen los datos de extremo a extremo, cómo tipar esas interfaces en TypeScript y cómo el backend actúa como proxy y capa de seguridad fue uno de los aprendizajes más importantes del proyecto.

### TypeScript
Al principio TypeScript resultó frustrante: los errores de tipos son más lentos de resolver que simplemente "hacer que funcione" en JavaScript. Pero a medida que avanzaba el proyecto empecé a ver el valor: cuando cambiaba la estructura de un objeto, TypeScript me señalaba exactamente todos los lugares que necesitaban actualizarse. Eso ahorró tiempo en las fases de refactor.

### Context API
Entender cuándo usar `useState` local frente a `useContext` global fue un proceso de prueba y error. Empecé con demasiado estado global y luego fui moviendo cosas a estado local. La regla que aprendí: si solo un componente necesita un valor, que sea local; si varios componentes en distintos niveles lo necesitan, que sea contexto.

### React Router v6
La nueva API con `<Routes>` anidadas y `<Outlet>` es mucho más limpia que v5. El concepto de layout compartido a través de rutas hijas me pareció muy elegante una vez que lo entendí.

### Arquitectura por capas en el backend
Separar routes, controllers y services parece excesivo en proyectos pequeños, pero cuando el proyecto crece se agradece. Cada capa tiene una responsabilidad clara y cambiar la lógica de negocio no afecta a las rutas.

---

## Principales problemas encontrados

### 1. Integración frontend–API: CORS
El problema más frustrante fue CORS. Al desarrollar en local con el frontend en el puerto 5173 y el backend en el 3001, el navegador bloqueaba las peticiones. La solución fue añadir el middleware `cors` en Express y configurar explícitamente el origen permitido.

### 2. Tipos en las respuestas de la API
Al principio definí los tipos en el frontend de forma improvisada y no coincidían exactamente con lo que devolvía el backend. Esto causaba errores silenciosos en runtime. La solución fue definir los tipos en un único lugar (`src/types/api.types.ts`) y usarlos tanto en el cliente de API como en los componentes.

### 3. Variables de entorno en Vite
Las variables de entorno en Vite tienen que tener el prefijo `VITE_` para ser accesibles en el frontend. Tardé un rato en darme cuenta de por qué `process.env.API_URL` no funcionaba (en Vite se usa `import.meta.env.VITE_API_URL`).

### 4. React Router y recarga directa en Vercel
Al desplegar en Vercel, las rutas que no eran la raíz (`/`) devolvían 404 al recargar la página directamente. La solución fue configurar `vercel.json` para redirigir todo al `index.html`.

### 5. Estado del contexto y renders innecesarios
El `AssistantContext` re-renderizaba demasiados componentes porque el objeto de contexto se recreaba en cada render del Provider. La solución fue usar `useMemo` para el valor del contexto.

---

## Cómo utilicé la IA durante el desarrollo

La IA fue una herramienta de apoyo constante a lo largo del proyecto:

- **Depuración:** Cuando un error no era fácil de entender, describía el problema y pedía ayuda para interpretarlo o encontrar la causa.
- **Generación de datos de ejemplo:** Para poblar la tabla de puertos y protocolos le pedí que generara un JSON con los 50 puertos más comunes.
- **Documentación:** Me ayudó a estructurar y redactar los documentos de `docs/`, especialmente los más técnicos.
- **Revisión de código:** Pegaba fragmentos de código y le pedía sugerencias de mejora o que detectara posibles problemas.
- **Aprendizaje:** Cuando no entendía bien un concepto (como el ciclo de vida de los hooks o cómo funciona `useCallback`), la IA me daba explicaciones más adaptadas a mi contexto concreto que la documentación oficial.

Lo que no hice fue dejar que la IA escribiera el código completo sin entenderlo. Cada fragmento que usé lo leí, lo entendí y lo adapté a mi proyecto.

---

## Reflexión final

Este proyecto fue el más completo que he hecho hasta ahora. Conectar todas las piezas (React, TypeScript, Express, API externa, despliegue) fue más trabajo del que esperaba, pero también más satisfactorio. Ver la aplicación funcionando en producción, con el asistente IA respondiendo preguntas técnicas y la calculadora de subredes calculando en tiempo real, hace que todo el esfuerzo valga la pena.

Si tuviera que empezar de nuevo, definiría mejor los tipos de la API desde el principio, antes de escribir ningún componente. Ese "contrato" entre frontend y backend es lo más importante y lo que más tiempo cuesta corregir si se hace después.

NetAdmin-Hub es una aplicación que yo mismo utilizaría en mi trabajo diario, y eso es la mejor señal de que el proyecto cumplió su objetivo.

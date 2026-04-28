# NetAdmin Hub - Documentacion Tecnica

## 1. Vision general

NetAdmin Hub es una aplicacion web enfocada en productividad para administracion de redes. Su objetivo es centralizar herramientas practicas de soporte en una interfaz limpia, rapida y accesible para perfiles tecnicos y no tecnicos.

## 2. Objetivos del proyecto

- Reducir tiempo en tareas repetitivas de networking.
- Facilitar diagnostico inicial y consulta de comandos frecuentes.
- Ofrecer una experiencia visual moderna y clara (dark/light mode).
- Permitir crecimiento modular por secciones funcionales.

## 3. Funcionalidades implementadas

### 3.1 Calculadora de subredes

- Entrada por IP y prefijo.
- Calculo de:
  - CIDR
  - mascara decimal
  - direccion de red
  - primer y ultimo host
  - broadcast
  - hosts disponibles

### 3.2 Calculadora de subredes (IP + Mascara)

- Entrada flexible de mascara:
  - `/24`
  - `24`
  - `255.255.255.0`
- Salida orientada a operacion:
  - red
  - rango utilizable
  - broadcast

### 3.3 Conversor numerico

- Conversion de decimal a binario y hexadecimal.
- Util para lectura de bits, mascaras y troubleshooting.

### 3.4 Biblioteca de comandos CLI

- Catalogo de comandos Linux y Windows.
- Busqueda por titulo, descripcion o texto del comando.
- Filtro por plataforma.
- Filtro por categoria mediante chips visuales generados desde etiquetas en titulos (`[DNS]`, `[WIFI]`, `[LOGS]`, etc.).
- Copia al portapapeles con feedback visual.

### 3.5 Chat tecnico simulado

- Asistente offline (sin API key).
- Respuestas orientadas a:
  - conectividad
  - VLAN/trunk
  - OSPF
  - NAT
  - DHCP
- Enfoque paso a paso para troubleshooting.

### 3.6 Experiencia visual

- UI estilo dashboard profesional.
- Fondo tecnologico con capa de degradado.
- Cambio de tema claro/oscuro con switch en topbar.
- Responsive completo:
  - sidebar oculto en movil con menu hamburguesa,
  - grid flexible en calculadora/resultados/conversor,
  - tipografia y tarjetas adaptadas por breakpoint.
- Footer responsive con copyright centrado.

## 4. Arquitectura y estructura

### 4.1 Stack principal

- `React` para interfaz y estado local.
- `Vite` para desarrollo rapido y build.
- `Tailwind CSS` (utilidades) + estilos custom en `index.css`.
- `ESLint` para control de calidad de codigo.

### 4.2 Estructura de modulos

- `src/App.jsx`: composicion principal y ruteo interno por modulo activo.
- `src/components/Layout/`: sidebar y topbar.
- `src/components/Calculator/`: calculadoras y conversiones.
- `src/components/CLI/`: biblioteca de comandos.
- `src/components/AI/`: simulador de chat tecnico.
- `src/data/commands.json`: base de comandos.

## 5. Materiales y herramientas utilizadas

### Herramientas de desarrollo

- Node.js + npm
- Vite
- React Dev ecosystem
- ESLint

### Recursos visuales

- Paleta dark/light basada en variables CSS.
- Fondo tecnico con imagen de red (estilo tecnologia/telecom).
- Efectos glassmorphism y microinteracciones.

## 6. Instalacion y ejecucion

```bash
npm install
npm run dev
```

Servidor local:

- `http://localhost:5173`

Build produccion:

```bash
npm run build
```

Preview local de build:

```bash
npm run preview
```

## 6.1 Despliegue en Vercel

### Requisitos

- Cuenta en Vercel.
- Proyecto subido a GitHub/GitLab/Bitbucket (recomendado).

### Metodo recomendado (dashboard Vercel)

1. Entrar en [Vercel](https://vercel.com).
2. `Add New Project`.
3. Importar el repositorio `netadmin-hub`.
4. Framework detectado: `Vite`.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Deploy.

### Metodo CLI

```bash
npx vercel
npx vercel --prod
```

> Nota: si aparece error de token, ejecutar `npx vercel login` y repetir.

## 6.2 Dominio personalizado

1. En Vercel: `Project > Settings > Domains`.
2. Anadir dominio (ejemplo: `netadminhub.com` o `app.netadminhub.com`).
3. Copiar registros DNS sugeridos por Vercel (`A`, `CNAME` o `TXT` segun caso).
4. Configurarlos en el proveedor de dominio.
5. Esperar propagacion DNS y validar certificado SSL activo.

## 7. Calidad y buenas practicas

- Componentizacion por responsabilidad.
- Validaciones de entrada en calculadoras.
- Manejo de estados para UX (`loading`, mensajes de error, feedback de copiado).
- Coherencia visual por tokens globales CSS.

## 8. Publico objetivo

- Estudiantes de redes.
- Tecnicos de soporte.
- Administradores junior y semi-senior.
- Usuarios no tecnicos que necesitan tareas guiadas.

## 9. Roadmap sugerido

- Exportar resultados de calculos (PDF/CSV).
- Favoritos en comandos CLI.
- Historial de consultas del chat.
- Integracion opcional con IA real (backend seguro).
- Internacionalizacion (ES/EN).
- Pruebas unitarias y e2e.

## 10. Licencia y contribucion

Define aqui:

- tipo de licencia (MIT recomendada para proyectos abiertos),
- normas de contribucion (convenciones de commits, revisiones, PRs),
- guia para reporte de issues.

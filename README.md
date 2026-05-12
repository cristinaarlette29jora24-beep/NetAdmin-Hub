# NetAdmin Hub

Plataforma web para administradores de redes con calculadoras, comandos CLI y asistente IA.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## 🚀 Demo en producción

| Interfaz | URL |
|---|---|
| Aplicación | [net-admin-hub.vercel.app](https://net-admin-dugzrjlcn-cristinaarlette29jora24-beeps-projects.vercel.app) |
| Tablero Trello | [trello.com/b/VddsHeEi/netadmin-hub](https://trello.com/b/VddsHeEi/netadmin-hub) |

## ✨ Características

- Autenticación con Firebase Auth (correo y contraseña)
- Calculadoras de red: subnetting, CIDR, máscaras de subred
- Referencia de comandos CLI para administradores de redes
- Asistente IA integrado para consultas técnicas
- Diseño responsivo adaptado a móvil y escritorio
- Modo oscuro con preferencia guardada en el navegador

## 🛠️ Tecnologías

| Interfaz | Uso |
|---|---|
| React 18 | Librería principal de UI con componentes funcionales |
| TypeScript | Tipado estático en todo el proyecto |
| Tailwind CSS | Estilos y diseño responsive |
| React Router v6 | Navegación entre páginas |

| Backend | Uso |
|---|---|
| Firebase Auth | Registro e inicio de sesión con correo y contraseña |
| Firestore | Base de datos en tiempo real |
| Node.js + Express | API REST del servidor |
| Vercel | Despliegue del frontend y backend |

## 📁 Estructura del proyecto

```
NetAdmin-Hub/
├── docs/                  # Documentación del proyecto
├── public/                # Archivos estáticos
├── server/                # Backend Express
│   └── src/
│       └── routes/        # Rutas de la API
├── src/                   # Frontend React + Vite
│   ├── components/        # Componentes reutilizables
│   ├── pages/             # Páginas de la app
│   ├── hooks/             # Custom hooks
│   └── types/             # Tipos TypeScript
├── index.html
├── vite.config.ts
├── vercel.json            # Configuración de despliegue
└── README.md
```

## ⚡ Inicio rápido

```bash
git clone https://github.com/cristinaarlette29jora24-beep/NetAdmin-Hub.git
cd NetAdmin-Hub
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## 🚀 Desplegar en Vercel

1. Importa el repositorio desde [vercel.com](https://vercel.com)
2. Deja el directorio raíz vacío — Vercel leerá `vercel.json` automáticamente
3. Agrega las variables de entorno en **Configuración → Variables de entorno**
4. Haz el despliegue

## 📄 Documentación

- Guía de usuario: [README-USUARIO.md](README-USUARIO.md)
- Documentación técnica: [README-TECNICO.md](README-TECNICO.md)
- Documentación completa: carpeta [docs/](docs/)
- Instrucciones de migración: [INSTRUCCIONES-MIGRACION.md](INSTRUCCIONES-MIGRACION.md)
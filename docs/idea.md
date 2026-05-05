# Idea del Proyecto: NetAdmin-Hub

## ¿De dónde parte la idea?

Durante las prácticas y el estudio de redes me di cuenta de que los administradores de sistemas y técnicos de red pierden mucho tiempo buscando herramientas dispersas en distintas webs: una calculadora de subredes aquí, una tabla de puertos allá, comandos de Cisco en otra pestaña... Ninguna herramienta lo tiene todo junto y con una interfaz moderna.

De ahí surge **NetAdmin-Hub**: una plataforma web centralizada pensada para el día a día de cualquier persona que trabaje con redes e infraestructura IT.

---

## ¿Qué problema va a resolver?

El problema principal es la **dispersión de herramientas técnicas**. Un técnico de red necesita constantemente:
- Calcular subredes y rangos de hosts
- Consultar puertos y protocolos estándar
- Recordar comandos CLI de distintos sistemas
- Resolver dudas técnicas rápidamente

NetAdmin-Hub reunirá todo esto en un único panel web, accesible desde cualquier dispositivo, con una interfaz profesional y rápida.

---

## Usuario objetivo

- Administradores de redes y sistemas en empresas medianas y grandes
- Técnicos de soporte e infraestructura IT
- Estudiantes de redes, telecomunicaciones y sistemas
- Cualquier profesional técnico que trabaje con TCP/IP, switches, routers o servidores

---

## Funcionalidades que se van a desarrollar

1. **Calculadora de subredes (CIDR):** El usuario introducirá una IP y un prefijo y obtendrá al instante la red, broadcast, primer y último host, máscara, wildcard y número de hosts disponibles. También incluirá un conversor de bases numéricas (decimal, binario, hexadecimal).

2. **Calculadora de subred avanzada:** Variante que además guardará el historial de cálculos en Firebase Firestore, asociados al usuario autenticado.

3. **Biblioteca de comandos CLI:** Colección de comandos útiles para Linux y Windows, organizados por categoría y plataforma, con buscador en tiempo real y botón de copiado al portapapeles.

4. **Chat con asistente técnico (IA):** Un chat integrado que responderá preguntas técnicas sobre redes — VLANs, OSPF, NAT, DHCP, SSH, ACLs, subnetting, modelo OSI — con comandos concretos y explicaciones paso a paso.

5. **Autenticación con Firebase:** Los usuarios podrán registrarse e iniciar sesión con email y contraseña. Solo los usuarios autenticados tendrán acceso al panel principal.

---

## Funcionalidades opcionales (si da tiempo)

- Modo oscuro / claro con persistencia en LocalStorage
- Historial de cálculos guardado por usuario en Firestore
- Diseño responsive para móvil y tablet
- Página 404 personalizada

---

## Herramientas y tecnologías que se usarán

### Frontend
- **React 19** con **TypeScript** — componentes tipados y seguros
- **Tailwind CSS v4** — estilos rápidos con clases utilitarias
- **React Router v6** — navegación entre páginas y página 404
- **Vite** — bundler rápido para desarrollo y producción
- **Firebase Auth + Firestore** — autenticación y base de datos en la nube

### Backend
- **Node.js + Express** — servidor API REST en la misma carpeta del repo (`server/`)
- **TypeScript en el servidor** — arquitectura por capas: routes, controllers, services
- **CORS + dotenv** — seguridad y variables de entorno

### Organización y despliegue
- **GitHub** — control de versiones con commits semánticos
- **Trello** — gestión de tareas con metodología Kanban
- **Vercel** — despliegue del frontend y del backend como serverless functions

---

## ¿Qué va a aportar este proyecto?

NetAdmin-Hub no es solo un ejercicio académico — es una herramienta que yo misma usaría en mi trabajo diario. Aporta:

- **Productividad:** Todo en un solo lugar, sin cambiar de pestaña
- **Accesibilidad:** Funciona desde cualquier navegador, sin instalar nada
- **Seguridad:** Acceso protegido por autenticación Firebase
- **Escalabilidad:** La arquitectura por capas del backend permite añadir nuevos endpoints fácilmente
- **Aprendizaje:** El proyecto integra de forma real frontend, backend, base de datos y despliegue en producción

---

## Repositorio

[https://github.com/cristinaarlette29jora24-beep/NetAdmin-Hub](https://github.com/cristinaarlette29jora24-beep/NetAdmin-Hub)

## Tablero Trello

[https://trello.com/b/VddsHeEi/netadmin-hub](https://trello.com/b/VddsHeEi/netadmin-hub)
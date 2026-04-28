# NetAdmin Hub - Guia para Usuario

NetAdmin Hub es una plataforma web sencilla y visual para apoyar tareas de administracion de redes, incluso si no eres especialista tecnico.

## Que puedes hacer

- Calcular subredes IP (red, mascara, rango utilizable y broadcast).
- Convertir valores numericos entre decimal, binario y hexadecimal.
- Buscar comandos utiles de Linux y Windows para tareas del dia a dia.
- Filtrar comandos por categoria (DNS, WIFI, MONIT, LOGS, PUERTO, REMOTO, etc.).
- Copiar comandos al portapapeles con un clic.
- Usar un chat simulador tecnico para recibir orientacion practica de troubleshooting.
- Cambiar entre modo claro y oscuro con el boton del encabezado.
- Navegar en movil con menu hamburguesa y panel lateral adaptable.

## Como usar la aplicacion

1. Inicia la app.
2. En el menu lateral, elige un modulo:
   - `Calculadora IP`
   - `Subred IP`
   - `Comandos CLI`
   - `Chat con IA`
3. Trabaja con los formularios y resultados segun tu necesidad.

## Modos de visualizacion

- Usa el boton `Modo claro` / `Modo oscuro` en la parte superior.
- El cambio se aplica al instante para toda la interfaz.

## Ejemplos rapidos

### 1) Calcular una subred

- IP: `192.168.10.45`
- Mascara: `/24` o `255.255.255.0`
- Resultado: red, rango de hosts, broadcast y cantidad de hosts.

### 2) Buscar un comando

- Ve a `Comandos CLI`.
- Escribe una palabra clave como `dns`, `ip`, `firewall`, `ping`.
- Filtra por `Linux` o `Windows`.
- Filtra por categoria con los chips visuales (por ejemplo `DNS` o `WIFI`).
- Pulsa `Copiar` y pega el comando en tu terminal.

### 3) Pedir ayuda en el chat

- Ve a `Chat con IA`.
- Describe tu problema: por ejemplo, "No tengo internet en una VLAN".
- El simulador responde con pasos y comandos recomendados.

## Requisitos

- Navegador web moderno (Chrome, Edge, Firefox).
- Conexion local para ejecutar la app en tu equipo.

## Soporte

Si algo no se ve bien o no responde como esperas:

- recarga la pagina (`Ctrl + F5`),
- reinicia el servidor de desarrollo,
- verifica que estas usando una version actual del navegador.

## Despliegue web (URL publica)

Esta aplicacion puede publicarse en Vercel para obtener una URL del tipo:

- `https://tu-proyecto.vercel.app`

Si quieres dominio propio:

- `https://netadminhub.com` (o el que elijas)

# Backend y API REST

## Tecnología

- **Runtime:** Node.js
- **Framework:** Express
- **Lenguaje:** TypeScript
- **Ubicación en el repo:** `server/`

---

## Estructura del backend

```
server/
├── src/
│   ├── routes/
│   │   ├── ports.routes.ts
│   │   ├── guides.routes.ts
│   │   ├── subnet.routes.ts
│   │   └── assistant.routes.ts
│   ├── controllers/
│   │   ├── ports.controller.ts
│   │   ├── guides.controller.ts
│   │   ├── subnet.controller.ts
│   │   └── assistant.controller.ts
│   ├── services/
│   │   ├── ports.service.ts
│   │   ├── guides.service.ts
│   │   ├── subnet.service.ts
│   │   └── assistant.service.ts
│   ├── config/
│   │   └── index.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

---

## Arquitectura por capas

- **Routes:** Define las rutas HTTP y las asocia a sus controladores.
- **Controllers:** Recibe la petición, valida los datos de entrada y delega en el servicio. Gestiona la respuesta HTTP.
- **Services:** Contiene la lógica de negocio pura (cálculos, llamadas a APIs externas, transformación de datos). No sabe nada de HTTP.

---

## Endpoints

### GET `/api/v1/ports`

Devuelve la lista completa de puertos y protocolos conocidos.

**Request:** Sin parámetros.

**Response 200:**
```json
[
  {
    "port": 22,
    "name": "SSH",
    "protocol": "TCP",
    "description": "Secure Shell - acceso remoto cifrado"
  },
  {
    "port": 80,
    "name": "HTTP",
    "protocol": "TCP",
    "description": "Hypertext Transfer Protocol"
  }
]
```

---

### GET `/api/v1/ports/:port`

Devuelve información de un puerto concreto.

**Params:** `port` — número de puerto.

**Response 200:**
```json
{
  "port": 443,
  "name": "HTTPS",
  "protocol": "TCP",
  "description": "HTTP sobre TLS/SSL"
}
```

**Response 404:**
```json
{ "error": "Puerto no encontrado" }
```

---

### GET `/api/v1/guides`

Devuelve la lista de guías disponibles (sin el contenido completo).

**Response 200:**
```json
[
  { "id": "osi-model", "title": "Modelo OSI", "category": "fundamentos" },
  { "id": "subnetting", "title": "Subnetting paso a paso", "category": "calculo" }
]
```

---

### GET `/api/v1/guides/:id`

Devuelve el contenido completo de una guía.

**Response 200:**
```json
{
  "id": "osi-model",
  "title": "Modelo OSI",
  "category": "fundamentos",
  "content": "## Capa 1 - Física\n..."
}
```

**Response 404:**
```json
{ "error": "Guía no encontrada" }
```

---

### POST `/api/v1/subnet`

Calcula los datos de una subred a partir de una IP y una máscara.

**Request body:**
```json
{
  "ip": "192.168.1.0",
  "mask": "/24"
}
```

**Response 201:**
```json
{
  "network": "192.168.1.0",
  "broadcast": "192.168.1.255",
  "firstHost": "192.168.1.1",
  "lastHost": "192.168.1.254",
  "totalHosts": 254,
  "subnetMask": "255.255.255.0",
  "wildcardMask": "0.0.0.255",
  "cidr": "/24"
}
```

**Response 400:**
```json
{ "error": "Dirección IP o máscara inválida" }
```

---

### POST `/api/v1/assistant`

Envía un mensaje al asistente IA y devuelve la respuesta. El backend actúa como proxy para no exponer la API key en el frontend.

**Request body:**
```json
{
  "message": "¿Cuál es la diferencia entre TCP y UDP?",
  "history": [
    { "role": "user", "content": "Hola" },
    { "role": "assistant", "content": "¡Hola! ¿En qué puedo ayudarte con redes?" }
  ]
}
```

**Response 200:**
```json
{
  "content": "TCP es un protocolo orientado a conexión que garantiza la entrega de datos mediante acuse de recibo (ACK)..."
}
```

**Response 500:**
```json
{ "error": "Error al contactar con el servicio de IA" }
```

---

## Códigos HTTP utilizados

| Código | Significado | Cuándo se usa |
|---|---|---|
| 200 | OK | GET exitoso |
| 201 | Created | POST exitoso que crea/calcula algo |
| 400 | Bad Request | Datos de entrada inválidos |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error inesperado del servidor |

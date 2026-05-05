# Capa de Red en el Frontend

## Cliente de API tipado

**Archivo:** `src/api/client.ts`

El cliente de API centraliza todas las llamadas HTTP al backend. Usa `fetch` nativo y devuelve datos tipados con TypeScript.

```ts
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}
```

---

## Tipos alineados con el backend

**Archivo:** `src/types/api.types.ts`

```ts
export interface Port {
  port: number;
  name: string;
  protocol: 'TCP' | 'UDP' | 'TCP/UDP';
  description: string;
}

export interface Guide {
  id: string;
  title: string;
  category: string;
}

export interface GuideDetail extends Guide {
  content: string;
}

export interface SubnetResult {
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  subnetMask: string;
  wildcardMask: string;
  cidr: string;
}

export interface SubnetRequest {
  ip: string;
  mask: string;
}

export interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AssistantRequest {
  message: string;
  history: AssistantMessage[];
}

export interface AssistantResponse {
  content: string;
}
```

---

## Módulos de la API

**Archivo:** `src/api/ports.api.ts`
```ts
import { apiFetch } from './client';
import type { Port } from '../types/api.types';

export const portsApi = {
  getAll: () => apiFetch<Port[]>('/api/v1/ports'),
  getByPort: (port: number) => apiFetch<Port>(`/api/v1/ports/${port}`),
};
```

**Archivo:** `src/api/subnet.api.ts`
```ts
import { apiFetch } from './client';
import type { SubnetRequest, SubnetResult } from '../types/api.types';

export const subnetApi = {
  calculate: (data: SubnetRequest) =>
    apiFetch<SubnetResult>('/api/v1/subnet', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
```

**Archivo:** `src/api/assistant.api.ts`
```ts
import { apiFetch } from './client';
import type { AssistantRequest, AssistantResponse } from '../types/api.types';

export const assistantApi = {
  sendMessage: (data: AssistantRequest) =>
    apiFetch<AssistantResponse>('/api/v1/assistant', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
```

---

## Gestión de los tres estados de red

En todos los componentes que consumen la API se gestionan los tres estados posibles:

```tsx
function SubnetCalculatorPage() {
  const { result, error, loading, calculate } = useSubnetCalculator();

  return (
    <div>
      <SubnetForm onSubmit={calculate} />

      {/* Estado: cargando */}
      {loading && <LoadingSpinner message="Calculando subred..." />}

      {/* Estado: error */}
      {error && <ErrorMessage message={error} />}

      {/* Estado: éxito */}
      {result && <ResultTable rows={formatSubnetResult(result)} />}
    </div>
  );
}
```

---

## Variables de entorno

La URL base de la API se configura mediante variables de entorno de Vite para poder cambiarla entre entornos (desarrollo vs producción) sin tocar el código:

**`.env.local`** (desarrollo):
```
VITE_API_URL=http://localhost:3001
```

**`.env.production`** (Vercel):
```
VITE_API_URL=https://netadmin-hub.vercel.app
```

---

## API como única fuente de verdad

Los datos que viven en el backend (puertos, guías, resultados de cálculos) se obtienen siempre de la API. El LocalStorage se reserva exclusivamente para preferencias del usuario (tema, historial de chat) que no necesitan sincronizarse con el servidor.

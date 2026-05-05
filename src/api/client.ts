/// <reference types="vite/client" />
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }
  return response.json() as Promise<T>
}

export const portsApi = {
  getAll: () => apiFetch<Port[]>('/api/v1/ports'),
  getByPort: (port: number) => apiFetch<Port>(`/api/v1/ports/${port}`),
}

export const subnetApi = {
  calculate: (ip: string, prefix: number) =>
    apiFetch<SubnetResult>('/api/v1/subnet', {
      method: 'POST',
      body: JSON.stringify({ ip, prefix }),
    }),
}

export interface Port {
  port: number
  name: string
  protocol: 'TCP' | 'UDP' | 'TCP/UDP'
  description: string
}

export interface SubnetResult {
  network: string
  broadcast: string
  firstHost: string
  lastHost: string
  subnetMask: string
  wildcardMask: string
  cidr: string
  totalHosts: number
}
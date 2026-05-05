// ── Auth ──────────────────────────────────────────────────────────────────────
export interface LoginProps {
  // No recibe props externas; el estado es interno
}

// ── Layout ────────────────────────────────────────────────────────────────────
export type ModuleId = 'calculator' | 'subnet' | 'cli' | 'ai'

export interface SidebarProps {
  active: ModuleId
  onNavigate: (moduleId: ModuleId) => void
  isOpen: boolean
  onClose: () => void
}

export interface TopbarProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  onToggleSidebar: () => void
}

// ── Subnet Calculator ─────────────────────────────────────────────────────────
export interface SubnetResult {
  network: string
  broadcast: string
  firstHost: string
  lastHost: string
  mask: string
  hosts: number
  cidr: string
}

export interface ResultRowProps {
  label: string
  value: string
}

// ── IP Subnet Calculator ──────────────────────────────────────────────────────
export interface SubnetResultSimple {
  network: string
  broadcast: string
  mask: string
  prefix: number
}

export interface ValidationResult {
  valid: boolean
  prefix?: number | null
  error?: string
}

export interface ResultItemProps {
  label: string
  value: string
}

// ── CLI / CommandList ─────────────────────────────────────────────────────────
export type Platform = 'Cisco' | 'Linux' | 'MikroTik' | 'Windows'

export interface Command {
  id: number
  platform: Platform
  title: string
  command: string
  description: string
}

export interface PlatformColor {
  bg: string
  color: string
  border: string
}

// ── AI Chat ───────────────────────────────────────────────────────────────────
export type MessageRole = 'user' | 'assistant'

export interface ChatMessage {
  role: MessageRole
  content: string
}

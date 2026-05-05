import React from 'react'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import type { SidebarProps, ModuleId } from '../../types'

interface NavModule {
  id: ModuleId
  icon: string
  label: string
}

const modules: NavModule[] = [
  { id: 'calculator', icon: '⊞', label: 'Calculadora IP' },
  { id: 'subnet',     icon: '⌗', label: 'Subred IP'      },
  { id: 'cli',        icon: '▤', label: 'Comandos CLI'   },
  { id: 'ai',         icon: '✦', label: 'Chat con IA'    },
]

const Sidebar: React.FC<SidebarProps> = ({ active, onNavigate, isOpen, onClose }) => {
  const handleLogout = () => {
    signOut(auth).catch((error: Error) => console.error('Error al salir:', error))
  }

  return (
    <>
      {isOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
          aria-label="Cerrar menú lateral"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 flex-col backdrop-blur-md transition-transform duration-300 md:static md:z-auto md:flex md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'var(--surface-glass)', borderRight: '1px solid var(--border-soft)' }}
      >
        <div className="p-6" style={{ borderBottom: '1px solid var(--border-soft)' }}>
          <div className="text-xl font-extrabold tracking-wide" style={{ color: '#9cc7ff' }}>
            NET<span style={{ color: '#00e5ff' }}>ADMIN</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Network Control Center
          </div>
        </div>

        <nav className="flex flex-col gap-2 p-3 mt-3">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => onNavigate(m.id)}
              className="pro-interactive flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left w-full"
              style={{
                background: active === m.id
                  ? 'linear-gradient(90deg, rgba(59,130,246,0.22), rgba(124,58,237,0.28))'
                  : 'rgba(255,255,255,0.01)',
                color:  active === m.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: active === m.id ? '1px solid var(--border-strong)' : '1px solid var(--border-soft)',
                boxShadow: active === m.id ? '0 8px 24px rgba(40,83,187,0.25)' : 'none',
              }}
            >
              <span className="text-base">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 flex flex-col gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all"
            style={{
              background: 'rgba(255, 77, 77, 0.1)',
              color: '#ff4d4d',
              border: '1px solid rgba(255, 77, 77, 0.3)',
              cursor: 'pointer',
            }}
          >
            ✕ CERRAR SESIÓN
          </button>
          <div className="text-center text-[10px]" style={{ color: 'var(--text-muted)' }}>
            v1.0.0
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

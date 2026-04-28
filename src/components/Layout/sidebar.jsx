const modules = [
  { id: 'calculator', icon: '⊞', label: 'Calculadora IP' },
  { id: 'subnet',     icon: '⌗', label: 'Subred IP'       },
  { id: 'cli',        icon: '▤', label: 'Comandos CLI'   },
  { id: 'ai',         icon: '✦', label: 'Chat con IA'    },
]

function Sidebar({ active, onNavigate, isOpen, onClose }) {
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
          {modules.map(m => (
            <button key={m.id} onClick={() => onNavigate(m.id)}
              className="pro-interactive flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left w-full"
              style={{
                background: active === m.id
                  ? 'linear-gradient(90deg, rgba(59,130,246,0.22), rgba(124,58,237,0.28))'
                  : 'rgba(255,255,255,0.01)',
                color:      active === m.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                border:     active === m.id ? '1px solid var(--border-strong)' : '1px solid var(--border-soft)',
                boxShadow:  active === m.id ? '0 8px 24px rgba(40,83,187,0.25)' : 'none',
              }}>
              <span className="text-base">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 text-xs text-center" style={{ color: 'var(--text-muted)' }}>
          v1.0.0
        </div>
      </aside>
    </>
  )
}

export default Sidebar
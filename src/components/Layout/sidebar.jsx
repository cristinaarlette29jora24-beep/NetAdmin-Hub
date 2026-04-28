const modules = [
  { id: 'calculator', icon: '⊞', label: 'Calculadora IP' },
  { id: 'subnet',     icon: '⌗', label: 'Subred IP'       },
  { id: 'cli',        icon: '▤', label: 'Comandos CLI'   },
  { id: 'ai',         icon: '✦', label: 'Chat con IA'    },
]

function Sidebar({ active, onNavigate }) {
  return (
    <aside className="w-64 min-h-screen flex flex-col backdrop-blur-md"
      style={{ background: 'rgba(4,12,30,0.72)', borderRight: '1px solid rgba(125,145,255,0.26)' }}>

      <div className="p-6" style={{ borderBottom: '1px solid rgba(125,145,255,0.22)' }}>
        <div className="text-xl font-extrabold tracking-wide" style={{ color: '#9cc7ff' }}>
          NET<span style={{ color: '#00e5ff' }}>ADMIN</span>
        </div>
        <div className="text-xs mt-1" style={{ color: '#8ca5cf' }}>
          Network Control Center
        </div>
      </div>

      <nav className="flex flex-col gap-2 p-3 mt-3">
        {modules.map(m => (
          <button key={m.id} onClick={() => onNavigate(m.id)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left w-full"
            style={{
              background: active === m.id
                ? 'linear-gradient(90deg, rgba(59,130,246,0.22), rgba(124,58,237,0.28))'
                : 'rgba(255,255,255,0.01)',
              color:      active === m.id ? '#d5e5ff' : '#9ab2dc',
              border:     active === m.id ? '1px solid rgba(147,197,253,0.45)' : '1px solid rgba(115,137,190,0.2)',
              boxShadow:  active === m.id ? '0 8px 24px rgba(40,83,187,0.25)' : 'none',
            }}>
            <span className="text-base">{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 text-xs text-center" style={{ color: '#7d94be' }}>
        v1.0.0
      </div>
    </aside>
  )
}

export default Sidebar
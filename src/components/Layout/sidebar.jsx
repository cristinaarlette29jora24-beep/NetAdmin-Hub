const modules = [
  { id: 'calculator', icon: '⊞', label: 'Calculadora IP' },
  { id: 'subnet',     icon: '⌗', label: 'Subred IP'       },
  { id: 'cli',        icon: '▤', label: 'Comandos CLI'   },
  { id: 'ai',         icon: '✦', label: 'Chat con IA'    },
]

function Sidebar({ active, onNavigate }) {
  return (
    <aside className="w-56 min-h-screen flex flex-col"
      style={{ background: '#050d1a', borderRight: '1px solid #1e3a5f' }}>

      <div className="p-5" style={{ borderBottom: '1px solid #1e3a5f' }}>
        <div className="text-xl font-bold" style={{ color: '#60c0ff' }}>
          NET<span style={{ color: '#00e5ff' }}>ADMIN</span>
        </div>
        <div className="text-xs mt-1" style={{ color: '#3a6080' }}>
          Network Control Center
        </div>
      </div>

      <nav className="flex flex-col gap-1 p-3 mt-2">
        {modules.map(m => (
          <button key={m.id} onClick={() => onNavigate(m.id)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all text-left w-full"
            style={{
              background: active === m.id ? 'rgba(0,120,255,0.15)' : 'transparent',
              color:      active === m.id ? '#60c0ff' : '#4a7090',
              borderLeft: active === m.id ? '2px solid #0088ff' : '2px solid transparent',
            }}>
            <span>{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 text-xs text-center" style={{ color: '#1e3a5f' }}>
        v1.0.0
      </div>
    </aside>
  )
}

export default Sidebar
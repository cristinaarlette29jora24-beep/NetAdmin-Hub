function Topbar({ theme, onToggleTheme }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 backdrop-blur-md"
      style={{ background: 'var(--surface-glass)', borderBottom: '1px solid var(--border-soft)' }}>

      <div className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        Panel de administración de redes
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className="pro-interactive text-xs px-3 py-1.5 rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--brand-a), var(--brand-b))',
            border: '1px solid var(--border-strong)',
            color: 'var(--text-primary)',
          }}
        >
          {theme === 'dark' ? '☀ Modo claro' : '🌙 Modo oscuro'}
        </button>

        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
        style={{
          background: 'linear-gradient(90deg, rgba(16,185,129,0.18), rgba(16,185,129,0.08))',
          border: '1px solid rgba(52,211,153,0.45)',
          color: '#7dffc4'
        }}>
          <span className="w-2 h-2 rounded-full inline-block animate-pulse"
            style={{ background: '#34d399' }}></span>
          Sistema activo
        </div>
      </div>
    </header>
  )
}

export default Topbar
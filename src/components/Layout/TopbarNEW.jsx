function Topbar({ theme, onToggleTheme, onToggleSidebar }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 backdrop-blur-md"
      style={{ background: 'var(--surface-glass)', borderBottom: '1px solid var(--border-soft)' }}>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="pro-interactive inline-flex items-center justify-center rounded-lg p-2 md:hidden"
          style={{
            background: 'linear-gradient(90deg, rgba(59,130,246,0.2), rgba(124,58,237,0.25))',
            border: '1px solid var(--border-strong)',
            color: 'var(--text-primary)',
          }}
          aria-label="Abrir menú"
          title="Abrir menú"
        >
          <span className="text-base">☰</span>
        </button>
        <div className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          Panel de administración de redes
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button
          onClick={onToggleTheme}
          className="pro-interactive flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: 'linear-gradient(90deg, rgba(59,130,246,0.26), rgba(124,58,237,0.3))',
            border: '1px solid var(--border-strong)',
            color: 'var(--text-primary)',
          }}
          title="Cambiar entre modo claro y oscuro"
          aria-label="Cambiar tema"
        >
          <span style={{ opacity: theme === 'light' ? 1 : 0.45 }}>☀</span>
          <span
            className="relative inline-flex h-5 w-10 items-center rounded-full transition-all"
            style={{
              background: theme === 'dark' ? 'rgba(30,41,59,0.9)' : 'rgba(59,130,246,0.55)',
              border: '1px solid rgba(148,163,184,0.5)',
            }}
          >
            <span
              className="inline-block h-4 w-4 transform rounded-full transition-all"
              style={{
                background: theme === 'dark' ? '#c4b5fd' : '#ffffff',
                transform: theme === 'dark' ? 'translateX(2px)' : 'translateX(18px)',
                boxShadow: '0 0 8px rgba(255,255,255,0.5)',
              }}
            />
          </span>
          <span style={{ opacity: theme === 'dark' ? 1 : 0.45 }}>🌙</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
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
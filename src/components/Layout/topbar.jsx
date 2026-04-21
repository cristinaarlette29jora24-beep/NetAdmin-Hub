function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-3"
      style={{ background: '#050d1a', borderBottom: '1px solid #1e3a5f' }}>

      <div className="text-sm" style={{ color: '#3a6080' }}>
        Panel de administración de redes
      </div>

      <div className="flex items-center gap-2 text-xs px-3 py-1 rounded-full"
        style={{ background: 'rgba(0,200,100,0.1)', border: '1px solid rgba(0,200,100,0.3)', color: '#00d090' }}>
        <span className="w-2 h-2 rounded-full inline-block animate-pulse"
          style={{ background: '#00d090' }}></span>
        Sistema activo
      </div>
    </header>
  )
}

export default Topbar
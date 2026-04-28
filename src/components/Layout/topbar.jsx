function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 backdrop-blur-md"
      style={{ background: 'rgba(4,12,30,0.66)', borderBottom: '1px solid rgba(125,145,255,0.26)' }}>

      <div className="text-sm font-medium" style={{ color: '#9ab2dc' }}>
        Panel de administración de redes
      </div>

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
    </header>
  )
}

export default Topbar
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-6"
      style={{ background: '#0a0f1e' }}
    >
      <div className="text-8xl font-black" style={{ color: 'rgba(96,165,250,0.3)' }}>
        404
      </div>
      <h1 className="text-2xl font-bold" style={{ color: '#9cc7ff' }}>
        Página no encontrada
      </h1>
      <p className="text-sm" style={{ color: '#4a7090' }}>
        La ruta que buscas no existe en NetAdmin Hub.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 rounded-xl text-sm font-bold"
        style={{
          background: 'linear-gradient(90deg, rgba(59,130,246,0.3), rgba(124,58,237,0.35))',
          color: '#dbe9ff',
          border: '1px solid rgba(134,158,255,0.4)',
        }}
      >
        Volver al inicio
      </button>
    </div>
  )
}
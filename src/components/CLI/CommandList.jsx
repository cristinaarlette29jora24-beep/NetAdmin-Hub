import { useState } from 'react'
import commands from '../../data/commands.json'

const platforms = ['Todos', 'Cisco', 'Linux', 'MikroTik', 'Windows']

const platformColors = {
  Cisco:    { bg: 'rgba(0,120,255,0.1)',  color: '#60a0ff', border: 'rgba(0,120,255,0.3)'  },
  Linux:    { bg: 'rgba(0,200,100,0.1)',  color: '#00d090', border: 'rgba(0,200,100,0.3)'  },
  MikroTik: { bg: 'rgba(255,160,0,0.1)', color: '#ffaa00', border: 'rgba(255,160,0,0.3)'  },
  Windows:  { bg: 'rgba(0,200,255,0.1)', color: '#00c8ff', border: 'rgba(0,200,255,0.3)'  },
}

function CommandList() {
  const [search,   setSearch]   = useState('')
  const [platform, setPlatform] = useState('Todos')
  const [copied,   setCopied]   = useState(null)

  const copy = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const filtered = commands.filter(c => {
    const matchPlatform = platform === 'Todos' || c.platform === platform
    const matchSearch   = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.command.toLowerCase().includes(search.toLowerCase()) ||
                          c.description.toLowerCase().includes(search.toLowerCase())
    return matchPlatform && matchSearch
  })

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#60c0ff' }}>
          Biblioteca de Comandos CLI
        </h1>
        <p className="text-sm" style={{ color: '#3a6080' }}>
          Busca y copia comandos para Cisco, Linux, MikroTik y Windows Server.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar comandos..."
          className="px-4 py-3 rounded-lg text-sm outline-none w-full"
          style={{ background: '#050d1a', border: '1px solid #1e3a5f', color: '#c0d8f0' }}
        />
        <div className="flex gap-2 flex-wrap">
          {platforms.map(p => (
            <button key={p} onClick={() => setPlatform(p)}
              className="px-4 py-1.5 rounded-full text-xs transition-all"
              style={{
                background: platform === p ? 'rgba(0,120,255,0.2)' : 'transparent',
                color:      platform === p ? '#60c0ff' : '#3a6080',
                border:     platform === p ? '1px solid #0055cc' : '1px solid #1e3a5f',
              }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs" style={{ color: '#2a5070' }}>
        {filtered.length} comando{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map(c => {
          const colors = platformColors[c.platform]
          return (
            <div key={c.id} className="rounded-xl p-4 flex flex-col gap-3"
              style={{ background: '#050d1a', border: '1px solid #1e3a5f' }}>

              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}>
                      {c.platform}
                    </span>
                    <span className="text-sm font-bold" style={{ color: '#c0d8f0' }}>{c.title}</span>
                  </div>
                  <p className="text-xs" style={{ color: '#3a6080' }}>{c.description}</p>
                </div>
                <button onClick={() => copy(c.id, c.command)}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs transition-all"
                  style={{
                    background: copied === c.id ? 'rgba(0,200,100,0.15)' : 'rgba(0,120,255,0.1)',
                    color:      copied === c.id ? '#00d090' : '#60c0ff',
                    border:     copied === c.id ? '1px solid rgba(0,200,100,0.3)' : '1px solid #1e3a5f',
                  }}>
                  {copied === c.id ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>

              <pre className="text-xs p-3 rounded-lg overflow-x-auto"
                style={{ background: '#030a14', color: '#00c8ff', border: '1px solid #0d2040' }}>
                {c.command}
              </pre>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default CommandList
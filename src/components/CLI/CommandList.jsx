import { useState } from 'react'
import commands from '../../data/commands.json'

const platforms = ['Todos', 'Linux', 'Windows']

const platformColors = {
  Cisco:    { bg: 'rgba(0,120,255,0.1)',  color: '#60a0ff', border: 'rgba(0,120,255,0.3)'  },
  Linux:    { bg: 'rgba(0,200,100,0.1)',  color: '#00d090', border: 'rgba(0,200,100,0.3)'  },
  MikroTik: { bg: 'rgba(255,160,0,0.1)', color: '#ffaa00', border: 'rgba(255,160,0,0.3)'  },
  Windows:  { bg: 'rgba(0,200,255,0.1)', color: '#00c8ff', border: 'rgba(0,200,255,0.3)'  },
}

function CommandList() {
  const [search,   setSearch]   = useState('')
  const [platform, setPlatform] = useState('Todos')
  const [category, setCategory] = useState('Todas')
  const [copied,   setCopied]   = useState(null)
  const [copyError, setCopyError] = useState('')

  const cliCommands = commands.filter(c => c.platform === 'Linux' || c.platform === 'Windows')
  const categories = ['Todas', ...Array.from(new Set(cliCommands.map((c) => {
    const match = c.title.match(/^\[(.*?)\]/)
    return match ? match[1] : 'GENERAL'
  }))).sort()]

  const copy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setCopyError('')
      setTimeout(() => setCopied(null), 2000)
    } catch {
      setCopyError('No se pudo copiar automáticamente. Revisa permisos del navegador.')
    }
  }

  const filtered = cliCommands.filter(c => {
    const matchPlatform = platform === 'Todos' || c.platform === platform
    const commandCategory = (c.title.match(/^\[(.*?)\]/)?.[1]) || 'GENERAL'
    const matchCategory = category === 'Todas' || commandCategory === category
    const matchSearch   = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.command.toLowerCase().includes(search.toLowerCase()) ||
                          c.description.toLowerCase().includes(search.toLowerCase())
    return matchPlatform && matchCategory && matchSearch
  })

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 fade-in-up">

      <div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Biblioteca de Comandos CLI
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Comandos útiles del día a día para Linux y Windows con explicación rápida y etiquetas por categoría.
        </p>
      </div>

      <div className="pro-card rounded-2xl p-5 flex flex-col gap-3">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre, comando, etiqueta ([DNS], [WIFI]) o descripción..."
          className="px-4 py-3 rounded-xl text-sm outline-none w-full"
          style={{ background: 'var(--surface-strong)', border: '1px solid var(--border-soft)', color: 'var(--text-primary)' }}
        />
        <div className="flex gap-2 flex-wrap">
          {platforms.map(p => (
            <button key={p} onClick={() => setPlatform(p)}
              className="pro-interactive px-4 py-1.5 rounded-full text-xs"
              style={{
                background: platform === p ? 'linear-gradient(90deg, rgba(59,130,246,0.26), rgba(124,58,237,0.32))' : 'rgba(4,12,30,0.5)',
                color:      platform === p ? 'var(--text-primary)' : 'var(--text-secondary)',
                border:     platform === p ? '1px solid var(--border-strong)' : '1px solid var(--border-soft)',
              }}>
              {p}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className="pro-interactive px-3 py-1 rounded-full text-[11px]"
              style={{
                background: category === c
                  ? 'linear-gradient(90deg, rgba(16,185,129,0.25), rgba(59,130,246,0.22))'
                  : 'rgba(4,12,30,0.45)',
                color: category === c ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: category === c ? '1px solid rgba(45,212,191,0.55)' : '1px solid var(--border-soft)',
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {filtered.length} comando{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </div>

      <div className="flex flex-col gap-3">
        {copyError && (
          <p className="text-sm px-3 py-2 rounded-lg"
            style={{ background: 'rgba(255,60,40,0.1)', color: '#ff6040', border: '1px solid rgba(255,60,40,0.2)' }}>
            {copyError}
          </p>
        )}

        {filtered.length === 0 && (
          <div className="rounded-xl p-4 text-sm"
            style={{ background: '#050d1a', border: '1px solid #1e3a5f', color: '#4a7090' }}>
            No se encontraron comandos para tu búsqueda/filtro actual.
          </div>
        )}

        {filtered.map(c => {
          const colors = platformColors[c.platform]
          return (
            <div key={c.id} className="pro-card pro-interactive rounded-2xl p-4 flex flex-col gap-3">

              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}>
                      {c.platform}
                    </span>
                    <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{c.title}</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{c.description}</p>
                </div>
                <button onClick={() => copy(c.id, c.command)}
                  className="pro-interactive shrink-0 px-3 py-1.5 rounded-lg text-xs"
                  style={{
                    background: copied === c.id
                      ? 'linear-gradient(90deg, rgba(16,185,129,0.26), rgba(16,185,129,0.18))'
                      : 'linear-gradient(90deg, rgba(59,130,246,0.24), rgba(124,58,237,0.28))',
                    color:      copied === c.id ? '#a7f3d0' : '#dbe9ff',
                    border:     copied === c.id ? '1px solid rgba(52,211,153,0.45)' : '1px solid rgba(134,158,255,0.38)',
                  }}>
                  {copied === c.id ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>

              <pre className="text-xs p-3 rounded-lg overflow-x-auto"
                style={{ background: 'rgba(3,10,24,0.9)', color: '#86e3ff', border: '1px solid rgba(125,145,255,0.22)' }}>
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
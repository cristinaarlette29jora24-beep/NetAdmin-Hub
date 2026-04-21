import { useState, useRef, useEffect } from 'react'

function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hola, soy tu asistente de redes. Puedo ayudarte a diagnosticar problemas, explicar conceptos y guiarte con configuraciones. ¿En qué te puedo ayudar hoy?'
    }
  ])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey,  setApiKey]  = useState('')
  const [showKey, setShowKey] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    if (!input.trim() || loading) return
    if (!apiKey.trim()) { setShowKey(true); return }

    const userMsg = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: 'Eres un experto en redes de computadoras. Ayudas a administradores de redes con diagnósticos, configuraciones y dudas técnicas. Responde siempre en español, de forma clara y práctica. Cuando des comandos, ponlos en bloques de código.',
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        })
      })
      const data = await response.json()
      const reply = data.content?.[0]?.text || 'No se pudo obtener respuesta.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error al conectar con la IA. Verifica tu API Key y conexión a internet.' }])
    }

    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4 h-full">

      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#60c0ff' }}>
          Chat con IA
        </h1>
        <p className="text-sm" style={{ color: '#3a6080' }}>
          Pregúntale al asistente sobre redes, configuraciones y troubleshooting.
        </p>
      </div>

      {showKey && (
        <div className="rounded-xl p-4 flex flex-col gap-3"
          style={{ background: '#050d1a', border: '1px solid #1e3a5f' }}>
          <p className="text-xs" style={{ color: '#ffaa00' }}>
            Necesitas una API Key de Anthropic. Consíguela gratis en console.anthropic.com
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="flex-1 px-3 py-2 rounded-lg text-sm outline-none font-mono"
              style={{ background: '#0a1628', border: '1px solid #1e3a5f', color: '#c0d8f0' }}
            />
            <button onClick={() => setShowKey(false)}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ background: 'rgba(0,120,255,0.2)', color: '#60c0ff', border: '1px solid #0055cc' }}>
              Guardar
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pb-2" style={{ minHeight: '400px' }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-xl text-sm"
              style={{
                background: m.role === 'user'
                  ? 'rgba(0,100,255,0.2)'
                  : 'rgba(0,200,180,0.06)',
                color:      m.role === 'user' ? '#80c0f0' : '#80d0c8',
                border:     m.role === 'user'
                  ? '1px solid rgba(0,120,255,0.3)'
                  : '1px solid rgba(0,200,180,0.15)',
              }}>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {m.content}
              </pre>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(0,200,180,0.06)', border: '1px solid rgba(0,200,180,0.15)', color: '#3a8080' }}>
              Analizando...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 pb-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Escribe tu pregunta sobre redes... (Enter para enviar)"
          rows={2}
          className="flex-1 px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: '#050d1a', border: '1px solid #1e3a5f', color: '#c0d8f0' }}
        />
        <button onClick={send} disabled={loading}
          className="px-5 py-3 rounded-xl text-sm font-bold transition-all self-end"
          style={{
            background: loading ? 'rgba(0,60,120,0.2)' : 'rgba(0,120,255,0.2)',
            color:      loading ? '#2a5070' : '#60c0ff',
            border:     '1px solid #0055cc',
          }}>
          {loading ? '...' : 'Enviar'}
        </button>
      </div>

      {!apiKey && !showKey && (
        <button onClick={() => setShowKey(true)}
          className="text-xs text-center py-1"
          style={{ color: '#2a5070' }}>
          Configurar API Key
        </button>
      )}
    </div>
  )
}

export default AIChat


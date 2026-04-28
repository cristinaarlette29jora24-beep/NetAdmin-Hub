import { useState, useRef, useEffect } from 'react'

function buildSimulatedReply(question) {
  const text = question.toLowerCase()

  if (text.includes('ping') || text.includes('no responde') || text.includes('conectividad')) {
    return `Vamos a diagnosticar conectividad en capas:

1) Verifica IP y gateway local.
2) Prueba loopback/local gateway.
3) Prueba salida a internet y DNS.

Comandos recomendados:
\`\`\`
# Linux
ip addr show
ip route show
ping -c 4 <gateway>
ping -c 4 8.8.8.8
nslookup google.com

# Cisco
show ip interface brief
show ip route
ping 8.8.8.8
show arp
\`\`\`

Si quieres, te guío con el resultado de cada comando paso a paso.`
  }

  if (text.includes('vlan') || text.includes('trunk') || text.includes('switch')) {
    return `Para una VLAN funcional revisa: VLAN creada, puertos access correctos y trunk permitido.

Plantilla base en Cisco:
\`\`\`
conf t
vlan 10
 name USERS
interface gi0/1
 switchport mode access
 switchport access vlan 10
interface gi0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20
end
wr mem
\`\`\`

Validación:
\`\`\`
show vlan brief
show interfaces trunk
show mac address-table vlan 10
\`\`\``
  }

  if (text.includes('ospf') || text.includes('enrutamiento') || text.includes('routeo')) {
    return `Si vas a levantar OSPF, usa este checklist:

1) IPs y máscaras correctas en interfaces.
2) Áreas bien definidas (normalmente área 0 para backbone).
3) Wildcards correctas en networks.

Ejemplo Cisco:
\`\`\`
conf t
router ospf 1
 router-id 1.1.1.1
 network 10.0.0.0 0.0.0.255 area 0
 network 192.168.10.0 0.0.0.255 area 0
end
\`\`\`

Verificación:
\`\`\`
show ip ospf neighbor
show ip route ospf
show ip protocols
\`\`\``
  }

  if (text.includes('nat') || text.includes('internet')) {
    return `Para NAT/PAT en Cisco, confirma inside/outside y ACL de tráfico interno.

Ejemplo rápido:
\`\`\`
access-list 1 permit 192.168.10.0 0.0.0.255
interface gi0/0
 ip nat inside
interface gi0/1
 ip nat outside
ip nat inside source list 1 interface gi0/1 overload
\`\`\`

Comandos de revisión:
\`\`\`
show ip nat translations
show ip nat statistics
show access-lists
\`\`\``
  }

  if (text.includes('dhcp')) {
    return `Si DHCP falla, revisa pool, exclusiones, gateway y reachabilidad en la VLAN.

Plantilla Cisco:
\`\`\`
ip dhcp excluded-address 192.168.20.1 192.168.20.20
ip dhcp pool VLAN20
 network 192.168.20.0 255.255.255.0
 default-router 192.168.20.1
 dns-server 8.8.8.8
\`\`\`

Verifica concesiones:
\`\`\`
show ip dhcp binding
show ip dhcp pool
\`\`\``
  }

  return `Entendido. Te respondo como simulador técnico de redes (sin API key).

Puedo ayudarte con:
- Diagnóstico de conectividad (LAN/WAN/DNS)
- Cisco (VLAN, trunk, OSPF, NAT, ACL, DHCP)
- Linux de red (ip, route, ss, tcpdump, traceroute)
- Planes de troubleshooting paso a paso

Si me dices tu escenario (topología, IPs y síntoma), te doy un procedimiento exacto con comandos.`
}

function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hola, soy tu asistente técnico de redes (modo simulador). No necesito API key y puedo responderte con guías prácticas tipo Claude sobre Cisco y Linux. ¿Qué problema quieres resolver?'
    }
  ])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const reply = buildSimulatedReply(userMsg.content)
    await new Promise(resolve => setTimeout(resolve, 550))
    setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4 h-full">

      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#60c0ff' }}>
          Chat con IA (simulador técnico)
        </h1>
        <p className="text-sm" style={{ color: '#3a6080' }}>
          Modo sin API key. Recibe respuestas técnicas de red sobre Cisco y Linux.
        </p>
      </div>

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
    </div>
  )
}

export default AIChat


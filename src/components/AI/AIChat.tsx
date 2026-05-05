import { useState, useRef, useEffect, useCallback } from 'react'
import type { ChatMessage } from '../../types'

function buildSimulatedReply(question: string): string {
  const text = question.toLowerCase()

  // SUBNETTING
  if (text.includes('subred') || text.includes('subnet') || text.includes('cidr') || text.includes('mascara') || text.includes('máscara')) {
    return `📡 Subnetting — Conceptos clave:

Una subred divide una red IP en segmentos más pequeños.

Ejemplo con 192.168.1.0/24:
• Red:         192.168.1.0
• Máscara:     255.255.255.0
• Primer host: 192.168.1.1
• Último host: 192.168.1.254
• Broadcast:   192.168.1.255
• Hosts útiles: 254

Máscaras más comunes:
/8  → 16.777.214 hosts  (clase A)
/16 → 65.534 hosts      (clase B)
/24 → 254 hosts         (clase C)
/30 → 2 hosts           (enlaces punto a punto)

Fórmula de hosts: 2^(32-prefijo) - 2

¿Quieres calcular una subred concreta?`
  }

  // PING / CONECTIVIDAD
  if (text.includes('ping') || text.includes('no responde') || text.includes('conectividad') || text.includes('no llega') || text.includes('no hay conexion') || text.includes('conexión')) {
    return `🔍 Diagnóstico de conectividad por capas:

1️⃣ Capa física — verifica cables y luces del switch/router

2️⃣ Capa de red — comprueba IP y gateway:
\`\`\`
# Linux
ip addr show
ip route show
ping -c 4 <tu-gateway>

# Windows
ipconfig /all
ping <tu-gateway>
\`\`\`

3️⃣ Conectividad a internet:
\`\`\`
ping 8.8.8.8        # prueba sin DNS
ping google.com     # prueba con DNS
\`\`\`

4️⃣ Si falla solo DNS:
\`\`\`
nslookup google.com 8.8.8.8
# Linux: edita /etc/resolv.conf
# Windows: ipconfig /flushdns
\`\`\`

¿En qué paso falla exactamente?`
  }

  // VLAN
  if (text.includes('vlan') || text.includes('trunk') || text.includes('access port') || text.includes('switch')) {
    return `🔀 Configuración de VLANs en Cisco:

1️⃣ Crear la VLAN:
\`\`\`
conf t
vlan 10
 name USUARIOS
vlan 20
 name SERVIDORES
\`\`\`

2️⃣ Puerto de acceso (para equipos finales):
\`\`\`
interface gi0/1
 switchport mode access
 switchport access vlan 10
\`\`\`

3️⃣ Puerto trunk (entre switches o hacia router):
\`\`\`
interface gi0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20
\`\`\`

4️⃣ Verificación:
\`\`\`
show vlan brief
show interfaces trunk
show mac address-table vlan 10
\`\`\`

⚠️ Recuerda: la VLAN debe existir en TODOS los switches del trunk.`
  }

  // OSPF / ENRUTAMIENTO
  if (text.includes('ospf') || text.includes('enrutamiento') || text.includes('routing') || text.includes('ruta') || text.includes('bgp') || text.includes('eigrp')) {
    return `🗺️ Configuración OSPF en Cisco:

1️⃣ Configuración básica:
\`\`\`
conf t
router ospf 1
 router-id 1.1.1.1
 network 10.0.0.0 0.0.0.255 area 0
 network 192.168.10.0 0.0.0.255 area 0
end
\`\`\`

2️⃣ Verificación:
\`\`\`
show ip ospf neighbor      # vecinos OSPF
show ip route ospf         # rutas aprendidas
show ip ospf interface     # interfaces activas
show ip protocols          # resumen del protocolo
\`\`\`

3️⃣ Problemas comunes:
• Router-ID duplicado → cambiar con router-id X.X.X.X
• Áreas distintas → verificar que coincidan
• Hello/Dead timers → deben ser iguales en ambos extremos
\`\`\`
show ip ospf interface gi0/0
\`\`\`

¿Tienes algún problema concreto con OSPF?`
  }

  // NAT
  if (text.includes('nat') || text.includes('pat') || text.includes('internet') || text.includes('salida a internet')) {
    return `🌐 Configuración NAT/PAT en Cisco:

1️⃣ Definir tráfico a traducir:
\`\`\`
access-list 1 permit 192.168.10.0 0.0.0.255
\`\`\`

2️⃣ Marcar interfaces:
\`\`\`
interface gi0/0
 ip nat inside
interface gi0/1
 ip nat outside
\`\`\`

3️⃣ Activar PAT (overload):
\`\`\`
ip nat inside source list 1 interface gi0/1 overload
\`\`\`

4️⃣ Verificación:
\`\`\`
show ip nat translations
show ip nat statistics
debug ip nat
\`\`\``
  }

  // DHCP
  if (text.includes('dhcp') || text.includes('ip automatica') || text.includes('ip automática') || text.includes('asignacion') || text.includes('asignación')) {
    return `📋 Configuración DHCP en Cisco:

1️⃣ Excluir IPs estáticas:
\`\`\`
ip dhcp excluded-address 192.168.10.1 192.168.10.20
\`\`\`

2️⃣ Crear pool:
\`\`\`
ip dhcp pool VLAN10
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 8.8.8.8 8.8.4.4
 lease 7
\`\`\`

3️⃣ Verificación:
\`\`\`
show ip dhcp binding
show ip dhcp pool
show ip dhcp conflict
\`\`\`

4️⃣ DHCP Relay (si el servidor está en otra VLAN):
\`\`\`
interface vlan 10
 ip helper-address 192.168.1.100
\`\`\``
  }

  // SSH
  if (text.includes('ssh') || text.includes('acceso remoto') || text.includes('telnet') || text.includes('consola')) {
    return `🔐 Configurar SSH en Cisco:

1️⃣ Configuración básica:
\`\`\`
conf t
hostname ROUTER1
ip domain-name netadmin.local
crypto key generate rsa modulus 2048
ip ssh version 2
\`\`\`

2️⃣ Crear usuario local:
\`\`\`
username admin privilege 15 secret MiPassword123
\`\`\`

3️⃣ Configurar líneas VTY:
\`\`\`
line vty 0 4
 transport input ssh
 login local
\`\`\`

4️⃣ Verificación:
\`\`\`
show ip ssh
show ssh
\`\`\`

🚫 Deshabilitar Telnet:
\`\`\`
line vty 0 4
 transport input ssh
\`\`\``
  }

  // ACL
  if (text.includes('acl') || text.includes('access list') || text.includes('lista de acceso') || text.includes('filtrar') || text.includes('bloquear')) {
    return `🛡️ Listas de Control de Acceso (ACL) en Cisco:

ACL Estándar (filtra por IP origen, /1-99):
\`\`\`
access-list 10 deny 192.168.20.0 0.0.0.255
access-list 10 permit any

interface gi0/1
 ip access-group 10 in
\`\`\`

ACL Extendida (filtra IP + puerto + protocolo, /100-199):
\`\`\`
access-list 100 deny tcp 192.168.10.0 0.0.0.255 any eq 23
access-list 100 permit ip any any

interface gi0/0
 ip access-group 100 in
\`\`\`

Verificación:
\`\`\`
show access-lists
show ip interface gi0/0
\`\`\`

⚠️ Siempre hay un "deny any" implícito al final.`
  }

  // LINUX
  if (text.includes('linux') || text.includes('ifconfig') || text.includes('ip addr') || text.includes('netstat') || text.includes('ss ')) {
    return `🐧 Comandos de red en Linux:

Ver interfaces y IPs:
\`\`\`
ip addr show
ip link show
\`\`\`

Ver rutas:
\`\`\`
ip route show
route -n
\`\`\`

Ver conexiones activas:
\`\`\`
ss -tuln          # puertos en escucha
ss -tunp          # con proceso
netstat -tulnp    # alternativa clásica
\`\`\`

Diagnóstico:
\`\`\`
ping -c 4 8.8.8.8
traceroute google.com
nslookup google.com
dig google.com
\`\`\`

Captura de tráfico:
\`\`\`
tcpdump -i eth0
tcpdump -i eth0 port 80
tcpdump -i eth0 host 192.168.1.1
\`\`\``
  }

  // OSI / PROTOCOLOS
  if (text.includes('osi') || text.includes('tcp/ip') || text.includes('modelo') || text.includes('capas') || text.includes('protocolo')) {
    return `📚 Modelo OSI — 7 capas:

7️⃣ Aplicación   → HTTP, FTP, DNS, SMTP
6️⃣ Presentación → SSL/TLS, cifrado
5️⃣ Sesión       → NetBIOS, RPC
4️⃣ Transporte   → TCP (fiable), UDP (rápido)
3️⃣ Red          → IP, ICMP, OSPF, BGP
2️⃣ Enlace       → Ethernet, MAC, VLANs
1️⃣ Física       → Cables, señales, Wi-Fi

TCP vs UDP:
• TCP → orientado a conexión, fiable (HTTP, SSH, FTP)
• UDP → sin conexión, rápido (DNS, VoIP, streaming)`
  }

  // RESPUESTA GENÉRICA
  return `🤖 Asistente NetAdmin Hub

Puedo ayudarte con estos temas:

📡 Subnetting y CIDR
  → "¿Cómo calculo una subred /26?"

🔍 Diagnóstico de conectividad
  → "El equipo no hace ping al gateway"

🔀 VLANs y switching (Cisco)
  → "¿Cómo configuro un trunk?"

🗺️ Enrutamiento (OSPF, BGP)
  → "¿Cómo levanto OSPF entre dos routers?"

🌐 NAT/PAT e internet
  → "¿Cómo configuro NAT en Cisco?"

📋 DHCP
  → "¿Cómo creo un pool DHCP?"

🔐 SSH y acceso remoto
  → "¿Cómo habilito SSH en un Cisco?"

🛡️ ACLs y filtrado
  → "¿Cómo bloqueo el tráfico Telnet?"

🐧 Comandos Linux de red
  → "¿Qué comando uso para ver puertos abiertos?"

📚 Modelo OSI y protocolos
  → "¿Cuál es la diferencia entre TCP y UDP?"

Escribe tu pregunta con detalle y te doy comandos concretos. 💪`
}

function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '👋 Hola, soy tu asistente técnico de redes.\n\nPuedo ayudarte con Cisco, Linux, subnetting, VLANs, OSPF, NAT, DHCP, SSH, ACLs y más.\n\n¿Qué problema quieres resolver?',
    },
  ])
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = useCallback(async () => {
    if (!input.trim() || loading) return

    const userMsg: ChatMessage = { role: 'user', content: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const reply = buildSimulatedReply(userMsg.content)
    await new Promise<void>((resolve) => setTimeout(resolve, 550))
    setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    setLoading(false)
  }, [input, loading])

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4 h-full fade-in-up">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#60c0ff' }}>
          Chat con IA (simulador técnico)
        </h1>
        <p className="text-sm" style={{ color: '#3a6080' }}>
          Modo simulador. Respuestas técnicas sobre Cisco, Linux y redes.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pb-2" style={{ minHeight: '400px' }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-xs lg:max-w-md px-4 py-3 rounded-xl text-sm"
              style={{
                background: m.role === 'user' ? 'rgba(0,100,255,0.2)' : 'rgba(0,200,180,0.06)',
                color: m.role === 'user' ? '#80c0f0' : '#80d0c8',
                border: m.role === 'user'
                  ? '1px solid rgba(0,120,255,0.3)'
                  : '1px solid rgba(0,200,180,0.15)',
              }}
            >
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{m.content}</pre>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div
              className="px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(0,200,180,0.06)', border: '1px solid rgba(0,200,180,0.15)', color: '#3a8080' }}
            >
              Analizando...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="pro-card rounded-xl flex gap-2 p-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Escribe tu pregunta sobre redes... (Enter para enviar)"
          rows={2}
          className="flex-1 px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: 'var(--surface-strong)', border: '1px solid var(--border-soft)', color: 'var(--text-primary)' }}
        />
        <button
          onClick={send}
          disabled={loading}
          className="px-5 py-3 rounded-xl text-sm font-bold transition-all self-end"
          style={{
            background: loading ? 'rgba(0,60,120,0.2)' : 'rgba(0,120,255,0.2)',
            color: loading ? '#2a5070' : '#60c0ff',
            border: '1px solid #0055cc',
          }}
        >
          {loading ? '...' : 'Enviar'}
        </button>
      </div>
    </div>
  )
}

export default AIChat

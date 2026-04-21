import { useState } from 'react'

function ipToInt(ip) {
  return ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0
}

function intToIp(int) {
  return [24, 16, 8, 0].map(shift => (int >>> shift) & 255).join('.')
}

function calcSubnet(ip, prefix) {
  const mask     = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0
  const ipInt    = ipToInt(ip)
  const network  = (ipInt & mask) >>> 0
  const broadcast= (network | (~mask >>> 0)) >>> 0
  const firstHost= prefix < 31 ? network + 1 : network
  const lastHost = prefix < 31 ? broadcast - 1 : broadcast
  const hosts    = prefix < 31 ? Math.pow(2, 32 - prefix) - 2 : 1

  return {
    network:   intToIp(network),
    broadcast: intToIp(broadcast),
    firstHost: intToIp(firstHost),
    lastHost:  intToIp(lastHost),
    mask:      intToIp(mask),
    hosts,
    cidr:      `${intToIp(network)}/${prefix}`,
  }
}

function isValidIP(ip) {
  const parts = ip.split('.')
  if (parts.length !== 4) return false
  return parts.every(p => !isNaN(p) && parseInt(p) >= 0 && parseInt(p) <= 255)
}

function ResultRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 px-4"
      style={{ borderBottom: '1px solid #0d2040' }}>
      <span className="text-sm" style={{ color: '#4a7090' }}>{label}</span>
      <span className="text-sm font-mono font-bold" style={{ color: '#60c0ff' }}>{value}</span>
    </div>
  )
}

function SubnetCalc() {
  const [ip, setIp]         = useState('192.168.1.0')
  const [prefix, setPrefix] = useState(24)
  const [result, setResult] = useState(null)
  const [error, setError]   = useState('')
  const [decVal, setDecVal] = useState('')
  const [binVal, setBinVal] = useState('')
  const [hexVal, setHexVal] = useState('')

  const calculate = () => {
    if (!isValidIP(ip)) {
      setError('Dirección IP no válida. Ejemplo correcto: 192.168.1.0')
      setResult(null)
      return
    }
    setError('')
    setResult(calcSubnet(ip, parseInt(prefix)))
  }

  const convertDec = (val) => {
    setDecVal(val)
    const n = parseInt(val)
    if (!isNaN(n) && n >= 0) {
      setBinVal(n.toString(2))
      setHexVal(n.toString(16).toUpperCase())
    } else {
      setBinVal('')
      setHexVal('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#60c0ff' }}>
          Calculadora de Subredes IP
        </h1>
        <p className="text-sm" style={{ color: '#3a6080' }}>
          Ingresa una dirección IP y un prefijo para obtener todos los datos de la subred.
        </p>
      </div>

      <div className="rounded-xl p-5 flex flex-col gap-4"
        style={{ background: '#050d1a', border: '1px solid #1e3a5f' }}>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest" style={{ color: '#3a6080' }}>
            Dirección IP
          </label>
          <input
            value={ip}
            onChange={e => setIp(e.target.value)}
            placeholder="192.168.1.0"
            className="px-4 py-3 rounded-lg text-sm outline-none w-full"
            style={{ background: '#0a1628', border: '1px solid #1e3a5f', color: '#c0d8f0' }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest" style={{ color: '#3a6080' }}>
            Prefijo: /{prefix}
          </label>
          <input
            type="range" min="1" max="32" value={prefix}
            onChange={e => setPrefix(e.target.value)}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs" style={{ color: '#1e3a5f' }}>
            <span>/1</span><span>/8</span><span>/16</span><span>/24</span><span>/32</span>
          </div>
        </div>

        {error && (
          <p className="text-sm px-3 py-2 rounded-lg"
            style={{ background: 'rgba(255,60,40,0.1)', color: '#ff6040', border: '1px solid rgba(255,60,40,0.2)' }}>
            {error}
          </p>
        )}

        <button onClick={calculate}
          className="py-3 rounded-lg font-bold text-sm transition-all"
          style={{ background: 'rgba(0,120,255,0.2)', color: '#60c0ff', border: '1px solid #0055cc' }}>
          Calcular subred
        </button>
      </div>

      {result && (
        <div className="rounded-xl overflow-hidden"
          style={{ background: '#050d1a', border: '1px solid #1e3a5f' }}>
          <div className="px-4 py-3" style={{ borderBottom: '1px solid #1e3a5f', background: '#030a14' }}>
            <span className="text-xs uppercase tracking-widest" style={{ color: '#3a6080' }}>Resultados</span>
          </div>
          <ResultRow label="Notación CIDR"         value={result.cidr} />
          <ResultRow label="Máscara de subred"      value={result.mask} />
          <ResultRow label="Dirección de red"       value={result.network} />
          <ResultRow label="Primer host válido"     value={result.firstHost} />
          <ResultRow label="Último host válido"     value={result.lastHost} />
          <ResultRow label="Broadcast"              value={result.broadcast} />
          <ResultRow label="Hosts disponibles"      value={result.hosts.toLocaleString()} />
        </div>
      )}

      <div className="rounded-xl p-5 flex flex-col gap-4"
        style={{ background: '#050d1a', border: '1px solid #1e3a5f' }}>
        <div className="text-xs uppercase tracking-widest" style={{ color: '#3a6080' }}>
          Conversor de bases numéricas
        </div>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Decimal',     value: decVal, onChange: convertDec,  placeholder: 'Ej: 255' },
            { label: 'Binario',     value: binVal, onChange: null,         placeholder: 'Resultado' },
            { label: 'Hexadecimal', value: hexVal, onChange: null,         placeholder: 'Resultado' },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="text-xs w-24 text-right" style={{ color: '#3a6080' }}>{f.label}</span>
              <input
                value={f.value}
                onChange={f.onChange ? e => f.onChange(e.target.value) : undefined}
                readOnly={!f.onChange}
                placeholder={f.placeholder}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-mono outline-none"
                style={{
                  background: f.onChange ? '#0a1628' : '#030a14',
                  border: '1px solid #1e3a5f',
                  color: f.onChange ? '#c0d8f0' : '#60c0ff'
                }}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default SubnetCalc
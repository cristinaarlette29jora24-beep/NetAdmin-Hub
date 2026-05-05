import { useState } from 'react'
import type { SubnetResult, ResultRowProps } from '../../types'

function ipToInt(ip: string): number {
  return ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0
}

function intToIp(int: number): string {
  return [24, 16, 8, 0].map((shift) => (int >>> shift) & 255).join('.')
}

function calcSubnet(ip: string, prefix: number): SubnetResult {
  const mask      = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  const ipInt     = ipToInt(ip)
  const network   = (ipInt & mask) >>> 0
  const broadcast = (network | (~mask >>> 0)) >>> 0
  const firstHost = prefix < 31 ? network + 1 : network
  const lastHost  = prefix < 31 ? broadcast - 1 : broadcast
  const hosts     = prefix < 31 ? Math.pow(2, 32 - prefix) - 2 : 1

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

function isValidIP(ip: string): boolean {
  const parts = ip.split('.')
  if (parts.length !== 4) return false
  return parts.every((p) => !isNaN(Number(p)) && parseInt(p) >= 0 && parseInt(p) <= 255)
}

function ResultRow({ label, value }: ResultRowProps) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-3 px-4 rounded-lg"
      style={{ background: 'rgba(6,18,42,0.72)', border: '1px solid rgba(96,165,250,0.2)' }}
    >
      <span className="text-xs sm:text-sm" style={{ color: '#88a8d8' }}>{label}</span>
      <span className="text-xs sm:text-sm font-mono font-bold break-all" style={{ color: '#b9c8ff' }}>{value}</span>
    </div>
  )
}

interface ConverterField {
  label: string
  value: string
  onChange: ((val: string) => void) | null
  placeholder: string
}

function SubnetCalc() {
  const [ip, setIp]         = useState<string>('192.168.1.0')
  const [prefix, setPrefix] = useState<number>(24)
  const [result, setResult] = useState<SubnetResult | null>(null)
  const [error, setError]   = useState<string>('')
  const [decVal, setDecVal] = useState<string>('')
  const [binVal, setBinVal] = useState<string>('')
  const [hexVal, setHexVal] = useState<string>('')

  const calculate = () => {
    if (!isValidIP(ip)) {
      setError('Dirección IP no válida. Ejemplo correcto: 192.168.1.0')
      setResult(null)
      return
    }
    setError('')
    setResult(calcSubnet(ip, prefix))
  }

  const convertDec = (val: string) => {
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

  const converterFields: ConverterField[] = [
    { label: 'Decimal',     value: decVal, onChange: convertDec, placeholder: 'Ej: 255' },
    { label: 'Binario',     value: binVal, onChange: null,        placeholder: 'Resultado' },
    { label: 'Hexadecimal', value: hexVal, onChange: null,        placeholder: 'Resultado' },
  ]

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8 fade-in-up">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#c4b5fd' }}>
          Calculadora de Subredes IP
        </h1>
        <p className="text-sm sm:text-base" style={{ color: '#b1c6ea' }}>
          Ingresa una dirección IP y un prefijo para obtener todos los datos de la subred.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
        <div
          className="pro-card rounded-2xl p-5 sm:p-7 flex flex-col gap-5 shadow-2xl"
          style={{
            background: 'linear-gradient(155deg, rgba(16,35,88,0.72), rgba(52,30,115,0.66))',
            border: '1px solid rgba(167,139,250,0.45)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest" style={{ color: '#c7d7ff' }}>
              Dirección IP
            </label>
            <input
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="192.168.1.0"
              className="px-4 py-3 rounded-xl text-sm sm:text-base outline-none w-full"
              style={{ background: 'rgba(2,12,34,0.85)', border: '1px solid rgba(129,140,248,0.45)', color: '#dbe7ff' }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest" style={{ color: '#c7d7ff' }}>
              Prefijo: /{prefix}
            </label>
            <input
              type="range" min="1" max="32" value={prefix}
              onChange={(e) => setPrefix(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: '#8b5cf6' }}
            />
            <div className="flex justify-between text-xs" style={{ color: '#93a9d3' }}>
              <span>/1</span><span>/8</span><span>/16</span><span>/24</span><span>/32</span>
            </div>
          </div>

          {error && (
            <p className="text-sm px-3 py-2 rounded-lg"
              style={{ background: 'rgba(255,60,40,0.1)', color: '#ff6040', border: '1px solid rgba(255,60,40,0.2)' }}>
              {error}
            </p>
          )}

          <button
            onClick={calculate}
            className="py-3 rounded-xl font-bold text-sm sm:text-base transition-all"
            style={{
              background: 'linear-gradient(90deg, rgba(59,130,246,0.42), rgba(124,58,237,0.52))',
              color: '#e7ecff',
              border: '1px solid rgba(196,181,253,0.6)',
            }}
          >
            Calcular subred
          </button>
        </div>

        {result && (
          <div
            className="rounded-2xl p-4 sm:p-5 flex flex-col gap-3"
            style={{
              background: 'linear-gradient(155deg, rgba(7,20,48,0.78), rgba(32,28,86,0.7))',
              border: '1px solid rgba(96,165,250,0.35)',
            }}
          >
            <span className="text-xs uppercase tracking-widest" style={{ color: '#8fb2f0' }}>Resultados</span>
            <ResultRow label="Notación CIDR"     value={result.cidr} />
            <ResultRow label="Máscara de subred"  value={result.mask} />
            <ResultRow label="Dirección de red"   value={result.network} />
            <ResultRow label="Primer host válido" value={result.firstHost} />
            <ResultRow label="Último host válido" value={result.lastHost} />
            <ResultRow label="Broadcast"          value={result.broadcast} />
            <ResultRow label="Hosts disponibles"  value={result.hosts.toLocaleString()} />
          </div>
        )}
      </div>

      <div
        className="pro-card rounded-2xl p-5 sm:p-7 flex flex-col gap-5 shadow-2xl"
        style={{
          background: 'linear-gradient(155deg, rgba(16,35,88,0.72), rgba(52,30,115,0.66))',
          border: '1px solid rgba(167,139,250,0.45)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="text-xs uppercase tracking-widest" style={{ color: '#c7d7ff' }}>
          Conversor de bases numéricas
        </div>
        <div className="flex flex-col gap-4">
          {converterFields.map((f) => (
            <div key={f.label} className="grid grid-cols-1 md:grid-cols-[130px_1fr] items-center gap-2 md:gap-4">
              <span className="text-xs md:text-right uppercase tracking-wider" style={{ color: '#c7d7ff' }}>{f.label}</span>
              <input
                value={f.value}
                onChange={f.onChange ? (e) => f.onChange!(e.target.value) : undefined}
                readOnly={!f.onChange}
                placeholder={f.placeholder}
                className="w-full px-4 py-3 rounded-xl text-sm md:text-base font-mono outline-none"
                style={{
                  background: f.onChange ? 'rgba(2,12,34,0.85)' : 'rgba(6,18,42,0.88)',
                  border: '1px solid rgba(129,140,248,0.45)',
                  color: f.onChange ? '#dbe7ff' : '#b9c8ff',
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

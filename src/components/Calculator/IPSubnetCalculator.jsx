import { useMemo, useState } from 'react'

function ipToInt(ip) {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0
}

function intToIp(value) {
  return [24, 16, 8, 0].map((shift) => (value >>> shift) & 255).join('.')
}

function isValidIp(ip) {
  const parts = ip.trim().split('.')
  if (parts.length !== 4) return false
  return parts.every((part) => {
    if (part === '' || Number.isNaN(Number(part))) return false
    const octet = Number(part)
    return Number.isInteger(octet) && octet >= 0 && octet <= 255
  })
}

function normalizePrefix(maskInput) {
  const trimmed = maskInput.trim()
  if (trimmed.startsWith('/')) {
    const value = Number(trimmed.slice(1))
    return Number.isInteger(value) ? value : null
  }

  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed)
  }

  if (!isValidIp(trimmed)) {
    return null
  }

  const maskInt = ipToInt(trimmed)
  let foundZero = false
  let prefix = 0

  for (let bit = 31; bit >= 0; bit -= 1) {
    const isOne = ((maskInt >>> bit) & 1) === 1
    if (isOne && foundZero) return null
    if (!isOne) foundZero = true
    if (isOne) prefix += 1
  }

  return prefix
}

function calculateSubnet(ip, prefix) {
  const ipInt = ipToInt(ip)
  const maskInt = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  const networkInt = (ipInt & maskInt) >>> 0
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0

  const firstHostInt = prefix >= 31 ? networkInt : networkInt + 1
  const lastHostInt = prefix >= 31 ? broadcastInt : broadcastInt - 1
  const usableHosts = prefix >= 31 ? (prefix === 31 ? 2 : 1) : (2 ** (32 - prefix)) - 2

  return {
    network: intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    firstHost: intToIp(firstHostInt),
    lastHost: intToIp(lastHostInt),
    usableHosts,
    mask: intToIp(maskInt),
    prefix,
  }
}

function ResultItem({ label, value }) {
  return (
    <div
      className="flex items-center justify-between rounded-lg px-4 py-3"
      style={{ background: '#0a1628', border: '1px solid #1e3a5f' }}
    >
      <span className="text-sm" style={{ color: '#4a7090' }}>
        {label}
      </span>
      <span className="text-sm font-mono font-semibold" style={{ color: '#60c0ff' }}>
        {value}
      </span>
    </div>
  )
}

function IPSubnetCalculator() {
  const [ip, setIp] = useState('192.168.10.45')
  const [mask, setMask] = useState('/24')
  const [submitted, setSubmitted] = useState(false)

  const validation = useMemo(() => {
    if (!submitted) return { valid: true, error: '', prefix: null }
    if (!isValidIp(ip)) {
      return { valid: false, error: 'La IP no es válida. Usa formato como 192.168.1.10', prefix: null }
    }

    const parsedPrefix = normalizePrefix(mask)
    if (parsedPrefix === null || parsedPrefix < 0 || parsedPrefix > 32) {
      return {
        valid: false,
        error: 'La máscara no es válida. Usa /24, 24 o 255.255.255.0',
        prefix: null,
      }
    }

    return { valid: true, error: '', prefix: parsedPrefix }
  }, [ip, mask, submitted])

  const result = useMemo(() => {
    if (!validation.valid || validation.prefix === null) return null
    return calculateSubnet(ip.trim(), validation.prefix)
  }, [ip, validation])

  const handleCalculate = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#60c0ff' }}>
          Calculadora de Subredes (IP + Máscara)
        </h1>
        <p className="mt-1 text-sm" style={{ color: '#3a6080' }}>
          Ingresa una IP y una máscara para calcular red, rango de hosts y broadcast.
        </p>
      </div>

      <form
        onSubmit={handleCalculate}
        className="rounded-xl p-5"
        style={{ background: '#050d1a', border: '1px solid #1e3a5f' }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest" style={{ color: '#3a6080' }}>
              Dirección IP
            </span>
            <input
              type="text"
              value={ip}
              onChange={(event) => setIp(event.target.value)}
              placeholder="192.168.10.45"
              className="rounded-lg px-4 py-3 text-sm outline-none"
              style={{ background: '#0a1628', border: '1px solid #1e3a5f', color: '#c0d8f0' }}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest" style={{ color: '#3a6080' }}>
              Máscara / Prefijo
            </span>
            <input
              type="text"
              value={mask}
              onChange={(event) => setMask(event.target.value)}
              placeholder="/24 o 255.255.255.0"
              className="rounded-lg px-4 py-3 text-sm outline-none"
              style={{ background: '#0a1628', border: '1px solid #1e3a5f', color: '#c0d8f0' }}
            />
          </label>
        </div>

        {submitted && !validation.valid && (
          <p
            className="mt-4 rounded-lg px-3 py-2 text-sm"
            style={{
              background: 'rgba(255,60,40,0.1)',
              color: '#ff6040',
              border: '1px solid rgba(255,60,40,0.2)',
            }}
          >
            {validation.error}
          </p>
        )}

        <button
          type="submit"
          className="mt-4 rounded-lg px-5 py-3 text-sm font-bold transition-all"
          style={{ background: 'rgba(0,120,255,0.2)', color: '#60c0ff', border: '1px solid #0055cc' }}
        >
          Calcular rango
        </button>
      </form>

      {result && (
        <div className="grid gap-3">
          <ResultItem label="Red (CIDR)" value={`${result.network}/${result.prefix}`} />
          <ResultItem label="Máscara decimal" value={result.mask} />
          <ResultItem label="Rango utilizable" value={`${result.firstHost} - ${result.lastHost}`} />
          <ResultItem label="Broadcast" value={result.broadcast} />
          <ResultItem label="Hosts utilizables" value={result.usableHosts.toLocaleString()} />
        </div>
      )}
    </section>
  )
}

export default IPSubnetCalculator

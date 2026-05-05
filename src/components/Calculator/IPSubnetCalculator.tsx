import { db, auth } from '../../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useMemo, useState, useEffect } from 'react'
import type { SubnetResultSimple, ValidationResult, ResultItemProps } from '../../types'

function ipToInt(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0
}

function intToIp(value: number): string {
  return [24, 16, 8, 0].map((shift) => (value >>> shift) & 255).join('.')
}

function isValidIp(ip: string): boolean {
  const parts = ip.trim().split('.')
  if (parts.length !== 4) return false
  return parts.every((part) => {
    const octet = Number(part)
    return !isNaN(octet) && octet >= 0 && octet <= 255
  })
}

function normalizePrefix(maskInput: string): number | null {
  const trimmed = maskInput.trim()
  if (trimmed.startsWith('/')) return Number(trimmed.slice(1))
  if (/^\d+$/.test(trimmed)) return Number(trimmed)
  if (!isValidIp(trimmed)) return null
  const maskInt = ipToInt(trimmed)
  let prefix = 0
  for (let bit = 31; bit >= 0; bit--) {
    if (((maskInt >>> bit) & 1) === 1) prefix++
    else break
  }
  return prefix
}

function calculateSubnet(ip: string, prefix: number): SubnetResultSimple {
  const ipInt      = ipToInt(ip)
  const maskInt    = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  const networkInt = (ipInt & maskInt) >>> 0
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0
  return {
    network:   intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    mask:      intToIp(maskInt),
    prefix,
  }
}

function ResultItem({ label, value }: ResultItemProps) {
  return (
    <div
      className="flex justify-between p-3 rounded"
      style={{ background: '#0a1628', border: '1px solid #1e3a5f' }}
    >
      <span style={{ color: '#4a7090' }}>{label}</span>
      <span style={{ color: '#60c0ff' }} className="font-mono">{value}</span>
    </div>
  )
}

export default function IPSubnetCalculator() {
  const [ip, setIp]             = useState<string>('192.168.10.45')
  const [mask, setMask]         = useState<string>('/24')
  const [submitted, setSubmitted] = useState<boolean>(false)

  const validation = useMemo<ValidationResult>(() => {
    if (!submitted) return { valid: true, prefix: null }
    if (!isValidIp(ip)) return { valid: false, error: 'IP no válida' }
    const p = normalizePrefix(mask)
    if (p === null || p < 0 || p > 32) return { valid: false, error: 'Máscara no válida' }
    return { valid: true, prefix: p }
  }, [ip, mask, submitted])

  const result = useMemo<SubnetResultSimple | null>(() => {
    if (!validation.valid || validation.prefix == null) return null
    return calculateSubnet(ip, validation.prefix)
  }, [ip, validation])

  useEffect(() => {
    const guardar = async () => {
      if (submitted && result) {
        try {
          const user = auth.currentUser
          if (user) {
            await addDoc(collection(db, 'historial_calculos'), {
              email: user.email,
              ip,
              red: `${result.network}/${result.prefix}`,
              fecha: serverTimestamp(),
            })
          }
        } catch (e) {
          console.error('Error al guardar:', e)
        }
      }
    }
    guardar()
  }, [result, submitted, ip])

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4" style={{ color: '#60c0ff' }}>
        Calculadora de Subredes
      </h2>

      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setSubmitted(true) }}
        className="grid gap-4"
      >
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest" style={{ color: '#3a6080' }}>
            Dirección IP
          </label>
          <input
            value={ip}
            onChange={(e) => { setIp(e.target.value); setSubmitted(false) }}
            className="p-3 rounded bg-[#0a1628] border border-[#1e3a5f] text-white outline-none"
            placeholder="192.168.1.1"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest" style={{ color: '#3a6080' }}>
            Máscara / Prefijo
          </label>
          <input
            value={mask}
            onChange={(e) => { setMask(e.target.value); setSubmitted(false) }}
            className="p-3 rounded bg-[#0a1628] border border-[#1e3a5f] text-white outline-none"
            placeholder="/24 o 255.255.255.0"
          />
        </div>

        {submitted && !validation.valid && (
          <p className="mt-2 text-sm" style={{ color: '#ff6040' }}>{validation.error}</p>
        )}

        <button
          type="submit"
          className="mt-4 w-full rounded-lg px-5 py-3 text-sm font-bold transition-all hover:opacity-90"
          style={{ background: '#2563eb', color: 'white' }}
        >
          CALCULAR Y GUARDAR EN NUBE
        </button>
      </form>

      {result && (
        <div className="mt-8 grid gap-3 fade-in">
          <ResultItem label="Red (CIDR)"        value={`${result.network}/${result.prefix}`} />
          <ResultItem label="Máscara de subred" value={result.mask} />
          <ResultItem label="Broadcast"         value={result.broadcast} />
        </div>
      )}
    </div>
  )
}

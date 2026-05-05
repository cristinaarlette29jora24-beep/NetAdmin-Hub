export interface SubnetResult {
  network: string
  broadcast: string
  firstHost: string
  lastHost: string
  subnetMask: string
  wildcardMask: string
  cidr: string
  totalHosts: number
}

function ipToInt(ip: string): number {
  return ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0
}

function intToIp(int: number): string {
  return [24, 16, 8, 0].map((shift) => (int >>> shift) & 255).join('.')
}

export function isValidIp(ip: string): boolean {
  const parts = ip.split('.')
  if (parts.length !== 4) return false
  return parts.every((p) => !isNaN(Number(p)) && parseInt(p) >= 0 && parseInt(p) <= 255)
}

export function isValidPrefix(prefix: number): boolean {
  return Number.isInteger(prefix) && prefix >= 0 && prefix <= 32
}

export function calculateSubnet(ip: string, prefix: number): SubnetResult {
  const maskInt      = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  const ipInt        = ipToInt(ip)
  const networkInt   = (ipInt & maskInt) >>> 0
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0
  const firstHost    = prefix < 31 ? networkInt + 1 : networkInt
  const lastHost     = prefix < 31 ? broadcastInt - 1 : broadcastInt
  const totalHosts   = prefix < 31 ? Math.pow(2, 32 - prefix) - 2 : 1

  return {
    network:     intToIp(networkInt),
    broadcast:   intToIp(broadcastInt),
    firstHost:   intToIp(firstHost),
    lastHost:    intToIp(lastHost),
    subnetMask:  intToIp(maskInt),
    wildcardMask: intToIp(~maskInt >>> 0),
    cidr:        `${intToIp(networkInt)}/${prefix}`,
    totalHosts,
  }
}

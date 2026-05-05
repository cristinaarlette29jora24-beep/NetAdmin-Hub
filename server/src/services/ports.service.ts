export interface Port {
  port: number
  name: string
  protocol: 'TCP' | 'UDP' | 'TCP/UDP'
  description: string
}

const ports: Port[] = [
  { port: 20,   name: 'FTP-DATA', protocol: 'TCP',     description: 'Transferencia de datos FTP' },
  { port: 21,   name: 'FTP',      protocol: 'TCP',     description: 'Control de conexión FTP' },
  { port: 22,   name: 'SSH',      protocol: 'TCP',     description: 'Secure Shell - acceso remoto cifrado' },
  { port: 23,   name: 'Telnet',   protocol: 'TCP',     description: 'Acceso remoto sin cifrar (obsoleto)' },
  { port: 25,   name: 'SMTP',     protocol: 'TCP',     description: 'Envío de correo electrónico' },
  { port: 53,   name: 'DNS',      protocol: 'TCP/UDP', description: 'Resolución de nombres de dominio' },
  { port: 67,   name: 'DHCP',     protocol: 'UDP',     description: 'Servidor DHCP - asignación de IPs' },
  { port: 68,   name: 'DHCP',     protocol: 'UDP',     description: 'Cliente DHCP' },
  { port: 80,   name: 'HTTP',     protocol: 'TCP',     description: 'Hypertext Transfer Protocol' },
  { port: 110,  name: 'POP3',     protocol: 'TCP',     description: 'Recepción de correo (Post Office Protocol)' },
  { port: 123,  name: 'NTP',      protocol: 'UDP',     description: 'Sincronización de tiempo de red' },
  { port: 143,  name: 'IMAP',     protocol: 'TCP',     description: 'Gestión de correo en servidor' },
  { port: 161,  name: 'SNMP',     protocol: 'UDP',     description: 'Simple Network Management Protocol' },
  { port: 443,  name: 'HTTPS',    protocol: 'TCP',     description: 'HTTP seguro sobre TLS/SSL' },
  { port: 445,  name: 'SMB',      protocol: 'TCP',     description: 'Compartición de archivos Windows' },
  { port: 3306, name: 'MySQL',    protocol: 'TCP',     description: 'Base de datos MySQL/MariaDB' },
  { port: 3389, name: 'RDP',      protocol: 'TCP',     description: 'Remote Desktop Protocol - escritorio remoto Windows' },
  { port: 5432, name: 'PostgreSQL', protocol: 'TCP',   description: 'Base de datos PostgreSQL' },
  { port: 6379, name: 'Redis',    protocol: 'TCP',     description: 'Base de datos en memoria Redis' },
  { port: 8080, name: 'HTTP-ALT', protocol: 'TCP',     description: 'Puerto HTTP alternativo' },
  { port: 8443, name: 'HTTPS-ALT', protocol: 'TCP',    description: 'Puerto HTTPS alternativo' },
  { port: 27017, name: 'MongoDB', protocol: 'TCP',     description: 'Base de datos MongoDB' },
]

export const portsService = {
  getAll: (): Port[] => ports,

  getByPort: (portNumber: number): Port | undefined =>
    ports.find((p) => p.port === portNumber),
}

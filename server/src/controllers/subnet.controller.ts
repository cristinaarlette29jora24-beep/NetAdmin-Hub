import { Request, Response } from 'express'
import { calculateSubnet, isValidIp, isValidPrefix } from '../services/subnet.service'

export const subnetController = {
  calculate: (req: Request, res: Response): void => {
    const { ip, prefix } = req.body as { ip?: string; prefix?: number }

    if (!ip || prefix === undefined) {
      res.status(400).json({ error: 'Se requieren los campos ip y prefix' })
      return
    }

    if (!isValidIp(ip)) {
      res.status(400).json({ error: 'Dirección IP no válida. Ejemplo: 192.168.1.0' })
      return
    }

    if (!isValidPrefix(Number(prefix))) {
      res.status(400).json({ error: 'El prefijo debe ser un número entre 0 y 32' })
      return
    }

    try {
      const result = calculateSubnet(ip, Number(prefix))
      res.status(201).json(result)
    } catch {
      res.status(500).json({ error: 'Error interno al calcular la subred' })
    }
  },
}

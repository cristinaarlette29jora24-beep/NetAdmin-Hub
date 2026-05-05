import { Request, Response } from 'express'
import { portsService } from '../services/ports.service'

export const portsController = {
  getAll: (_req: Request, res: Response): void => {
    const ports = portsService.getAll()
    res.status(200).json(ports)
  },

  getByPort: (req: Request, res: Response): void => {
    const portNumber = parseInt(req.params['port'] as string)

    if (isNaN(portNumber)) {
      res.status(400).json({ error: 'El número de puerto debe ser un entero válido' })
      return
    }

    const port = portsService.getByPort(portNumber)

    if (!port) {
      res.status(404).json({ error: `Puerto ${portNumber} no encontrado` })
      return
    }

    res.status(200).json(port)
  },
}

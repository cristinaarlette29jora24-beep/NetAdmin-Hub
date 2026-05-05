import express from 'express'
import cors from 'cors'
import { config } from './config'
import portsRoutes from './routes/ports.routes'
import subnetRoutes from './routes/subnet.routes'

const app = express()

// Middlewares
app.use(cors({ origin: config.frontendUrl }))
app.use(express.json())

// Rutas
app.use('/api/v1/ports',  portsRoutes)
app.use('/api/v1/subnet', subnetRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'NetAdmin Hub API funcionando ✅' })
})

// 404 para rutas no encontradas
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.listen(config.port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`)
})

export default app

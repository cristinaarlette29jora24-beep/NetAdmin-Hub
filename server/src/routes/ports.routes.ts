import { Router } from 'express'
import { portsController } from '../controllers/ports.controller'

const router = Router()

// GET /api/v1/ports
router.get('/', portsController.getAll)

// GET /api/v1/ports/:port
router.get('/:port', portsController.getByPort)

export default router

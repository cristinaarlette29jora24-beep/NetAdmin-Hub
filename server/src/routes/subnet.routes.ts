import { Router } from 'express'
import { subnetController } from '../controllers/subnet.controller'

const router = Router()

// POST /api/v1/subnet
router.post('/', subnetController.calculate)

export default router

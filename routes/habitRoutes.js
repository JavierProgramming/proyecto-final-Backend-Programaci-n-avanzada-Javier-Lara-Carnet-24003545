import express from 'express'
import {
  getHabits,
  createHabit,
  completeHabit
} from '../controllers/habitController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', getHabits)
router.post('/', createHabit)
router.patch('/:id/complete', completeHabit)

export default router

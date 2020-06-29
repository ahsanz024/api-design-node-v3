import { Router } from 'express'

const mockController = (req, res) => {
  res.json({ message: 'Mock Controller from Item router' })
}

const router = Router()

// /api/item
router
  .route('/')
  .get(mockController)
  .post(mockController)

// /api/item/:id
router
  .route('/:id')
  .get(mockController)
  .put(mockController)
  .delete(mockController)

export default router

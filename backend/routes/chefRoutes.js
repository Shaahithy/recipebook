import express from 'express'

const router = express.Router()
import { getChefs, getChefById, deleteChef, updateChef, createChef, createChefReview } from '../controllers/chefController.js'
import { protect, admin } from '../middleware/authMiddleware.js'




router.route('/').get(getChefs).post(protect, admin, createChef)
router.route('/:id/reviews').post(protect, createChefReview)
router.route('/:id').get(getChefById)
.delete(protect, admin, deleteChef)
.put(protect, admin, updateChef)

  export default router  
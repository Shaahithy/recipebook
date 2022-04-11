import express from 'express'

const router = express.Router()
import { getUserRecipes, getUserRecipeById, deleteUserRecipe, sendUserRecipe  } from '../controllers/userRecipeController.js'
import { protect, admin } from '../middleware/authMiddleware.js'




router.route('/').post(sendUserRecipe).get(protect, admin, getUserRecipes)
router.route('/:id').delete(protect, admin, deleteUserRecipe).get(protect, admin, getUserRecipeById)
  
export default router 
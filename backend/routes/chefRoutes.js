import express from 'express'

const router = express.Router()
import { getChefs, getChefById } from '../controllers/chefController.js'





router.route('/').get(getChefs)
router.route('/:id').get(getChefById)

  export default router
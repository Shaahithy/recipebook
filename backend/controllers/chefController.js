import asyncHandler from 'express-async-handler'
import Chef from '../models/chefModel.js'

const getChefs = asyncHandler(async (req,res)=>{
    const chefs = await Chef.find({})
    res.json(chefs)

})

const getChefById = asyncHandler(async (req,res)=>{
    const chefs = await Chef.findById(req.params.id)
    const chef= await Chef.findById(req.params.id)
     if(chef) {
     res.json(chef)
     } else{
         res.status(404)
         throw new Error('Product not found')
     }

})

export {
    getChefs,
    getChefById
}
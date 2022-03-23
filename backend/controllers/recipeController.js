import asyncHandler from 'express-async-handler'
import Recipe from '../models/recipeModel.js'

const getRecipes = asyncHandler(async (req,res)=>{
    const recipes = await Recipe.find({})
    res.json(recipes)

})

const getRecipeById = asyncHandler(async (req,res)=>{
    
    const recipe= await Recipe.findById(req.params.id)
     if(recipe) {
     res.json(recipe)
     } else{
         res.status(404)
         throw new Error('Product not found')
     }

})

export {
    getRecipes,
    getRecipeById
}
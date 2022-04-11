import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import UserRecipe from "../models/userRecipeModel.js"

const getUserRecipes = asyncHandler(async (req,res)=>{
    const userRecipes = await UserRecipe.find({})
  res.json(userRecipes)
  
  })
  
  const getUserRecipeById = asyncHandler(async (req,res)=>{
      
      const userRecipe= await UserRecipe.findById(req.params.id)
       if(userRecipe) {
       res.json(userRecipe)
       } else{
           res.status(404)
           throw new Error('UserRecipe not found')
       }
  
  })
  
  const deleteUserRecipe = asyncHandler(async (req, res) => {
      const userRecipe = await UserRecipe.findById(req.params.id)
    
      if (userRecipe) {
        await userRecipe.remove()
        res.json({ message: 'Recipe removed' })
      } else {
        res.status(404)
        throw new Error('Recipe not found')
      }
    })
  
    const sendUserRecipe = asyncHandler(async (req, res) => {
        const { name, ingredients, category, description } = req.body

    
      
        const userRecipe = await UserRecipe.create({
          name,
          ingredients, 
          category, 
          description
          
        })
    
      if (userRecipe) {
        res.status(201).json({
          _id: userRecipe._id,
          name: userRecipe.name,
          ingredients: userRecipe.ingredients,
          category: userRecipe.category,
          description: userRecipe.description,
          token: generateToken(userRecipe._id),
        })
      } else {
        res.status(400)
        throw new Error('Invalid userRecipe data')
      }
    })

    export {
        getUserRecipes,
        getUserRecipeById,
        deleteUserRecipe,
        sendUserRecipe
      }
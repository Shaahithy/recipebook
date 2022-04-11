import asyncHandler from 'express-async-handler'
import Recipe from '../models/recipeModel.js'

const getRecipes = asyncHandler(async (req,res)=>{
  const keywordrecipe = req.query.keywordrecipe
  ? {
      name: {
        $regex: req.query.keywordrecipe,
        $options: 'i',
      },
    }
  : {}
    const recipes = await Recipe.find({...keywordrecipe})
    
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

const deleteRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)
  
    if (recipe) {
      await recipe.remove()
      res.json({ message: 'Recipe removed' })
    } else {
      res.status(404)
      throw new Error('Recipe not found')
    }
  })

  const createRecipe = asyncHandler(async (req, res) => {
    const recipe = new Recipe({
      name: 'Sample name',
     ingredients: 'Sample ingredient',
      user: req.user._id,
      image: '/images/sample.jpg',
      special: 'Sample Special',
      category: 'Sample category',
      
      numReviews: 0,
      description: 'Sample description',
    })
  
    const createdRecipe = await recipe.save()
    res.status(201).json(createdRecipe)
  })
  
  
  const updateRecipe = asyncHandler(async (req, res) => {
    const {
      name,
      ingredients,
      description,
      image,
      special,
      category,
      
    } = req.body
  
    const  recipe = await Recipe.findById(req.params.id)
  
    if (recipe) {
        recipe.name = name
        recipe.ingredients = ingredients
        recipe.description = description
        recipe.image = image
        recipe.special = special
        recipe.category = category
      
  
      const updatedRecipe = await  recipe.save()
      res.json(updatedRecipe)
    } else {
      res.status(404)
      throw new Error('Recipe not found')
    }
  })
  
 
  const createRecipeReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const  recipe = await Recipe.findById(req.params.id)
  
    if (recipe) {
      const alreadyReviewed = recipe.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Recipe already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      recipe.reviews.push(review)
  
      recipe.numReviews =  recipe.reviews.length
  
      recipe.rating =
      recipe.reviews.reduce((acc, item) => item.rating + acc, 0) /
      recipe.reviews.length
  
      await  recipe.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Recipe not found')
    }
  })

  
  
  
  const getTopRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({}).sort({ rating: -1 }).limit(3)
  
    res.json(recipes)
  })
  
  export {
    getRecipes,
    getRecipeById,
    deleteRecipe,
    createRecipe,
    updateRecipe,
    createRecipeReview,
   
    getTopRecipes,
  } 


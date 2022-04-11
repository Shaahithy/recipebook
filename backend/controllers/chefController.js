import asyncHandler from 'express-async-handler'
import Chef from '../models/chefModel.js'

const getChefs = asyncHandler(async (req,res)=>{

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
    const chefs = await Chef.find({...keyword})
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

const deleteChef = asyncHandler(async (req, res) => {
    const chef = await Chef.findById(req.params.id)
  
    if (chef) {
      await chef.remove()
      res.json({ message: 'Recipe Book removed' })
    } else {
      res.status(404)
      throw new Error('Recipe Book not found')
    }
  })

  const createChef = asyncHandler(async (req, res) => {
    const chef = new Chef({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      special: 'Sample Special',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })
  
    const createdChef = await chef.save()
    res.status(201).json(createdChef)
  })
  
  
  const updateChef = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      special,
      category,
      countInStock,
    } = req.body
  
    const  chef = await Chef.findById(req.params.id)
  
    if (chef) {
      chef.name = name
      chef.price = price
      chef.description = description
      chef.image = image
      chef.special = special
      chef.category = category
      chef.countInStock = countInStock
  
      const updatedChef = await chef.save()
      res.json(updatedChef)
    } else {
      res.status(404)
      throw new Error('Recipe Book not found')
    }
  })
  
 
  const createChefReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const chef = await Chef.findById(req.params.id)
  
    if (chef) {
      const alreadyReviewed = chef.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('RecipeBook already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      chef.reviews.push(review)
  
      chef.numReviews = chef.reviews.length
  
      chef.rating =
        chef.reviews.reduce((acc, item) => item.rating + acc, 0) /
        chef.reviews.length
  
      await chef.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
  
  
  const getTopChefs = asyncHandler(async (req, res) => {
    const chefs = await Chef.find({}).sort({ rating: -1 }).limit(3)
  
    res.json(chefs)
  })
  
  export {
    getChefs,
    getChefById,
    deleteChef,
    createChef,
    updateChef,
    createChefReview,
    getTopChefs,
  } 


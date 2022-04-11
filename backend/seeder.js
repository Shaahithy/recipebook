import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import chefs from './data/Chefs.js'
import recipes from './data/Recipes.js'
import User from './models/userModel.js'
import Chef from './models/chefModel.js'
import Order from './models/orderModel.js'  
import Recipe from './models/recipeModel.js'
import connectDB from './config/db.js'
import UserRecipe from './models/userRecipeModel.js'

dotenv.config()

connectDB()

const importData = async () => {
    try{
        await Order.deleteMany()
        await Chef.deleteMany()
        await User.deleteMany()
        await Recipe.deleteMany()
        await UserRecipe.deleteMany()


        
        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleChefs = chefs.map(chef => {
return{...chef, user: adminUser}
        })
        const sampleRecipes = recipes.map(recipe => {
            return{...recipe, user: adminUser}
                    })
                    

        await Chef.insertMany(sampleChefs)
        await Recipe.insertMany(sampleRecipes)
        
        console.log('Data Imported!' .green.inverse)
        process.exit()
    } catch(error){
console.error(`${error}.red.inverse`)
process.exit
    }

    
}

const destroyData = async () => {
    try{
        await Order.deleteMany()
        await Chef.deleteMany()
        await User.deleteMany()
        await Recipe.deleteMany()
        await UserRecipe.deleteMany()


        
        console.log('Data Destroyed!' .red.inverse)
        process.exit()
    } catch(error){
console.error(`${error}.red.inverse`)
process.exit
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}
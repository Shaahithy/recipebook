import mongoose from 'mongoose'



const userRecipeSchema = mongoose.Schema(
    {
        /*user:{
type: mongoose.Schema.Types.ObjectId,
required: true,
ref: 'User'
        },*/
name: {
    type: String,
    required: true,
},

ingredients: {
    type: String,
    required: true,
},
category: {
    type: String,
    required: true,
},
description: {
    type: String,
    required: true,
},



}, {
    timestamps: true
})
const UserRecipe = mongoose.model('UserRecipe', userRecipeSchema)
export default UserRecipe
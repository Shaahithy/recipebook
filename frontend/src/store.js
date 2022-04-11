import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {chefListReducer, chefDetailsReducer, chefDeleteReducer, chefCreateReducer, chefUpdateReducer, chefReviewCreateReducer} from './reducers/chefReducers'
import {recipeListReducer, recipeDetailsReducer, recipeDeleteReducer, recipeCreateReducer, recipeUpdateReducer, recipeReviewCreateReducer} from './reducers/recipeReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers'
import { userRecipeDeleteReducer, userRecipeListReducer, userRecipeSendReducer, userRecipeDetailsReducer } from './reducers/userRecipeReducers'
const reducer = combineReducers({
    chefList: chefListReducer,
    chefDetails: chefDetailsReducer,
    recipeList: recipeListReducer,
    recipeDetails: recipeDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
   orderDetails: orderDetailsReducer,
   orderPay: orderPayReducer,
   orderDeliver: orderDeliverReducer,
   orderListMy: orderListMyReducer,
   orderList: orderListReducer,
   userList: userListReducer,
   userDelete: userDeleteReducer,
   userUpdate: userUpdateReducer,
   chefDelete: chefDeleteReducer,
   chefCreate: chefCreateReducer,
   chefUpdate: chefUpdateReducer,
   recipeDelete: recipeDeleteReducer,
   recipeCreate: recipeCreateReducer,
   recipeUpdate: recipeUpdateReducer,
   chefReviewCreate: chefReviewCreateReducer,
   recipeReviewCreate: recipeReviewCreateReducer,
   userRecipeSend : userRecipeSendReducer,
   userRecipeDelete: userRecipeDeleteReducer,
   userRecipeList: userRecipeListReducer,
   userRecipeDetails: userRecipeDetailsReducer,
   
})

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}



const initialState = {
    cart: { cartItems: cartItemFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage},
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store
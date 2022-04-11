import {
    USERRECIPE_DETAILS_FAIL,
    USERRECIPE_DETAILS_REQUEST,
    USERRECIPE_DETAILS_RESET,
    USERRECIPE_DETAILS_SUCCESS,
  
    USERRECIPE_LIST_REQUEST,
    USERRECIPE_LIST_SUCCESS,
    USERRECIPE_LIST_FAIL,
    USERRECIPE_LIST_RESET,
  
    USERRECIPE_SEND_FAIL,
    USERRECIPE_SEND_REQUEST,
    USERRECIPE_SEND_SUCCESS,
    
    USERRECIPE_DELETE_REQUEST,
    USERRECIPE_DELETE_SUCCESS,
    USERRECIPE_DELETE_FAIL,
    USERRECIPE_SEND_RESET,
    
  } from '../constants/userRecipeConstants'
  
  
  export const userRecipeSendReducer = (state = {}, action) => {
    switch (action.type) {
      case USERRECIPE_SEND_REQUEST:
        return { loading: true }
      case USERRECIPE_SEND_SUCCESS:
        return { loading: false, userRecipeInfo: action.payload }
      case USERRECIPE_SEND_FAIL:
        return { loading: false, error: action.payload }
      case USERRECIPE_SEND_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const userRecipeDetailsReducer = (state = { userRecipe: {} }, action) => {
    switch (action.type) {
      case USERRECIPE_DETAILS_REQUEST:
        return { ...state, loading: true }
      case USERRECIPE_DETAILS_SUCCESS:
        return { loading: false, userRecipe: action.payload }
      case USERRECIPE_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      case USERRECIPE_DETAILS_RESET:
        return { userRecipe: {} }
      default:
        return state
    }
  }
  
  export const userRecipeListReducer = (state = { userRecipes: [] }, action) => {
    switch (action.type) {
      case USERRECIPE_LIST_REQUEST:
        return { loading: true }
      case USERRECIPE_LIST_SUCCESS:
        return { loading: false, userRecipes: action.payload }
      case USERRECIPE_LIST_FAIL:
        return { loading: false, error: action.payload }
      case USERRECIPE_LIST_RESET:
        return { userRecipes: [] }
      default:
        return state
    }
  }
  
  export const userRecipeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case USERRECIPE_DELETE_REQUEST:
        return { loading: true }
      case USERRECIPE_DELETE_SUCCESS:
        return { loading: false, success: true }
      case USERRECIPE_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
import {CHEF_CREATE_REVIEW_REQUEST, CHEF_CREATE_REVIEW_SUCCESS, CHEF_CREATE_REVIEW_FAIL, CHEF_CREATE_REVIEW_RESET,  CHEF_CREATE_REQUEST, CHEF_CREATE_SUCCESS, CHEF_CREATE_FAIL, CHEF_CREATE_RESET, CHEF_UPDATE_REQUEST, CHEF_UPDATE_SUCCESS, CHEF_UPDATE_FAIL, CHEF_UPDATE_RESET, CHEF_DELETE_REQUEST, CHEF_DELETE_SUCCESS, CHEF_DELETE_FAIL, CHEF_LIST_REQUEST, CHEF_LIST_SUCCESS, CHEF_LIST_FAIL, CHEF_DETAILS_REQUEST, CHEF_DETAILS_SUCCESS, CHEF_DETAILS_FAIL} from '../constants/chefConstants'

export const chefListReducer = ( state = { chefs: [] }, action) => {
    switch (action.type){
case CHEF_LIST_REQUEST:
    return { loading: true}
    case CHEF_LIST_SUCCESS:
        return { loading: false, chefs: action.payload }
        case CHEF_LIST_FAIL:
            return { loading: false, error: action.payload }
            default: 
            return state
    }
}

export const chefDetailsReducer = ( state = { chef: {reviews: []} }, action) => {
    switch (action.type){
case CHEF_DETAILS_REQUEST:
    return { loading: true, ...state}
    case CHEF_DETAILS_SUCCESS:
        return { loading: false, chef: action.payload }
        case CHEF_DETAILS_FAIL:
            return { loading: false, error: action.payload }
            default: 
            return state
    }
}

export const chefDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case CHEF_DELETE_REQUEST:
        return { loading: true }
      case CHEF_DELETE_SUCCESS:
        return { loading: false, success: true }
      case CHEF_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const chefCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CHEF_CREATE_REQUEST:
        return { loading: true }
      case CHEF_CREATE_SUCCESS:
        return { loading: false, success: true, chef: action.payload }
      case CHEF_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case CHEF_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const chefUpdateReducer = (state = { chef: {} }, action) => {
    switch (action.type) {
      case CHEF_UPDATE_REQUEST:
        return { loading: true }
      case CHEF_UPDATE_SUCCESS:
        return { loading: false, success: true, chef: action.payload }
      case CHEF_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case CHEF_UPDATE_RESET:
        return { chef: {} }
      default:
        return state
    }
  }
  
  export const chefReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CHEF_CREATE_REVIEW_REQUEST:
        return { loading: true }
      case CHEF_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case CHEF_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload }
      case CHEF_CREATE_REVIEW_RESET:
        return {}
      default:
        return state
    }
  }
  
  /*export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case PRODUCT_TOP_REQUEST:
        return { loading: true, products: [] }
      case PRODUCT_TOP_SUCCESS:
        return { loading: false, products: action.payload }
      case PRODUCT_TOP_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }*/
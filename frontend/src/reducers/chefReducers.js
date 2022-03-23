import {CHEF_LIST_REQUEST, CHEF_LIST_SUCCESS, CHEF_LIST_FAIL, CHEF_DETAILS_REQUEST, CHEF_DETAILS_SUCCESS, CHEF_DETAILS_FAIL} from '../constants/chefConstants'

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

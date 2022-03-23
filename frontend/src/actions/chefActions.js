 import axios from 'axios'
 
 import {CHEF_LIST_REQUEST, CHEF_LIST_SUCCESS, CHEF_LIST_FAIL, CHEF_DETAILS_REQUEST, CHEF_DETAILS_SUCCESS, CHEF_DETAILS_FAIL} from '../constants/chefConstants'



 export const listChefs = () => async (dispatch) => {
     try{
         dispatch ({type: CHEF_LIST_REQUEST})

         const {data} = await axios.get('/api/chefs')

         dispatch ({
             type: CHEF_LIST_SUCCESS,
            payload: data
            })

     }catch (error) {
         dispatch({
             type: CHEF_LIST_FAIL,
             payload: error.response && error.response.data.message ? error.response.data.message : error.message
         })

     }

 }

 export const listChefDetails = (id) => async (dispatch) => {
    try{
        dispatch ({type: CHEF_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/chefs/${id}`)

        dispatch ({
            type: CHEF_DETAILS_SUCCESS,
           payload: data
           })

    }catch (error) {
        dispatch({
            type: CHEF_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}
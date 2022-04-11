 import axios from 'axios'
 
 import { CHEF_DELETE_FAIL, CHEF_DELETE_SUCCESS, CHEF_DELETE_REQUEST, CHEF_CREATE_FAIL, CHEF_CREATE_SUCCESS, CHEF_CREATE_REQUEST, CHEF_UPDATE_FAIL, CHEF_UPDATE_SUCCESS, CHEF_UPDATE_REQUEST, CHEF_TOP_SUCCESS, CHEF_TOP_FAIL, CHEF_CREATE_REVIEW_SUCCESS, CHEF_CREATE_REVIEW_REQUEST, CHEF_CREATE_REVIEW_FAIL,  CHEF_LIST_REQUEST, CHEF_LIST_SUCCESS, CHEF_LIST_FAIL, CHEF_DETAILS_REQUEST, CHEF_DETAILS_SUCCESS, CHEF_DETAILS_FAIL, CHEF_TOP_REQUEST, } from '../constants/chefConstants'

 import { logout } from './userActions'

 export const listChefs = (keyword = '') => async (dispatch) => {
     try{
         dispatch ({type: CHEF_LIST_REQUEST})

         const {data} = await axios.get(`/api/chefs?keyword=${keyword}`)

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

export const deleteChef = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHEF_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`/api/chefs/${id}`, config)
  
      dispatch({
        type: CHEF_DELETE_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: CHEF_DELETE_FAIL,
        payload: message,
      })
    }
  }
  
  export const createChef = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHEF_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(`/api/chefs`, {}, config)
  
      dispatch({
        type: CHEF_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: CHEF_CREATE_FAIL,
        payload: message,
      })
    }
  }
  
  export const updateChef = (chef) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHEF_UPDATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(
        `/api/chefs/${chef._id}`,
        chef,
        config
      )
  
      dispatch({
        type: CHEF_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: CHEF_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: CHEF_UPDATE_FAIL,
        payload: message,
      })
    }
  }
  
  export const createChefReview = (chefId, review) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: CHEF_CREATE_REVIEW_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.post(`/api/chefs/${chefId}/reviews`, review, config)
  
      dispatch({
        type: CHEF_CREATE_REVIEW_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: CHEF_CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }
  
  export const listTopChefs = () => async (dispatch) => {
    try {
      dispatch({ type: CHEF_TOP_REQUEST })
  
      const { data } = await axios.get(`/api/chefs/top`)
  
      dispatch({
        type: CHEF_TOP_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CHEF_TOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
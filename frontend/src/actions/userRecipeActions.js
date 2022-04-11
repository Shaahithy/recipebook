import axios from 'axios'
import {
  USERRECIPE_DETAILS_FAIL,
  USERRECIPE_DETAILS_REQUEST,
  USERRECIPE_DETAILS_SUCCESS,
  USERRECIPE_SEND_FAIL,
  USERRECIPE_SEND_REQUEST,
  USERRECIPE_SEND_SUCCESS,
  USERRECIPE_LIST_FAIL,
  USERRECIPE_LIST_SUCCESS,
  USERRECIPE_LIST_REQUEST,
  USERRECIPE_DELETE_REQUEST,
  USERRECIPE_DELETE_SUCCESS,
  USERRECIPE_DELETE_FAIL,
  
} from '../constants/userRecipeConstants'
import { logout } from './userActions'






export const sendUserRecipe = (name, ingredients, category, description ) => async (dispatch) => {
  try {
    dispatch({
      type: USERRECIPE_SEND_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/userRecipes',
      { name, ingredients, category, description },
      config
    )

    dispatch({
      type: USERRECIPE_SEND_SUCCESS,
      payload: data,
    })


    localStorage.setItem('userRecipeInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USERRECIPE_SEND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

  export const getUserRecipeDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USERRECIPE_DETAILS_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/userRecipes/${id}`, config)
  
      dispatch({
        type: USERRECIPE_DETAILS_SUCCESS,
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
        type: USERRECIPE_DETAILS_FAIL,
        payload: message,
      })
    }
  }

  export const listUserRecipes = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: USERRECIPE_LIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/userRecipes`, config)
  
      dispatch({
        type: USERRECIPE_LIST_SUCCESS,
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
        type: USERRECIPE_LIST_FAIL,
        payload: message,
      })
    }
  }

  export const deleteUserRecipe = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USERRECIPE_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`/api/userRecipes/${id}`, config)
  
      dispatch({ type: USERRECIPE_DELETE_SUCCESS })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USERRECIPE_DELETE_FAIL,
        payload: message,
      })
    }
  }

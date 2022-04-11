import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
    listUserRecipes,
  deleteUserRecipe,
  
} from '../actions/userRecipeActions'


const UserRecipeListScreen = ({ history, match }) => {
  

  const dispatch = useDispatch()

  const userRecipeList = useSelector((state) => state.userRecipeList)
  const { loading, error, userRecipes } = userRecipeList

  const userRecipeDelete = useSelector((state) => state.userRecipeDelete)
  const {success: successDelete} = userRecipeDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUserRecipes())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

const deleteHandler = (id) => {
   
   if (window.confirm('Are you sure')) {
      dispatch(deleteUserRecipe(id))
    } 
  }

  return (
    <>
    <h1>User Recipes</h1>
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            
            <th>CATEGORY</th>
          
          </tr>
        </thead>
        <tbody>
          {userRecipes.map((userRecipe) => (
            <tr key={userRecipe._id}>
              <td>{userRecipe._id}</td>
              <td>{userRecipe.name}</td>
              
              <td>{userRecipe.category} </td>
              <td>
              <LinkContainer to={`/admin/userRecipe/${userRecipe._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer> 
                  </td>
              <td>
                
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(userRecipe._id)}
                >
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}  
    </>
  )
}

export default UserRecipeListScreen
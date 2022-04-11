import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { getUserRecipeDetails } from '../actions/userRecipeActions'
import Loader from '../components/Loader'
import Message from '../components/Message'




const UserRecipeDetailScreen = ({ history, match }) => {
   
 
  const dispatch = useDispatch()

  const userRecipeDetails = useSelector((state) => state.userRecipeDetails)
  const { loading, error, userRecipe } = userRecipeDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

 
  useEffect(() => {
    
    if (!userRecipe._id || userRecipe._id !== match.params.id) {
      dispatch(getUserRecipeDetails(match.params.id))
     
    }
  }, [dispatch, match])

 

  return (
    <>
    <Link className='btn btn-light my-3' to='/admin/userRecipelist'>
      Go Back
    </Link>
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <>
       
        <Row>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{userRecipe.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Category: {userRecipe.category}
              </ListGroup.Item>

              <ListGroup.Item>
                Ingredients: {userRecipe.ingredients}
              </ListGroup.Item>
              
              <ListGroup.Item>
                Description: {userRecipe.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          
          
          
        </Row>
       
      </>
    )}
  </>
)
}

export default UserRecipeDetailScreen
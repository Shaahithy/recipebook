import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listRecipeDetails } from '../actions/recipeActions'
import Loader from '../components/Loader'
import Message from '../components/Message'




const RecipeScreen = ({ history, match }) => {
    
    const dispatch = useDispatch()

    const recipeDetails = useSelector(state => state.recipeDetails)

    const { loading, error, recipe } = recipeDetails
  
   useEffect(() => {
    dispatch(listRecipeDetails(match.params.id))
}, [dispatch, match]) 




  return (
    <>
      <Link className='btn btn-light my-3>' to='/recipe'>Go back</Link>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Row>
          <Col md={6}>
              <Image src={recipe.image} alt={recipe.name} fluid/>
          </Col>
          <Col md={3}>
<ListGroup variant='flush'>
    <ListGroupItem>
        <h3>{recipe.name}</h3>
    </ListGroupItem>
    <ListGroupItem>
        <Rating value={recipe.rating} text={`${recipe.numReviews} reviews`}/>
    </ListGroupItem>
    
    <ListGroupItem>
        Description: ${recipe.description}
    </ListGroupItem>
</ListGroup>
          </Col>
          <Col>
          <ListGroupItem>
        Ingredients: {recipe.ingredients}
    </ListGroupItem>
          </Col>
      </Row>
      )}
      
    </>
  )
}

export default RecipeScreen
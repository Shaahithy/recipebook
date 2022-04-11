import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listRecipeDetails, createRecipeReview, } from '../actions/recipeActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { RECIPE_CREATE_REVIEW_RESET } from '../constants/recipeConstants'



const RecipeScreen = ({ history, match }) => {
    /*const [qty, setQty] = useState(1)*/
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const recipeDetails = useSelector((state) => state.recipeDetails)
  const { loading, error, recipe } = recipeDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const recipeReviewCreate = useSelector((state) => state.recipeReviewCreate)
  const {
    success: successRecipeReview,
    loading: loadingRecipeReview,
    error: errorRecipeReview,
  } = recipeReviewCreate

  useEffect(() => {
    if (successRecipeReview) {
      setRating(0)
      setComment('')
    }
    if (!recipe._id || recipe._id !== match.params.id) {
      dispatch(listRecipeDetails(match.params.id))
      dispatch({ type: RECIPE_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successRecipeReview])

  /*const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }*/

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createRecipeReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
    <Link className='btn btn-light my-3' to='/myrecipe'>
      Go Back
    </Link>
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <>
       
        <Row>
          <Col md={6}>
            <Image src={recipe.image} alt={recipe.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{recipe.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={recipe.rating}
                  text={`${recipe.numReviews} reviews`}
                />
              </ListGroup.Item>
              
              <ListGroup.Item>
                Description: {recipe.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
          <ListGroup.Item>
                Ingredients: {recipe.ingredients}
              </ListGroup.Item>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {recipe.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
              {recipe.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {successRecipeReview && (
                  <Message variant='success'>
                    Review submitted successfully
                  </Message>
                )}
                {loadingRecipeReview && <Loader />}
                {errorRecipeReview && (
                  <Message variant='danger'>{errorRecipeReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={loadingRecipeReview}
                      type='submit'
                      variant='primary'
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to='/login'>sign in</Link> to write a review{' '}
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>
    )}
  </>
)
}

export default RecipeScreen
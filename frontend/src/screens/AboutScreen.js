import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { sendUserRecipe } from '../actions/userRecipeActions'


const AboutScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRecipeSend = useSelector((state) => state.userRecipeSend)
  const { loading, error, userRecipeInfo } = userRecipeSend
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  /*const redirectRecipe = location.search ? location.search.split('=')[1] : '/'*/

  useEffect(() => {
    if (userRecipeInfo) {
      setMessage("Recipe Sent Successfully")
    }
  }, [history, userRecipeInfo])

  const submitHandler = (e) => {
    e.preventDefault()
   
     dispatch(sendUserRecipe(name, ingredients, category, description))
    
  }

  return (
    <FormContainer>

      <h1>Send Recipe</h1>
      {message && <Message variant='success'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {userInfo ? (
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='ingredients'>
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter ingredients'
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'> 
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

        <Button type='submit' variant='primary'>
          Send
        </Button>
      </Form>
       ) : (
        <Message>
          Please <Link to='/login'>sign in</Link> to send a recipe{' '}
        </Message>
      )}

    </FormContainer>
  )
}

export default AboutScreen
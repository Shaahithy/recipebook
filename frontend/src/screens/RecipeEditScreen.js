import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listRecipeDetails, updateRecipe } from '../actions/recipeActions'
import { RECIPE_UPDATE_RESET } from '../constants/recipeConstants'

const RecipeEditScreen = ({ match, history }) => {
  const recipeId = match.params.id

  const [name, setName] = useState('')
  
  const [image, setImage] = useState('')
  const [special, setSpecial] = useState('')
  const [category, setCategory] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const recipeDetails = useSelector((state) => state.recipeDetails)
  const { loading, error, recipe } = recipeDetails

  const recipeUpdate = useSelector((state) => state.recipeUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = recipeUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: RECIPE_UPDATE_RESET })
      history.push('/admin/recipelist')
    } else {
      if (!recipe.name || recipe._id !== recipeId) {
        dispatch(listRecipeDetails(recipeId))
      } else {
        setName(recipe.name)
        
        setImage(recipe.image)
        setSpecial(recipe.special)
        setCategory(recipe.category)
        setIngredients(recipe.ingredients)
        setDescription(recipe.description)

      }
    }
  }, [dispatch, history, recipeId, recipe, successUpdate])

 const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateRecipe({
        _id: recipeId,
        name,
       
        image,
        special,
        category,
        ingredients,
        description,
        
      })
    )
  }

  return (
    <>
      <Link to='/admin/recipelist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Recipe</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
              type='file'
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </Form.Group>
           
            <Form.Group controlId='special'>
              <Form.Label>Special</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Special'
                value={special}
                onChange={(e) => setSpecial(e.target.value)}
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default RecipeEditScreen
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listChefDetails, updateChef } from '../actions/chefActions'
import { CHEF_UPDATE_RESET } from '../constants/chefConstants'

const ChefEditScreen = ({ match, history }) => {
  const chefId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [special, setSpecial] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const chefDetails = useSelector((state) => state.chefDetails)
  const { loading, error, chef } = chefDetails

  const chefUpdate = useSelector((state) => state.chefUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = chefUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CHEF_UPDATE_RESET })
      history.push('/admin/cheflist')
    } else {
      if (!chef.name || chef._id !== chefId) {
        dispatch(listChefDetails(chefId))
      } else {
        setName(chef.name)
        setPrice(chef.price)
        setImage(chef.image)
        setSpecial(chef.special)
        setCategory(chef.category)
        setCountInStock(chef.countInStock)
        setDescription(chef.description)
      }
    }
  }, [dispatch, history, chefId, chef, successUpdate])

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
      updateChef({
        _id: chefId,
        name,
        price,
        image,
        special,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/cheflist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit RecipeBook</h1>
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

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
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

export default ChefEditScreen

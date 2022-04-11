import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBoxRecipe = ({ history }) => {
  const [keywordrecipe, setKeywordrecipe] = useState('')
  

  const submitHandler = (e) => {
    e.preventDefault()
    if (keywordrecipe.trim()) {
      history.push(`/searchrecipe/search/${keywordrecipe}`)
    } else {
      history.push('/myrecipe')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeywordrecipe(e.target.value)}
        placeholder='Search...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBoxRecipe
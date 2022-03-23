import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Recipe from '../components/Recipe'
import { listRecipes } from '../actions/recipeActions'


const RecipeScreen = () => {
  const dispatch = useDispatch()

  const recipeList = useSelector( state => state.recipeList) 
  const { loading, error, recipes} = recipeList
  
  useEffect(() => {
    dispatch(listRecipes())
  }, [dispatch])

  
  return (
    <>
      <h1>Yummy Recipes</h1>
      {loading ? 
      (<Loader/>
        ) : error ? (
        <Message variant = 'danger'>{error}</Message>
        ) :  ( 
      <Row> 
{recipes.map(recipe =>(
<Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
    <Recipe recipe={recipe}/>
</Col>
))}
      </Row>
      )}
 
    </>
  )
}

export default RecipeScreen
import React, {useEffect} from 'react'
import { Route } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Recipe from '../components/Recipe'
import { listRecipes } from '../actions/recipeActions'

import SearchBoxRecipe from '../components/SearchBoxRecipe'




const HomeRecipeScreen = ({match}) => {
  const keywordrecipe = match.params.keywordrecipe
  
  const dispatch = useDispatch()

  const recipeList = useSelector( state => state.recipeList) 
  const { loading, error, recipes} = recipeList
  
  useEffect(() => {
    dispatch(listRecipes(keywordrecipe))
  }, [dispatch, keywordrecipe])

  
  return (
    <>
      <h1>Yummy Recipes</h1>
      <Route render={({ history }) => <SearchBoxRecipe history={history}/>} />
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

export default HomeRecipeScreen
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
/*import Paginate from '../components/Paginate'*/
import {
  listRecipes,
  deleteRecipe,
  createRecipe,
} from '../actions/recipeActions'
import { RECIPE_CREATE_RESET } from '../constants/recipeConstants'

const RecipeListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const recipeList = useSelector((state) => state.recipeList)
  const { loading, error, recipes, page, pages } = recipeList

  const recipeDelete = useSelector((state) => state.recipeDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = recipeDelete

  const recipeCreate = useSelector((state) => state.recipeCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    recipe: createdRecipe,
  } = recipeCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: RECIPE_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/recipe/${createdRecipe._id}/edit`)
    } else {
      dispatch(listRecipes('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdRecipe,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteRecipe(id))
    }
  }

  const createRecipeHandler = () => {
    dispatch(createRecipe())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Recipes</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createRecipeHandler}>
            <i className='fas fa-plus'></i> Create Recipe
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                
                <th>CATEGORY</th>
                <th>SPECIAL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe._id}>
                  <td>{recipe._id}</td>
                  <td>{recipe.name}</td>
                
                  <td>{recipe.category}</td>
                  <td>{recipe.special}</td>
                  <td>
                    <LinkContainer to={`/admin/recipe/${recipe._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(recipe._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
        </>
      )}
    </>
  )
}

export default RecipeListScreen

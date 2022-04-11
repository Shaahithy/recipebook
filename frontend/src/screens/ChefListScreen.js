import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
/*import Paginate from '../components/Paginate'*/
import {
  listChefs,
  deleteChef,
  createChef,
} from '../actions/chefActions'
import { CHEF_CREATE_RESET } from '../constants/chefConstants'

const ChefListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const chefList = useSelector((state) => state.chefList)
  const { loading, error, chefs, page, pages } = chefList

  const chefDelete = useSelector((state) => state.chefDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = chefDelete

  const chefCreate = useSelector((state) => state.chefCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    chef: createdChef,
  } = chefCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: CHEF_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/chef/${createdChef._id}/edit`)
    } else {
      dispatch(listChefs('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdChef,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteChef(id))
    }
  }

  const createChefHandler = () => {
    dispatch(createChef())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Recipe Books</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createChefHandler}>
            <i className='fas fa-plus'></i> Create ChefBook
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
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>SPECIAL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {chefs.map((chef) => (
                <tr key={chef._id}>
                  <td>{chef._id}</td>
                  <td>{chef.name}</td>
                  <td>${chef.price}</td>
                  <td>{chef.category}</td>
                  <td>{chef.special}</td>
                  <td>
                    <LinkContainer to={`/admin/chef/${chef._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(chef._id)}
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

export default ChefListScreen
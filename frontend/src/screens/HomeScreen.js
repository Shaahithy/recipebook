import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Chef from '../components/Chef'
import { listChefs } from '../actions/chefActions'


const HomeScreen = () => {
  const dispatch = useDispatch()

  const chefList = useSelector( state => state.chefList) 
  const { loading, error, chefs} = chefList
  
  useEffect(() => {
    dispatch(listChefs())
  }, [dispatch])

  
  return (
    <>
      <h1>Latest Recipe Books</h1>
      {loading ? 
      (<Loader/>
        ) : error ? (
        <Message variant = 'danger'>{error}</Message>
        ) :  ( 
      <Row> 
{chefs.map(chef =>(
<Col key={chef._id} sm={12} md={6} lg={4} xl={3}>
    <Chef chef={chef}/>
</Col>
))}
      </Row>
      )}
 
    </>
  )
}

export default HomeScreen

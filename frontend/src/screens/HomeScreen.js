import React, {useEffect} from 'react'
import { Route } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Chef from '../components/Chef'
import { listChefs } from '../actions/chefActions'
import SearchBox from '../components/SearchBox'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  
  const dispatch = useDispatch()

  const chefList = useSelector( state => state.chefList) 
  const { loading, error, chefs} = chefList
  
  useEffect(() => {
    dispatch(listChefs(keyword))
  }, [dispatch, keyword])

  
  return (
    <>
      <h1>Latest Recipe Books</h1>
      <Route render={({ history }) => <SearchBox history={history} className='search-box'/>} />
     
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

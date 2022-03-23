import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listChefDetails } from '../actions/chefActions'
import Loader from '../components/Loader'
import Message from '../components/Message'




const ChefScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()

    const chefDetails = useSelector(state => state.chefDetails)

    const { loading, error, chef } = chefDetails
  
   useEffect(() => {
    dispatch(listChefDetails(match.params.id))
}, [dispatch, match]) 

const addToCartHandler = () => {
history.push(`/cart/${match.params.id}?qty=${qty}`)
}


  return (
    <>
      <Link className='btn btn-light my-3>' to='/'>Go back</Link>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Row>
          <Col md={6}>
              <Image src={chef.image} alt={chef.name} fluid/>
          </Col>
          <Col md={3}>
<ListGroup variant='flush'>
    <ListGroupItem>
        <h3>{chef.name}</h3>
    </ListGroupItem>
    <ListGroupItem>
        <Rating value={chef.rating} text={`${chef.numReviews} reviews`}/>
    </ListGroupItem>
    <ListGroupItem>
        Price: ${chef.price}
    </ListGroupItem>
    <ListGroupItem>
        Description: ${chef.description}
    </ListGroupItem>
</ListGroup>
          </Col>
          <Col>
<Card>
    <ListGroup variant='flush'>
        <ListGroupItem>
            <Row>
                <Col>
                Price:
                </Col>
                <Col>
                <strong>${chef.price} </strong>
                </Col>
            </Row>
        </ListGroupItem>
        <ListGroupItem>
            <Row>
                <Col>
                Status:
                </Col>
                <Col>
                {chef.countInStock>0 ? 'In Stock' : 'Out of Stock'}
                </Col>
            </Row>
        </ListGroupItem>
        {chef.countInStock > 0 && (
            <ListGroup.Item>
                <Row>
                    <Col>Qty</Col>
                    <Col>
                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                        {
                        [...Array(chef.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x +1}>
                                {x + 1}
                            </option>
                        ))}
                    </Form.Control>
                    </Col>
                </Row>
            </ListGroup.Item>
        )}
        <ListGroupItem>
            <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={chef.countInStock === 0}>
                Add To Cart
            </Button>
        </ListGroupItem>
    </ListGroup>
</Card>
          </Col>
      </Row>
      )}
      
    </>
  )
}

export default ChefScreen

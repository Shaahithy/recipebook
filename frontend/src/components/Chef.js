import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
const Chef = ({chef}) => {
  return (
    <div>
      <Card className='my-3 p-3 rounded'>
<Link to={`/chef/${chef._id}`}>
    <Card.Img src={chef.image} variant='top'/>
</Link>
<Card.Body>
<Link to={`/chef/${chef._id}`}>
    <Card.Title as='div'>
      <strong>{chef.name}</strong>
    </Card.Title>
    </Link>
    <Card.Text as='div'>
      <Rating value={chef.rating} text={`${chef.numReviews} reviews`} />
    </Card.Text>
    <Card.Text as='h3'>${chef.price}</Card.Text>
</Card.Body>
      </Card>
    </div>
  )
}

export default Chef

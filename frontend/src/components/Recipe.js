import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
const Recipe = ({recipe}) => {
  return (
    <div>
      <Card className='my-3 p-3 rounded'>
<Link to={`/recipe/${recipe._id}`}>
    <Card.Img src={recipe.image} variant='top'/>
</Link>
<Card.Body>
<Link to={`/recipe/${recipe._id}`}>
    <Card.Title as='div'>
      <strong>{recipe.name}</strong>
    </Card.Title>
    </Link>
    <Card.Text as='div'>
      <Rating value={recipe.rating} text={`${recipe.numReviews} reviews`} />
    </Card.Text>
    <Card.Text as='h3'>{recipe.category}</Card.Text>
</Card.Body>
      </Card>
    </div>
  )
}

export default Recipe
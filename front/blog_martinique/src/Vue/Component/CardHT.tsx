import React from 'react'
import { Button, Card } from 'react-bootstrap'

const CardHT = () => {
  return (
    <Card  bg='dark' text='success' border='danger' style={{ padding: '0' }} >
      <Card.Body>
        <Card.Title>title bdd</Card.Title>
        <Card.Text>
          petit résumé lié à la card.
        </Card.Text>
        <Button variant="danger">voir article</Button>
      </Card.Body>
      <Card.Footer>
        <small >Last updated 3 mins ago</small>
      </Card.Footer>
  </Card>
  )
}

export default CardHT
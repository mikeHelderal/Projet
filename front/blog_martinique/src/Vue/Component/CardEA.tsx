import React from 'react'
import { Button, Card } from 'react-bootstrap'


const CardEA = () => {
  return (
    <Card bg='dark' text='success' border='danger' style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
            <Card.Title> Title BDD</Card.Title>
            <Card.Text>
                petit résumé.
            </Card.Text>
            <Button variant="danger">voir Article</Button>
        </Card.Body>
    </Card>
  )
}

export default CardEA 
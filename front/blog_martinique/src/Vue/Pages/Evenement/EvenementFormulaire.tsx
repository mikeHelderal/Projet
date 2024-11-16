import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback';
import { InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { URl } from '../../../Utils/Constant/URL';

const EvenementFormulaire = () => {

    const [evenment, setEvenment] = useState({});
    const [validated, setValidated] = useState(false);
    const [validity, setValidity] = useState(false);


    

    const handleChange = async (e: any) =>{
        const {name, value} = e.currentTarget;
        await setEvenment((publication: any) => ({...publication, [name]: value}));
    } 

    

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.currentTarget;

        setValidity(form.checkValidity());
        setValidated(true);

        if(form.checkValidity()){
        }
    }

    const publier = async () => {
        try {
            const response = await axios.post(URl.ADD_EVENTS, evenment);
        } catch (error) {
            alert("probleme lors de la publication ");
            
        }

    }



return (
    <div>
        <Form noValidate validated={validated}  onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title :</Form.Label>
                <Form.Control required type="text" placeholder="Enter title" name="title" onChange={handleChange}/> 
                <Form.Control.Feedback type="invalid">Please provide an title</Form.Control.Feedback>
                <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicResume">
                <Form.Label>date de l'évenement :</Form.Label>
                <Form.Control required type="date" placeholder="Enter date" name="date_event" onChange={handleChange}/> 
                <Form.Control.Feedback type="invalid">Please provide an resume</Form.Control.Feedback>
                <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
            </Form.Group>

            <InputGroup>
                <InputGroup.Text>contenu :</InputGroup.Text>
                <Form.Control as="textarea" required name='content' aria-label="With textarea" onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Please provide a content</Form.Control.Feedback>
                <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
            </InputGroup>

      <Button type='submit'>Demander à publier</Button>
    </Form>
    </div>
  )
}

export default EvenementFormulaire 
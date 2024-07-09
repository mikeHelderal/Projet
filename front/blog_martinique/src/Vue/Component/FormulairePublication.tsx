import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URl } from '../../Utils/Constant/URL.js';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback';


const FormulairePublication = () => {

    const navigate = useNavigate();
    const [publication, setPublication] = useState({});
    const [validated, setValidated] = useState(false);
    const [validity, setValidity] = useState(false);


    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setPublication((publication: any) => ({...publication, [name]: value}));
    } 



    const handleSubmit = (e: any) => {
      console.log("handleSubmit")
        e.preventDefault();
        const form = e.currentTarget;
        console.log("checkValidity => ",form.checkValidity() )

        setValidity(form.checkValidity());
        setValidated(true);

        if(form.checkValidity()){
            console.log(" ici ce fera l'appel connexion");
            connexion();
        }
    }


    const connexion = () => {
        const enregistrer = async () => {
          try {
            const response = await axios.post(URl.LOGIN, publication);
            console.log(response);
            navigate("/");
          } catch (error) {
            alert("utilisateur introuvable veuillez vous incscrire");
          }
        }
        enregistrer();
    }

  return (


    <div>
    
    <Form noValidate validated={validated}  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Titre :</Form.Label>
        <Form.Control required type="text" placeholder="Enter title" name="title" onChange={handleChange}/> 
        <Form.Control.Feedback type="invalid">Please provide an title</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicResume">
        <Form.Label>résumé :</Form.Label>
        <Form.Control required type="text" placeholder="Enter resume" name="resume" onChange={handleChange}/> 
        <Form.Control.Feedback type="invalid">Please provide an resume</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicContent">
        <Form.Label>contenu :</Form.Label>
        <Form.Control required type="text" placeholder="Enter content" name="content" onChange={handleChange}/> 
        <Form.Control.Feedback type="invalid">Please provide a content</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </Form.Group>

      <Button type='submit'>Demander à publier</Button>
    </Form>
    
    </div>





   
  )
}

export default FormulairePublication
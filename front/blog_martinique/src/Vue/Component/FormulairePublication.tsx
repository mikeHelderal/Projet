import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URl } from '../../Utils/Constant/URL.js';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback';
import { InputGroup } from 'react-bootstrap';


const FormulairePublication = () => {

  
  const navigate = useNavigate();
  const [publication, setPublication] = useState({});
  const [validated, setValidated] = useState(false);
  const [validity, setValidity] = useState(false);
  const [subjects, setSubjects] = useState([]);

  useEffect(  () => {
    const recupSubjects = async () => {
      const response = await axios.get(URl.GET_ALL_SUBJECT);
      console.log("response => ",response);
      setSubjects(response.data);
    }
    recupSubjects();
  },[])


  const handleChange = async (e: any) =>{
      const {name, value} = e.currentTarget;
      await setPublication((publication: any) => ({...publication, [name]: value}));
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
          publier();
      }
  }


  const publier = () => {
      const enregistrer = async () => {
        try {
          console.log(publication)
          const response = await axios.post(URl.ADD_PUBLICATION, publication);
          console.log(response);
          navigate("/");
        } catch (error) {
          alert("probleme lors de la publication ");
        }
      }
      enregistrer();
  }

  return (
    <div>
    
    <Form noValidate validated={validated}  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Sujet :</Form.Label>
        <Form.Select onChange={handleChange} name='idSubject' aria-label="Default select example">
        <option   name="idSubject" value="">  </option>

          {subjects && subjects.map((subject, index) => 

            <option key={index}  name="idSubject" value={subject.id}>{subject.name}  </option>
          )}
        </Form.Select> 
        <Form.Control.Feedback type="invalid">Please provide an subject</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </Form.Group>

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

export default FormulairePublication
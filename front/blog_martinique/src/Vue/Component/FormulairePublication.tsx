import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URl } from '../../Utils/Constant/URL.js';
import { User, RootState,  } from '../../Utils/interfaces/user.interface.js';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Feedback from 'react-bootstrap/Feedback';
import { InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {getUser} from '../../../services/selector/User.selecteur.js';



const FormulairePublication = () => {

  
  const navigate = useNavigate();
  const [publication, setPublication] = useState({});
  const [validated, setValidated] = useState(false);
  const [validity, setValidity] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const store: User = useSelector((state: RootState) => getUser(state));
  const [show, setShow] = useState(false);


  useEffect(  () => {
    const recupSubjects = async () => {
      const response = await axios.get(URl.GET_ALL_SUBJECT);
      console.log("response => ",response);
      setSubjects(response.data);
    }
    recupSubjects();
    console.log(store);
    setShow(false);
  },[])


  const handleChange = async (e: any) =>{
      const {name, value} = e.currentTarget;
      await setPublication((publication: any) => ({...publication, [name]: value}));
  } 

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



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
          handleShow();
        }
      }
      enregistrer();
  }

  return (
    <div>
      <Alert show={show} variant="danger" onClose={() => handleClose()} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
    
    <Form noValidate validated={validated}  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Sujet :</Form.Label>
        <Form.Select onChange={handleChange} name='idSubject' aria-label="Default select example">
        <option   name="SubjectId" value="">  </option>

          {subjects && subjects.map((subject, index) => 

            <option key={index}  name="SubjectId" value={subject.id}>{subject.name}  </option>
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
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URl } from '../../Utils/Constant/URL.js';
import { User, RootState,  } from '../../Utils/interfaces/reactPubli.interface.js';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import NavBar from './NavBar.js';


const FormulairePublication = (props: any) => {

  
  const navigate = useNavigate();
  const [publication, setPublication] = useState({});
  const [validated, setValidated] = useState(false);
  const [validity, setValidity] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [show, setShow] = useState(false);
  const userId = localStorage.getItem("UserId");

  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState('');
  const [image, setImage] = useState();
  const [content, setContent] = useState('');

  useEffect(  () => {
    const recupSubjects = async () => {
      const response = await axios.get(URl.GET_ALL_SUBJECT);
      setSubjects(response.data.data);
    }
    recupSubjects();
    setPublication((publication: any) => ({...publication, userId}));
    setShow(false);
  },[])


  const handleChange = async (e: any) =>{
      const {name, value} = e.currentTarget;
      await setPublication((publication: any) => ({...publication, [name]: value}));
  } 

  



  const handleSubmit = (e: any) => {
      e.preventDefault();
      const formData = new FormData();
        formData.append('SubjectId', subject);
        formData.append('title', title);
        formData.append('resume', resume);
        formData.append('image', image);
        formData.append('content', content);
        formData.append('UserId', userId);

      const form = e.currentTarget;

      setValidity(form.checkValidity());
      setValidated(true);
      const config = {headers:{ 'Content-Type': 'multipart/form-data; boundary=77f77c04-2c7b-4179-aca3-my-cool-boundary'}};

      if(form.checkValidity()){
          publier(config, formData);
          e.target = null ;
      }
  }


  const publier = (config: any, formData: any) => {
      const enregistrer = async () => {
        try {
          const response = await axios.post(URl.ADD_PUBLICATION, formData,config);
          
          props.handleClose();
          
        } catch (error) {
        }
      }
      enregistrer();
  }

  return (
    <div>    
    <Form noValidate encType='multipart/form-data' method='post' validated={validated}  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Sujet :</Form.Label>
        <Form.Select onChange={(e)=>{setSubject(e.target.value)}} name='idSubject' aria-label="Default select example">
          {subjects && subjects.map((subject, index) => 
            <option key={index}  name="SubjectId" value={subject.id}>{subject.name}  </option>
          )}
        </Form.Select> 
        <Form.Control.Feedback type="invalid">Please provide an subject</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Titre :</Form.Label>
        <Form.Control required type="text" placeholder="Enter title" name="title" onChange={(e)=>{setTitle(e.target.value)}}/> 
        <Form.Control.Feedback type="invalid">Please provide an title</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicResume">
        <Form.Label>résumé :</Form.Label>
        <Form.Control required type="text" placeholder="Enter resume" name="resume" onChange={(e)=>{setResume(e.target.value)}}/> 
        <Form.Control.Feedback type="invalid">Please provide an resume</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="position-relative mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control type="file" required name="image" onChange={(e)=>{setImage(e.target.files[0])}} />
            <Form.Control.Feedback type="invalid" >Veuillez insérer une image </Form.Control.Feedback>
            <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
          </Form.Group>

      
      <InputGroup>
        <InputGroup.Text>contenu :</InputGroup.Text>
        <Form.Control as="textarea" required name='content' aria-label="With textarea" onChange={(e)=>{setContent(e.target.value)}} />
        <Form.Control.Feedback type="invalid">Please provide a content</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </InputGroup>

      <Button type='submit'>Demander à publier</Button>
    </Form>
    
    </div>
  )
}

export default FormulairePublication
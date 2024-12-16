import  { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';


import * as publicationService from '../../../../services/publication/publication.service.ts' 

const FormulairePublication = (props: any) => {

  
  const [publication, setPublication] = useState({});
  const [validated, setValidated] = useState(false);
  const [validity, setValidity] = useState(false);
  const [show, setShow] = useState(false);
  const userId: any = localStorage.getItem("UserId");

  const [title, setTitle] = useState('');
  const [resume, setResume] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState('');


  useEffect(  () => {
    show
    validity
    publication
  
    setPublication((publication: any) => ({...publication, userId}));
    setShow(false);
  },[])



  const handleSubmit = async (e: any) => {
      e.preventDefault();
      const formData = new FormData();
        formData.append('title', title);
        formData.append('resume', resume);
        if (image) {
          formData.append('image', image); // Ajoute le fichier seulement si image n'est pas null
      } else {
          console.error("Aucun fichier sélectionné.");
      }
      formData.append('content', content);
      formData.append('UserId', userId);

      const form = e.currentTarget;
      setValidity(form.checkValidity());
      setValidated(true);

      if(form.checkValidity()){
        await  publicationService.publier(formData);
          e.target = null ;
          props.handleClose();

      }
  }


  return (
    <div>    
    <Form noValidate encType='multipart/form-data' method='post' validated={validated}  onSubmit={handleSubmit}>
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
            <Form.Control type="file" required name="image"  onChange={(e) => {
        const target = e.target as HTMLInputElement; // Cast explicite
        if (target.files && target.files[0]) {
            setImage(target.files[0]); // Définit le fichier sélectionné
        }
    }} />
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
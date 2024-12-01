import  { useEffect, useState } from 'react'

import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';

import * as eventService from '../../../../services/event/event.service.ts' 


const FormulaireEvent = (props : any) => {

    

    const [event, setEvent] = useState({});
    const [validated, setValidated] = useState(false);
    const [validity, setValidity] = useState(false);
    const userId: any = localStorage.getItem("UserId");

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [adresse, setAdresse] = useState('');
    const [ville, setVille] = useState('');
    const [date, setDate] = useState('');
    const [heureDebut, setHeureDebut] = useState('');
    const [heureFin, setHeureFin] = useState('');




    useEffect(  () => {
        event
        setEvent((event: any) => ({...event, userId}));
    },[])




    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
            formData.append('title', title);
            formData.append('image', image);
            formData.append('content', content);
            formData.append('UserId', userId);
            formData.append('adresse', adresse);
            formData.append('ville', ville);
            formData.append('date_event', date);
            formData.append('heure_debut', heureDebut);
            formData.append('heure_fin', heureFin);
        const form = e.currentTarget;
        setValidity(form.checkValidity());
        setValidated(true);
        const config = {headers:{ 'Content-Type': 'multipart/form-data; boundary=77f77c04-2c7b-4179-aca3-my-cool-boundary'}};
        if(form.checkValidity()){
            validity
            const result = await eventService.publier(config, formData);
            console.log("result ==> ",result.message);
            props.afficherAlert(result.message, "success")
            e.target = null ;
            props.handleCloseEvent();
        }   
    }


    return (
    <div>
        <Form noValidate encType='multipart/form-data' method='post' validated={validated}  onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Titre :</Form.Label>
            <Form.Control required type="text" placeholder="Enter title" name="title" onChange={(e)=>{setTitle(e.target.value)}}/> 
            <Form.Control.Feedback type="invalid">remplissez un titre</Form.Control.Feedback>
            <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicResume">
            <Form.Label>adresse :</Form.Label>
            <Form.Control required type="text" placeholder="Enter resume" name="adresse" onChange={(e)=>{setAdresse(e.target.value)}}/> 
            <Form.Control.Feedback type="invalid">remplissez l'adressse</Form.Control.Feedback>
            <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicResume">
            <Form.Label>ville :</Form.Label>
            <Form.Control required type="text" placeholder="Enter resume" name="ville" onChange={(e)=>{setVille(e.target.value)}}/> 
            <Form.Control.Feedback type="invalid">remplissez une ville</Form.Control.Feedback>
            <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicResume">
            <Form.Label>date :</Form.Label>
            <Form.Control required type="date" placeholder="Enter resume" name="date_event" onChange={(e)=>{setDate(e.target.value)}}/> 
            <Form.Control.Feedback type="invalid">remplissez une date</Form.Control.Feedback>
            <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicResume">
            <Form.Label>heure debut :</Form.Label>
            <Form.Control required type="time" placeholder="Enter resume" name="heure_debut" onChange={(e)=>{setHeureDebut(e.target.value)}}/> 
            <Form.Control.Feedback type="invalid">remplissez une heure de debut</Form.Control.Feedback>
            <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicResume">
            <Form.Label>heure fin :</Form.Label>
            <Form.Control required type="time" placeholder="Enter resume" name="heure_fin" onChange={(e)=>{setHeureFin(e.target.value)}}/> 
            <Form.Control.Feedback type="invalid">remplissez une heure de fin </Form.Control.Feedback>
            <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="position-relative mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control type="file" required name="image" onChange={(e)=>{setImage(e.target.value)}} />
            <Form.Control.Feedback type="invalid" >Veuillez insérer une image </Form.Control.Feedback>
            <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
        </Form.Group>

        <InputGroup>
            <InputGroup.Text>contenu :</InputGroup.Text>
            <Form.Control as="textarea" required name='content' aria-label="With textarea" onChange={(e)=>{setContent(e.target.value)}} />
            <Form.Control.Feedback type="invalid">remplissez le contenu</Form.Control.Feedback>
            <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
        </InputGroup>

        <Button type='submit'>Demander à publier</Button>
    </Form>
    </div>
)
}

export default FormulaireEvent
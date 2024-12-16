import  { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {inscrire } from '../../../../services/auth/auth.service'
import * as gestionErreur from '../../Component/gestionErreur.tsx'

import '../../../Styles/Formulaire.css'


const Inscription = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [validated, setValidated] = useState(false);
    useEffect(  () => {
        
      },[])

    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setUser((user: any) => ({...user, [name]: value})); 
    } 

    const handleSubmit = async  (e: any) => {
        e.preventDefault();
        console.log("handle submit");
        const form = e.currentTarget;
        if (form.checkValidity()) {
            try {
                setValidated(true);
                await inscrire(user) ;
                console.log("avant navigate");
                navigate("/connexion");
            } catch (error) {
                gestionErreur.afficherErreur(error);
            }
        }
        

        

    }



  return (
    <div>          
        <Form className='formulaire' noValidate validated={validated}  onSubmit={handleSubmit}>
            <Form.Group className='mb-4' controlId='firstName'>
                <Form.Label className='label' >Nom :</Form.Label>
                <Form.Control required={true} name='firstName' type='text' onChange={handleChange}    />
                <Form.Control.Feedback type='invalid' role='alert' data-validity={false} > veuillez inscrire votre nom  </Form.Control.Feedback>
                <Form.Control.Feedback  > merci </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='lastName'>
                <Form.Label className='label'>Prenom :</Form.Label>
                <Form.Control required type='text' name='lastname' onChange={handleChange}  />                
                <Form.Control.Feedback type='invalid' > veuillez remplir votre prénom </Form.Control.Feedback>
                <Form.Control.Feedback  > merci </Form.Control.Feedback>
            </Form.Group>           
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label className='label'>Email :</Form.Label>
                <Form.Control required type='email' name='email' onChange={handleChange} />
                <Form.Control.Feedback type='invalid' > veuillez remplir votre email </Form.Control.Feedback>
                <Form.Control.Feedback type='valid' >merci </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label className='label'>Mot de passe :</Form.Label>
                <Form.Control required type='password' name='password' onChange={handleChange} />
                <Form.Control.Feedback type='invalid' > veuiullez remplir votre mot de passe </Form.Control.Feedback>
                <Form.Control.Feedback type='valid' >merci </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='born'>
                <Form.Label className='label'>Date de naissance :</Form.Label>
                <Form.Control required type='date' name='born' onChange={handleChange} />
                <Form.Control.Feedback type="invalid" > veuillez remplir votre date de naissance </Form.Control.Feedback>
                <Form.Control.Feedback type='valid' > merci</Form.Control.Feedback>
            </Form.Group>
            <Button type='submit'>s'Inscrire</Button>
        </Form> 
    </div>       
)
}

export default Inscription
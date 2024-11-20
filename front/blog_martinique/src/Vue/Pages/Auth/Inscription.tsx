import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { URl } from '../../../Utils/Constant/URL';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback';
import {inscrire } from '../../../../services/auth/auth.service'
import { USER } from '../../../Utils/Constant/Types';

import '../../../Styles/Formulaire.css'


const Inscription = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<USER>({});
    const [validated, setValidated] = useState(false);
    const [validity, setValidity] = useState(false);
    const [subjects, setSubjects] = useState([]);



    useEffect(  () => {
        const recupSubjects = async () => {
          const response = await axios.get(URl.GET_ALL_SUBJECT);
          setSubjects(response.data.data);
        }
        recupSubjects();
      },[])

    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setUser((user: any) => ({...user, [name]: value})); 
    } 

    const handleSubmit = (e: any) => {
        e.preventDefault();
        validityCheck(e);

    }

    const validityCheck = (e: any) => {
        const form = e.currentTarget;
        setValidity(form.checkValidity());
        setValidated(true);
        if(form.checkValidity()){
            inscription();
        }

    }

    const inscription = async () => {
        try {
            const result = await inscrire(user) ;
            navigate("/blogMartinique/connexion")
        } catch (error) {
            
        }
    }

  return (
    <div>          
        <Form className='formulaire' noValidate validated={validated}  onSubmit={handleSubmit}>
            <Form.Group className='mb-4' controlId='firstName'>
                <Form.Label className='label' >Nom :</Form.Label>
                <Form.Control 
                required={true}
                    name='firstName'
                    type='text'
                    onChange={handleChange} 
                />
                <Form.Control.Feedback type='invalid' role='alert' data-validity={false} > Please provide a firstname  </Form.Control.Feedback>
                <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>

            </Form.Group>

            <Form.Group className='mb-3' controlId='lastName'>
                <Form.Label className='label'>Prenom :</Form.Label>
                <Form.Control required type='text' name='lastname' onChange={handleChange}  />
                
                <Form.Control.Feedback type='invalid' > Please provide a lastname </Form.Control.Feedback>
                <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label className='label'>Sujet :</Form.Label>
                <Form.Select onChange={handleChange} name='idSubject' aria-label="Default select example">
                    <option   name="SubjectId" value="">  </option>
                    {subjects && subjects.map((subject, index) => 
                        <option key={index}  name="SubjectId" value={subject.id}>{subject.name}  </option>
                    )}
                </Form.Select> 
                <Form.Control.Feedback type="invalid">Please provide an subject</Form.Control.Feedback>
                <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='email'>
                <Form.Label className='label'>Email :</Form.Label>
                <Form.Control required type='email' name='email' onChange={handleChange} />
                <Form.Control.Feedback type='invalid' > Please provide a email </Form.Control.Feedback>
                <Form.Control.Feedback type='valid' >Looks Good ! </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
                <Form.Label className='label'>Mot de passe :</Form.Label>
                <Form.Control required type='password' name='password' onChange={handleChange} />
                <Form.Control.Feedback type='invalid' > Please provide a password </Form.Control.Feedback>
                <Form.Control.Feedback type='valid' >Looks Good ! </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='born'>
                <Form.Label className='label'>Date de naissance :</Form.Label>
                <Form.Control required type='date' name='born' onChange={handleChange} />
                <Form.Control.Feedback type="invalid" > Please provide a date of born </Form.Control.Feedback>
                <Form.Control.Feedback type='valid' > Looks Good !</Form.Control.Feedback>
            </Form.Group>
            <Button type='submit'>s'Inscrire</Button>
        </Form> 
    </div>       
)
}

export default Inscription
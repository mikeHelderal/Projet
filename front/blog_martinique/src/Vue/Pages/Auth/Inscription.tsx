import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URl } from '../../../Utils/Constant/URL';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback';


const Inscription = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [validated, setValidated] = useState(false);
    const [validity, setValidity] = useState(false);


    const handleChange = (e: any) =>{
        console.log("target => ", e.target)
        const {name, value} = e.target;
        console.log("name => ", name);
        console.log("value => ", value);
        setUser((user: any) => ({...user, [name]: value})); 
    } 

    const handleSubmit = (e: any) => {
        console.log("handleSubmit")
        e.preventDefault();
        const form = e.currentTarget;
        console.log("checkValidity => ",form.checkValidity() )

        setValidity(form.checkValidity());
        setValidated(true);

        if(form.checkValidity()){
            console.log(" ici ce ferza l'appel inscription");
            inscription();
        }

    }

    const inscription = () => {
        const inscrire = async () => {
            try {
                const response = await axios.post(URl.SIGNUP, user);
                console.log(response);
                navigate('/connexion');
            } catch (error) {
                alert("utilisateur introuvable veuillez vous incscrire");
            }
        }
        inscrire();
    }

  return (
    <div>          
        <Form noValidate validated={validated}  onSubmit={handleSubmit}>
            <Form.Group className='mb-4' controlId='firstName'>
                <Form.Label>Nom :</Form.Label>
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
                <Form.Label>Prenom :</Form.Label>
                <Form.Control required type='text' name='lastname' onChange={handleChange}  />
                
                <Form.Control.Feedback type='invalid' > Please provide a lastname </Form.Control.Feedback>
                <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email :</Form.Label>
                <Form.Control required type='email' name='email' onChange={handleChange} />
                <Form.Control.Feedback type='invalid' > Please provide a email </Form.Control.Feedback>
                <Form.Control.Feedback type='valid' >Looks Good ! </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Mot de passe :</Form.Label>
                <Form.Control required type='password' name='password' onChange={handleChange} />
                <Form.Control.Feedback type='invalid' > Please provide a password </Form.Control.Feedback>
                <Form.Control.Feedback type='valid' >Looks Good ! </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='born'>
                <Form.Label>Date de naissance :</Form.Label>
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
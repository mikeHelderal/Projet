import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URl } from '../../../Utils/Constant/URL';
import {useDispatch, useSelector} from  'react-redux';
import * as ACTION from '../../../../redux/reducers/user';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback';


const Connexion = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [validated, setValidated] = useState(false);
    const [validity, setValidity] = useState(false);
    const dispatch = useDispatch();



    const handleChange = (e: any) =>{
        const {name, value} = e.target;
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
            console.log(" ici ce fera l'appel connexion");
            connexion();
        }
    }


    const connexion = () => {
      dispatch(ACTION.FETCH_START());
        const enregistrer = async () => {
          try {
            const response = await axios.post(URl.LOGIN, user);
            dispatch(ACTION.FETCH_SUCCES(response.data))
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
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email :</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" name="email" onChange={handleChange}/> 
        <Form.Control.Feedback type="invalid">Please provide an email</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password :</Form.Label>
        <Form.Control required type="password" placeholder="Enter password" name="password" onChange={handleChange}/> 
        <Form.Control.Feedback type="invalid">Please provide an password</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </Form.Group>
      <Button type='submit'>Connexion</Button>
    </Form>
    
    </div>





   
  )
}

export default Connexion
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URl } from '../../../Utils/Constant/URL';
import {useDispatch, useSelector} from  'react-redux';
import * as ACTION from '../../../../redux/reducers/user';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback';
import { connexion } from '../../../../services/auth.service';


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
        e.preventDefault();
        const form = e.currentTarget;

        setValidity(form.checkValidity());
        setValidated(true);

        if(form.checkValidity()){
            ceConnecter();
        }
    }


    const ceConnecter = async () => {
      dispatch(ACTION.FETCH_START());
      const result = await connexion(user)
      dispatch(ACTION.FETCH_SUCCES(result))
      localStorage.setItem("User",JSON.stringify(result));
      navigate("/blogMartinique");

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
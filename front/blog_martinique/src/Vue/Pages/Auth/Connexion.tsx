import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from  'react-redux';
import * as ACTION from '../../../../redux/reducers/reactionPubli';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connexion } from '../../../../services/auth/auth.service';
import { USER } from '../../../Utils/Constant/Types';

import '../../../Styles/Formulaire.css';

const Connexion = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<any>({});
    const [validated, setValidated] = useState(false);
    const [validity, setValidity] = useState(false);
    const dispatch = useDispatch();



    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setUser((user: USER) => ({...user, [name]: value}));
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
      dispatch(ACTION.FETCH_SUCCESS(result))
      
      navigate("/blogMartinique");
      window.location.reload();


    }

  return (


    <div>
    
    <Form className='formulaire' noValidate validated={validated}  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='label'>Email :</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" name="email" onChange={handleChange}/> 
        <Form.Control.Feedback type="invalid">Please provide an email</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='label'>Password :</Form.Label>
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
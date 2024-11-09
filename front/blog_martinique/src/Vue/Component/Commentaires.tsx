import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URl } from '../../Utils/Constant/URL'
import { Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import "../../Styles/Commentaires.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { RootStateCom } from '../../Utils/interfaces/commentaire.interface';
//import { socket } from '../../socket.ts';
import Response from "./Response.tsx"

import * as ACTION from '../../../redux/reducers/commentair.tsx';

import { getCommentair} from "../../../services/selector/Commentair.selecteur.tsx"

const Commentaires = (props : any) => {
    const userId = localStorage.getItem("UserId");
    const socket = io(URl.BACK);


    const [commentaires, setCommentaires] = useState();
    const [commentaire, setCommentaire] = useState<any>({"UserId": userId, "PublicationId": props.PublicationId });
    const [validated, setValidated] = useState(false);
    const [validity, setValidity] = useState(false);

    const currentMe = localStorage.getItem("UserId")
    const dispatch = useDispatch();
    const lesCommentaires = useSelector((state: RootStateCom) => getCommentair(state))

    useEffect(() => {
        dispatch(ACTION.FETCH_START())
        const recupComments = async () => {
            const response = await axios.get(URl.GET_ALL_COMMENT);
            console.log(response.data.data)
            dispatch(ACTION.FETCH_SUCCESS(response.data.data))
            setCommentaires(response.data.data);
            
        }
        recupComments();
        socket.on("connect", () => {
            console.log("Connected to the server");
            socket.on('newComment', (response) => {
                console.log("response: ", response);
                dispatch(ACTION.FETCH_SUCCESS( response))
            })
        })
    },[]);

    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setCommentaire((commentair: any) => ({...commentair, [name]: value}));
    } 

    

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.currentTarget;

        console.log(commentaire)

        setValidity(form.checkValidity());
        setValidated(true);

        if(form.checkValidity()){
            commenter();
        }
    }

    const commenter = async () => {
        dispatch(ACTION.FETCH_START());
        try {
            const response = await axios.post(URl.ADD_COMMENT, commentaire);
            console.log("response => ",response.data.response);
            //dispatch(ACTION.FETCH_SUCCESS( response.data.response))
            
        } catch (error) {
            
        }
    }





  return (
    <span>
        {lesCommentaires && lesCommentaires.map((item, index) => (
          <span key={index}  >
            {  item.PublicationId == props.PublicationId ?

        <Toast className='com dark' >
            <Toast.Header closeButton={false}>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">{item.User.firstName}</strong>
                <small> {props.PublicationId} 11 mins ago</small>
            </Toast.Header>
            <Toast.Body>{item.content}</Toast.Body>
        </Toast>  
        : null}
        
        </span>




        ))}

<Form className='formulaire' noValidate validated={validated}  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control required type="text" placeholder="Enter comment" name="content" onChange={handleChange}/> 
        <Form.Control.Feedback type="invalid">Please provide an email</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </Form.Group>
      <Button variant="outline-secondary" type='submit'>Commenter</Button>
    </Form>
        
    </span>
  )
}

export default Commentaires
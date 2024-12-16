import  { useEffect, useState } from 'react'
import { Button, Form, Toast } from 'react-bootstrap';
import "../../../Styles/Commentaires.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { RootStateCom } from '../../../Utils/interfaces/commentaire.interface.ts';
//import { socket } from '../../socket.ts';

import * as ACTION from '../../../../redux/reducers/commentair.tsx';

import { getCommentair} from "../../../../services/selector/Commentair.selecteur.tsx"
import * as commentaireService from '../../../../services/commentaire/commentaire.service.ts'


const Commentaires = (props : any) => {
    const userId = localStorage.getItem("UserId");
    const socket = io(import.meta.env.REACT_APP_BACKEND_URL);


    const [commentaire, setCommentaire] = useState<any>({"UserId": userId, "PublicationId": props.PublicationId });
    const [validated, setValidated] = useState(false);
    const [validity, setValidity] = useState(false);
    const [disabledCommentaire, setDisabledCommentaire] = useState(false);

    const dispatch = useDispatch();
    const lesCommentaires = useSelector((state: RootStateCom) => getCommentair(state))

    useEffect(() => {
        
        dispatch(ACTION.FETCH_START())
        const recupComments = async () => {
            commentaireService.recupComments(dispatch);            
        }
        recupComments();
        setDisabledCommentaire(props.valid);
        socket.on("connect", () => {
            socket.on('newComment', (response) => {
                dispatch(ACTION.FETCH_SUCCESS( response))
            })
        })
    },[]);

    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setCommentaire((commentair: any) => ({...commentair, [name]: value}));
    } 

    

    const handleSubmit = async  (e: any) => {
        e.preventDefault();
        const form = e.currentTarget;
        setValidity(form.checkValidity());
        setValidated(true);
        if(validity || commentaire.content != null){
            await commentaireService.commenter(commentaire, dispatch)
            e.target.reset();



           
        }
    }

  return (
    <span>
        {lesCommentaires && lesCommentaires.map((item: any, index: any) => (
          <span key={index}  >
            {  item.PublicationId == props.PublicationId ?

        <Toast bg='Dark' >
            <Toast.Header closeButton={false}>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">{item.User.firstName}</strong>
            </Toast.Header>
            <Toast.Body className='Dark'>{item.content}</Toast.Body>
        </Toast>  

        : null}
        
        </span>




        ))}

<Form className='formulaire' noValidate validated={validated}  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control disabled= {disabledCommentaire} required type="text" placeholder="Enter comment" name="content" onChange={handleChange}/> 
        <Form.Control.Feedback type="invalid">veuillez écrire un commentaire</Form.Control.Feedback>
        <Form.Control.Feedback  > Looks Good ! </Form.Control.Feedback>
      </Form.Group>
      <Button disabled= {disabledCommentaire} variant="outline-secondary" type='submit'>Commenter</Button>
    </Form>
        
    </span>
  )
}

export default Commentaires
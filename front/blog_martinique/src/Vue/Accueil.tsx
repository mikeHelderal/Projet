import  { useEffect } from 'react'
import NavBar from "../Vue/Component/NavBar"
import {Outlet} from 'react-router-dom'
import "../Styles/Accueil.css"
import { useDispatch } from 'react-redux';
import * as publicationService from '../../services/publication/publication.service.ts' 
import * as eventService from '../../services/event/event.service.ts'





const Accueil = () => {

  const dispatch = useDispatch();



  useEffect( () => {
    
    const recupPubli = async () => {
     publicationService.recupPubli(dispatch);
    }
    const recupEvents = async () => {
     eventService.recupEvents(dispatch);

    }
    recupPubli();
    recupEvents();
      

  },[])

  
  return (
    <div>
    <header className='header'>  
    <NavBar ></NavBar>  
    </header>
    <section>
        <Outlet/>        
    </section>
    <footer className='footer'>
      <h1></h1>
    </footer>
    </div>
    
  )
}

export default Accueil
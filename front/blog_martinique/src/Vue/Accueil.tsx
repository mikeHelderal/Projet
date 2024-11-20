import React, { useEffect, useState } from 'react'
import NavBar from "../Vue/Component/NavBar"
import {Outlet} from 'react-router-dom'
import "../Styles/Accueil.css"
import { useDispatch, useSelector } from 'react-redux';
import * as ACTION from '../../redux/reducers/publications';
import * as ACTIONE from '../../redux/reducers/events';
import axios from 'axios';
import { URl } from '../Utils/Constant/URL';




const Accueil = () => {

  const dispatch = useDispatch();



  useEffect( () => {
    
    const recupPubli = async () => {
      dispatch(ACTION.FETCH_START())
      const response = await axios.get(URl.GET_ALL_PUBLICATION_VALID);
      //setMesReactions([response.data.data]);
      dispatch(ACTION.FETCH_SUCCESS(response.data.data))
    }
    const recupEvents = async () => {
      dispatch(ACTIONE.FETCH_START())

      const response = await axios.get(URl.GET_ALL_EVENTS);
      
      dispatch(ACTIONE.FETCH_SUCCESS(response.data.data));

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
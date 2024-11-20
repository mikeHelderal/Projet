import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import "../../../Styles/Tab.css"
import CardHT from '../../Component/event/CardEvent'
import { URl } from '../../../Utils/Constant/URL'
import axios from 'axios'
import {Outlet} from 'react-router-dom'
import CardEA from '../../Component/publication/CardEA'
import { useSelector } from 'react-redux'
import { RootStatePublications } from '../../../Utils/interfaces/publication.interface';
import {getPublicationValider} from "../../../../services/selector/Publication.selecteur";
const ActualiteAccueil = () => {


  const publications = useSelector((state: RootStatePublications) => getPublicationValider(state));



  useEffect(() => {
      /**const recupPublication = async () => {
          const response = await axios.get(URl.GET_ALL_PUBLICATION_VALID);
          let result = response.data.data.filter((res: any) => res.SubjectId == idBalneaire );
          setPublication(result);
      }
      recupPublication();*/


  },[])
  return (
    <div>
         <div>
        <header className='header'>  
        </header>
        <section>
            <CardEA publication = {publications} valid = {true} ></CardEA>        
        </section>
        <footer className='footer'>
        <h1></h1>
        </footer>
    </div>
    </div>
  )
}

export default ActualiteAccueil
import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import "../../../Styles/Tab.css"
import CardHT from '../../Component/CardHT'
import { URl } from '../../../Utils/Constant/URL'
import axios from 'axios'
import {Outlet} from 'react-router-dom'
import CardEA from '../../Component/CardEA'

const ActualiteAccueil = () => {


  const [publications, setPublication] = useState();
  const idBalneaire = 8 ;


  useEffect(() => {
      const recupPublication = async () => {
          const response = await axios.get(URl.GET_ALL_PUBLICATION);
          let result = response.data.data.filter((res: any) => res.SubjectId == idBalneaire );
          console.log("résult => ",result);
          setPublication(result);
      }
      recupPublication();


  },[])
  return (
    <div>
         <div>
        <header className='header'>  
        </header>
        <section>
            <CardEA publication = {publications} ></CardEA>        
        </section>
        <footer className='footer'>
        <h1></h1>
        </footer>
    </div>
    </div>
  )
}

export default ActualiteAccueil
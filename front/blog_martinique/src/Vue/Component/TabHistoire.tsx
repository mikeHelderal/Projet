import React, { useEffect } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import "../../Styles/Tab.css"
import Cards from './CardHT'

const TabHistoire = () => {



    useEffect(() => {


    //code pour récupération les informations  en bdd  afin de les envoyer dans la card pour un  traitement personnalisé

  return (
    <div>
        <Tabs defaultActiveKey="Bèlè"  id="justify-tab-example" className='mb-3'  fill >
            <Tab eventKey="Bèlè" title="Bèlè">                
                <Cards></Cards>
            </Tab>
            <Tab eventKey="Martinique" title="Martinique">
                <Cards></Cards>
            </Tab>
            <Tab eventKey="Rhum" title="Rhum">
                <Cards></Cards>
            </Tab>
        </Tabs>
    </div>
  )
}

export default TabHistoire
import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import "../../../Styles/Tab.css"
import CardHT from '../../Component/CardHT'


const TabTourisme = () => {


    const [publications, setPublication] = useState();

    useEffect(() => {

    })


  return (
    <Tabs 
            defaultActiveKey="Gastronomique"
            id="justify-tab-example"
            className='mb-3'
            justify
        >
            <Tab eventKey="Gastronomique" title="Gastronomique">
                <CardHT></CardHT>
            </Tab>
            <Tab eventKey="Culturel" title="Culturel">
                <CardHT></CardHT>
            </Tab>
            <Tab eventKey="Balnéaire" title="Balnéaire">
                <CardHT></CardHT>
            </Tab>



        </Tabs>
  )
}

export default TabTourisme
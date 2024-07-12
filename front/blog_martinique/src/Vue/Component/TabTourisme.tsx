import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import "../../Styles/Tab.css"
import Cards from './CardHT'


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
                <Cards></Cards>
            </Tab>
            <Tab eventKey="Culturel" title="Culturel">
                <Cards></Cards>
            </Tab>
            <Tab eventKey="Balnéaire" title="Balnéaire">
                <Cards></Cards>
            </Tab>



        </Tabs>
  )
}

export default TabTourisme
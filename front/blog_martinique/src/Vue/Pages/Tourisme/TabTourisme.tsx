import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import "../../../Styles/Tab.css"
import CardHT from '../../Component/event/CardEvent'
import { URl } from '../../../Utils/Constant/URL'
import axios from 'axios'


const TabTourisme = () => {


    const [publications, setPublication] = useState();
    const idBalneaire = 8 ;

    useEffect(() => {
        const recupPublication = async () => {
            const response = await axios.get(URl.GET_ALL_PUBLICATION);
            let result = response.data.data.filter((res: any) => res.SubjectId == idBalneaire );
            setPublication(result);
        }
        recupPublication();


    },[])


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
                <CardHT publication = {publications}  ></CardHT>
            </Tab>



        </Tabs>
  )
}

export default TabTourisme
import React, { useEffect } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import "../../../Styles/Tab.css"
import TimelineRhum from '../../Component/TimelineRhum'
import TimelineMartinique from './TimelineMartinique'
import TimelineBele from './TimelineBele'


const TabHistoire = () => {





    //code pour récupération les informations  en bdd  afin de les envoyer dans la card pour un  traitement personnalisé

return (
    <div>
        <Tabs defaultActiveKey="Bèlè"  id="justify-tab-example" className='mb-3'  fill >
            <Tab eventKey="Bèlè" title="Bèlè">                
                <TimelineBele></TimelineBele>
            </Tab>

            <Tab eventKey="Martinique" title="Martinique">
                <TimelineMartinique></TimelineMartinique>
            </Tab>

            <Tab eventKey="Rhum" title="Rhum">
                <TimelineRhum></TimelineRhum>
            </Tab>
        </Tabs>
    </div>
)}

export default TabHistoire
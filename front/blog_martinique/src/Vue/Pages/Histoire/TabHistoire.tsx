import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import "../../../Styles/Tab.css"
import TimelineRhum from '../../Component/TimelineRhum'


const TabHistoire = () => {





    //code pour récupération les informations  en bdd  afin de les envoyer dans la card pour un  traitement personnalisé

return (
    <div>
        <Tabs defaultActiveKey="FB"  id="justify-tab-example" className='mb-3'  fill >
            <Tab eventKey="FB" title="Fusion Belka">
                <TimelineRhum></TimelineRhum>
            </Tab>
        </Tabs>
    </div>
)}

export default TabHistoire
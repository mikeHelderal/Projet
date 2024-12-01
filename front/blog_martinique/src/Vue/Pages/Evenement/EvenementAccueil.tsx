import CardEvent from '../../Component/event/CardEvent'
import { useSelector } from 'react-redux'
import { RootStateEvents } from '../../../Utils/interfaces/events.interface';
import { getEventsValider } from "../../../../services/selector/Events.selecteur";


const EvenementAccueil = () => {
  const evenments = useSelector((state: RootStateEvents) => getEventsValider(state));


  return (
    <div>
        <div>
            <header className='header'>  
            </header>
            <section>
                <CardEvent evenment = {evenments} valid = {true}></CardEvent>        
            </section>
            <footer className='footer'>
            </footer>
        </div>
    </div>
  )
}

export default EvenementAccueil
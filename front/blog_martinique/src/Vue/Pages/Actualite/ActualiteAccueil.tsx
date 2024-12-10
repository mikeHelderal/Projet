import  { useEffect } from 'react'
import "../../../Styles/Tab.css"
import CardEA from '../../Component/publication/CardEA'
import { useSelector } from 'react-redux'
import { RootStatePublications } from '../../../Utils/interfaces/publication.interface';
import {getPublicationValider} from "../../../../services/selector/Publication.selecteur";
const ActualiteAccueil = () => {


  const publications = useSelector((state: RootStatePublications) => getPublicationValider(state));



  useEffect(() => {
     


  },[])
  return (
    <div>
         <div>
        <header className='header'>  
        </header>
        <section>
        {publications && publications.map((item: any, index: any) => (
          <p key={index}>
            <CardEA maPublication= {item} publication = {publications} valid = {true} ></CardEA>
            </p>
          ))}
        
        </section>
        <footer className='footer'>
        <h1></h1>
        </footer>
    </div>
    </div>
  )
}

export default ActualiteAccueil
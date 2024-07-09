import React from 'react'
import {Outlet} from 'react-router-dom'
import TabTourisme from '../../Component/TabTourisme'
import CardEA from '../../Component/CardEA'

const ActualiteAccueil = () => {
  return (
    <div>
         <div>
        <header className='header'>  
        </header>
        <section>
            <CardEA></CardEA>        
        </section>
        <footer className='footer'>
        <h1></h1>
        </footer>
    </div>
    </div>
  )
}

export default ActualiteAccueil
import React from 'react'
import {Outlet} from 'react-router-dom'
import TabTourisme from '../../Component/TabTourisme'
import CardEA from '../../Component/CardEA'

const EvenementAccueil = () => {
  return (
    <div>
        <div>
            <header className='header'>  
            </header>
            <section>
                <CardEA></CardEA>        
            </section>
            <footer className='footer'>
            </footer>
        </div>
    </div>
  )
}

export default EvenementAccueil
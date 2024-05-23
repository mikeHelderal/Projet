import React from 'react'
import NavBar from '../Component/NavBar'
import {NavLink,Outlet} from 'react-router-dom'

const Accueil = () => {
  return (
    <div>
    <header className='header'>    
    </header>
    <section>
        <Outlet/>        
    </section>
    <footer className='footer'>
      <h1></h1>
    </footer>
    </div>
    
  )
}

export default Accueil
import React from 'react'
import NavBar from "../Vue/Component/NavBar"
import {Outlet} from 'react-router-dom'
import "../Styles/Accueil.css"

const Accueil = () => {
  return (
    <div>
    <header className='header'>  
    <NavBar></NavBar>  
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
import React from 'react'
import {Outlet} from 'react-router-dom'
import TabHistoire from '../../Component/TabHistoire'


const HistoireAccueil = () => {









  return (
    <div>
        <header className='header'>  
            <TabHistoire></TabHistoire>  
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

export default HistoireAccueil
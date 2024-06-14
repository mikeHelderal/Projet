import React from 'react'
import {NavLink,Outlet} from 'react-router-dom'
import "../Styles/NavBar.css"
const NavBar = () => {


  return (

    <div>
        <nav className='nav'>      
            <ul>    
                <NavLink to='/connexion' activeClassName="active">Connexion</NavLink>            
            </ul>    
            <ul>
                <NavLink to='/inscription' activeClassName="active">Inscription</NavLink>            
            </ul>          
            <ul>            
                <NavLink to="/" activeClassName="active">Accueil</NavLink>
            </ul>
            <ul>
                <NavLink to='/' activeClassName="active">Histoire</NavLink>            
            </ul>
            <ul>
                <NavLink to='/' activeClassName="active">Evenement</NavLink>            
            </ul>
            <ul>
                <NavLink to='/' activeClassName="active">Actualité</NavLink>            
            </ul>
            <ul>

                <li className='deroulant'>Tourisme
                    <ul className='sous' >
                        <li><NavLink to='/' activeClassName="active">Gastronomique</NavLink></li>
                        <li><NavLink to='/' activeClassName="active">Culturel</NavLink></li>
                        <li><NavLink to='/' activeClassName="active">Balneaire</NavLink></li>
                    </ul>
                </li>          
            </ul>
        </nav>    
    </div>
  )
}

export default NavBar
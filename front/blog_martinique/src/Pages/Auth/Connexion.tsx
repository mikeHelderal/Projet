import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URl } from '../../Utils/Constant/URL';

const Connexion = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setUser((user: any) => ({...user, [name]: value}));
    } 


    const connexion = (e: any) => {
        e.preventDefault();
        const enregistrer = async () => {

          try {
            const response = await axios.post(URl.LOGIN, user);
            console.log(response);
            navigate("/");
          } catch (error) {
            alert("utilisateur introuvable veuillez vous incscrire");
          }
        }
        enregistrer();
    }

  return (


    <div>
    <header className='header'>    
    </header>
    <section>
    
      <form onSubmit={connexion} >
        <label htmlFor="email" >Email :</label>
        <input id="email" type='email' name="email" onChange={handleChange} />
        <label htmlFor="password">Mot de passe : </label>
        <input id='password' type='password' name='password'  onChange={handleChange}/>
        <button>Connexion</button>
    </form>
    </section>
    <footer className='footer'>
      <h1></h1>
    </footer>
    </div>





   
  )
}

export default Connexion
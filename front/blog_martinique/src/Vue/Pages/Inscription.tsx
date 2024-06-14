import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URl } from '../../Utils/Constant/URL';


const Inscription = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setUser((user: any) => ({...user, [name]: value}));
    } 

    const inscription = (e: any) => {
        e.preventDefault();
        const inscrire = async () => {
            try {
                const response = await axios.post(URl.SIGNUP, user);
                console.log(response);
            } catch (error) {
                alert("utilisateur introuvable veuillez vous incscrire");
            }
        }
        inscrire();
    }

  return (


    <div>
    <header className='header'>    
    </header>
    <section>
    <form onSubmit={inscription} >
            <label htmlFor="firstName" >FirstName :</label>
            <input id="firstName" type='text' name="firstName" onChange={handleChange} />

            <label htmlFor="lastname" >LastName :</label>
            <input id="lastname" type='text' name="lastname" onChange={handleChange} />

            <label htmlFor="email" >Email :</label>
            <input id="email" type='email' name="email" onChange={handleChange} />

            <label htmlFor="password">Mot de passe : </label>
            <input id='password' type='password' name='password'  onChange={handleChange}/>

            <label htmlFor="born">Date de naissance:  </label>
            <input id='born' type='date' name='born'  onChange={handleChange}/>
         
            <button>Connexion</button>
        </form>        
    </section>
    <footer className='footer'>
      <h1></h1>
    </footer>
    </div>




        
)
}

export default Inscription
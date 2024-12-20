import './App.css'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Connexion from './Vue/Pages/Auth/Connexion'
import Inscription from './Vue/Pages/Auth/Inscription'
import Accueil from './Vue/Accueil'
import 'bootstrap/dist/css/bootstrap.min.css';
import ActualiteAccueil from './Vue/Pages/Actualite/ActualiteAccueil'
import EvenementAccueil from './Vue/Pages/Evenement/EvenementAccueil'
import GestionUser from './Vue/Pages/Admin/GestionUser'
import { useEffect, useState } from 'react'





function App() {
  const [isAdmin , setisAdmin] = useState("");

  
  useEffect( () => {
    if(localStorage.getItem("isAdmin")){
      if(localStorage.getItem("isAdmin") === "false"){
        setisAdmin("connected");
      }else {
        setisAdmin("admin");
      }
    }else{
      setisAdmin("not_connected");
    }

  },[])


  return (
    <BrowserRouter> 
      {isAdmin && isAdmin === "admin" ? 
        <Routes>
          <Route path='/' element={<Accueil/>}>
            <Route path='/connexion' element={<Connexion/>}/>
            <Route path='/inscription' element={<Inscription/>}/>
            <Route path='/News' element={<ActualiteAccueil/>}/>
            <Route path='/Events' element={<EvenementAccueil/>}/>
            <Route path='/GU' element={<GestionUser/>}/>
          </Route>    
        </Routes>
    :
      <Routes>
        <Route path='/' element={<Accueil/>}>
          <Route path='/connexion' element={<Connexion/>}/>
          <Route path='/inscription' element={<Inscription/>}/>
          <Route path='/News' element={<ActualiteAccueil/>}/>
          <Route path='/Events' element={<EvenementAccueil/>}/>
        </Route>    
      </Routes>
  }   
    </BrowserRouter> 
  )
}

export default App

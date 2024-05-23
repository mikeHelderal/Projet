import { useState } from 'react'
import './App.css'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Connexion from './Pages/Auth/Connexion'
import Inscription from './Pages/Auth/Inscription'
import Accueil from './Pages/Accueil'
import NavBar from './Component/NavBar'


function App() {

  return (
    <BrowserRouter>
    <NavBar></NavBar>
    <Routes>
      <Route path='/connexion' element={<Connexion/>}/>
      <Route path='/inscription' element={<Inscription/>}/>
      <Route path='/' element={<Accueil/>}/>


    </Routes>
    </BrowserRouter>
  )
}

export default App

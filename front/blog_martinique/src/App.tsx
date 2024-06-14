import { useState } from 'react'
import './App.css'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Connexion from './Vue/Pages/Connexion'
import Inscription from './Vue/Pages/Inscription'
import Accueil from './Vue/Accueil'
import NavBar from './Vue/Component/NavBar'


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

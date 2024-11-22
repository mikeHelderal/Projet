import './App.css'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Connexion from './Vue/Pages/Auth/Connexion'
import Inscription from './Vue/Pages/Auth/Inscription'
import Accueil from './Vue/Accueil'
import 'bootstrap/dist/css/bootstrap.min.css';
import HistoireAccueil from './Vue/Pages/Histoire/HistoireAccueil'
import TourismeAccueil from './Vue/Pages/Tourisme/TourismeAccueil'
import ActualiteAccueil from './Vue/Pages/Actualite/ActualiteAccueil'
import EvenementAccueil from './Vue/Pages/Evenement/EvenementAccueil'




function App() {

  return (
    <BrowserRouter>    
    <Routes>
      <Route path='/blogMartinique' element={<Accueil/>}>
        <Route path='/blogMartinique/connexion' element={<Connexion/>}/>
        <Route path='/blogMartinique/inscription' element={<Inscription/>}/>
        <Route path='/blogMartinique/histoire' element={<HistoireAccueil/>}/>
        <Route path='/blogMartinique/tourisme' element={<TourismeAccueil/>}/>
        <Route path='/blogMartinique/News' element={<ActualiteAccueil/>}/>
        <Route path='/blogMartinique/Events' element={<EvenementAccueil/>}/>
      </Route>    
    </Routes>
    </BrowserRouter> 
  )
}

export default App

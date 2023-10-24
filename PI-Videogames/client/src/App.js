import '../src/styles/App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
import GameDetail from './components/GameDetail';
import SubmitGames from './SubmitGame';
import LandingPage from './components/LandingPage';
import About from './components/About';


function App() {
  return (
   <BrowserRouter>
     <Routes>
      <Route path='/'   element={<LandingPage/>}/>
      <Route path="/videogames" element={<Home/>}/>
      <Route path='/videogames/:idVideogame' element={<GameDetail/>} />
      <Route path='/addgames' element={<SubmitGames/>}/>
      <Route path='/about' element={<About/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;

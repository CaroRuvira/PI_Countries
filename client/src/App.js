import './App.css';
import {  BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/Home/Home';
import CreateActivity from './components/CreateActivity/CreateActivity';
import CountryDetail from './components/CountryDetail/CountryDetail';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <div className ="App">
        <Switch>   // se mueve solo dentro de las rutas que está envolviendo 
          <Route exact path = "/" component ={LandingPage}/>
          <Route exact path = "/home" component = {Home} />
          <Route exact path = "/activities" component = {CreateActivity}/>
          <Route  exact path = "/countries/:id" component = {CountryDetail}/>
        </Switch>

      </div>
      </BrowserRouter>
 
  );
}

export default App;

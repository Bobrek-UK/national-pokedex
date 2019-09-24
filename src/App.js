import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from './components/pokemon/Pokemon';
import Comparison from './components/pokemon/Comparison';
import Pokedex from './components/pokemon/Pokedex';
import Favourites from './components/pokemon/Favourites';

function App() {
  return (
    <Router>
    <div className="App">
      
      <NavBar />
      <div className="container">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
        <Route exact path="/comparison/:pokemonIndex" component={Comparison} />
        <Route exact path="/pokedex/:pokedex" component={Pokedex} />
        <Route exact path="/favourites/" component={Favourites} />
      <Dashboard/>
      </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;

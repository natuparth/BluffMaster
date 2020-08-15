import React from 'react';
import Header from '../header/Header';
import './App.css';
import Main from '../main/main';
import CreateGame from '../createGame/createGame';
import Game from '../game/game';
import HostGame from '../hostGame/hostGame';
import { Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
  players = ["one","two","three","four"];
  constructor() {
    super();
    this.state = {value : 4}
  }
  

 render(){

  return (
    
    <div className="App App-header">
     {/* <input type="text" value={this.state.Value} onChange={this.handleChange}/> */}
      <Header/>
      <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/startgame" component={CreateGame}/>
      <Route path="/game" component= {Game}/>
  {/* {  <CreateGame/> } */}
    {/* <Game numberOfPlayers={this.state.value} players={this.players}/> */}
    </Switch>
    </div>

  );
  }
  
}


import React from 'react';
import Header from '../header/Header';
import './App.css';
import Game from '../game/game';
import HostGame from '../hostGame/hostGame';

export default class App extends React.Component {
  players = ["one","two","three","four"];
  constructor() {
    super();
    this.state = {value : 4}
  }
  handleChange = (e) =>{ 
    this.setState({value: e.target.value});
  }

 render(){

  return (
    <div className="App App-header">
     {/* <input type="text" value={this.state.Value} onChange={this.handleChange}/> */}
      <Header/>
    {/* <Game numberOfPlayers={this.state.value} players={this.players}/> */}
    <HostGame/>
    </div>
  );
  }
  
}


import React from 'react';
import Header from '../header/Header';
import './App.css';
import Main from '../main/main';
import Game from '../game/game';

function App() {
  return (
    <div className="App App-header">
      <Header/>
     {/* <Main/> */}
     <Game/>
    </div>
  );
}

export default App;

import React from 'react';
import store from '../../gameStore/gameStore';
import Header from '../header/Header';
import './App.css';
import Main from '../main/main';
import CreateGame from '../createGame/createGame';
import Game from '../game/game';
import { Switch, Route } from 'react-router-dom';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from '../../Firebase';

const rrfConfig = { userProfile: 'users' } // react-redux-firebase config

// Initialize firebase instance

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
   createFirestoreInstance // <- needed if using firestore
}


export default class App extends React.Component {
  players = ["one","two","three","four"];
  constructor() {
    super();
    this.state = {value : 4}
  }
  

 render(){

  return (
     <ReactReduxFirebaseProvider {...rrfProps}>
          
    <div className="App App-header">
      <Header/>
    <div style={ {width:"100vw"} }>  
      <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/startgame" component={CreateGame}/>
      <Route path="/game" component= {Game}/>
    </Switch>
    </div>
    </div>
    </ReactReduxFirebaseProvider>

  );
  }
  
}


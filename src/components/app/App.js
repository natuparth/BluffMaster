import React from 'react';
import {store} from '../../gameStore/gameStore';
import Header from '../header/Header';
import './App.css';
import Main from '../main/main';
import CreateGame from '../createGame/createGame';
import Game from '../game/game';
import { Switch, Route } from 'react-router-dom';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from '../../Firebase';


const rrfConfig = { userProfile: 'users' }
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
   createFirestoreInstance // <- needed if using firestore
}


export default class App extends React.Component {
  constructor() {
    super();
  }
  

 render(){

  return (
     <ReactReduxFirebaseProvider {...rrfProps}>
    <div>      
      <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/startgame" component={CreateGame}/>
      <Route path="/game" component= {Game}/>
    </Switch>
     </div> 
    </ReactReduxFirebaseProvider>

  );
  }
  
}


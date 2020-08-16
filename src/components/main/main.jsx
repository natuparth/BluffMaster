import React, { useState } from 'react';
import firebase from '../../Firebase';
import { browserHistory } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useSelect, useDispatch } from 'react-redux';
import { hostActions, gameActions, AddPlayerAsync } from '../../gameStore/gameSlices';
import './main.css';

const db = firebase.firestore();

function Main(){
    const history = useHistory();
    const dispatch = useDispatch();
    
    function createGameHandler(gameName){
    //    dispatch(gameActions.setGameName({name: gameName}));
      //  dispatch(hostActions.setHost(true));
        let r = Math.random().toString(36).substring(7);
        console.log(r);
    dispatch(AddPlayerAsync({
        gameName: gameName,
        gameKey: r
    }))
   // browserHistory.push("/startgame");
        
    }
  



  const [createGame, toggleGame] = useState('none');
  const [gameName , setGameName] = useState(' ');
    return( 
   <div className = 'Main_container'>
       <button className = 'big-button'>Join Game</button>
       <button className = 'big-button' onClick={()=> toggleGame(createGame === 'none'?'block':'none')}>Host Game</button>
       <div style={{display: createGame, margin: '50px' }}>
       <input value = {gameName} onChange = {(event)=>setGameName(event.target.value)}/>
       <button onClick={()=>{createGameHandler(gameName) }}>Create Game</button> 
       </div>
   </div>
   )
}



export default Main;
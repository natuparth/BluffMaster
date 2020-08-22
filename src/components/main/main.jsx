import React, { useState } from 'react';
import firebase from '../../Firebase';
import { useDispatch } from 'react-redux';
import { HostGameAsync, JoinGameAsync} from '../../gameStore/gameSlices';
import './main.css';

const db = firebase.firestore();

function Main(){
    const dispatch = useDispatch();
    
   
   

   const [joinGame, setJoinGame] = useState('none');
  const [createGame, toggleGame] = useState('none');
  const [gameName , setGameName] = useState(' ');
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
    return( 
   <div className = 'Main_container'>
       <button className = 'big-button' onClick={()=> {
         setJoinGame(joinGame === 'none'?'block':'none')
         toggleGame('none');
       }
       }>Join Game</button>
       <button className = 'big-button' onClick={()=> {
        toggleGame(createGame === 'none'?'block':'none');
        setJoinGame('none'); 
      }
       }>Host Game</button>
    <div style={{display: joinGame, margin: '50px' }}>
    <input value = {gameId} onChange = {(event)=>setGameId(event.target.value)} />
    <button onClick={()=>{joinGameHandler(gameId, playerName) }}>Join Game</button> 
    </div>
    <div style={{display: createGame, margin: '50px' }}>
       <input value = {gameName} onChange = {(event)=>setGameName(event.target.value)}/>
       <button onClick={()=>{createGameHandler(gameName) }}>Create Game</button> 
       </div>
    
       <input value = {playerName} onChange = {(event)=>setPlayerName(event.target.value)}/>

   </div>
    
     

   )

 
function createGameHandler(gameName){
  let r = Math.random().toString(36).substring(7);
  console.log(r);
  dispatch(HostGameAsync({
  gameName: gameName,
  gameKey: r
}))
    
}

function joinGameHandler(gameKey, playerName){
  db.collection('games').where('gameKey' , '==', gameKey).get().then((querySnapShot)=>{
    dispatch(JoinGameAsync({gameId: querySnapShot.docs[0].id, gameKey: gameKey, gameName:querySnapShot.docs[0].gameName,
       pname: playerName}))
    console.log(querySnapShot.docs[0].id);
   
  })
}





}



export default Main;
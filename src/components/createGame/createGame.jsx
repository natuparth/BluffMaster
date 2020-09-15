import React from "react";
import { Dot } from 'react-animated-dots';
import firebase from "../../Firebase";
import { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import {history} from '../../gameStore/gameStore';
import './createGame.css';

const db = firebase.firestore();
const historyarr = history;
const ranks = {
  1: "A",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "J",
  12: "Q",
  0: "K",
};

const suits = {
  1: "spades",
  2: "diams",
  3: "hearts",
  0: "clubs",
};
 function CreateGame({gameId,gameName,isHost, playersArray, gameStarted}) {
  
  if(gameStarted === true){
    historyarr.push('/game',{gameId: gameId});
  }
  const isPlayerHost = isHost;
  const [numberOfDecks, setNumberOfDecks] = useState(1);
  const [numberOfLifeLines, setNumberOfLifeLines] = useState(3);
  const numberOfPlayers = playersArray?playersArray.length:0;
  
  return (
    <div className='Game_container1'>
    
     <Players players={playersArray}/>
      <div className='game_properties_container'>
      <h3>{gameName}</h3>
      <br/>
      <NumberOfDecks />
      <br/>
      <NumberOfLifeLines />
      <br/>
      <button className="big-button" onClick={()=>startGameHandler(numberOfDecks,numberOfPlayers,gameId)} disabled={isPlayerHost}>
        Start Game
      </button>
      </div>
    </div>
  );
  function Players(props) { 
   var elem = [];
   var i ;
   if(props.players &&props.players.length >0){
   for(i=0;i<props.players.length;i++){
    elem.push(<li className="game" key={props.players[i].pname}><span>{props.players[i].pname}</span></li>);
   }
  }

  const nodeRef1 = React.useRef(null);
  const nodeRef2 = React.useRef(null);
  const nodeRef3 = React.useRef(null);
    return (
      <div className='player_container'>
       <h2>
      Waiting for Players
        <Dot nodeRef={nodeRef1}>.</Dot>
        <Dot nodeRef={nodeRef2}>.</Dot>
        <Dot nodeRef={nodeRef3}>.</Dot>
      </h2>
        <ul className="game">
         {elem}
        </ul>
      </div>
    );
  }

  function NumberOfDecks() {
    var elem = [];
    var i = 0;
    for (i = 1; i < 5; i++) {
      var item = <option key={i}  value={i}>{i}</option>;
      elem.push(item);
    }
    return (
      <div>
        <label htmlFor="DeckSelector">Number Of Decks</label>
        <select
          value={numberOfDecks}
          id="DeckSelector"
          onChange={(event) => setNumberOfDecks(event.target.value)}
        >
          {elem}
        </select>
      </div>
    );
  }

  function NumberOfLifeLines() {
    var elem = [];
    var i = 0;
    for (i = 2; i < 7; i++) {
      var item = <option key={i} value={i}>{i}</option>;
      elem.push(item);
    }
    return (
      <div>
        <label htmlFor="LifeLinesSelector">Number Of LifeLines</label>
        <select
          value={numberOfLifeLines}
          id="LifeLinesSelector"
          onChange={(event) => setNumberOfLifeLines(event.target.value)}
        >
          {elem}
        </select>
      </div>
    );
  }
  
  function startGameHandler(numberOfDecks, numberOfPlayers, gameId) {
    var playerCards = DistributeCards(numberOfDecks,numberOfPlayers);
    
    db.collection('games').doc(gameId).get().then((documentsnapshot)=>{
     var newArray=documentsnapshot.data().Players
     newArray.forEach((element, index) => {
           element.cards = playerCards[index].cards; 
                   
       });
    var playerTurn = Math.floor(Math.random() * newArray.length);
      
     db.collection('games').doc(gameId).update(
       {
         gameStarted: true,
         Players: newArray,
         playerTurn: newArray[playerTurn].pid
       }
     ).then(()=>{
       historyarr.push('/game',{gameId: gameId});
     })
     
   
    })
    
   }
}


function DistributeCards (numberOfDecks, players){
  var PlayerData = []
  var newArr = [...Array(53).keys()].slice(1);
  var arr = [].concat(...Array(numberOfDecks).fill(newArr));
  var n = numberOfDecks * 52,
    i,
    temp;
  var totalCards = n;  
  while (n) {
    i = Math.floor(Math.random() * n--);
    temp = arr[i];
    arr[i] = arr[n];
    arr[n] = temp;
  }
  
  var cardArray = arr.map((num) => {
    var suitOfCard = suits[~~((num - 1) / 13)];
    var rankOfCard = ranks[num % 13];
    return { suit: suitOfCard, rank: rankOfCard };
  });
 
var perPlayerCards = ~~(totalCards/players);
var remainder = totalCards % players;
var startIndex = 0;
var PObj;  
for(i=1;i<=players;i++)
    {
      
      PObj = {
        cards: cardArray.slice(startIndex, (perPlayerCards)*i)
      }
     PlayerData.push(PObj);
     startIndex = (perPlayerCards)*i;
    }
  for(i=0; i<remainder;i++){
    PlayerData[i].cards.push(cardArray[startIndex+i]);
  }  


  return PlayerData;
};

const mapStateToProps = (state) => {
 
  return ({
     gameId: state.game.gameId,
     gameName: state.game.gameName,
     isHost: state.player.isHost,
   //gameId: 'wzN8dg1irzTvqgbiXUvB',
    //gameName: 'new_game',
    //isHost: 'false',
    playersArray: state.firestore.data.games ? state.firestore.data.games[state.game.gameId].Players: null,
    gameStarted: state.firestore.data.games?state.firestore.data.games[state.game.gameId].gameStarted: false
   
//     playersArray:[{pname: 'parth'},
//     {pname: 'lokesh'},
// {pname: 'samarth'}
// ],
    //gameStarted: false
  }
  )

}

export default compose(
  firestoreConnect((props) =>{ 
    return [
        {
         collection: 'games',
         doc: props.location.state.gameId
       // doc: 'wzN8dg1irzTvqgbiXUvB'
        }
 ]
}
 ),
  connect(mapStateToProps)

)(CreateGame);







import React from "react";
import firebase from "../../Firebase";
import { useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { isHost, hostActions, gameActions, gameId } from "../../gameStore/gameSlices";
import { firestoreConnect, useFirestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import './createGame.css';

const functions = require('firebase-functions');
const db = firebase.firestore();
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
 function CreateGame({gameName, playersArray}) {
  const gameIdF = useSelector(gameId); 
  console.log('dunction called');
  const isPlayerHost = useSelector(isHost);
  const [numberOfDecks, setNumberOfDecks] = useState(1);
  const [numberOfLifeLines, setNumberOfLifeLines] = useState(3);
  const [numberOfPlayers, setNumberOfPlayers] = useState(5);
  var elem;
 // if(playersArray)
 // if (playersArray.length> 0) 
   //     elem = 
  console.log(playersArray);
  return (
    <div className='Game_container1'>
     <Players players={playersArray}/>
      <div className='game_properties_container'>
      <NumberOfDecks />
      <NumberOfLifeLines />
      <button onClick={()=>startGameHandler(numberOfDecks,numberOfPlayers)} disabled={isPlayerHost}>
        Start Game
      </button>
      </div>
    </div>
  );
  function Players(props) { 
    console.log(props)
   var elem = [];
   var i ;
   if(props.players &&props.players.length >0){
   for(i=0;i<props.players.length;i++){
     //console.log(players[i].pname);
    elem.push(<li key={props.players[i].pname}><h1>{props.players[i].pname}</h1></li>);
   }
  }
    console.log(elem);
    return (
      <div className='player_container'>
        <ul>
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
  
}
function startGameHandler(numberOfDecks, numberOfPlayers) {
 var playerCards = DistributeCards(numberOfDecks,numberOfPlayers);
 
}

function DistributeCards (numberOfDecks, players){
  console.log('function called');
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
console.log(perPlayerCards);
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
 if(state.firestore.data.games)
 {
   console.log(state);
  console.log(state.firestore.data.games[state.game.gameId].Players);
 }
  return ({
    gameName: state.game.gameName,
    playersArray: state.firestore.data.games ? state.firestore.data.games[state.game.gameId].Players: null 
    }
  )

}

export default compose(
  firestoreConnect((props) =>{ 
  console.log('came inside compose');
    return [
        {
         collection: 'games',
         doc: props.location.state.gameId
        }
 ]
}
 ),
  connect(mapStateToProps)

)(CreateGame);


// db.collection('games').doc('myGame').onSnapshot(function(data){
//   console.log(data.data());
// })




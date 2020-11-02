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

 function CreateGame({gameKey,gameId,gameName,isHost, playersArray, gameStarted}) {
  
  if(gameStarted === true){
    historyarr.push('/game',{gameId: gameId});
  }
  const isPlayerHost = isHost;
  const [numberOfDecks, setNumberOfDecks] = useState(1);
  const [numberOfLifeLines, setNumberOfLifeLines] = useState(3);
  const numberOfPlayers = playersArray?playersArray.length:0;
  
  function onSiteChanged(e){
    setNumberOfDecks(e.currentTarget.value);
    console.log(e.currentTarget.value)
  }
  return (
    <div className='Game_container1'>
    
     <Players players={playersArray}/>
      <div className='game_properties_container'>
      <div className="gameKeyBox"><span>{gameKey}</span></div> 
      {/* <div className="gameNameBox">{gameName}</div> */}
      <br/>
      <NumberOfDecks />
      <br/>
      {/* <NumberOfLifeLines /> */}
      <br/>
      <button className="big-button" onClick={()=>startGameHandler(numberOfDecks,numberOfPlayers,gameId)} >
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
    elem.push(<li key={props.players[i].pname}><span style={{color: 'turquoise'}}>{props.players[i].pname}</span></li>);
   }
  }

  const nodeRef1 = React.useRef(null);
  const nodeRef2 = React.useRef(null);
  const nodeRef3 = React.useRef(null);
    return (
      <div className='player_container'>
       <h2 className="textClass">
     <span > Waiting for Players </span>
        <Dot nodeRef={nodeRef1}>.</Dot>
        <Dot nodeRef={nodeRef2}>.</Dot>
        <Dot nodeRef={nodeRef3}>.</Dot>
      </h2>
        <ul className="playersList" >
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
    var cardArray = [];
    for(var j=0;j<3;j++)  
        cardArray.push( <li key={j}>
         <div className="cardSmall back"></div>
       </li>)
    return (
      <div className="deckSelector">
        {/* <label htmlFor="DeckSelector">Number Of Decks</label>
        <select
          value={numberOfDecks}
          id="DeckSelector"
          onChange={(event) => setNumberOfDecks(event.target.value)}
        >
          {elem}
        </select> */}
       <div className="partition">
         <div
           className="playingCards"
           style={{ display: "inline-block",float: "left"  }}
         >
           <ul className="deck" >
              {cardArray}
            </ul>
         </div>
         </div>
         <div className="partition">
          <div
           className="playingCards"
           style={{ display: "inline-block", float: "left" }}
         >
           <ul className="deck" >
              {cardArray}
            </ul>
            
         </div>

         <div
           className="playingCards"
           style={{ display: "inline-block" ,transform: 'translate(20px,10px)', float: "left"}}
         >
           <ul className="deck" >
              {cardArray}
            </ul>
            
         </div>
         </div>
         <div className="partition" style={{float:"left"}}>
           <div
           className="playingCards"
           style={{ display: "inline-block", float: "left"  }}
         >
           <ul className="deck" >
              {cardArray}
            </ul>
            
         </div>

         <div
           className="playingCards twoDecks"
           style={{ display: "inline-block" ,transform: 'translate(20px,10px)', float: "left" }}
         >
           <ul className="deck" >
              {cardArray}
            </ul>
            
         </div>
         <div
           className="playingCards twoDecks"
           style={{ display: "inline-block" ,transform: 'translate(40px,20px)', float: "left" }}
         >
           <ul className="deck" >
              {cardArray}
            </ul>
            
         </div>
         </div>
         <div style={{width: '100%'}}>
         <div className="partition" >  
         <input type="radio" value="1" name="gender" style={{float:"left"}} 
        onChange={onSiteChanged}
         />
         </div> 
         <div className="partition">  
         <input type="radio" value="2" name="gender" style={{float:"left"}}
         onChange={onSiteChanged}
         />
         </div>
         <div className="partition">  
         <input type="radio" value="3" name="gender" style={{float:"left"}}
         onChange={onSiteChanged}
         />
         </div>
         </div>
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
    console.log(numberOfDecks);
    var playerCards = DistributeCards(numberOfDecks,numberOfPlayers);
    console.log(playerCards)
    var docRef = db.collection('games').doc(gameId);
    docRef.get().then((documentsnapshot)=>{
     var newArray=documentsnapshot.data().Players
    //  newArray.forEach((element, index) => {
    //        element.cards = playerCards[index].cards; 
                   
    //    });
       var cardDist = {};
       newArray.forEach((element, index) => {
                var name = element.pid
                cardDist[name] = playerCards[index].cards
                
       })
 
   

    var playerTurn = Math.floor(Math.random() * newArray.length);
     
      console.log(newArray[playerTurn].pid)
      var obj = {
        gameStarted: true,
        Players: newArray,
        playerTurn: newArray[playerTurn].pid,
        ...cardDist
      }
      console.log(obj);
    db.collection('games').doc(gameId).update(
       {
         gameStarted: true,
         Players: newArray,
         playerTurn: newArray[playerTurn].pid,
         ...cardDist
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
  console.log(newArr)
  var arr = [].concat(...Array(parseInt(numberOfDecks)).fill(newArr));
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
    gameKey: state.game.gameKey,
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
      },
      
 ]
}
 ),
  connect(mapStateToProps)

)(CreateGame);







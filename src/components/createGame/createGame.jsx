import React from "react";
import ReactDOM from "react-dom";

import { Dot } from 'react-animated-dots';
import firebase from "../../Firebase";
import {ranks, suits} from  "../globals/globalVariables";
import { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import {history} from '../../gameStore/gameStore';
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";

import './createGame.css';
import { AvatarPicker } from "material-ui-avatar-picker";
import { Button } from "bootstrap";


const db = firebase.firestore();
const historyarr = history;


 function CreateGame({gameKey,gameId,gameName,isHost, playersArray, gameStarted}) {
  
  if(gameStarted === true){
    historyarr.push('/game',{gameId: gameId});
  }
  const isPlayerHost = isHost;
  const [numberOfDecks, setNumberOfDecks] = useState(1);
  const [numberOfLifeLines, setNumberOfLifeLines] = useState(3);
  const [avatarPickerPopup, setAvatarPickupPopupHandler] = useState(false);
  const numberOfPlayers = playersArray?playersArray.length:0;
  
  function onSiteChanged(e){
    setNumberOfDecks(e.currentTarget.value);
    console.log(e.currentTarget.value)
  }
  const avatarPickerPopupHandler = ()=>{
     setAvatarPickupPopupHandler(true);
  }

  const closeAvatarPicker = ()=>{
    setAvatarPickupPopupHandler(false);
  }
  return (
    <div className='Game_container1'>
     <h2 className="heading"> BLUFFMASTER </h2>
      <div className="gradient-border extraContainer border_beige">
       <h2 className="textClass" style={{marginTop:'1vh'}}> How to Play </h2>
     <iframe width="90%" height="50%" src="https://www.youtube.com/embed/AC-JWgeZbv4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
     </div>
     <Players players={playersArray}/>
      <div className='gradient-border game_properties_container border_beige'>
      <div className="gameKeyBox">
        <div className="div1" style={{background: 'antiquewhite'}}>Game Code</div>
        <div className="div2">{gameKey}</div>
        <button className="primary" onClick={avatarPickerPopupHandler}>Avatar Picker</button>
        </div>
       
       <Popup open={avatarPickerPopup} onClose={closeAvatarPicker}>
          <div className="popup_container">
          <div><h3 className='popup_heading'> Choose an avatar</h3></div>
          <div className="popup_grid">
           <div className='a'><img src={require('../../assets/AVATAR/image_part_001.jpg')}></img>
           <input type="radio" value="1" name="gender" />
           </div>
           <div className='b'><img src={require('../../assets/AVATAR/image_part_002.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='c'><img src={require('../../assets/AVATAR/image_part_003.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='d'><img src={require('../../assets/AVATAR/image_part_004.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='e'><img src={require('../../assets/AVATAR/image_part_005.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='f'><img src={require('../../assets/AVATAR/image_part_006.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='g'><img src={require('../../assets/AVATAR/image_part_007.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='h'><img src={require('../../assets/AVATAR/image_part_008.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='i'><img src={require('../../assets/AVATAR/image_part_009.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='j'><img src={require('../../assets/AVATAR/image_part_010.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='k'><img src={require('../../assets/AVATAR/image_part_011.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='l'><img src={require('../../assets/AVATAR/image_part_012.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='m'><img src={require('../../assets/AVATAR/image_part_013.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='n'><img src={require('../../assets/AVATAR/image_part_014.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='o'><img src={require('../../assets/AVATAR/image_part_015.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
           <div className='p'><img src={require('../../assets/AVATAR/image_part_016.jpg')}></img>
           <input type="radio" value="1" name="gender" /></div>
          </div>
          </div>
          <div className="text-center"> <button className='btn-primary  rounded-lg mt-1'>Select</button></div>
        </Popup>
        
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
      <div className='player_container border_beige'>
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
         <input className="radio_button" type="radio" value="1" name="gender" style={{float:"left"}} 
        onChange={onSiteChanged}
         />
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
         <input className="radio_button" type="radio" value="2" name="gender" style={{float:"left"}}
         onChange={onSiteChanged}
         />
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
         <input className="radio_button" type="radio" value="3" name="gender" style={{float:"left"}}
         onChange={onSiteChanged}
         />
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







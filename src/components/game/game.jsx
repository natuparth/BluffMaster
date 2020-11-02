import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import firebase from "../../Firebase";
import { compose } from "redux";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./game.css";
import "../../selfthinker-CSS-Playing-Cards-7e0e0f2/cards.css";
//const dispatch = useDispatch();
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
  13: "K",
};
class Game extends React.Component {
  cardArray = [];
  numberOfPlayers;
  playerId;
  classMapping = [];
  cardComponent;
  players = [];
  pindex;
  numberOfLifeLines = 5;
  stylesArray = [];
  playerTurn = '';
  constructor(props) {
    super(props);
    this.numberOfPlayers = this.props.playersArray.length;
   // this.numberOfPlayers = 8;
    this.classMapping = this.getClassMapping(this.numberOfPlayers);
    // this.players = [
    //    {pid: "liuzk4", pname: "Manu"},
    //    {pid: "ds67kf", pname: "nsu"},
    //    {pid: "0wvk", pname: "sfsdf"},
    //    {pid: "q2yosi", pname: "manager"},
    //    {pid: "rizybq", pname: "sansi"},
    //    {pid: "0wvk", pname: "sfsdf"},
    //    {pid: "q2yosi", pname: "manager"},
    //    {pid: "rizybq", pname: "sansi"}

    //  ]

    //   this.cardArray = [{suit: "clubs", rank: "K"},
    //  {suit: "diams", rank: "9"},
    //  {suit: "clubs", rank: "4"},
    //  {suit: "spades", rank: "Q"},
    //  {suit: "diams", rank: "9"},
    //  {suit: "clubs", rank: "4"},
    //  {suit: "spades", rank: "Q"}, {suit: "diams", rank: "9"},
    //  {suit: "clubs", rank: "4"},
    //  {suit: "spades", rank: "Q"}, {suit: "diams", rank: "9"},
    //  {suit: "clubs", rank: "4"},
    //  {suit: "spades", rank: "Q"},
    //  {suit: "diams", rank: "9"},
    //  {suit: "clubs", rank: "4"},
    //  {suit: "spades", rank: "Q"},
    //  {suit: "diams", rank: "9"},
    //  {suit: "clubs", rank: "4"},
    //  {suit: "spades", rank: "Q"}, {suit: "diams", rank: "9"},
    //  {suit: "clubs", rank: "4"},
    //  {suit: "spades", rank: "Q"}, {suit: "diams", rank: "9"},
    //  {suit: "clubs", rank: "4"},
    //  {suit: "spades", rank: "Q"},
    //  {suit: "diams", rank: "9"},
    //  {suit: "clubs", rank: "4"},
    //  {suit: "spades", rank: "Q"},
     
    // ]
   this.handleCardClick = this.handleCardClick.bind(this);
   this.moveHandler = this.moveHandler.bind(this);
   this.passHandler = this.passHandler.bind(this);
   this.handleCardSelectClick = this.handleCardSelectClick.bind(this);
   this.challengeHandler = this.challengeHandler.bind(this);
  
     // for main game



    this.players=this.createPlayersArray(this.props.playersArray, this.props.playerId, this.props.playerName)
    this.playerTurn = props.playerTurn;
    console.log(this.players);
   // this.cardArray = Array.from(playerObj.cards);
  //  this.cardArray = this.props.myCards;
   this.state = {
     players: this.players,
     pname: this.props.pname,
     playerCardsFinished: this.props.playerCardsFinished,
      bluff: this.props.bluff,
      lastPlayer: this.props.lastPlayer,
      playerId: this.props.playerId,
      playCard: this.props.playCard,
      playerTurn: this.props.playerTurn,
      gameCards: this.props.gameCards,
      myCards: this.props.myCards,
      stylesArray: Array(this.props.myCards.length).fill({
        selected: false,
        styles: {
          top: "5em",
        },
      }),
      newMove: this.props.newMove,
      cardSelected: 'none',
      winnerDecided: this.props.winnerDecided
    };
  }
  
  // shouldComponentUpdate(nextProps)
  // {
  //   if(this.props.gameCards === nextProps.gameCards)
  //        return false;
  // }
  
  componentDidUpdate(previousState){
    // if(this.props.playerCardsFinished != previousState.playerCardsFinished)
    //   this.setState({
    //     playerCardsFinished: this.props.playerCardsFinished
    //   })
    if(this.props.myCards !== undefined){
    if(this.props.myCards !== previousState.myCards){
      this.setState({
      myCards: this.props.myCards,
      playerTurn: this.props.playerTurn,
      stylesArray: Array(this.props.myCards.length).fill({
        selected: false,
        styles: {
          top: "5em",
        },
      }
      ),
     })
    }
  }
  if(this.props.playersArray !== previousState.playersArray)
    {
      console.log('this checked');
      var pArray = this.createPlayersArray(this.props.playersArray, this.props.playerId, this.props.playerName)
      this.setState({
      players: pArray,
      winnerDecided: this.props.winnerDecided,
      gameWinner: this.props.gameWinner
    })
    }
    if(this.props.gameCards !== previousState.gameCards)
    { 
    this.setState({
      gameCards: this.props.gameCards,
      bluff: this.props.bluff,
      playCard: this.props.playCard,
      newMove: this.props.newMove,
      lastPlayer: this.props.lastPlayer,
      playerCardsFinished: this.props.playerCardsFinished
    })
  }
    /*
    if(this.props.playerTurn != previousState.playerTurn) 
    this.setState({
      playerTurn: this.props.playerTurn,
    })
     if(this.props.playCard != previousState.playCard)
      this.setState({
        playCard: this.props.playCard
      })
      if(this.props.newMove != previousState.newMove)
      this.setState({
        newMove: this.props.newMove
      })
      if(this.props.lastPlayer != previousState.lastPlayer) 
    this.setState({
      lastPlayer: this.props.lastPlayer,
    })
    */
   
  }

  createPlayersArray(playersArray, playerId,playerName){
      var pindex;
      var players = [];
      console.log(playersArray);
      var numberOfPlayers = playersArray.length;
      var i;
      for (i = 0; i < numberOfPlayers; i++) {
      if (playersArray[i].pid === playerId) {
       pindex = i;
        break;
      }
    }
    if(i == numberOfPlayers)
      {
        pindex = -1;  
        numberOfPlayers = numberOfPlayers + 1;   
      }
   //var playerObj = this.props.playersArray[this.pindex];
   players.push({
     pid: playerId,
     pname: playerName
   });
   console.log(pindex);
   console.log(playersArray)
   for (var j = 1; j < numberOfPlayers; j++) {
     players.push({
       pid: playersArray[(pindex + j) % numberOfPlayers]
         .pid,
       pname: playersArray[(pindex + j) % numberOfPlayers]
         .pname,
     });
   }
   return players;
  }
  handleCardClick(e) {
    var newArr = this.state.stylesArray;
    if (newArr[e.currentTarget.dataset.id].selected === true) {
      newArr[e.currentTarget.dataset.id] = {
        selected: false,
        styles: {
          top: "5em",
        },
      };
      this.setState({
        stylesArray: newArr,
      });
    } else {
      newArr[e.currentTarget.dataset.id] = {
        selected: true,
        styles: {
          top: "5em",
          transform: "translate(0px,-50px)",
        },
      };
      this.setState({
        stylesArray: newArr,
      });
    }
   }
  handleCardSelectClick(e){
    this.setState({
      cardSelected: e.currentTarget.dataset.id
    })
  } 

  moveHandler(playCard) {
    console.log('move handler');
    var tempArr = this.state.myCards;
    var updatedCards = [];
    var stylesArray = this.state.stylesArray;
    var updatedStyles = [];
    var selectedCards = [];
    for (var i = 0; i < this.state.myCards.length; i++) {
      if (stylesArray[i].selected === true) {
        selectedCards.push(tempArr[i]);
      } else {
        updatedCards.push(tempArr[i]);
        updatedStyles.push(stylesArray[i]);
      }
    }

    if(selectedCards.length === 0){
     alert('Please select some cards to play');
     return ;
    }
    this.setState({
      myCards: updatedCards,
      stylesArray: updatedStyles,
    });
    var bluff = false;
    var rank = playCard;
    if(this.state.newMove === true)
      {
        rank = this.state.cardSelected;

      }

    for(var j=0;j<selectedCards.length;j++)
    {
      if(selectedCards[j].rank !== rank)
        {
          bluff = true;
          break;
        }
    }
    var pid = this.state.playerId;
    var cardsObj = {

    };
   cardsObj[pid] = updatedCards;
   var time = 0;
   if(this.state.playerCardsFinished === true){
     this.winnerHandler(this.state.lastPlayer)
     time = 5000;
   }
    var playerCardsFinished = (updatedCards.length === 0) ? true: false;  
    var self = this;
    setTimeout(function(){
      console.log(self.props.gameId)
      db.collection('games').doc(self.props.gameId).update({
        ...cardsObj,
        gameCards: firebase.firestore.FieldValue.arrayUnion(...selectedCards),
        playerTurn: self.state.players[1].pid,
        bluff: bluff,
        rank: self.state.newMove === true ? rank : playCard,
        newMove: false,
        lastPlayer: self.state.playerId ,
        playerCardsFinished: playerCardsFinished,
        winnerDecided: false
       }
       )
    },time)
   
  }
  passHandler(){
    var updateObj = {};
    if(this.state.winnerDecided === true && this.state.gameWinner === this.state.players[1].pid){
      updateObj.playerTurn = this.state.players[2].pid;
      this.winnerHandler(this.state.players[1].pid)
    }
    else
     updateObj.playerTurn = this.state.players[1].pid
     
    setTimeout(function(){
      db.collection('games').doc(this.props.gameId).update({
        playerTurn: this.state.players[1].pid,
        winnerDecided: false
        }
       ).then((doc)=>{
         
        console.log(doc);
      })
    },5000)
  

  }
  challengeHandler(bluff, lastPlayer){
    var updateObj = {};
    if(bluff === true){  
      updateObj[lastPlayer] = firebase.firestore.FieldValue.arrayUnion(...this.state.gameCards);
      updateObj['gameCards'] = [];
      updateObj['newMove'] = true;
      alert('Yayyyy! your guess was correct! player has played wrong cards')
      db.collection('games').doc(this.props.gameId).update(updateObj).then(()=>{
        console.log('cards updated');
      })
    }

    else{
   //   var updateObj = {};
      updateObj[this.state.playerId] = firebase.firestore.FieldValue.arrayUnion(...this.state.gameCards);
      updateObj['gameCards'] = [];
      updateObj['newMove'] = true;
      updateObj['playerTurn'] = lastPlayer;
      alert('OOPS Your guess was wrong! player has played correct cards')
      if(this.state.playerCardsFinished === true){
        this.winnerHandler(this.state.lastPlayer)
        updateObj['playerTurn'] = this.state.playerId;
        updateObj['winnerDecided'] = false;
      }
      setTimeout(function(){
        db.collection('games').doc(this.props.gameId).update(updateObj).then(()=>{
          console.log('cards updated');
        })
      }, 5000)
      
    }



  }

winnerHandler(winnerId){
  console.log(winnerId);
     var pObj = this.state.players.filter(player => player.pid === winnerId)
    
    console.log(pObj[0]);
  db.collection('games').doc(this.props.gameId).update({
      Players: firebase.firestore.FieldValue.arrayRemove(pObj[0]),
      winnerDecided: true,
      winners: firebase.firestore.FieldValue.arrayUnion(pObj[0]),
      gameWinner: pObj[0].pid,
      playerCardsFinished: false 
   }).catch(err => {
       console.log(err);
     }) 
}

  render() {
    console.log('rendered');
    if(!this.state.myCards)
      return false;  
    const items = [];
    var i = 0;
    var myTurn = false;
    var player1Class = "player_1";
    if(this.props.playerTurn === this.props.playerId)
     {
        player1Class = "player_1 animated";
        myTurn = true;
     //   if(this.state.playerCardsFinished === true)
       //     alert('the last player is about to finish! Do you want to challenge?')
      }
      for (i = 0; i < this.state.myCards.length; i++) {
      var obj = this.state.myCards[i];
      var cardClass = "card rank-" + obj.rank + " " + obj.suit;
      var elem = this.getSuitSymbol(obj.suit);
      items.push(
        <li
          key={i}
          data-id={i}
          style={this.state.stylesArray[i].styles}
          onClick={(e)=>{this.handleCardClick(e)}}
        >
          <div className={cardClass}>
            <span className="rank">{obj.rank}</span>
            {elem}
          </div>
        </li>
      );
    }

    return (
      <div className="Game_container">
        <Popup open={this.state.winnerDecided}>
    <div>Player {this.state.gameWinner} has won the game</div>
        </Popup>
        <GetMultiPlayerCardsLayout
          players={this.state.players}
          classMapping={this.classMapping}
          playerTurn={this.state.playerTurn}
          lastPlayer={this.state.lastPlayer}
          playerCardsFinished = {this.state.playerCardsFinished}
        ></GetMultiPlayerCardsLayout>
        <PlayingZone numberOfCards={this.state.gameCards.length} playCard={this.state.playCard}></PlayingZone>
        <Popup  trigger={this.winnerDecided}> <span>Winner Decided</span></Popup>
        <div className={player1Class}>
          <CardPicker playerTurn={this.state.playerTurn} playerId={this.props.playerId} newMove={this.state.newMove} 
          action = {this.handleCardSelectClick}
          ></CardPicker>
          <div className="playingCards fourColours faceImages" style={{marginLeft: "20%"}}>
            <ul className="hand">{items}</ul>
            </div>          
        </div>
        <div className="myControls">
        <h3 style={{ margin: "2px" }}>Manu</h3>
        <div>
          <span className="dot red"></span>
          <span className="dot green"></span>
          <span className="dot green"></span>
          <span className="dot"></span>
        </div>
            <button onClick={()=>{this.moveHandler(this.props.playCard)}} disabled={!myTurn}>Play</button>
            <br/>
            <button onClick={()=>{this.passHandler()}} disabled={!myTurn}>Pass</button>
            <br/>
            <button onClick={()=>{this.challengeHandler(this.state.bluff, this.state.lastPlayer)}} disabled={!myTurn}>Challenge</button>
        </div>
      </div>
    );
  }

  getSuitSymbol(suit) {
    if (suit === "spades") return <span className="suit">&spades;</span>;
    else if (suit === "hearts") return <span className="suit">&hearts;</span>;
    else if (suit === "diams") return <span className="suit">&diams;</span>;
    else return <span className="suit">&clubs;</span>;
  }

  getClassMapping(numberOfPlayers) {
    switch (numberOfPlayers) {
      case 2:
        return ["player_1", "player_5"];

      case 3:
        return ["player_1", "player_3", "player_7"];

      case 4:
        return ["player_1", "player_3", "player_5", "player_7"];

      case 5:
        return ["player_1", "player_2", "player_4", "player_6", "player_8"];

      case 6:
        return [
          "player_1",
          "player_3",
          "player_4",
          "player_5",
          "player_6",
          "player_7",
        ];

      case 7:
        return [
          "player_1",
          "player_2",
          "player_3",
          "player_4",
          "player_6",
          "player_7",
          "player_8",
        ];

      case 8:
        return [
          "player_1",
          "player_2",
          "player_3",
          "player_4",
          "player_5",
          "player_6",
          "player_7",
          "player_8",
        ];
      default:
        return [];
    }
  }

  suits = {
    1: "spades",
    2: "diams",
    3: "hearts",
    0: "clubs",
  }
  
}
 
function GetMultiPlayerCardsLayout(props) {
  var numberOfPlayers = props.players.length;
  var i;
   var elem = [];
   var animated;
   for (i = 2; i <= numberOfPlayers; i++) {
     if (props.players[i - 1].pid === props.playerTurn) {
       animated = "animated";
     } else animated = "";

     if(props.playerCardsFinished === true && props.lastPlayer === props.players[i-1].pid)
        animated = "danger";
     var clsName = props.classMapping[i - 1];
     var playerName = props.players[i - 1].pname.toUpperCase();
     var cardArray = [];
      for(var j=0;j<5;j++)  
          cardArray.push( <li key={j}>
           <div className="card back"></div>
         </li>)
     elem.push(
       <div className={clsName}>
         <div
           className="playingCards"
           style={{ display: "inline-block", width: "50%", float: "left" }}
         >
           <ul className="deck" >
              {cardArray}
            </ul>
         </div>
 
         <div
           className={animated}
           style={{
             display: "inline-block",
             width: "45%",
             float: "right",
             fontFamily: "cursive",
           }}
         >
           <h4 style={{ margin: "2px" }}>{playerName}</h4>
           <span className="dot red"></span>
           <span className="dot green"></span>
           <span className="dot green"></span>
           <span className="dot"></span>
         </div>
       </div>
     );
   }
   return elem;
 }
 
 function PlayingZone(props) {
   var elem = [];
   var x = 0;
   var y = 0;
   var angle = 0;
   var styleObj;
 
   //var noOf = 24;
   for (var i = 0; i < props.numberOfCards; i++) {
     styleObj = {
       position: "absolute",
       "WebkitTransform":
         "translate(" + x + "px, " + y + "px) rotate(" + angle + "deg)",
       "OTransform":
         "translate(" + x + "px, " + y + "px) rotate(" + angle + "deg)",
       transform: "translate(" + x + "px, " + y + "px) rotate(" + angle + "deg)",
     };
 
     elem.push(<div style={styleObj} key={i} className="cardCss backCardCss"></div>);
     angle = angle + 15;
     x = x + 1 * 30 * Math.cos((angle * 3.14) / 180);
     y = y + 1 * 30 * Math.sin((angle * 3.14) / 180);
   }
   
   return (
     <div className="playingZone">
       <div className="outerRing">
         {elem}
         <div className="cardsNumber">{props.numberOfCards}</div>
         
         <div className="cardCss playCard">   
         <span>Play Card</span>
              <h2 style={{marginTop: "0px"}}>{props.playCard}</h2>
            </div>
         
       </div>
     </div>
   );
 }
 
 function CardPicker(props){
 
   var elem = [];
   var x = 0;
   var y = 0;
   var angle = 0;
   var styleObj;
  
 
   for (var i = 1; i < 14; i++) {
     styleObj = {
       position: "absolute",
       "WebkitTransform":
         "translate(" + x + "px, " + y + "px) rotate(" + angle + "deg)",
       "OTransform":
         "translate(" + x + "px, " + y + "px) rotate(" + angle + "deg)",
       transform: "translate(" + x + "px, " + y + "px) rotate(" + angle + "deg)",
     };
     if(props.playerTurn !== props.playerId || props.newMove === false)
       {
         styleObj.backgroundColor =  '#EBEBE4'
         styleObj.pointerEvents = 'none';
       }
   
    var cardRank = ranks[i];
   elem.push(<div style={styleObj} className="cardCss" data-id={cardRank} onClick={(e)=>{props.action(e)}}><span>{cardRank}</span></div>);
     angle = angle + (360)/13;
     x = x + 1 * 35 * Math.cos((angle * 3.14) / 180);
     y = y + 1 * 35 * Math.sin((angle * 3.14) / 180);
   }
  return(
   <div className="cardSelector">
      {elem}
   </div>  
  )
 
 }
 

const mapStateToProps = (state) => {
  const pid = state.player.pid;
  return {
   // gameName: 'hello',
    playerId: state.player.pid,
    playerName: state.player.pname,
    gameId: state.game.gameId,
    gameName: state.game.gameName,
    isHost: state.player.isHost,
    // cardsArray: state.firestore.data.games
    // ? state.firestore.data.games[state.game.gameId].playerCards 
    // : null,
    playerCardsFinished: state.firestore.data.games
    ? state.firestore.data.games[state.game.gameId].playerCardsFinished
    : null,
    myCards: state.firestore.data.games
    ? state.firestore.data.games[state.game.gameId][pid]
    : null,
    playersArray: state.firestore.data.games
      ? state.firestore.data.games[state.game.gameId].Players
      : null,
    playerTurn: state.firestore.data.games
    ? state.firestore.data.games[state.game.gameId].playerTurn
     : null,
    playCard: state.firestore.data.games
    ? state.firestore.data.games[state.game.gameId].rank
     : null, 
    gameCards: state.firestore.data.games
    ? state.firestore.data.games[state.game.gameId].gameCards
     : null,
     newMove: state.firestore.data.games
     ? state.firestore.data.games[state.game.gameId].newMove
     : null,
     lastPlayer:  state.firestore.data.games
     ? state.firestore.data.games[state.game.gameId].lastPlayer
     : null,
     bluff: state.firestore.data.games
     ? state.firestore.data.games[state.game.gameId].bluff
     : null,
     winnerDecided: state.firestore.data.games
     ? state.firestore.data.games[state.game.gameId].winnerDecided
     : null,
     gameWinner: state.firestore.data.games
     ? state.firestore.data.games[state.game.gameId].gameWinner
     : null
  /*  playerId: 'liuzk4',
    playerTurn: 'liuzk4',
    playCard: 'J',
    gameCards: [ {suit: "diams", rank: "9"},
    {suit: "clubs", rank: "4"}]
    };*/
  }
}


export default compose(
  firestoreConnect((props) => {
    return [
    
      {
        collection: "games",
        doc: props.location.state.gameId,    
      }
      
    ];
  }),
  connect(mapStateToProps)
)(Game);

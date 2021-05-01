import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faQuestionCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import firebase from "../../Firebase";
import { compose } from "redux";
import { CardPicker } from "./cardselector";
import { PlayerLayout } from "./playerlayout";
import { PlayingZone } from "./playingzone";
import { Winners } from './winners'
import { CardAnimation } from './cardAnimation';
import { reverseRanks } from '../globals/globalVariables';
import Popup from "reactjs-popup";
import {history} from '../../gameStore/gameStore';
import "reactjs-popup/dist/index.css";
import "./game.css";
import "./crackers.css";
import "../../selfthinker-CSS-Playing-Cards-7e0e0f2/cards.css";
//const dispatch = useDispatch();
const db = firebase.firestore();


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
  playerTurn = "";
  constructor(props) {
    super(props);
    this.numberOfPlayers = this.props.playersArray.length;
    this.classMapping = this.getClassMapping(this.numberOfPlayers);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.passHandler = this.passHandler.bind(this);
    this.handleCardSelectClick = this.handleCardSelectClick.bind(this);
    this.challengeHandler = this.challengeHandler.bind(this);
    this.players = this.createPlayersArray(
      this.props.playersArray,
      this.props.playerId,
      this.props.playerName
    );
    this.playerTurn = props.playerTurn;
    this.state = {
      showAnimation: false,
      lastCardsNumber: 0,
      opponentCards: [],
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
          top: "2em",
        },
      }),
      newMove: this.props.newMove,
      cardSelected: " ",
      winnerDecided: this.props.winnerDecided,
      winners: this.props.winners
    };
  }
  
  componentDidUpdate(previousState) {
    if (this.props.myCards !== undefined) {
      if (this.props.myCards !== previousState.myCards) {
        this.setState({
          myCards: this.sortCards(this.props.myCards),
          playerTurn: this.props.playerTurn,
    
          stylesArray: Array.from({length: this.props.myCards.length}, (x,i) => {
            if(i<35){
              return {
                   selected: false,
                   styles: {
                     top: "2em",
                   },
                 }
            }
            else
             {
               return {
                selected: false,
                styles: {
                  top: "10em",
                },
              }
             }
          })
        });
      }
    }
    if (this.props.playersArray !== previousState.playersArray) {
      if(this.props.playersArray.length > 1) 
      var pArray = this.createPlayersArray(
        this.props.playersArray,
        this.props.playerId,
        this.props.playerName
      );
      else{
        history.push("/creategame")
      }
      this.setState({
        players: pArray,
        winnerDecided: this.props.winnerDecided,
        gameWinner: this.props.gameWinner,
        winners: this.props.winners
      });
    }
    if (this.props.gameCards !== previousState.gameCards) {
      console.log(this.state.lastPlayer);
      this.setState({
        lastCardsNumber: this.props.gameCards.length - previousState.gameCards.length,
        gameCards: this.props.gameCards,
        bluff: this.props.bluff,
        playCard: this.props.playCard,
        newMove: this.props.newMove,
        lastPlayer: this.props.lastPlayer,
        playerCardsFinished: this.props.playerCardsFinished,
        opponentCards: this.getOpponentCards(this.props.firestoreinstance, this.state.players)
      }, ()=>{
        if(this.state.lastCardsNumber > 0 && this.state.playerId != this.props.lastPlayer){
       
          this.setState({
            showAnimation: true
          })
          setTimeout(()=>{
            this.setState({
              showAnimation: false
            })
          },3000)
        }
      });
     
      
    }
  }

  sortCards(cards){ 
   cards = cards.slice().sort((card1, card2)=>{return parseInt(reverseRanks[card1.rank]) - parseInt(reverseRanks[card2.rank]) })
   return cards;
  }
  getOpponentCards(firestoreinstance, players){
    const opponentCards = []  
    players.forEach(element => {
         opponentCards.push({pid: element.pid, numberOfCards: firestoreinstance[element.pid]?.length})
       });
      console.log(opponentCards);
   return opponentCards;
  }
  createPlayersArray(playersArray, playerId, playerName) {
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
    if (i == numberOfPlayers) {
      pindex = -1;
      numberOfPlayers = numberOfPlayers + 1;
    }
    
    players.push({
      pid: playerId,
      pname: playerName,
      pictureId: playersArray[pindex].pictureId || '01'
    });
    console.log(pindex);
    console.log(playersArray);
    for (var j = 1; j < numberOfPlayers; j++) {
      players.push({
        pid: playersArray[(pindex + j) % numberOfPlayers].pid,
        pname: playersArray[(pindex + j) % numberOfPlayers].pname,
        pictureId: playersArray[(pindex + j) % numberOfPlayers].pictureId
      });
    }
    return players;
  }
  handleCardClick(e) {
    var newArr = this.state.stylesArray;
    if (newArr[e.currentTarget.dataset.id].selected === true) {
      if(e.currentTarget.dataset.id<35)
      newArr[e.currentTarget.dataset.id] = {
        selected: false,
        styles: {
          top: "2em",
        },
      };
      else
      newArr[e.currentTarget.dataset.id] = {
        selected: false,
        styles: {
          top: "10em",
        },
      };
      this.setState({
        stylesArray: newArr,
      });
    } else {
      if(e.currentTarget.dataset.id<35)
      newArr[e.currentTarget.dataset.id] = {
        selected: true,
        styles: {
          top: "2em",
          transform: "translate(0px,-40px)",
        },
      };
      
      else
      newArr[e.currentTarget.dataset.id] = {
        selected: true,
        styles: {
          top: "10em",
          transform: "translate(0px,-40px)",
        },
      };
      this.setState({
        stylesArray: newArr,
      });
    }
  }
  handleCardSelectClick(e) {
    this.setState({
      cardSelected: e.currentTarget.dataset.id,
    });
  }

  moveHandler(playCard) {
    console.log("move handler");
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

    if (selectedCards.length === 0) {
      alert("Please select some cards to play");
      return;
    }
    this.setState({
      myCards: updatedCards,
      stylesArray: updatedStyles,
    });
    var bluff = false;
    var rank = playCard;
    if (this.state.newMove === true) {
      rank = this.state.cardSelected;
    }

    for (var j = 0; j < selectedCards.length; j++) {
      if (selectedCards[j].rank !== rank) {
        bluff = true;
        break;
      }
    }
    var pid = this.state.playerId;
    var cardsObj = {};
    cardsObj[pid] = updatedCards;
    var time = 0;
    if (this.state.playerCardsFinished === true) {
      this.winnerHandler(this.state.lastPlayer);
      time = 5000;
    }
    var playerCardsFinished = updatedCards.length === 0 ? true : false;
    var self = this;
    setTimeout(function () {
      
     if(self.state.players.length <= 1)
       {
         alert('game has ended')
         history.push("/startgame")
       }
     db.collection("games")
        .doc(self.props.gameId)
        .update({
          ...cardsObj,
          gameCards: firebase.firestore.FieldValue.arrayUnion(...selectedCards),
          playerTurn: self.state.players[1].pid,
          bluff: bluff,
          rank: self.state.newMove === true ? rank : playCard,
          newMove: false,
          lastPlayer: self.state.playerId,
          playerCardsFinished: playerCardsFinished,
          winnerDecided: false,
        });
    }, time);
  }
  passHandler() {
    var updateObj = {};
    var self = this;
    // if (
    //   this.state.winnerDecided === true &&
    //   this.state.gameWinner === this.state.players[1].pid
    // )
    if(this.state.playerCardsFinished === true && this.state.lastPlayer === this.state.players[1].pid)
    {
      updateObj.playerTurn = this.state.players[2].pid;
      this.winnerHandler(this.state.players[1].pid);
      
      updateObj.passes = [];
    } 
    else{ 
     
      let passesMap = this.props.firestoreinstance.passes;
      var pid=this.props.playerId;
      var passesObj = {
          ...passesMap
         };
         console.log(self.state.players.length)
      if(passesMap[pid] === undefined && Object.keys(passesObj).length + 1 === this.state.players.length)
       {
         alert('everyone has passed. Cards will be knocked out ')
         updateObj.passes = [];
         updateObj.playerTurn = this.props.firestoreinstance.lastPlayer;
         updateObj.gameCards = [];
         updateObj.newMove = true;
       }
       else
       {
        passesObj[pid] = '1';
        updateObj.playerTurn = this.state.players[1].pid;
        updateObj.passes = passesObj;
       }
      }
    setTimeout(function () {
       console.log(self.props.gameId);
      db.collection("games")
        .doc(self.props.gameId)
        .update({
          ...updateObj,
          winnerDecided: false,
        })
        .then((doc) => {
          console.log(doc);
        });
    }, 2000);
  }
  challengeHandler(bluff, lastPlayer) {
    var updateObj = {};
    var self = this;
    if (bluff === true) {
      updateObj[lastPlayer] = firebase.firestore.FieldValue.arrayUnion(
        ...this.state.gameCards
      );
      updateObj["gameCards"] = [];
      updateObj["newMove"] = true;
      updateObj["playerCardsFinished"] = false;
      alert("Yayyyy! your guess was correct! player has played wrong cards");
      db.collection("games")
        .doc(self.props.gameId)
        .update(updateObj)
        .then(() => {
          console.log("cards updated");
        });
    } else {
      //   var updateObj = {};
      updateObj[this.state.playerId] = firebase.firestore.FieldValue.arrayUnion(
        ...this.state.gameCards
      );
      updateObj["gameCards"] = [];
      updateObj["newMove"] = true;
      updateObj["playerTurn"] = lastPlayer;
      alert("OOPS Your guess was wrong! player has played correct cards");
      if (this.state.playerCardsFinished === true) {
        this.winnerHandler(this.state.lastPlayer);
        updateObj["playerTurn"] = this.state.playerId;
        updateObj["winnerDecided"] = false;
        updateObj["playerCardsFinished"] = false;
      }
      setTimeout(function () {
        db.collection("games")
          .doc(self.props.gameId)
          .update(updateObj)
          .then(() => {
            console.log("cards updated");
          });
      }, 5000);
    }
  }

  winnerHandler(winnerId) {
    console.log(winnerId);
    var pObj = this.state.players.filter((player) => player.pid === winnerId);

    console.log(pObj[0]);
    db.collection("games")
      .doc(this.props.gameId)
      .update({
        Players: firebase.firestore.FieldValue.arrayRemove(pObj[0]),
        winnerDecided: true,
        winners: firebase.firestore.FieldValue.arrayUnion(pObj[0]),
        gameWinner: pObj[0].pid,
        playerCardsFinished: false,
      })
      .catch((err) => {
        console.log(err);
      });
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
  getPlayerNameFromId(playerId){
    console.log(playerId)
    console.log(this.state.winners);
    if(playerId === "" || playerId === undefined || playerId === null)
     return " ";
  return  this.state.winners.filter(pobj => pobj.pid === playerId)[0].pname
  }
  render() {
    console.log("rendered");
    if (!this.state.myCards) return false;    
      const items = [];
    var i = 0;
    var myTurn = false;
    var player1Class = "player_1";
    if (this.props.playerTurn === this.props.playerId) {
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
          onClick={(e) => {
            this.handleCardClick(e);
          }}
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
        <div className="pyro" style={{zIndex:998}} >
      <div className="before"></div>
        <div className="after"></div>
      </div>
          <div style={{zIndex:999}} >{this.getPlayerNameFromId(this.state.gameWinner)} has won the game</div>
         </Popup>
        <PlayerLayout
          opponentCards = {this.state.opponentCards}
          players={this.state.players}
          classMapping={this.classMapping}
          playerTurn={this.state.playerTurn}
          lastPlayer={this.state.lastPlayer}
          playerCardsFinished={this.state.playerCardsFinished}
        ></PlayerLayout>
        <PlayingZone
          lastCardsNumber={this.state.lastCardsNumber}
          numberOfCards={this.state.gameCards.length}
          playCard={this.state.playCard}
        ></PlayingZone>
        <Popup trigger={this.winnerDecided}>
          {" "}
          <span>Winner Decided</span>
        </Popup>
        <Winners winners = {this.state.winners}></Winners>
        <div className={player1Class}>
          <CardPicker
            playerTurn={this.state.playerTurn}
            playerId={this.props.playerId}
            newMove={this.state.newMove}
            cardSelected={this.state.cardSelected}
            action={this.handleCardSelectClick}
          ></CardPicker>
        
          <div
            className="playingCards fourColours faceImages"
            style={{ marginLeft: "20%" }}
          >
            <ul className="hand">{items}</ul>
          </div>
        </div>
        <div className="myControls">
          <h3 style={{ margin: "2px" }}>{this.state.pname}</h3>
          {/* <div>
          <span className="dot red"></span>
          <span className="dot green"></span>
          <span className="dot green"></span>
          <span className="dot"></span>
        </div> */}
          <AwesomeButton
           type="primary"
            onPress={() => {
              this.moveHandler(this.props.playCard);
            }}
            ripple
            disabled={!myTurn}
          > <FontAwesomeIcon icon={faPlayCircle}/> Play</AwesomeButton>
          <br />
          <AwesomeButton
            onPress={() => {
              this.passHandler();
            }}
            ripple
            disabled={!myTurn}
          >
          <FontAwesomeIcon icon={faArrowRight}/> Pass 
          </AwesomeButton>
          <br />
          <AwesomeButton
            onPress={() => {
              this.challengeHandler(this.state.bluff, this.state.lastPlayer);
            }}
            disabled={!myTurn}
          >
            <FontAwesomeIcon icon={faQuestionCircle}/> Challenge
          </AwesomeButton>
        
        </div>
     
         <CardAnimation hidden={this.state.showAnimation}
         players={this.state.players}
         lastPlayer={this.state.lastPlayer}
         classMapping={this.classMapping}
         lastCardsNumber={this.state.lastCardsNumber}
         > </CardAnimation>
         </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  const pid = state.player.pid;
  console.log(state);
  if(state.firestore.data.games === undefined)
   state = JSON.parse(localStorage.getItem('stateValue'));
  else
  localStorage.setItem('stateValue', JSON.stringify(state))

  const players = state.firestore.data.games
  ? state.firestore.data.games[state.game.gameId].Players
  : null;

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
    lastPlayer: state.firestore.data.games
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
      : null,
    winners:  state.firestore.data.games
    ? state.firestore.data.games[state.game.gameId].winners
    : null, 
    firestoreinstance: state.firestore.data.games 
    ? state.firestore.data.games[state.game.gameId] 
    : null
    /*  playerId: 'liuzk4',
    playerTurn: 'liuzk4',
    playCard: 'J',
    gameCards: [ {suit: "diams", rank: "9"},
    {suit: "clubs", rank: "4"}]
    };*/
  };
};


export default compose(
  firestoreConnect((props) => {
    return [
      {
        collection: "games",
        doc: props.location.state.gameId,
      },
    ];
  }),
  connect(mapStateToProps)
)(Game);

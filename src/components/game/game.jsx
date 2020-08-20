import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import "./game.css";
import "../../selfthinker-CSS-Playing-Cards-7e0e0f2/cards.css";

class Game extends React.Component {
  cardArray = [];
  numberOfPlayers;
  playerId;
  classMapping = [];
  cardComponent;
  players = [];
  

  constructor(props) {
    super(props);
     console.log(props);
    this.classMapping = this.getClassMapping(+this.props.playersArray.length);

    this.players = props.playersArray.map((doc)=> doc.pname);
    this.cardComponent = this.getMultiPlayerCardsLayout(this.props.playersArray.length); 
    var playerObj = this.props.playersArray.filter(element => element.pid === this.props.playerId)[0]

    this.cardArray = Array.from(playerObj.cards);
   
  }

  componentWillReceiveProps(prop) {
   
  }

  render() {
    const items = [];
    var i = 0;
    for(i=0;i< this.cardArray.length;i++){
      var obj = this.cardArray[i];
      var cardClass = "card rank-" + obj.rank + " " + obj.suit;
      var elem = this.getSuitSymbol(obj.suit);

      items.push(
        <li>
          <div className={cardClass}>
            <span className="rank">{obj.rank}</span>
            {elem}
          </div>
        </li>
      );
    }
    

    return (
    <div>
  
 <div className="Game_container">
    {this.cardComponent}
    <div className="player_1">
     <div className="playingCards fourColours faceImages">
          <ul className="hand">{items}</ul>
        </div> 
      </div>
      </div>
      </div>

    );
  }

  DistributeCards = (numberOfDecks) => {
    var newArr = [...Array(53).keys()].slice(1);
    var arr = [].concat(...Array(numberOfDecks).fill(newArr));
    var n = numberOfDecks * 52,
      i,
      temp;
    while (n) {
      i = Math.floor(Math.random() * n--);
      temp = arr[i];
      arr[i] = arr[n];
      arr[n] = temp;
    }
    return arr;
  };
  getSuitSymbol(suit) {
    if (suit === "spades") return <span className="suit">&spades;</span>;
    else if (suit === "hearts") return <span className="suit">&hearts;</span>;
    else if (suit === "diams") return <span className="suit">&diams;</span>;
    else return <span className="suit">&clubs;</span>;
  }
    
 getMultiPlayerCardsLayout(numberOfPlayers){
    var i;
    var elem = [];
    console.log(this.classMapping);
    for(i=2;i<=numberOfPlayers;i++){
        var clsName = this.classMapping[i-1];
        elem.push(
       <div className={clsName}>
           <h3>{this.players[i-1]}</h3>
            <div className = "playingCards">
             <ul className="deck">
              <li>
                 <div className="card back">
                 </div>    
              </li>
              <li>
                 <div className="card back">
                 </div>    
              </li>
           </ul>
       </div>
       </div>
       );
    }
    return elem;  

 }
 
 getClassMapping(numberOfPlayers){
   switch(numberOfPlayers){
      case 2: return ["player_1","player_5"];
       
      case 3: return ["player_1", "player_2", "player_7"];

      case 4: return ["player_1", "player_3","player_5","player_7"];

      case 5: return ["player_1","player_2","player_4","player_6","player_8"];

      case 6: return ["player_1","player_3","player_4","player_5","player_6","player_7"];

      case 7: return ["player_1","player_2","player_3","player_4","player_6","player_7","player_8"];

      case 8: return ["player_1","player_2","player_3","player_4","player_5","player_6","player_7","player_8"];
      default: return [];

   }

 }

 getPlayerMapping(playerId){
     

 }
 
  ranks = {
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

  suits = {
    1: "spades",
    2: "diams",
    3: "hearts",
    0: "clubs",
  };
}


const mapStateToProps = (state) => {
  return ({
    playerId: state.player.pid,
    gameId: state.game.gameId,
    gameName: state.game.gameName,
    isHost: state.player.isHost,
    playersArray: state.firestore.data.games ? state.firestore.data.games[state.game.gameId].Players: null 
    }
  )

}

export default compose(
  firestoreConnect((props) =>{ 
    return [
        {
         collection: 'games',
         doc: props.location.state.gameId
        }
 ]
}
 ),
  connect(mapStateToProps)

)(Game);
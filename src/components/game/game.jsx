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
  pindex;
  numberOfLifeLines = 5;
  

  constructor(props) {
    super(props);
   // this.numberOfPlayers = this.props.playersArray.length;
   this.numberOfPlayers = 8; 
   this.classMapping = this.getClassMapping(this.numberOfPlayers);
  /* 
    for(var i=0; i<this.numberOfPlayers; i++){
      if(this.props.playersArray[i].pid === this.props.playerId)
        {
          this.pindex = i;
          break;
        }
    }
    var playerObj = this.props.playersArray[this.pindex];
  */
    // var playerObj = this.props.playersArray.filter((element, index) => { 
    //   this.pindex = index;
    //   return  (element.pid === this.props.playerId)
    // })[0];

 
    this.players = [
       {pid: "liuzk4", pname: "Manu"},
       {pid: "ds67kf", pname: "nsu"},
       {pid: "0wvk", pname: "sfsdf"},
       {pid: "q2yosi", pname: "manager"},
       {pid: "rizybq", pname: "sansi"},
       {pid: "0wvk", pname: "sfsdf"},
       {pid: "q2yosi", pname: "manager"},
       {pid: "rizybq", pname: "sansi"}

    ]
    // this.players.push({
    //   pid:  this.props.playersArray[this.pindex].pid,
    //   pname: this.props.playersArray[this.pindex].pname
    // })
    console.log(this.players);
    // for(var j=1;j<this.numberOfPlayers;j++)
    //   {
    //     console.log(this.props.playersArray[(this.pindex+(j))%(this.numberOfPlayers)].pid);
    //     this.players.push({
    //         pid:this.props.playersArray[(this.pindex+(j))%(this.numberOfPlayers)].pid,
    //         pname: this.props.playersArray[(this.pindex+(j))%(this.numberOfPlayers)].pname
    //     })
    //   }
    this.cardComponent = this.getMultiPlayerCardsLayout(this.numberOfPlayers); 
   // this.cardArray = Array.from(playerObj.cards);
    this.cardArray = [{suit: "clubs", rank: "K"},
     {suit: "diams", rank: "9"},
     {suit: "clubs", rank: "4"},
     {suit: "spades", rank: "Q"},
     {suit: "hearts", rank: "5"},
     {suit: "spades", rank: "A"},
     {suit: "diams", rank: "4"},
     {suit: "spades", rank: "3"},
     {suit: "diams", rank: "9"},
     {suit: "clubs", rank: "4"},
     {suit: "spades", rank: "Q"},
     {suit: "hearts", rank: "5"},
     {suit: "spades", rank: "A"},
     {suit: "diams", rank: "4"},
     {suit: "spades", rank: "3"},
     {suit: "diams", rank: "9"},
     {suit: "clubs", rank: "4"},
     {suit: "spades", rank: "Q"},
     {suit: "hearts", rank: "5"},
     {suit: "spades", rank: "A"},
     {suit: "diams", rank: "4"},
     {suit: "spades", rank: "3"},
     {suit: "diams", rank: "9"},
     {suit: "clubs", rank: "4"},
     {suit: "spades", rank: "Q"},
     {suit: "hearts", rank: "5"},
     {suit: "spades", rank: "A"},
     {suit: "diams", rank: "4"},
     {suit: "spades", rank: "3"},
    
    ]
   
   
    console.log(this.players);
  }

  

  render() {
    const items = [];
    var i = 0;
    for(i=0;i< this.cardArray.length;i++){
      var obj = this.cardArray[i];
      var cardClass = "card rank-" + obj.rank + " " + obj.suit;
      var elem = this.getSuitSymbol(obj.suit);

      items.push(
        <li style={{top: "5em"}}>
          <div className={cardClass}>
            <span className="rank">{obj.rank}</span>
            {elem}
          </div>
        </li>
      );
    }
    

    return (  
 <div className="Game_container">
    {this.cardComponent}
    <div className="player_1">
     <div className="playingCards fourColours faceImages">
          <ul className="hand">{items}</ul>
        </div> 
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
    
 getMultiPlayerCardsLayout(numberOfPlayers){
    var i;
    var elem = [];
    for(i=2;i<=numberOfPlayers;i++){
        var clsName = this.classMapping[i-1];
        var playerName = this.players[i-1].pname.toUpperCase();
        elem.push(
       <div className={clsName}>
        
         <div className = "playingCards" style={{display: "inline-block", width: "50%", float:"left"}}>
          
              <ul className="deck">
              <li>
                 <div className="card back">
                 </div>    
              </li>
              <li>
                 <div className="card back">
                 </div>    
              </li>
              <li>
                 <div className="card back">
                 </div>    
              </li>
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
       <div style={{display: "inline-block", width: "45%", float: "right", fontFamily: 'cursive'}}>
           <h4 style={{margin: '2px'}}>{playerName}</h4>
           <span className="dot red"></span><span className="dot green"></span><span className="dot green"></span><span className="dot"></span>
         </div>
       </div>
       );
    }
    return elem;  

 }
 
 getClassMapping(numberOfPlayers){
   switch(numberOfPlayers){
      case 2: return ["player_1","player_5"];
       
      case 3: return ["player_1", "player_3", "player_7"];

      case 4: return ["player_1", "player_3","player_5","player_7"];

      case 5: return ["player_1","player_2","player_4","player_6","player_8"];

      case 6: return ["player_1","player_3","player_4","player_5","player_6","player_7"];

      case 7: return ["player_1","player_2","player_3","player_4","player_6","player_7","player_8"];

      case 8: return ["player_1","player_2","player_3","player_4","player_5","player_6","player_7","player_8"];
      default: return [];

   }

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
    gameName: 'hello'
    /*
    playerId: state.player.pid,
    gameId: state.game.gameId,
    gameName: state.game.gameName,
    isHost: state.player.isHost,
    playersArray: state.firestore.data.games ? state.firestore.data.games[state.game.gameId].Players: null 
  */  
  }
  )

}

export default compose(
  firestoreConnect((props) =>{ 
    return [
        {
         collection: 'games',
       //  doc: props.location.state.gameId
       doc: 'k92xBYViTZvUTNNZT73S'  
      }
 ]
}
 ),
  connect(mapStateToProps)

)(Game);
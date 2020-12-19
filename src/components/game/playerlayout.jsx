import React from "react";
import "./game.css";

 
export function PlayerLayout(props) {
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
      console.log(props.opponentCards)
      console.log(props.players[i-1].pid)
        var playerCards = props.opponentCards.filter(player =>{return player.pid === props.players[i-1].pid})[0]?.numberOfCards
      // if(playerCards)
       // if('numberOfCards' in playerCards[0])
          console.log(playerCards)
        //.numberOfCards;
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
               textAlign: "center"
             }}
           >
             <h4 style={{ margin: "2px" }}>{playerName}</h4>
             <div className='numberOfCardsLeft'>{playerCards}</div>
             {/* <span className="dot red"></span>
             <span className="dot green"></span>
             <span className="dot green"></span>
             <span className="dot"></span> */}
           </div>
         </div>
       );
     }
     return elem;
   }
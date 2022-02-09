import React from "react";
import "./playerlayout.css";
import "./game.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons'


 
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
      //console.log(props.opponentCards)
      //console.log(props.players)
        var playerCards = props.opponentCards.filter(player =>{return player.pid === props.players[i-1].pid})[0]?.numberOfCards
        var avatar =  props.players.filter(player =>{return player.pid === props.players[i-1].pid})[0]?.pictureId ;
       // if(playerCards)
       // if('numberOfCards' in playerCards[0])
       // //console.log(playerCards)
       //.numberOfCards;
       var cardArray = [];
        for(var j=0;j<6;j++)  
            cardArray.push( <li key={j}>
             <div className="cardCss back"></div>
           </li>)
         cardArray.push(<li key={j}>
          <div className="cardCss lastCard">{playerCards}</div>
        </li>)   
       elem.push(
         <div className={clsName}>
           <div className="nested-grid">
          { <div className="box-1">
          { <img src={require('../../assets/AVATAR/image_part_0'+avatar+'.jpg')}></img> }
            </div> }

            <div
             className={animated + " box-2"}
           > 

           <div className="nameDiv">  <span>{playerName}</span></div>
             {/* <div className='numberOfCardsLeft'>{playerCards}</div> */}
              <div className="lifelines">
               
              <FontAwesomeIcon icon={faStar} size="2x" style={{ color: '#FFDF01'}}/>
              
              {/* <span className="dot red"></span>
             <span className="dot green"></span>
             <span className="dot green"></span>
             <span className="dot"></span>  */}
           </div> 
           </div>
           { <div
             className="playingCards box-3"
             style={{ display: "inline-block", width: "50%", float: "left" }}
           >
             <ul className="hand hand1" style={{height: "2em"}} >
                {cardArray}
              </ul>
           </div> }
   
           </div>
         </div>
       );
     }
     return elem;
   }
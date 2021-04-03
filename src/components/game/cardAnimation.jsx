import React from "react";
import "./game.css";
import "./cardAnimation.css"


export function CardAnimation(props){
    var index = props.players.findIndex( object  =>  object.pid === props.lastPlayer);
    var animationClassName = props.classMapping[index];
   // var animationClassName = "player_2"
    var classN = "playingCards moveCardsAnimation animate"
    var cardArray = [];
    var animatedCards = props.lastCardsNumber > 5 ? 5: props.lastCardsNumber;
        for(var j=0;j<animatedCards;j++)  
            cardArray.push( <li key={j}>
             <div className="cardCss back"></div>
           </li>)
       
        
    return (
        <div hidden={!props.hidden} className={animationClassName}>
        <div
        className={classN}
      >
        <ul className="hand" style={{height: "2em"}} >
           {cardArray}
         </ul>
      </div>  
      </div>

    )
}
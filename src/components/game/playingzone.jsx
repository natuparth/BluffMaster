import React from "react";
import "./game.css";

export function PlayingZone(props) {
    var elem = [];
    var x = 0;
    var y = 0;
    var angle = 0;
    var styleObj;
    var cardsPlayed;
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
    if(props.lastCardsNumber < 0)
      cardsPlayed = 0;
    else 
      cardsPlayed = props.lastCardsNumber;
      var cardClass = "card rank-" + props.playCard + " spades" ; 
    return (
      <div className="playingZone">
        <div className="outerRing">
          {elem}
          <div className="cardsNumber">{props.numberOfCards}</div>
          <div style={{transform:"translate(15em, 5em)"}}>Current Claim</div>
          <span className="numberOfCardsLeft" style={{transform:"translate(15em, 2.9em)"}}>{cardsPlayed}</span>
          <div className="playCard">
          <div className="playingCards fourColours faceImages"> 
          <div className={cardClass}>
            <span className="rank">{props.playCard}</span>
            <span className="suit">&spades;</span>
          </div>
         </div>   
         
               {/* <h2 style={{marginTop: "0px"}}>{props.playCard}s</h2> */}
             </div>
          
        </div>
      </div>
    );
  }
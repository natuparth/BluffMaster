import React from "react";
import "./game.css";
import {ranks} from  "../globals/globalVariables";

export function CardPicker(props){
 
    var elem = [];
    var x = 0;
    var y = 0;
    var angle = 0;
    var styleObj;
    var cardSelected;
   
  
    for (var i = 0; i < 13; i++) {
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
    elem.push(<div style={styleObj} className="cardCss" data-id={cardRank} 
    onClick={(e)=>{
      props.action(e); 
      cardSelected = cardRank
   }
 }><span>{cardRank}</span></div>);
      angle = angle + (360)/13;
      x = x + 1 * 35 * Math.cos((angle * 3.14) / 180);
      y = y + 1 * 35 * Math.sin((angle * 3.14) / 180);
    }
 
 
   var selectedCardStyle = {
     backgroundColor: "thistle",
     position: "absolute",
     "WebkitTransform":
          "translate(-15px, 70px)",
        "OTransform":
          "translate(-15px, 70px)",
        transform: "translate(-15px, 70px)",
   };
   return(
    <div className="cardSelector">
      <div style={selectedCardStyle} className="cardCss" ><span>{props.cardSelected}</span></div>
       {elem}
    </div>  
   )
  
  }
import React from "react";
import "./game.css";

export function Winners(props) {
     var elem = []
    for(var i=0;i<props.winners.length;i++)
       elem.push(<li key={props.winners[i].pid}>{props.winners[i].pname}</li>)
    return (
      <div className="winnersContainer">
         <div>
         <h3 style={{fontFamily : "myFirstFont"}}>Winners</h3> 
         </div>
         <div className="winnersList">
         <ul>
            {elem}
         </ul>
         </div>
          </div>
  )

}
import React from "react";
import "./game.css";

export function Winners(props) {
     var elem = []
    for(var i=0;i<props.winners.length;i++)
       elem.push(<li key={props.winners[i].pid}>{props.winners[i].pname}</li>)
    return (
      <div className="winnersContainer">
         <ul>
            {elem}
         </ul>   
          </div>
  )

}
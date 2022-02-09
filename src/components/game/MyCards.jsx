import React from "react";
import ReactDOM from 'react';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faQuestionCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { useEffect } from "react";
var selectedCards = []


function getSuitSymbol(suit) {
  if (suit === "spades") return <span className="suit">&spades;</span>;
  else if (suit === "hearts") return <span className="suit">&hearts;</span>;
  else if (suit === "diams") return <span className="suit">&diams;</span>;
  else return <span className="suit">&clubs;</span>;
}

export function MyCards(props) {
  console.log('rendered')
  const [currentCards, setCurrentCards] = useState([])
  const [cardsDeck, setCardsDeck] = useState([]);
  useEffect(() => {
     console.log('this use effect called')
     setCurrentCards(new Array(props.myCards.length).fill().map(u => {return {selected: false}}))
  }, [props.myCards])
  useEffect(() => {
    console.log('yse effec called')
      
      let items = [];
      
      for (let i = 0; i < props.myCards.length; i++) {
        var obj = props.myCards[i];
        var styleObj = {
          left: (i * 1.1) + 'em'
        }
        var cardClass = "card rank-" + obj.rank + " " + obj.suit;
        var elem = getSuitSymbol(obj.suit);
        items.push(
          <li
            key={Math.random(0,1000)*1000}
            data-id={i}
            style={styleObj}
    
          >
            <div className={cardClass} style={{background: "white"}} onClick={(e) => {
              handleCardClick(e,i,currentCards);
            }}>
              <span className="rank" style={{background: "white"}}>{obj.rank}</span>
              {elem}
            </div>
          </li>
        );
      }
      setCardsDeck(items)
  }, [props.myCards])

  function moveHandlerChild(){
    console.log(currentCards)
    props.moveHandler(currentCards)
  }
  
  function handleCardClick(elem,i) {
    console.log(i)
    console.log("current cards", currentCards)
    elem.currentTarget.style.backgroundColor = elem.currentTarget.style.backgroundColor !== "yellow" ? "yellow" : "white";
     
   //  tempArray[i] = tempArray[i].selected ? tempArray[i] : {selected: true}
    // console.log("temporary cards",tempArray)
    setCurrentCards((oldArray) => {
      const tempArray = [...oldArray];  
      const item = tempArray[i];
      tempArray[i] = {...item, selected: !item.selected}
      return tempArray;
    });
  }

  return (
    <div className="myCardsParentDiv">

      <div
        className="playingCards fourColours faceImages"
        style={{ marginLeft: "20%", overflow: "auto" }}
      >
        <ul className="hand">{cardsDeck}</ul>
      </div>
     <div className="moveControls">
             <AwesomeButton
        type="primary"
        onPress={() => {
          props.moveHandler(currentCards)
         // moveHandlerChild();
        }}
        ripple
        disabled={!props.myTurn}
      > <FontAwesomeIcon icon={faPlayCircle} /> Play</AwesomeButton>
      <br />
      <AwesomeButton
        onPress={() => {
         props.passHandler();
        }}
        ripple
        disabled={!props.myTurn}
      >
        <FontAwesomeIcon icon={faArrowRight} /> Pass
      </AwesomeButton>
      <br />
      <AwesomeButton
        onPress={() => {
         props.challengeHandler();
        }}
        disabled={!props.myTurn}
      >
        <FontAwesomeIcon icon={faQuestionCircle} /> Challenge
      </AwesomeButton>
      </div>
    </div>
  )

}
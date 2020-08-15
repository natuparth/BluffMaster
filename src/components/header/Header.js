import React from 'react';
import {
 selectCard,
 gameActions
} from '../../gameStore/gameSlices'
import './header.css';



function Header(){
 
  const card = {
    suit: '1',
    rank : 'J'
  }
  return (
  <div>
    <h2> Welcome To BluffMaster</h2>
 { /*<button onClick = { ()=> dispatch(gameActions.addcard(card))}>AddCard</button> 
  <h2> {count}</h2>*/}
  </div>
  )

}

export default Header;
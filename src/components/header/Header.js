import React from 'react';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
 selectCard,
 gameActions
} from '../../gameStore/gameSlices'
import './header.css';



function Header(){
  const count = useSelector(selectCard);
  const dispatch = useDispatch();
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
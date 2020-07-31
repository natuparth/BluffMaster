import React from 'react';
import './game.css';
//import '../../selfthinker-CSS-Playing-Cards-7e0e0f2/faces';
import '../../selfthinker-CSS-Playing-Cards-7e0e0f2/cards.css'


export default class Game extends React.Component{
 render(){
return(
 <div className='Game_container'>
     <ul className='hand'>
    <li>
    <div className='card rank-7 spades'>
    <span className='rank'>7</span>
    <span className='suit'>&spades;</span>
</div>
    </li> 

</ul>
 </div>

 )
 }

}
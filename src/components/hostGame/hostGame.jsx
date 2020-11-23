import React from "react";
import './hostGame.css';


export default class HostGame extends React.Component {

 constructor(prop){
    super(prop);
 }

render(){



return(
 <div className="container">
  <h1>Join Game Component</h1>
  <input value={this.state.numberOfDecks}/>
</div>



)





}



}


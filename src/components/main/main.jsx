import React, { useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import firebase from "../../Firebase";
import { useDispatch } from "react-redux";
import { HostGameAsync, JoinGameAsync } from "../../gameStore/gameSlices";
import "./main.css";
import Popup from 'reactjs-popup';

const db = firebase.firestore();

function Main1() {
  const dispatch = useDispatch();
  const [joinGame, setJoinGame] = useState("none");
  const [createGame, setHostGame] = useState("none");
  const [masterButtons, toggleMasterButtons] = useState("block");
  const [gameName, setGameName] = useState("");
  const [gameId, setGameId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [joinModal, setJoinModal] = useState(false);
  const toggleJoin = () => setJoinModal(!joinModal);
  const [invalidKeyPopup, setInvalidKeyPopupHandler] = useState(false);
 
  const CloseinvalidKeyPopup = ()=>{
    setInvalidKeyPopupHandler(false);
  }
  return (
    <div className="mainBody">
      Welcome<br/>
       to <br/>
        BluffMaster
      <p style={{fontFamily: 'lightItalic', fontSize:'2vw' ,paddingTop: '0px', margin:'0 auto'}}> Beauty Lies in the game of Lies</p>
      {/* Master button starts */}
       <div style={{marginTop: '0.5vh', display:masterButtons, height:'13vh'}}>
        <button
          className="btn-grad"
          onClick={() => {
            setJoinGame(joinGame === "none"?"block": "none");
            setHostGame("none")
           // toggleMasterButtons("none")
          //  setJoinModal(true);
            
          }}
         >
          Join Game
        </button>
      
        <button
          className="btn-grad"
          onClick={() => {
            setHostGame(createGame === "none"?"block": "none");
            setJoinGame("none")
          //  toggleMasterButtons("none")
          //  setJoinGame("none");
          }}
        >
          Host Game
        </button>
        </div>
  {/* Master button ends */}
 {/* Join game container */}
        <div style={{display: joinGame}}>
        <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Game Key"
              name="gamekey"
              required
              value={gameId}
              onChange={(event) => setGameId(event.target.value)}
            />
         </div>
         &nbsp;
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Player Name"
              name="playername"
              required
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
            />
         
          </div>
          <button
          style={{display: 'block', margin:'auto', marginTop:'3vh'}}
          className="btn-grad custom_button"
          onClick={() => {
            joinGameHandler(gameId, playerName);
          //  setJoinModal(true);
           // toggleGame("none");
          }}
         >
          Join
        </button>
         </div>        
 {/* Join game container ends */}
 {/* Host game container starts */}
 <div style={{display: createGame}}>
 <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Game Name"
              name="gamename"
              required
               value={gameName}
               onChange={(event) => setGameName(event.target.value)}
            />
          
          </div>
          &nbsp;
     <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Player Name"
              name="playername"
              required
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
            />
         
          </div>        
        <button
        style={{display: 'block', margin:'auto', marginTop:'3vh'}}
          className="btn-grad custom_button"
          onClick={() => {
            createGameHandler(gameName);
           // toggleGame(createGame === "none" ? "block" : "none");
          //  setJoinGame("none");
          }}
        >
          Host
        </button>
 
 </div>
 <Popup open={invalidKeyPopup} onClose={CloseinvalidKeyPopup}>
          <div style={{backgroundColor:"grey",height:"30px",width:"500px",marginTop:"-10px",marginLeft:"-7px",marginRight:"-7px"}}></div>
          <div className="popup_container">
            <p className="text-center" style={{margin:"10px 10px 10px 10px"}}>Cannot join the Group, please check the game key you have entered</p>
            </div>
            
            <div className="text-center"> <button onClick={CloseinvalidKeyPopup} className='btn-grad custom_button' style={{width:"3vw",height:"2vw",padding:"0px"}}>OK</button></div>
            </Popup>
 {/* Host game container ends */} 
      </div>

  );

  function createGameHandler(gameName) {
    let r = Math.random().toString(36).substring(7);
    console.log(r);
    dispatch(
      HostGameAsync({
        gameName: gameName,
        gameKey: r,
        pname: playerName
      })
    );
  }

  function joinGameHandler(gameKey, playerName) {
    db.collection("games")
      .where("gameKey", "==", gameKey)
      .get()
      .then((querySnapShot) => {  
        if(querySnapShot.docs.length<=0)
        setInvalidKeyPopupHandler(true);
        else{
        dispatch(
          JoinGameAsync({
            gameId: querySnapShot.docs[0].id,
            gameKey: gameKey,
            gameName: querySnapShot.docs[0].data().gameName,
            pname: playerName,
          })
        );
      }
      });
  }
}

export default Main1;

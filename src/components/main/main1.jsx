import React, { useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import firebase from "../../Firebase";
import { useDispatch } from "react-redux";
import { HostGameAsync, JoinGameAsync } from "../../gameStore/gameSlices";
import "./main.css";
import styles from './main.module.css';

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
 
  return (
    <div className={styles.mainBody}>
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
        dispatch(
          JoinGameAsync({
            gameId: querySnapShot.docs[0].id,
            gameKey: gameKey,
            gameName: querySnapShot.docs[0].data().gameName,
            pname: playerName,
          })
        );
      });
  }
}

export default Main1;

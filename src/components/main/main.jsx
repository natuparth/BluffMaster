import React, { useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import firebase from "../../Firebase";
import { useDispatch } from "react-redux";
import { HostGameAsync, JoinGameAsync } from "../../gameStore/gameSlices";
import "./main.css";


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
 
  //const gamekeyMessage="";
  const [gamekeyMessage, setgamekeyMessage] = useState("");
  const [playerNameMessage, setplayerNameMessage] = useState("");
  const [gameNameMessage, setgameNameMessage] = useState("");
  // const [hostNameMessage, sethostNameMessage] = useState("");
  //const playerNameMessage="";
 
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
            setplayerNameMessage("")
            setgamekeyMessage("")
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
            setplayerNameMessage("")
            setgameNameMessage("")
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
              onChange={(event) => { 
                setGameId(event.target.value)
                setgamekeyMessage("");
              }
              }
            />
            <h6 style={{color:"red",textAlign:"left",whiteSpace: "pre-wrap"}}>{gamekeyMessage?gamekeyMessage:"\n"}</h6>
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
              onChange={(event) => {
                setPlayerName(event.target.value)
                setplayerNameMessage("");
              }
              }
            />
         <h6 style={{color:"red",textAlign:"left",whiteSpace: "pre-wrap"}}>{playerNameMessage?playerNameMessage:"\n"}</h6>
          </div>
          <button
          style={{display: 'block', margin:'auto'}}
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
               onChange={(event) => { 
                             setGameName(event.target.value)
                             setgameNameMessage("");   
               }}
            />
            <h6 style={{color:"red",textAlign:"left",whiteSpace: "pre-wrap"}}>{gameNameMessage?gameNameMessage:"\n"}</h6>
          
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
              onChange={(event) => {
                setPlayerName(event.target.value)
                setplayerNameMessage("");
              }}
            />
            <h6 style={{color:"red",textAlign:"left",whiteSpace: "pre-wrap"}}>{playerNameMessage?playerNameMessage:"\n"}</h6>
         
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
    if(playerName==""){
      setplayerNameMessage("enter valid player name");
      return;
    }
    else{
      setplayerNameMessage("");
    }
    if(gameName==""){
    setgameNameMessage("enter valid game name");
    }
    else{
      setgameNameMessage("");
    dispatch(
      HostGameAsync({
        gameName: gameName,
        gameKey: r,
        pname: playerName
      })
    );
  }
}

  function joinGameHandler(gameKey, playerName) {
    if(gameKey == "" || gameKey.length == 0)
    {
      setgamekeyMessage("enter valid game key");
      if(playerName=="")
      setplayerNameMessage("enter valid player name");
      return;
    }
    else if(playerName==""){
      setplayerNameMessage("enter valid player name");
      return;
    }
    else{
    db.collection("games")
      .where("gameKey", "==", gameKey)
      .get()
      .then((querySnapShot) => {  
        if(querySnapShot.docs.length<=0 ){
        setgamekeyMessage("Game Key is not valid");
        return;
        }
        else{
          setgamekeyMessage("");
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
}

export default Main1;

import React, { useState } from "react";
import firebase from "../../Firebase";
import { useDispatch } from "react-redux";
import { HostGameAsync, JoinGameAsync } from "../../gameStore/gameSlices";
import "./main.css";

const db = firebase.firestore();

function Main() {
  const dispatch = useDispatch();
  const [joinGame, setJoinGame] = useState("none");
  const [createGame, toggleGame] = useState("none");
  const [gameName, setGameName] = useState(" ");
  const [gameId, setGameId] = useState("");
  const [playerName, setPlayerName] = useState("");
  return (
    <div className="Main_container">
      <div className="create_host_container">
        <div className="button-container">
        <button
          className="big-button"
          onClick={() => {
            setJoinGame(joinGame === "none" ? "block" : "none");
            toggleGame("none");
          }}
        >
          Join Game
        </button>
        <button
          className="big-button"
          onClick={() => {
            toggleGame(createGame === "none" ? "block" : "none");
            setJoinGame("none");
          }}
        >
          Host Game
        </button>
        </div>    
        <div style={{ display: joinGame, marginTop: "8%" }}>
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
            <label htmlFor="gamekey" className="form__label">
              Game Key
            </label>
          </div>
          <button
            className="createJoinGameButton"
            onClick={() => {
              joinGameHandler(gameId, playerName);
            }}
          >
            Join Game
          </button>
        </div>
        <div style={{ display: createGame, marginTop: "8%" }}>
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
            <label htmlFor="gamename" className="form__label">
              Game Name
            </label>
          </div>

          <button
            className="createJoinGameButton"
            onClick={() => {
              createGameHandler(gameName);
            }}
          >
            Create Game
          </button>
        </div>
      </div>

      <div className="player_name">
      <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Game Name"
              name="playername"
              required
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
            />
            <label htmlFor="playername" className="form__label">
              Player Name
            </label>
          </div>
       
      </div>
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

export default Main;

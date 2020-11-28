import {createSlice} from '@reduxjs/toolkit';
import { push } from 'connected-react-router';

export const gameSlice = createSlice({
name : 'game',
initialState: {
    gameName: '',
    gameCards: [],
    gameKey: '',
    gameId: ''

},
reducers : {
    addcard: (state,action) => {
         state.mycards.push(action.payload.cards);
    },
    setGameData: (state, action) => {
        state.gameName = action.payload.gameName;
        state.gameKey = action.payload.gameKey;
        state.gameId = action.payload.gameId;
    }
}
 
})



export const playerSlice = createSlice({
    name: 'players',
    initialState: {
        cards: [],
        pname: '',
        pid: ' ',
        isHost: false,
        
    },

    reducers: {
       addPlayer: (state, action) => {
           state.pname = action.payload.pname;
           state.pid = action.payload.pid;
           state.isHost = action.payload.isHost;
       } 
    }
 })


export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducers;

export const playerActions = playerSlice.actions;
export const playerReducer = playerSlice.reducers;

export const isHost = state => state.players.isHost;
export const gameId = state => state.game.gameId;

export const getPlayers = state => state.players.players;


export const gameSliceReducer = gameSlice.reducer;
export const playerSliceReducer = playerSlice.reducer;

export const HostGameAsync = gameData => (dispatch, getState, {getFirebase, getFirestore}) => {
    let r = Math.random().toString(36).substring(7);
  const game = {
    gameCards: [],  
    rank: '',
    bluff: false,
    gameName: gameData.gameName,
    gameKey: gameData.gameKey,
    gameStarted: false,
    Players:[
    {   pname: gameData.pname,
        pid: r
    }
    ],
    playerCardsFinished: false,
    newMove: true,
    gameWinner: '',
    winnerDecided: false,
    winners: []
  }
    const firestore = getFirestore();
    firestore.collection('games').add(game).then((doc)=>{
    dispatch(gameActions.setGameData({
          gameId: doc.id, 
          gameName: game.gameName,
          gameKey: game.gameKey
      }));
      dispatch(playerActions.addPlayer(
        {
            pname: gameData.pname,
            pid: r,
            isHost: true
        }
      ))
     
      dispatch(push('/startgame',{gameId: doc.id}))
     
  })


}

export const JoinGameAsync = gameData => (dispatch, getState, {getFirebase, getFirestore}) => {
    let r = Math.random().toString(36).substring(7);
    const player = {
        pname: gameData.pname,
        pid: r
    }
    const firestore = getFirestore();
    console.log(player);
    firestore.collection('games').doc(gameData.gameId).update({
     Players: firestore.FieldValue.arrayUnion(player)
    }
        ).then((doc)=>{
            console.log(doc);
           dispatch(gameActions.setGameData({
               gameName: gameData.gameName,
               gameKey: gameData.gameKey,
               gameId: gameData.gameId
           }))
          
           dispatch(playerActions.addPlayer(
            {
            pname: player.pname,
            pid: player.pid,
            isHost: false
        }
         ));

         dispatch(push('/startgame',{gameId: gameData.gameId}))
        })

}



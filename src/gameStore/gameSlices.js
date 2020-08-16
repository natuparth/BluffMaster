import {createSlice, combineReducers} from '@reduxjs/toolkit';
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

export const hostSlice = createSlice({
name : 'host',
initialState: {
  isHost: false

},

reducers: {
   setHost: (state,action) => {
       state.isHost = action.payload;
   }

}

});

export const playerSlice = createSlice({
    name: 'players',
    initialState: {
        players: []
    },

    reducers: {
       addPlayer: (state, action) => {
           state.players.push(action.payload);
       }   
  


    }
 })


export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducers;
export const hostActions = hostSlice.actions;
export const hostReducer = hostSlice.reducers;
export const playerActions = playerSlice.actions;
export const playerReducer = playerSlice.reducers;

export const isHost = state => state.host.isHost;
export const gameId = state => state.game.gameId;

export const getPlayers = state => state.players.players;

export const hostSliceReducer = hostSlice.reducer;
export const gameSliceReducer = gameSlice.reducer;
export const playerSliceReducer = playerSlice.reducer;

export const AddPlayerAsync = gameData => (dispatch, getState, {getFirebase, getFirestore}) => {
 
  const game = {
    gameName: gameData.gameName,
    gameKey: gameData.gameKey,
    Players:[
    {   pname: 'parth',
        cards:[],
        lifelines:4
    }
    ]
  }
    const firestore = getFirestore();
  firestore.collection('games').add(game).then((doc)=>{
      dispatch(gameActions.setGameData({
          gameId: doc.id, 
          gameName: game.gameName,
          gameKey: game.gameKey
      }));
      dispatch(playerActions.addPlayer(
         game.Players[0]
      ))
      console.log('game added');
      console.log(firestore)
      dispatch(push('/startgame',{gameId: doc.id}))
     
  })


}

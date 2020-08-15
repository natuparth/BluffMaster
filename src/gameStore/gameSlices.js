import {createSlice, combineReducers} from '@reduxjs/toolkit';


export const gameSlice = createSlice({
name : 'game',
initialState: {
    index: 0,
    mycards: [],
    gameName: ' ',
    gameCards: []

},
reducers : {
    addcard: (state,action) => {
         state.mycards.push(action.payload.cards);
    },
    setGameName: (state, action) => {
        state.gameName = action.payload.name;
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
export const selectCard = state => state.game.index;
export const getPlayers = state => state.players.players;

export const hostSliceReducer = hostSlice.reducer;
export const gameSliceReducer = gameSlice.reducer;
export const playerSliceReducer = playerSlice.reducer;

export const AddPlayerAsync = gameData => (dispatch, getState, {getFirebase, getFirestore}) => {
 
  const game = {
    name: gameData.gamename,
    Players:[
    {
        cards:[],
        lifelines:4
    }
    ]
  }
    const firestore = getFirestore();
  firestore.collection('games').add({
      gameData
  }
  ).then(()=>{
      dispatch()
      console.log('game added');
     
  })


}

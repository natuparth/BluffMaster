import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { gameSliceReducer, playerSliceReducer} from './gameSlices';
import  thunkMiddleWare  from 'redux-thunk';
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import 'firebase/firestore';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import {  firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import fbConfig from '../Firebase';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const history = createBrowserHistory();


const rootReducer = combineReducers({
  game: gameSliceReducer,
  player: playerSliceReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  router: connectRouter(history)
});

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



    export const store = configureStore({
      // reducer: {
      //   game: gameSliceReducer,
      //   player: playerSliceReducer,
      //   firebase: firebaseReducer,
      //   firestore: firestoreReducer,
      //   router: connectRouter(history)
      // },
       reducer: persistedReducer,
      middleware: [thunkMiddleWare.withExtraArgument({ getFirestore}), routerMiddleware(history)],
  
   enhancers:[reduxFirestore(fbConfig)],
      devTools: process.env.NODE_ENV !== 'production'
    });
    export const persistor = persistStore(store)
   
    

  
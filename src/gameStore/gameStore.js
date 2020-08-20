import {configureStore} from '@reduxjs/toolkit';
import { gameSliceReducer, playerSliceReducer} from './gameSlices';
import  thunkMiddleWare  from 'redux-thunk';
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import 'firebase/firestore';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import {  firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import fbConfig from '../Firebase';

export const history = createBrowserHistory();
export default configureStore({
    reducer: {
      game: gameSliceReducer,
      player: playerSliceReducer,
      firebase: firebaseReducer,
      firestore: firestoreReducer,
      router: connectRouter(history)
    },
    
    middleware: [thunkMiddleWare.withExtraArgument({ getFirestore}), routerMiddleware(history)],

 enhancers:[reduxFirestore(fbConfig)],
    devTools: process.env.NODE_ENV !== 'production'
  });

  
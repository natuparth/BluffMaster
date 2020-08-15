
import {configureStore} from '@reduxjs/toolkit';
import {hostSliceReducer, gameSliceReducer, playerSliceReducer} from './gameSlices';
import  thunkMiddleWare  from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from '../Firebase';
//const thunkMiddleware = require('redux-thunk');

//const enhancers= [thunkMiddleWare.withExtraArgument({ getFireStore, getFirebase}), reduxFirestore(fbConfig),reactReduxFirebase(fbConfig)]


export default configureStore({
    reducer: {
      game: gameSliceReducer,
      host: hostSliceReducer,
      player: playerSliceReducer
    },
    
    middleware: [thunkMiddleWare.withExtraArgument({ getFirestore, getFirebase})],

    enhancers:[reduxFirestore(fbConfig),reactReduxFirebase(fbConfig)],
    devTools: process.env.NODE_ENV !== 'production'
  });

  
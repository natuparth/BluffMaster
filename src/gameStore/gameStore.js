import {configureStore} from '@reduxjs/toolkit';
import {hostSliceReducer, gameSliceReducer} from './gameSlices';

export default configureStore({
    reducer: {
      game: gameSliceReducer,
      host: hostSliceReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
  });

  
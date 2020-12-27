import React from 'react';
import ReactDOM from 'react-dom';
import {persistor,store ,history} from './gameStore/gameStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import './index.css';
import App from '../src/components/app/App';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ConnectedRouter history={history}>  
    <App />
    </ConnectedRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

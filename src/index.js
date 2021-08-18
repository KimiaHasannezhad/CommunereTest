import React from 'react';
import ReactDOM from 'react-dom';
import './styles/globalStyle.css';
import Routes from './routes/index'
import { Provider } from 'react-redux'
import store from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './persistor'


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

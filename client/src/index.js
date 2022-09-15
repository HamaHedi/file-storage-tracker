import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import history from './utils/history';
import { ConnectedRouter } from 'connected-react-router/immutable';

const initialState = {};
const store = configureStore(initialState, history);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />,
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

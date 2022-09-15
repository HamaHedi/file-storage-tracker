import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router/immutable';
import createReducer from './reducers';
import { fromJS } from 'immutable';

const configureStore = (initialState = {}, history) => {
  const middelware = [thunk, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middelware)];
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false
        })
      : compose;
  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  return store;
};

export default configureStore;

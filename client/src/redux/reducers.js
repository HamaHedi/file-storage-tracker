import history from '../utils/history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router/immutable';
import uploadsReduces from './reducers/uploadsReducer';
import starredReducers from './reducers/starredReducers';
import archivedReducers from './reducers/archivedReducers';

export default function createReducer() {
  const rootReducer = combineReducers({
    file: uploadsReduces,

    starred: starredReducers,
    archived: archivedReducers,
    router: connectRouter(history),
  });

  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}

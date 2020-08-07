import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
// import { composeWithDevTools } from 'redux-devtools-extension';

import projectReducer from './containers/ProjectList/reducer';
import profileReducer from './containers/Profile/reducer';

export const history = createBrowserHistory();

const initialState = {
  projects: {
    projects: [],
    editProjectNameId: 0,
    editTaskDescriptionTaskId: 0
  }
};

const middlewares = [
  thunk,
  routerMiddleware(history)
];

const composedEnhancers = compose(
  applyMiddleware(...middlewares)
);

const reducers = {
  projects: projectReducer,
  profile: profileReducer
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers
});

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;

import {
  SET_USER,
  USER_LOGOUT
} from './actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthorized: Boolean(action.payload?.id),
        isLoading: false
      };

    case USER_LOGOUT:
      return {
        ...state,
        user: action.payload,
        isAuthorized: false,
        isLoading: false
      };

    default:
      return state;
  }
};

import { SET_USER } from './actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthorized: Boolean(action.payload?.id),
        isLoading: false
      };

    default:
      return state;
  }
};

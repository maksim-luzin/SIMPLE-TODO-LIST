import {
  ADD_PROJECT
} from './actionTypes';


export default (state = {}, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [
          action.payload,
          ...state.projects
        ]
      };

    default:
      return state;
  };
};

import {
  ADD_PROJECT,
  EDIT_PROJECTT_NAME
} from './actionTypes';


export default (state = {}, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [
          ...state.projects,
          action.payload
        ],
        editProjectNameId: action.payload.id
      };

    case EDIT_PROJECTT_NAME:
      return {
        ...state,
        editProjectNameId: action.payload.id
      };

    default:
      return state;
  };
};

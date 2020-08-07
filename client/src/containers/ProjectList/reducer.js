import {
  ADD_PROJECT,
  EDIT_PROJECTT_NAME,
  UPDATE_PROJECT_NAME
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

    case UPDATE_PROJECT_NAME:
      indexProject = search(state.projects, action.payload.id);
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, indexProject),
          {
            ...state.projects[indexProject],
            name: action.payload.name
          },
          ...state.projects.slice(indexProject + 1)
        ],
        editProjectNameId: 0
      };

    default:
      return state;
  };
};

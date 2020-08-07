import {
  ADD_PROJECT,
  EDIT_PROJECTT_NAME,
  UPDATE_PROJECT_NAME,
  DELETE_PROJECT,
  MODAL_CONFIRM,
  CLOSE_CONFIRM,
  ADD_TASK,
  TASK_DONE
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

    case DELETE_PROJECT:
      indexProject = search(state.projects, action.payload.id);
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, indexProject),
          ...state.projects.slice(indexProject + 1)
        ],
        modal: false,
        deleteFunction: () => { },
        deleteData: {}
      };

    case MODAL_CONFIRM:
      return {
        ...state,
        modal: true,
        deleteFunction: action.payload.deleteFunction,
        deleteData: action.payload.deleteData
      };

    case CLOSE_CONFIRM:
      return {
        ...state,
        modal: false,
        deleteFunction: () => { },
        deleteData: {}
      };

    case ADD_TASK:
      indexProject = search(state.projects, action.payload.projectId);
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, indexProject),
          {
            ...state.projects[indexProject],
            tasks: [
              ...state.projects[indexProject].tasks,
              action.payload.task
            ]
          },
          ...state.projects.slice(indexProject + 1)
        ]
      };

    default:
      return state;
  };
};

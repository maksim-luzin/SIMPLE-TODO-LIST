import {
  LOAD_PROJECTS,
  ADD_PROJECT,
  EDIT_PROJECTT_NAME,
  UPDATE_PROJECT_NAME,
  DELETE_PROJECT,
  MODAL_CONFIRM,
  CLOSE_CONFIRM,
  ADD_TASK,
  TASK_DONE,
  EDIT_TASK_DESCRIPTION,
  UPDATE_TASK_DESCRIPTION,
  DELETE_TASK,
  UP_TASK,
  DOWN_TASK,
  USER_LOGOUT,
  SORT_PROJECT_DESCENDING_TASKS
} from './actionTypes';

const search = (searchPlace, searcItem) => searchPlace.indexOf(searchPlace.find(element => element.id === searcItem));

export default (state = {}, action) => {
  let indexProject = null;
  switch (action.type) {
    case LOAD_PROJECTS:
      return {
        ...state,
        ...action.payload,
        allProjectsLoaded: true
      };

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

    case TASK_DONE:
      indexProject = search(state.projects, action.payload.projectId);
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, indexProject),
          {
            ...state.projects[indexProject],
            tasks: [
              ...state.projects[indexProject].tasks.slice(0, action.payload.indexTask),
              {
                ...state.projects[indexProject].tasks[action.payload.indexTask],
                done: action.payload.done
              },
              ...state.projects[indexProject].tasks.slice(action.payload.indexTask + 1)
            ]
          },
          ...state.projects.slice(indexProject + 1)
        ]
      };

    case EDIT_TASK_DESCRIPTION:
      return {
        ...state,
        editTaskDescriptionProjectId: action.payload.projectId,
        editTaskDescriptionTaskId: action.payload.id
      };

    case UPDATE_TASK_DESCRIPTION:
      indexProject = search(state.projects, action.payload.projectId);
      return {
        ...state,
        editTaskDescriptionProjectId: 0,
        editTaskDescriptionTaskId: 0,
        projects: [
          ...state.projects.slice(0, indexProject),
          {
            ...state.projects[indexProject],
            tasks: [
              ...state.projects[indexProject].tasks.slice(0, action.payload.indexTask),
              {
                ...state.projects[indexProject].tasks[action.payload.indexTask],
                description: action.payload.description
              },
              ...state.projects[indexProject].tasks.slice(action.payload.indexTask + 1)
            ]
          },
          ...state.projects.slice(indexProject + 1)
        ]
      };

    case DELETE_TASK:
      indexProject = search(state.projects, action.payload.projectId);
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, indexProject),
          {
            ...state.projects[indexProject],
            tasks: [
              ...state.projects[indexProject].tasks.slice(0, action.payload.indexTask),
              ...action.payload.tasksUpdate
            ]
          },
          ...state.projects.slice(indexProject + 1)
        ],
        modal: false,
        deleteFunction: () => { },
        deleteData: {}
      };

    case UP_TASK:
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, action.payload.indexProject),
          {
            ...state.projects[action.payload.indexProject],
            tasks: [
              ...state.projects[action.payload.indexProject].tasks.slice(0, action.payload.indexTask - 1),
              ...action.payload.tasksMove,
              ...state.projects[action.payload.indexProject].tasks.slice(action.payload.indexTask + 1)
            ]
          },
          ...state.projects.slice(action.payload.indexProject + 1)
        ]
      };

    case DOWN_TASK:
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, action.payload.indexProject),
          {
            ...state.projects[action.payload.indexProject],
            tasks: [
              ...state.projects[action.payload.indexProject].tasks.slice(0, action.payload.indexTask),
              ...action.payload.tasksMove,
              ...state.projects[action.payload.indexProject].tasks.slice(action.payload.indexTask + 2)
            ]
          },
          ...state.projects.slice(action.payload.indexProject + 1)
        ]
      };

    case USER_LOGOUT:
      return {
        ...state,
        projects: [],
        allProjectsLoaded: false
      };

    case SORT_PROJECT_DESCENDING_TASKS:
      return {
        ...state,
        projects: [...state.projects].sort((a, b) => b.tasks.length - a.tasks.length)
      };

    default:
      return state;
  }
};

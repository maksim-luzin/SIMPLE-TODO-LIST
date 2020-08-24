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
  SHOW_ALL_PROJECTS,
  SORT_PROJECTS_DESCENDING_TASKS,
  SORT_PROJECTS_BY_NAME,
  FILTER_PROJECTS_WITH_LETTER_A_NAME,
  FILTER_PROJECTS_WITH_MORE_10_TASKS_DONE,
  ERROR_MESSAGE,
  FINISH_DOWNLOADING_PROJECTS,
  FILTER_SEARCH
} from './actionTypes';

const search = (searchPlace, searcItem) => searchPlace.indexOf(searchPlace.find(element => element.id === searcItem));

export default (state = {}, action) => {
  let indexProject = null;
  switch (action.type) {
    case LOAD_PROJECTS:
      return {
        ...state,
        ...action.payload,
        allProjectsLoaded: true,
        functionSort: () => true,
        filterProjects: () => true
      };

    case ADD_PROJECT:
      return {
        ...state,
        projects: [
          ...state.projects,
          action.payload
        ],
        editProjectNameId: action.payload.id,
        filterProjects: () => true
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
        editProjectNameId: 0,
        filterProjects: () => true
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
        ],
        filterProjects: () => true
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
        allProjectsLoaded: false,
        filterProjects: () => true
      };

    case SHOW_ALL_PROJECTS:
      return {
        ...state,
        functionSort: () => true,
        filterProjects: () => true
      };

    case SORT_PROJECTS_DESCENDING_TASKS:
      return {
        ...state,
        functionSort: (projectA, projectB) => projectB.tasks.length - projectA.tasks.length,
        filterProjects: () => true
      };

    case SORT_PROJECTS_BY_NAME:
      return {
        ...state,
        functionSort: (projectA, projectB) => projectA.name.normalize().localeCompare(projectB.name.normalize()),
        filterProjects: () => true
      };

    case FILTER_PROJECTS_WITH_LETTER_A_NAME:
      return {
        ...state,
        functionSort: () => true,
        filterProjects: project => {
          const name = project.name.toLowerCase();
          return name.indexOf('a')
            && (name.indexOf('a') + 1)
            && (name.length - name.indexOf('a'));
        }
      };

    case FILTER_PROJECTS_WITH_MORE_10_TASKS_DONE:
      return {
        ...state,
        functionSort: (projectA, projectB) => projectB.id - projectA.id,
        filterProjects: project => project.tasks.reduce(((countTasksDone, task) => (
          countTasksDone + task.done)
        ), 0) > 10
      };

    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      };

    case FINISH_DOWNLOADING_PROJECTS:
      return {
        ...state,
        allProjectsLoaded: true
      };

    case FILTER_SEARCH:
      return {
        ...state,
        functionSort: () => true,
        filterProjects: project => {
          if (project.name.toLowerCase().indexOf(action.payload) !== -1) return true;
          if (project.tasks.some(task => task.description.toLowerCase().indexOf(action.payload) !== -1)) {
            return true;
          }
          return false;
        }
      };

    default:
      return state;
  }
};

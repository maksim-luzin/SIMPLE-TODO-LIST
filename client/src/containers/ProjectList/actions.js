import {
  ADD_PROJECT,
  EDIT_PROJECTT_NAME,
  UPDATE_PROJECT_NAME,
  DELETE_PROJECT,
  MODAL_CONFIRM,
  CLOSE_CONFIRM,
  ADD_TASK
} from './actionTypes';

const addProjectAction = project => ({
  type: ADD_PROJECT,
  payload: project
});

export const addProject = () => async (dispatch, getRootState = []) => {
  if (getRootState().projects.editProjectNameId) {
    return;
  }
  const name = 'New Project';
  const id = Math.floor((1e8 * Math.random()));

  const project = {
    id,
    name,
    tasks: []
  };
  dispatch(addProjectAction(project));
};

const editProjectNameAction = id => ({
  type: EDIT_PROJECTT_NAME,
  payload: id
});

export const editProjectName = id => (dispatch, getRootState = {}) => {
  if (getRootState().projects.editProjectNameId) {
    return;
  }
  dispatch(editProjectNameAction(id));
};

const updateProjectNameAction = projectName => ({
  type: UPDATE_PROJECT_NAME,
  payload: projectName
});

export const updateProjectName = updateNameProject => async dispatch => {
  dispatch(updateProjectNameAction(updateNameProject));
};

const deleteProjectAction = id => ({
  type: DELETE_PROJECT,
  payload: id
});

export const deleteProject = id => async dispatch => {
  dispatch(deleteProjectAction(id));
};

export const modalConfirmAction = deleted => ({
  type: MODAL_CONFIRM,
  payload: deleted
});

export const closeConfirmAction = () => ({
  type: CLOSE_CONFIRM
});

const addTaskAction = newTask => ({
  type: ADD_TASK,
  payload: newTask
});

export const addTask = newTask => async (dispatch, getRootState = {}) => {
  if (getRootState().projects.editProjectNameId) {
    return;
  }
  const projectNumber = search(getRootState().projects.projects, newTask.projectId);
  const indexTask = getRootState().projects.projects[projectNumber].tasks.length;
  const id = Math.floor((1e8 * Math.random()));
  const task = {
    ...newTask,
    id,
    done: false,
    indexTask
  };
  dispatch(addTaskAction({ projectId: newTask.projectId, task }));
};
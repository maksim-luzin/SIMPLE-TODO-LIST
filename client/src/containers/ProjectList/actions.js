import {
  ADD_PROJECT,
  EDIT_PROJECTT_NAME
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

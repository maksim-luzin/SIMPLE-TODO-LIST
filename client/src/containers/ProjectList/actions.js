import {
  ADD_PROJECT
} from './actionTypes';

const addProjectAction = project => ({
  type: ADD_PROJECT,
  payload: project
});

export const addProject = () => async (dispatch, getRootState = []) => {
  const name = 'New Project';
  const id = Math.floor((1e8 * Math.random()));

  const project = {
    id,
    name,
    tasks: []
  };
  dispatch(addProjectAction(project));
};

import {
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
  DELETE_TASK
} from './actionTypes';

const addProjectAction = project => ({
  type: ADD_PROJECT,
  payload: project
});

export const addProject = () => async (dispatch, getRootState = []) => {
  if (getRootState().projects.editProjectNameId || getRootState().projects.editTaskDescriptionProjectId) {
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
  if (getRootState().projects.editProjectNameId || getRootState().projects.editTaskDescriptionProjectId) {
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
  if (getRootState().projects.editProjectNameId || getRootState().projects.editTaskDescriptionProjectId) {
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

const taskDoneAction = done => ({
  type: TASK_DONE,
  payload: done
});

export const taskDone = done => async dispatch => {
  dispatch(taskDoneAction(done));
};

const editTaskDescriptionAction = editTask => ({
  type: EDIT_TASK_DESCRIPTION,
  payload: editTask
});

export const editTaskDescription = editTask => async (dispatch, getRootState = {}) => {
  if (getRootState().projects.editProjectNameId || getRootState().projects.editTaskDescriptionProjectId) {
    return;
  }
  dispatch(editTaskDescriptionAction(editTask));
};

const updateTaskDescriptionAction = taskDescription => ({
  type: UPDATE_TASK_DESCRIPTION,
  payload: taskDescription
});

export const updateTaskDescription = taskDescription => async dispatch => {
  dispatch(updateTaskDescriptionAction(taskDescription));
};

const deleteTaskAction = task => ({
  type: DELETE_TASK,
  payload: task
});

export const deleteTask = taskDelete => async (dispatch, getRootState = {}) => {
  const indexProject = search(getRootState().projects.projects, taskDelete.projectId);
  const tasksUpdate = getRootState()
    .projects
    .projects[indexProject]
    .tasks
    .slice(taskDelete.indexTask + 1)
    .map(task => ({ ...task, indexTask: task.indexTask - 1 }));
  const numberOfTasks = getRootState().projects.projects[indexProject].tasks.length;
  dispatch(deleteTaskAction({ ...taskDelete, tasksUpdate }));
};

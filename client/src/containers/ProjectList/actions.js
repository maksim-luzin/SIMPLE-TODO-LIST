import * as projectService from 'src/services/projectService';
import * as taskService from 'src/services/taskService';

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
  SHOW_ALL_PROJECTS,
  SORT_PROJECTS_DESCENDING_TASKS,
  SORT_PROJECTS_BY_NAME,
  FILTER_PROJECTS_WITH_LETTER_A_NAME
} from './actionTypes';

const search = (searchPlace, searcItem) => searchPlace.indexOf(searchPlace.find(element => element.id === searcItem));

const permissionMidelware = rootState => Boolean(
  rootState.projects.editProjectNameId || rootState.projects.editTaskDescriptionProjectId
);

const loadAllProjectsAction = projects => ({
  type: LOAD_PROJECTS,
  payload: projects
});

export const loadAllProjects = () => async dispatch => {
  const projects = await projectService.getAllProjects();
  dispatch(loadAllProjectsAction(projects));
};

const addProjectAction = project => ({
  type: ADD_PROJECT,
  payload: project
});

export const addProject = () => async (dispatch, getRootState = []) => {
  if (permissionMidelware(getRootState())) return;
  const name = 'New Project';
  const id = await projectService.addProject({ name });

  const project = {
    ...id,
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
  if (permissionMidelware(getRootState())) return;
  dispatch(editProjectNameAction(id));
};

const updateProjectNameAction = projectName => ({
  type: UPDATE_PROJECT_NAME,
  payload: projectName
});

export const updateProjectName = updateNameProject => async dispatch => {
  await projectService.updateProjectName({ ...updateNameProject });
  dispatch(updateProjectNameAction(updateNameProject));
};

const deleteProjectAction = id => ({
  type: DELETE_PROJECT,
  payload: id
});

export const deleteProject = id => async (dispatch, getRootState = []) => {
  if (permissionMidelware(getRootState())) return;
  await projectService.deleteProject(id);
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
  if (permissionMidelware(getRootState())) return;

  const projectNumber = search(getRootState().projects.projects, newTask.projectId);
  const indexTask = getRootState().projects.projects[projectNumber].tasks.length;
  const { id } = await taskService.addTask({ ...newTask, indexTask });
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
  await taskService.updateTask({ id: done.id, done: done.done });
  dispatch(taskDoneAction(done));
};

const editTaskDescriptionAction = editTask => ({
  type: EDIT_TASK_DESCRIPTION,
  payload: editTask
});

export const editTaskDescription = editTask => async (dispatch, getRootState = {}) => {
  if (permissionMidelware(getRootState())) return;
  dispatch(editTaskDescriptionAction(editTask));
};

const updateTaskDescriptionAction = taskDescription => ({
  type: UPDATE_TASK_DESCRIPTION,
  payload: taskDescription
});

export const updateTaskDescription = taskDescription => async dispatch => {
  await taskService.updateTask({ id: taskDescription.id, description: taskDescription.description });
  dispatch(updateTaskDescriptionAction(taskDescription));
};

const deleteTaskAction = task => ({
  type: DELETE_TASK,
  payload: task
});

export const deleteTask = taskDelete => async (dispatch, getRootState = {}) => {
  if (permissionMidelware(getRootState())) return;
  const indexProject = search(getRootState().projects.projects, taskDelete.projectId);
  const tasksUpdate = getRootState()
    .projects
    .projects[indexProject]
    .tasks
    .slice(taskDelete.indexTask + 1)
    .map(task => ({ ...task, indexTask: task.indexTask - 1 }));
  const numberOfTasks = getRootState().projects.projects[indexProject].tasks.length;
  await taskService.deleteTask({
    id: taskDelete.id,
    projectId: taskDelete.projectId,
    indexTask: taskDelete.indexTask,
    numberOfTasks
  });
  dispatch(deleteTaskAction({ ...taskDelete, tasksUpdate }));
};

const tasksServerMove = tasksMove => tasksMove.map(task => ({
  id: task.id,
  indexTask: task.indexTask
}));

const upTaskAction = upTask => ({
  type: UP_TASK,
  payload: upTask
});

export const upTask = up => async (dispatch, getRootState = {}) => {
  if (permissionMidelware(getRootState()) || !up.indexTask) return;

  const indexProject = search(getRootState().projects.projects, up.projectId);
  const tasksMove = [
    {
      ...getRootState().projects.projects[indexProject].tasks[up.indexTask],
      indexTask: up.indexTask - 1
    },
    {
      ...getRootState().projects.projects[indexProject].tasks[up.indexTask - 1],
      indexTask: up.indexTask
    }
  ];

  await taskService.moveTask(tasksServerMove(tasksMove));
  dispatch(upTaskAction({ indexProject, indexTask: up.indexTask, tasksMove }));
};

const downTaskAction = downTask => ({
  type: DOWN_TASK,
  payload: downTask
});

export const downTask = down => async (dispatch, getRootState = {}) => {
  if (permissionMidelware(getRootState())) return;

  const indexProject = search(getRootState().projects.projects, down.projectId);
  if (getRootState().projects.projects[indexProject].tasks.length - 1 <= down.indexTask) return;

  const tasksMove = [
    {
      ...getRootState().projects.projects[indexProject].tasks[down.indexTask + 1],
      indexTask: down.indexTask
    },
    {
      ...getRootState().projects.projects[indexProject].tasks[down.indexTask],
      indexTask: down.indexTask + 1
    }
  ];

  await taskService.moveTask(tasksServerMove(tasksMove));
  dispatch(downTaskAction({ indexProject, indexTask: down.indexTask, tasksMove }));
};

const showAllProjectsAction = () => ({
  type: SHOW_ALL_PROJECTS
});

export const showAllProjects = () => (dispatch, getRootState = {}) => {
  if (permissionMidelware(getRootState())) return;
  dispatch(showAllProjectsAction());
};

const sortProjectsDescendingNumberTasksAction = () => ({
  type: SORT_PROJECTS_DESCENDING_TASKS
});

export const sortProjectsDescendingNumberTasks = () => (dispatch, getRootState = {}) => {
  if (permissionMidelware(getRootState())) return;
  dispatch(sortProjectsDescendingNumberTasksAction());
};

const sortProjectsNameAction = () => ({
  type: SORT_PROJECTS_BY_NAME
});

export const sortProjectsName = () => (dispatch, getRootState = {}) => {
  if (permissionMidelware(getRootState())) return;
  dispatch(sortProjectsNameAction());
};

const filterProjectsWithLetterANameAction = () => ({
  type: FILTER_PROJECTS_WITH_LETTER_A_NAME
});

export const filterProjectsWithLetterAName = () => (dispatch, getRootState = {}) => {
  if (permissionMidelware(getRootState())) return;
  dispatch(filterProjectsWithLetterANameAction());
};

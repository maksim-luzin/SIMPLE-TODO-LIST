/* eslint-disable no-unused-vars */
import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Card, Form, Table, Button } from 'react-bootstrap';

import ProjectManeger from '../../components/ProjectManager';
import NewTask from '../../components/NewTask';
import Task from '../../components/Task';

import {
  editProjectName,
  updateProjectName,
  deleteProject,
  modalConfirmAction,
  addTask,
  taskDone,
  editTaskDescription,
  updateTaskDescription,
  deleteTask,
  upTask,
  downTask,
  errorHandle
} from '../ProjectList/actions';

import './project.scss';

const Project = ({
  project,
  editProjectName: editProject,
  editProjectNameId,
  updateProjectName: updateProject,
  deleteProject: deleteProjectAction,
  modalConfirmAction: modalConfirm,
  addTask: addTaskAction,
  taskDone: taskDoneAction,
  editTaskDescription: editTaskDescriptionAction,
  editTaskDescriptionTaskId,
  updateTaskDescription: updateTaskDescriptionAction,
  deleteTask: deleteTaskAction,
  upTask: upTaskAction,
  downTask: downTaskAction,
  errorHandle: errorHandleAction
}) => (
  <Card className="mb-5 project">
    <ProjectManeger
      id={project.id}
      name={project.name}
      editProjectName={editProject}
      edit={editProjectNameId === project.id}
      updateProjectName={updateProject}
      modalConfirmAction={modalConfirm}
      deleteProject={deleteProjectAction}
      tasksCount={project.tasks.length}
      errorHandle={errorHandleAction}
    />
    <NewTask
      addTask={addTaskAction}
      id={project.id}
      errorHandle={errorHandleAction}
    />
    <Table responsive className="table mb-0 table-bordered table-hover">
      <colgroup>
        <col className="tasks-done" />
        <col className="tasks-description" />
        <col className="tasks-control" />
      </colgroup>
      <tbody>
        {project.tasks.map(task => (
          <Task
            key={task.id}
            projectId={project.id}
            task={task}
            taskDone={taskDoneAction}
            editTaskDescription={editTaskDescriptionAction}
            edit={editTaskDescriptionTaskId === task.id}
            updateTaskDescription={updateTaskDescriptionAction}
            modalConfirmAction={modalConfirm}
            deleteTask={deleteTaskAction}
            upTask={upTaskAction}
            downTask={downTaskAction}
            errorHandle={errorHandleAction}
          />
        ))}
      </tbody>
    </Table>
  </Card>
);

Project.propTypes = {
  project: PropTypes.objectOf(PropTypes.any).isRequired,
  editProjectName: PropTypes.func.isRequired,
  editProjectNameId: PropTypes.number.isRequired,
  updateProjectName: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  modalConfirmAction: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  taskDone: PropTypes.func.isRequired,
  editTaskDescription: PropTypes.func.isRequired,
  editTaskDescriptionTaskId: PropTypes.number.isRequired,
  updateTaskDescription: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  upTask: PropTypes.func.isRequired,
  downTask: PropTypes.func.isRequired,
  errorHandle: PropTypes.func.isRequired
};

const mapStateToProps = rootState => ({
  editProjectNameId: rootState.projects.editProjectNameId,
  editTaskDescriptionTaskId: rootState.projects.editTaskDescriptionTaskId
});

const actions = {
  editProjectName,
  updateProjectName,
  deleteProject,
  modalConfirmAction,
  addTask,
  taskDone,
  editTaskDescription,
  updateTaskDescription,
  deleteTask,
  upTask,
  downTask,
  errorHandle
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);

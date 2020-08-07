/* eslint-disable no-unused-vars */
import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProjectManeger from '../../components/ProjectManager';
import NewTask from '../../components/NewTask';
import Task from '../../components/Task';

import { Card, Form, Table, Button } from 'react-bootstrap';
import {
  editProjectName,
  updateProjectName
} from '../ProjectList/actions';

import './project.scss'

const Project = ({
  project,
  editProjectName: editProject,
  editProjectNameId,
  updateProjectName: updateProject
}) => {
  return (
    <Card className="mb-5 project">
      <ProjectManeger
        id={project.id}
        name={project.name}
        editProjectName={editProject}
        edit={editProjectNameId === project.id}
        updateProjectName={updateProject}
      />
      <NewTask />
      <Table responsive className="table mb-0 table-bordered table-hover">
        <colgroup>
          <col className="tasks-done" />
          <col className="tasks-description" />
          <col className="tasks-control" />
        </colgroup>
        <tbody>
          {project.tasks.map(task => (
            <Task />
          ))}
        </tbody>
      </Table>
    </Card>
  )
}

Project.propTypes = {
  project: PropTypes.objectOf(PropTypes.any).isRequired,
  editProjectName: PropTypes.func.isRequired,
  editProjectNameId: PropTypes.number.isRequired,
  updateProjectName: PropTypes.func.isRequired
};

const mapStateToProps = rootState => ({
  editProjectNameId: rootState.projects.editProjectNameId
});

const actions = {
  editProjectName,
  updateProjectName
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);

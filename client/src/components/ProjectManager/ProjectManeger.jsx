/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, Form, Button } from 'react-bootstrap';

import './project-manager.scss';

const ProjectManeger = ({
  id,
  name,
  editProjectName,
  edit,
  updateProjectName,
  deleteProject,
  modalConfirmAction,
  tasksCount,
  errorHandle
}) => {
  const [getName, setName] = useState(name);

  const handleEditProjectName = async event => {
    try {
      event.preventDefault();
      await editProjectName({ id });
    } catch (err) {
      errorHandle('Edit project name do not work.');
    }
  };

  const handleUpdateProjectName = async event => {
    try {
      event.preventDefault();
      if (!getName.trim()) {
        return;
      }
      await updateProjectName({ id, name: getName.trim() });
    } catch (err) {
      errorHandle('Update project name do not work.');
    }
  };

  const handleDeleteProject = async event => {
    try {
      event.preventDefault();
      await modalConfirmAction({ deleteFunction: deleteProject, deleteData: { id } });
    } catch (err) {
      errorHandle('Delete project do not work.');
    }
  };

  return edit
    ? (
      <Card.Header className="bg-primary text-white edit-project-name">
        <Form onSubmit={ev => ev.preventDefault()}>
          <Form.Group className="input-group">
            <Form.Control
              name="projectName"
              type="text"
              maxLength="55"
              autoFocus
              className="bg-primary text-white"
              placeholder="Start typing here to create a project..."
              value={getName}
              onChange={ev => setName(ev.target.value)}
            />
            <div className="input-group-append project-name-update">
              <Button
                className="project-name-update-ok"
                onClick={handleUpdateProjectName}
              >
                Update
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Card.Header>
    )
    : (
      <Card.Header className="bg-primary text-white project-header">
        <div className="project-name">
          {getName}
        </div>
        <div className="project-edit" onClick={handleEditProjectName}>&nbsp;</div>
        <div className="project-delete" onClick={handleDeleteProject}>&nbsp;</div>
        <div className="tasks-count">
          {tasksCount
            ? `${tasksCount} task${tasksCount === 1 ? '' : 's'}.`
            : ''}
        </div>
      </Card.Header>
    );
};

ProjectManeger.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  editProjectName: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  updateProjectName: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  modalConfirmAction: PropTypes.func.isRequired,
  tasksCount: PropTypes.number.isRequired,
  errorHandle: PropTypes.func.isRequired
};

export default ProjectManeger;

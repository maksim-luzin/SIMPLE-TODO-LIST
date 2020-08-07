/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { Card, Form, Button } from 'react-bootstrap';

import './project-manager.scss'

const ProjectManeger = ({
  id,
  name,
  editProjectName,
  edit,
  updateProjectName,
  deleteProject,
  modalConfirmAction
}) => {
  const [getName, setName] = useState(name);

  const handleUpdateProjectName = event => {
    try {
      event.preventDefault();
      if (!getName.trim()) {
        return;
      }
      updateProjectName({ id, name: getName.trim() });
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  const handleDeleteProject = event => {
    try {
      event.preventDefault();
      modalConfirmAction({ deleteFunction: deleteProject, deleteData: { id } });
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  return edit
    ? (
      <Card.Header className="bg-primary text-white edit-project-name" >
        <Form onSubmit={ev => ev.preventDefault()
        }>
          <Form.Group className="input-group">
            <Form.Control
              name="projectName"
              type="text"
              maxLength="55"
              autoFocus={true}
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
        <NotificationContainer />
      </Card.Header>
    )
    : (
      <Card.Header className="bg-primary text-white project-header">
        <div className="project-name">
          {getName}
        </div>
        <div className="project-edit" onClick={() => editProjectName({ id })}>&nbsp;</div>
        <div className="project-delete" onClick={handleDeleteProject}>&nbsp;</div>
      </Card.Header>
    )
}

ProjectManeger.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  editProjectName: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  updateProjectName: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  modalConfirmAction: PropTypes.func.isRequired
};

export default ProjectManeger;
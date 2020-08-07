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
  edit
}) => {
  const [getName, setName] = useState(name);


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
        <div className="project-delete" >&nbsp;</div>
      </Card.Header>
    )
}


ProjectManeger.propTypes = {};

export default ProjectManeger;
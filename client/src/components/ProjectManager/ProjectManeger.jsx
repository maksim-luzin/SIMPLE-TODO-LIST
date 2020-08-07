/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, Form, Button } from 'react-bootstrap';

import Modal from '../Modal';

import './project-manager.scss'

const ProjectManeger = ({ }) => {
  const [getName, setName] = useState(name);
  
  return false
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
              <Button className="project-name-update-ok">
                Update
              </Button>
            </div>
          </Form.Group>
        </Form >
      </Card.Header >
    )
    : (
      <Card.Header className="bg-primary text-white project-header">
        <div className="project-name">
          {getName}
        </div>
        <div className="project-edit" >&nbsp;</div>
        <div className="project-delete" >&nbsp;</div>
      </Card.Header >
    )
}


ProjectManeger.propTypes = {};

export default ProjectManeger;
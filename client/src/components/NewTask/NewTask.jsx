/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { Form, Button } from 'react-bootstrap';

import './new-task.scss';

const NewTask = ({
  id,
  addTask
}) => {
  const [getDescription, setDescription] = useState('');

  const handleAddTask = event => {
    try {
      event.preventDefault();
      if (!getDescription.trim()) {
        return;
      }
      addTask({ projectId: id, description: getDescription.trim() });
      setDescription('');
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  return (
    <Form onSubmit={ev => ev.preventDefault()}>
      <Form.Group className="input-group new-task">
        <Form.Control
          type="text"
          maxLength="255"
          className="new-task-description"
          placeholder="Start typing here to create a task..."
          value={getDescription}
          onChange={ev => setDescription(ev.target.value)}
        />
        <div className="input-group-append new-task-add">
          <Button className="btn btn-success" type="button" onClick={handleAddTask}>Add Task</Button>
        </div>
      </Form.Group>
      <NotificationContainer />
    </Form>
  );
};

NewTask.propTypes = {
  id: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired
};

export default NewTask;

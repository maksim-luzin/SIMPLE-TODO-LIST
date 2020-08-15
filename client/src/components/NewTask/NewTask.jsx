/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button } from 'react-bootstrap';

import './new-task.scss';

const NewTask = ({
  id,
  addTask,
  errorHandle
}) => {
  const [getDescription, setDescription] = useState('');

  const handleAddTask = async event => {
    try {
      event.preventDefault();
      if (!getDescription.trim()) {
        return;
      }
      await addTask({ projectId: id, description: getDescription.trim() });
    } catch (err) {
      errorHandle('Add new task do not work.');
    } finally {
      setDescription('');
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
    </Form>
  );
};

NewTask.propTypes = {
  id: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired,
  errorHandle: PropTypes.func.isRequired
};

export default NewTask;

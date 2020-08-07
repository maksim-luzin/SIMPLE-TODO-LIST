/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button } from 'react-bootstrap';

import './new-task.scss'

const NewTask = ({ }) => {
  const [getDescription, setDescription] = useState('');

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
          <Button className="btn btn-success" type="button" >Add Task</Button>
        </div>
      </Form.Group>
    </Form>
  )
}

NewTask.propTypes = {};

export default NewTask;
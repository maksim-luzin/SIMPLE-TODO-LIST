/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { Form, Button, InputGroup } from 'react-bootstrap';

import './task.scss'

const Task = ({
  projectId,
  task,
  taskDone
}) => {
  const [getDescription, setDescription] = useState(description);

  const styleTaskDescription = `strong task-descripton 
  ${done && 'task-done-description'}`;

  const handleTaskDone = event => {
    try {
      event.preventDefault();
      taskDone({ projectId, id, indexTask, done: !done });
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  return (
    <tr className="task">
      <td className="task-done" onClick={!edit ? handleTaskDone : () => { }} >
        <input type="checkbox" checked={done} />
      </td>
      <td>
        <Form.Group>
          <Form.Control
            name="taskDescription"
            type="text"
            rows="10"
            cols="60"
            maxLength="255"
            autoFocus={edit}
            as="textarea"
            className={styleTaskDescription}
            placeholder="Start typing here to create a task..."
            value={getDescription}
            onChange={ev => setDescription(ev.target.value)}
          />
        </Form.Group>
      </td>
      {edit
        ? (
          <td classame="task-descripton-update">
            <div className="input-group-append">
              <Button
                className="task-descripton-update-ok"
              >
                Update
              </Button>
            </div>
          </td>
        )
        : (
          <td>
            <div className="task-management">
              <div className="move-task">
                <div className="task-up"></div>
                <div className="task-down"></div>
              </div>
              <div className="task-edit">&nbsp;</div>
              <div className="task-delete">&nbsp;</div>
            </div>
          </td>
        )
      }
      <NotificationContainer />
    </tr>
  )
};

Task.propTypes = {
  projectId: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
  taskDone: PropTypes.func.isRequired
};

export default Task;
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, InputGroup } from 'react-bootstrap';

import './task.scss';

const Task = ({
  projectId,
  task,
  taskDone,
  edit,
  editTaskDescription,
  updateTaskDescription,
  modalConfirmAction,
  deleteTask,
  upTask,
  downTask,
  errorHandle
}) => {
  const { id, done, description, indexTask } = task;
  const [getDescription, setDescription] = useState(description);

  const handleTaskDone = async event => {
    try {
      event.preventDefault();
      await taskDone({ projectId, id, indexTask, done: !done });
    } catch (err) {
      errorHandle('Task done do not work.');
    }
  };

  const handleEditTaskDescription = async event => {
    try {
      event.preventDefault();
      if (done) {
        return;
      }
      await editTaskDescription({ projectId, id });
    } catch (err) {
      errorHandle('Edit  task description do not work.');
    }
  };

  const handleRowTextArea = descriptions => {
    let rows = descriptions.split(/$/gm);
    rows = rows.reduce((numberOfRows, row) => (Math.ceil(row.length / 50) || 1) + numberOfRows, 0);
    return rows;
  };

  const styleTaskDescription = `strong task-descripton 
  row-${handleRowTextArea(getDescription) || 1} 
  ${done && 'task-done-description'}`;

  const handleUpdateTaskDescription = async event => {
    try {
      event.preventDefault();
      if (!getDescription.trim()) {
        return;
      }
      await updateTaskDescription({ id, projectId, indexTask, description: getDescription.trim() });
    } catch (err) {
      errorHandle('Update task description do not work.');
    }
  };

  const handleDeleteTask = async event => {
    try {
      event.preventDefault();
      await modalConfirmAction({ deleteFunction: deleteTask, deleteData: { projectId, id, indexTask } });
    } catch (err) {
      errorHandle('Delete task do not work.');
    }
  };

  const handleUpTask = async event => {
    try {
      event.preventDefault();
      await upTask({ indexTask, id, projectId });
    } catch (err) {
      errorHandle('Move up task do not work.');
    }
  };

  const handleDownTask = async event => {
    try {
      event.preventDefault();
      await downTask({ indexTask, id, projectId });
    } catch (err) {
      errorHandle('Move down task do not work.');
    }
  };

  return (
    <tr className="task">
      <td className="task-done">
        <input type="checkbox" checked={done} onClick={!edit ? handleTaskDone : () => { }} />
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
            disabled={!edit}
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
                onClick={handleUpdateTaskDescription}
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
                <div className="task-up" onClick={handleUpTask}>{' '}</div>
                <div className="task-down" onClick={handleDownTask}>{' '}</div>
              </div>
              <div className="task-edit" onClick={handleEditTaskDescription}>&nbsp;</div>
              <div className="task-delete" onClick={handleDeleteTask}>&nbsp;</div>
            </div>
          </td>
        )}
    </tr>
  );
};

Task.propTypes = {
  projectId: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
  taskDone: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  editTaskDescription: PropTypes.func.isRequired,
  updateTaskDescription: PropTypes.func.isRequired,
  modalConfirmAction: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  upTask: PropTypes.func.isRequired,
  downTask: PropTypes.func.isRequired,
  errorHandle: PropTypes.func.isRequired
};

export default Task;

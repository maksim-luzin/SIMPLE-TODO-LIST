/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import './modal.scss';

const Modal = ({ deleteFunction, deleteData, closeConfirmAction, errorHandle }) => {
  const handleDelete = async event => {
    try {
      event.preventDefault();
      await deleteFunction(deleteData);
    } catch (err) {
      closeConfirmAction();
      errorHandle(`Delete ${!deleteData.projectId ? 'project' : 'task'} do not work.`);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-window">
        <div className="modal-content">
          You confirm the deletion.
        </div>
        <div className="modal-manager">
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={() => closeConfirmAction()}>Close</Button>
        </div>
      </div>

    </div>
  );
};

Modal.propTypes = {
  deleteFunction: PropTypes.func.isRequired,
  deleteData: PropTypes.object.isRequired, // eslint-disable-line
  closeConfirmAction: PropTypes.func.isRequired,
  errorHandle: PropTypes.func.isRequired
};

export default Modal;

/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './new-project.scss';

const NewProject = ({ addProject, errorHandle }) => {
  const handleAddProject = async event => {
    try {
      event.preventDefault();
      await addProject();
    } catch (err) {
      errorHandle('Add new project do not work.');
    }
  };

  return (
    <div className="text-center new-project">
      <Button className="btn btn-primary btn-lg font-weight-bold" onClick={handleAddProject}>
        Add TODO List
      </Button>
    </div>
  );
};

NewProject.propTypes = {
  addProject: PropTypes.func.isRequired,
  errorHandle: PropTypes.func.isRequired
};

export default NewProject;

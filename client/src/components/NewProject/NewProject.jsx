/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './new-project.scss'

const NewProject = ({ addProject }) => (
  <div className="text-center new-project">
    <Button className="btn btn-primary btn-lg font-weight-bold" onClick={addProject}>
      Add TODO List
    </Button>
  </div>
)

NewProject.propTypes = { addProject: PropTypes.func.isRequired };

export default NewProject;
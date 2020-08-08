/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Card, Form, Button, Table } from 'react-bootstrap';

import {
  addProject,
  closeConfirmAction
} from './actions';

import NewProject from '../../components/NewProject';
import Project from '../Project';
import Modal from '../../components/Modal';

import './project-list.scss';

const ProjectList = ({
  projects,
  addProject: addProjectAction,
  closeConfirmAction: closeConfirm,
  modal,
  deleteFunction,
  deleteData
}) => {
  const [getEdit, setEdit] = useState(null);

  return (
    <section className="flex-grow-1 d-flex flex-column">
      <div>
        {projects.length
          ? (projects.map(project => (
            <Project key={project.id} project={project} />
          ))
          )
          : <div>&nbsp;</div>}
      </div>
      <NewProject addProject={addProjectAction} />
      {modal && (
        <Modal
          deleteFunction={deleteFunction}
          deleteData={deleteData}
          closeConfirmAction={closeConfirm}
        />
      )}
    </section>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  addProject: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  deleteFunction: PropTypes.func.isRequired,
  deleteData: PropTypes.object.isRequired, // eslint-disable-line
  closeConfirmAction: PropTypes.func.isRequired
};

ProjectList.defaultProps = {
  projects: []
};

const mapStateToProps = rootState => ({
  projects: rootState.projects.projects,
  modal: rootState.projects.modal,
  deleteFunction: rootState.projects.deleteFunction,
  deleteData: rootState.projects.deleteData
});

const actions = {
  addProject,
  closeConfirmAction
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);

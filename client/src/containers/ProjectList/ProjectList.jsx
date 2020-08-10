/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { Card, Form, Button, Table } from 'react-bootstrap';
import NewProject from '../../components/NewProject';
import Project from '../Project';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';

import {
  addProject,
  closeConfirmAction,
  loadAllProjects
} from './actions';

import './project-list.scss';

const ProjectList = ({
  projects,
  addProject: addProjectAction,
  closeConfirmAction: closeConfirm,
  modal,
  deleteFunction,
  deleteData,
  loadAllProjects: loadProjects,
  allProjectsLoaded
}) => (
  <section className="flex-grow-1 d-flex flex-column">
    <InfiniteScroll
      className="flex-grow-1 project-list overflow-hidden"
      pageStart={0}
      loadMore={loadProjects}
      hasMore={!allProjectsLoaded}
      loader={<Spinner />}
    >
      {projects.length
        ? (projects.map(project => (
          <Project key={project.id} project={project} />
        ))
        )
        : <div>&nbsp;</div>}
    </InfiniteScroll>
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

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  addProject: PropTypes.func.isRequired,
  modal: PropTypes.bool,
  deleteFunction: PropTypes.func.isRequired,
  deleteData: PropTypes.object.isRequired, // eslint-disable-line
  closeConfirmAction: PropTypes.func.isRequired,
  loadAllProjects: PropTypes.func.isRequired,
  allProjectsLoaded: PropTypes.bool
};

ProjectList.defaultProps = {
  projects: [],
  modal: false,
  allProjectsLoaded: false
};

const mapStateToProps = rootState => ({
  projects: rootState.projects.projects,
  modal: rootState.projects.modal,
  deleteFunction: rootState.projects.deleteFunction,
  deleteData: rootState.projects.deleteData,
  allProjectsLoaded: rootState.projects.allProjectsLoaded
});

const actions = {
  addProject,
  closeConfirmAction,
  loadAllProjects
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);

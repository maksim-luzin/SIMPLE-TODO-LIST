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
  loadAllProjects,
  errorHandle,
  finishDownloadingProjects
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
  allProjectsLoaded,
  functionSort,
  filterProjects,
  errorHandle: errorHandleAction,
  finishDownloadingProjects: finishDownloadingProjectsAction
}) => {
  const handleLoadAllProjects = async event => {
    try {
      await loadProjects();
    } catch (err) {
      finishDownloadingProjectsAction();
      errorHandleAction('Load all projects do not work.');
    }
  };

  return (
    <section className="flex-grow-1 d-flex flex-column">
      <InfiniteScroll
        className="flex-grow-1 project-list overflow-hidden"
        pageStart={0}
        loadMore={handleLoadAllProjects}
        hasMore={!allProjectsLoaded}
        loader={<Spinner />}
      >
        {projects.length
          ? ([...projects].sort(functionSort).filter(filterProjects).map(project => (
            <Project key={project.id} project={project} />
          ))
          )
          : <div>&nbsp;</div>}
      </InfiniteScroll>
      <NewProject addProject={addProjectAction} errorHandle={errorHandleAction} />
      {modal && (
        <Modal
          deleteFunction={deleteFunction}
          deleteData={deleteData}
          closeConfirmAction={closeConfirm}
          errorHandle={errorHandleAction}
        />
      )}
    </section>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  addProject: PropTypes.func.isRequired,
  modal: PropTypes.bool,
  deleteFunction: PropTypes.func.isRequired,
  deleteData: PropTypes.object.isRequired, // eslint-disable-line
  closeConfirmAction: PropTypes.func.isRequired,
  loadAllProjects: PropTypes.func.isRequired,
  allProjectsLoaded: PropTypes.bool,
  functionSort: PropTypes.func.isRequired,
  filterProjects: PropTypes.func.isRequired,
  errorHandle: PropTypes.func.isRequired,
  finishDownloadingProjects: PropTypes.func.isRequired
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
  allProjectsLoaded: rootState.projects.allProjectsLoaded,
  functionSort: rootState.projects.functionSort,
  filterProjects: rootState.projects.filterProjects
});

const actions = {
  addProject,
  closeConfirmAction,
  loadAllProjects,
  errorHandle,
  finishDownloadingProjects
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);

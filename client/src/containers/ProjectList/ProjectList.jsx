/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProject } from './actions';

import { Card, Form, Button, Table } from 'react-bootstrap';
import NewProject from '../../components/NewProject';
import Project from '../Project';


import './project-list.scss';

const ProjectList = ({
  projects,
  addProject: addProjectAction
}) => {
  const [getEdit, setEdit] = useState(null);

  return (
    <section className="flex-grow-1 d-flex flex-column">
      <div>
        {projects.length && (projects.map(project => (
          <Project
            key={project.id}
            project={project}
          />)
        ))}
      </div>
      <NewProject addProject={addProjectAction} />
    </section>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  addProject: PropTypes.func.isRequired
};

ProjectList.defaultProps = {
  projects: []
};

const mapStateToProps = rootState => ({
  projects: rootState.projects.projects
});

const actions = { addProject };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);

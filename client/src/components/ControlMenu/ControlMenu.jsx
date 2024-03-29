/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

import './controlMenu.scss';

const SignOut = ({
  logout,
  showAllProjects,
  sortProjectsDescendingNumberTasks,
  sortProjectsName,
  filterProjectsWithLetterAName,
  filterProjectsWithMore10TasksDone,
  errorHandle,
  filterSearch
}) => {
  const [getSearch, setSearch] = useState('');

  const handleShowAllProjects = async event => {
    try {
      event.preventDefault();
      await showAllProjects();
    } catch (err) {
      errorHandle('Show all projects descending number tasks do not work.');
    }
  };
  const handleSortProjectsDescendingNumberTasks = async event => {
    try {
      event.preventDefault();
      await sortProjectsDescendingNumberTasks();
    } catch (err) {
      errorHandle('Sort projects descending number tasks do not work.');
    }
  };

  const handleSortProjectsName = async event => {
    try {
      event.preventDefault();
      await sortProjectsName();
    } catch (err) {
      errorHandle('Sort projects name do not work.');
    }
  };

  const handleFilterProjectsWithLetterAName = async event => {
    try {
      event.preventDefault();
      await filterProjectsWithLetterAName();
    } catch (err) {
      errorHandle('Filter projects with letter a name do not work.');
    }
  };

  const handleFilterProjectsWithMore10TasksDone = async event => {
    try {
      event.preventDefault();
      await filterProjectsWithMore10TasksDone();
    } catch (err) {
      errorHandle('Filter projects with more 10 tasks done do not work.');
    }
  };

  const handleSearch = async event => {
    try {
      event.preventDefault();
      setSearch(event.target.value);
      await filterSearch(event.target.value.trim());
    } catch (err) {
      errorHandle('Search do not work.');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary navigation-bar">
      <div className="technical-requirements">
        <div>
          <span className="nav-link text-white">
            Technical requirements
          </span>
          <ul className="mr-auto requirements-list bg-primary">
            <li>
              <div onClick={() => handleShowAllProjects()}>
                Show all projects.
              </div>
            </li>
            <li>
              <div onClick={handleSortProjectsDescendingNumberTasks}>
                Get the count of all tasks in each project, order by tasks count descending.
              </div>
            </li>
            <li>
              <div onClick={handleSortProjectsName}>
                Get the count of all tasks in each project, order by projects names.
              </div>
            </li>
            <li>
              <div onClick={handleFilterProjectsWithLetterAName}>
                Get the list of all projects containing the &quot;a&quot; letter in the middle of the name,
                and show the tasks count near each project. Mention that there can exist projects
                without tasks and tasks with project_id = NULL
              </div>
            </li>
            <li>
              <div onClick={handleFilterProjectsWithMore10TasksDone}>
                Get the list of project names having more than 10 tasks in status &quot;completed&quot;.
                Order by project_id
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="search-form">
        <Form.Control
          className="form-control mr-sm-2"
          type="text"
          maxLength="20"
          placeholder="Search"
          aria-label="Search"
          value={getSearch}
          onChange={handleSearch}
        />
      </div>
      <div>
        <Button className="btn btn-outline-secondary my-2 my-sm-0 text-white" onClick={logout}>SignOut</Button>
      </div>
    </nav>
  );
};

SignOut.propTypes = {
  logout: PropTypes.func.isRequired,
  showAllProjects: PropTypes.func.isRequired,
  sortProjectsDescendingNumberTasks: PropTypes.func.isRequired,
  sortProjectsName: PropTypes.func.isRequired,
  filterProjectsWithLetterAName: PropTypes.func.isRequired,
  filterProjectsWithMore10TasksDone: PropTypes.func.isRequired,
  errorHandle: PropTypes.func.isRequired,
  filterSearch: PropTypes.func.isRequired
};

export default SignOut;

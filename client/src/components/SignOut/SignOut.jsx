/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import './signOut.scss';

const SignOut = ({
  logout,
  showAllProjects,
  sortProjectsDescendingNumberTasks,
  sortProjectsName,
  filterProjectsWithLetterAName,
  filterProjectsWithMore10TasksDone
}) => {
  const handleShowAllProjects = () => {
    try {
      showAllProjects();
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };
  const handleSortProjectsDescendingNumberTasks = () => {
    try {
      sortProjectsDescendingNumberTasks();
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  const handleSortProjectsName = () => {
    try {
      sortProjectsName();
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  const handleFilterProjectsWithLetterAName = () => {
    try {
      filterProjectsWithLetterAName();
    } catch (err) {
      NotificationManager.error(err.message);
    }
  };

  const handleFilterProjectsWithMore10TasksDone = () => {
    try {
      filterProjectsWithMore10TasksDone();
    } catch (err) {
      NotificationManager.error(err.message);
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
              <div onClick={() => handleSortProjectsDescendingNumberTasks()}>
                Get the count of all tasks in each project, order by tasks count descending.
              </div>
            </li>
            <li>
              <div onClick={() => handleSortProjectsName()}>
                Get the count of all tasks in each project, order by projects names.
              </div>
            </li>
            <li>
              <div onClick={() => handleFilterProjectsWithLetterAName()}>
                Get the list of all projects containing the &quot;a&quot; letter in the middle of the name,
                and show the tasks count near each project. Mention that there can exist projects
                without tasks and tasks with project_id = NULL
              </div>
            </li>
            <li>
              <div onClick={() => handleFilterProjectsWithMore10TasksDone()}>
                Get the list of project names having more than 10 tasks in status &quot;completed&quot;.
                Order by project_id
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Button className="btn btn-outline-secondary my-2 my-sm-0 text-white" onClick={logout}>SignOut</Button>
      </div>
      <NotificationContainer />
    </nav>
  );
};

SignOut.propTypes = {
  logout: PropTypes.func.isRequired,
  showAllProjects: PropTypes.func.isRequired,
  sortProjectsDescendingNumberTasks: PropTypes.func.isRequired,
  sortProjectsName: PropTypes.func.isRequired,
  filterProjectsWithLetterAName: PropTypes.func.isRequired,
  filterProjectsWithMore10TasksDone: PropTypes.func.isRequired
};

export default SignOut;

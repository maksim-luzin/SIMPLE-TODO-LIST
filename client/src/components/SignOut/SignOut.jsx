/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import './signOut.scss';

const SignOut = ({
  logout,
  sortProjectsDescendingNumberTasks,
  sortProjectsName
}) => {
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

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary navigation-bar">
      <div className="technical-requirements">
        <span
          className="nav-link text-white"
        >
          Technical requirements
        </span>
        <ul className="mr-auto requirements-list bg-primary">
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
        </ul>
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
  sortProjectsDescendingNumberTasks: PropTypes.func.isRequired,
  sortProjectsName: PropTypes.func.isRequired
};

export default SignOut;

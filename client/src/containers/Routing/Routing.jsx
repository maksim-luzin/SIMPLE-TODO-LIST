/* eslint no-unused-expressions: "error"*/
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectList from 'src/containers/ProjectList';
import Spinner from 'src/components/Spinner';
import LoginPage from 'src/containers/LoginPage';
import RegistrationPage from 'src/containers/RegistrationPage';
import NotFound from 'src/scenes/NotFound';
import PrivateRoute from 'src/containers/PrivateRoute';
import PublicRoute from 'src/containers/PublicRoute';
import ControlMenu from 'src/components/ControlMenu';
import Notifications from 'src/components/Notifications';
import {
  loadCurrentUser,
  logout
} from 'src/containers/Profile/actions';

import {
  showAllProjects,
  sortProjectsDescendingNumberTasks,
  sortProjectsName,
  filterProjectsWithLetterAName,
  filterProjectsWithMore10TasksDone,
  errorHandle,
  filterSearch
} from 'src/containers/ProjectList/actions';

import './routing.scss';

const Routing = ({
  isLoading,
  isAuthorized,
  loadCurrentUser: loadUser,
  logout: logoutAction,
  showAllProjects: showAllProjectsAction,
  sortProjectsDescendingNumberTasks: sortProjectsDescendingNumberTasksAction,
  sortProjectsName: sortProjectsNameAction,
  filterProjectsWithLetterAName: filterProjectsWithLetterANameAction,
  filterProjectsWithMore10TasksDone: filterProjectsWithMore10TasksDoneAction,
  errorMessage,
  errorHandle: errorHandleAction,
  filterSearch: filterSearchAction
}) => {
  if (!isAuthorized) {
    loadUser();
  }

  return (
    <div>
      {
        isAuthorized
          ? (
            <ControlMenu
              logout={logoutAction}
              showAllProjects={showAllProjectsAction}
              sortProjectsDescendingNumberTasks={sortProjectsDescendingNumberTasksAction}
              sortProjectsName={sortProjectsNameAction}
              filterProjectsWithLetterAName={filterProjectsWithLetterANameAction}
              filterProjectsWithMore10TasksDone={filterProjectsWithMore10TasksDoneAction}
              errorHandle={errorHandleAction}
              filterSearch={filterSearchAction}
            />
          )
          : ''
      }
      <div className="container d-flex flex-column justify-content-center px-0 custom-container">
        <header className="todo-list-header custom-header">
          <h1 className="h2 py-0 font-weight-bold text-uppercase">SIMPLE TODO LISTS</h1>
          <p className="py-0 text-uppercase">FROM RUBY GARAGE</p>
        </header>
        {
          isLoading
            ? <Spinner />
            : (
              <div className="d-flex flex-column justify-content-center flex-grow-1">
                <Switch>
                  <PublicRoute exact path="/login" component={LoginPage} />
                  <PublicRoute exact path="/registration" component={RegistrationPage} />
                  <PrivateRoute exact path="/" component={ProjectList} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            )
        }
        <footer className="custom-footer">
          <p className="text-white">&#169; Ruby Garage</p>
        </footer>
      </div>
      <Notifications errorMessage={errorMessage} errorHandle={errorHandleAction} />
    </div>
  );
};

Routing.propTypes = {
  isAuthorized: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadCurrentUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  showAllProjects: PropTypes.func.isRequired,
  sortProjectsDescendingNumberTasks: PropTypes.func.isRequired,
  sortProjectsName: PropTypes.func.isRequired,
  filterProjectsWithLetterAName: PropTypes.func.isRequired,
  filterProjectsWithMore10TasksDone: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  errorHandle: PropTypes.func.isRequired,
  filterSearch: PropTypes.func.isRequired
};

Routing.defaultProps = {
  isAuthorized: false,
  isLoading: true,
  errorMessage: ''
};

const actions = {
  loadCurrentUser,
  logout,
  showAllProjects,
  sortProjectsDescendingNumberTasks,
  sortProjectsName,
  filterProjectsWithLetterAName,
  filterProjectsWithMore10TasksDone,
  errorHandle,
  filterSearch
};

const mapStateToProps = rootState => ({
  isAuthorized: rootState.profile.isAuthorized,
  isLoading: rootState.profile.isLoading,
  errorMessage: rootState.projects.errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routing);

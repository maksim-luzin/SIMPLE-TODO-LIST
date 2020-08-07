/*eslint no-unused-expressions: "error"*/
import React from 'react';
import { Route, Switch, useLocation, BrowserRouter as Router } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectList from 'src/containers/ProjectList';
import Spinner from 'src/components/Spinner';
import PropTypes from 'prop-types';

import './routing.scss'

const Routing = ({
  isLoading
}) => {

  let location = useLocation();
 
  return (
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
                <Route exact path="/" component={ProjectList} />
              </Switch>
            </div>
          )
      }
      <footer className="custom-footer">
        <p className="text-white">&#169; Ruby Garage</p>
      </footer>
    </div>
  )
};

Routing.propTypes = {
  isLoading: PropTypes.bool,
};

Routing.defaultProps = {
  isLoading: true
};

const actions = { loadCurrentUser, logout };

const mapStateToProps = ({ profile }) => ({
  isLoading: profile.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routing);

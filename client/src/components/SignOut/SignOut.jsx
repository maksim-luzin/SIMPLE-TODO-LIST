/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './signOut.scss';

const SignOut = ({ logout }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-primary navigation-bar">
    <Button class="btn btn-outline-secondary my-2 my-sm-0 text-white" onClick={logout}>SignOut</Button>
  </nav>
);

SignOut.propTypes = {
  logout: PropTypes.func.isRequired
};

export default SignOut;

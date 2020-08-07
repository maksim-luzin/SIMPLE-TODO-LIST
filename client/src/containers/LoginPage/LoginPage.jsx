import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { login } from 'src/containers/Profile/actions';
import LoginForm from 'src/components/LoginForm';

import './login.scss';

const LoginPage = ({ login: signIn }) => (
  <div>
    <div className="sign-in-form">
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <LoginForm login={signIn} />
      <p>
        New to us?
        {' '}
        <NavLink to="/registration">Sign Up</NavLink>
      </p>
    </div>
  </div>
);

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

const actions = { login };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);

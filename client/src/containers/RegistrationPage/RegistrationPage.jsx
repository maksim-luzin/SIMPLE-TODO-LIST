import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { register } from 'src/containers/Profile/actions';
import { NavLink } from 'react-router-dom';
import RegistrationForm from 'src/components/RegistrationForm';

import './registration.scss';

const RegistrationPage = ({ register: signOn }) => (
  <div>
    <div className="sign-up-form">
      <h1 className="h3 mb-3 font-weight-normal">Register for free account</h1>
      <RegistrationForm register={signOn} />
      <p>
        Alredy with us?
        {' '}
        <NavLink exact to="/login">Sign In</NavLink>
      </p>
    </div>
  </div>
);

RegistrationPage.propTypes = {
  register: PropTypes.func.isRequired
};

const actions = { register };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(RegistrationPage);

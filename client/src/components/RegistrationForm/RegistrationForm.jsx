import React, { useState } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';

import { Form, Button } from 'react-bootstrap';

const { Group, Label, Control } = Form;

const RegistrationForm = ({ register: signOn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isUsernameValid, setUsernameValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isError, setIsError] = useState('');

  const emailChanged = value => {
    setEmail(value);
    setEmailValid(true);
  };

  const usernameChanged = value => {
    setUsername(value);
    setUsernameValid(true);
  };

  const passwordChanged = value => {
    setPassword(value);
    setPasswordValid(true);
  };

  const register = async event => {
    event.preventDefault();
    const isValid = isEmailValid && isUsernameValid && isPasswordValid;
    if (!isValid || isLoading) {
      return;
    }
    setLoading(true);
    try {
      await signOn({ email, password, username });
    } catch (error) {
      setIsError(error.message);
      setEmail('');
      setUsername('');
      setPassword('');
      setLoading(false);
    }
  };

  return (
    <Form name="registrationForm" onSubmit={register}>
      <Group controlId="formBasicEmail">
        <Label className={!isEmailValid && 'text-danger'}> Email </Label>
        <Control
          type="email"
          placeholder="Email"
          required
          value={email}
          className={!isEmailValid && 'text-danger'}
          onChange={ev => emailChanged(ev.target.value)}
          onBlur={() => setEmailValid(validator.isEmail(email))}
          onFocus={() => setIsError('')}
        />
      </Group>
      <Group controlId="formBasicText">
        <Label className={!isUsernameValid && 'text-danger'}> Name </Label>
        <Control
          type="text"
          placeholder="Name"
          required
          value={username}
          className={!isUsernameValid && 'text-danger'}
          onChange={ev => usernameChanged(ev.target.value)}
          onBlur={() => setUsernameValid(Boolean(username))}
          onFocus={() => setIsError('')}
        />
      </Group>
      <Group controlId="formBasicPassword">
        <Label className={!isPasswordValid && 'text-danger'}>Password</Label>
        <Control
          type="password"
          placeholder="Password"
          required
          value={password}
          className={!isPasswordValid && 'text-danger'}
          onChange={ev => passwordChanged(ev.target.value)}
          error={!isPasswordValid}
          onBlur={() => setPasswordValid(Boolean(password))}
          onFocus={() => setIsError('')}
        />
        <div className="py-2 text-danger">
          {!isError
            ? <span>&nbsp;</span>
            : isError}
        </div>
        <Button variant="primary" className="btn btn-sm btn-block mt-3" type="submit">
          Register
        </Button>
      </Group>
    </Form>
  );
};

RegistrationForm.propTypes = {
  register: PropTypes.func.isRequired
};

export default RegistrationForm;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Form, Button } from 'react-bootstrap';

const { Group, Label, Control } = Form;

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isError, setIsError] = useState('');

  const emailChanged = data => {
    setEmail(data);
    setIsEmailValid(true);
  };

  const passwordChanged = data => {
    setPassword(data);
    setIsPasswordValid(true);
  };

  const handleLoginClick = async event => {
    event.preventDefault();
    const isValid = isEmailValid && isPasswordValid;
    if (!isValid || isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await login({ email, password });
    } catch (error) {
      setIsError(error.message);
      setEmail('');
      setPassword('');
      setIsLoading(false);
    }
  };

  return (
    <Form name="loginForm" onSubmit={handleLoginClick}>
      <Group controlId="formBasicEmail">
        <Label className={!isEmailValid && 'text-danger'}> Email </Label>
        <Control
          type="email"
          placeholder="Email"
          required
          value={email}
          className={!isEmailValid && 'text-danger'}
          onChange={ev => emailChanged(ev.target.value)}
          onBlur={() => setIsEmailValid(validator.isEmail(email))}
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
          onBlur={() => setIsPasswordValid(Boolean(password))}
          onFocus={() => setIsError('')}
        />
      </Group>
      <div className="py-2 text-danger">
        {!isError
          ? <span>&nbsp;</span>
          : isError}
      </div>
      <Button variant="primary" className="btn btn-sm btn-block mt-3" type="submit">
        Sign in
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginForm;

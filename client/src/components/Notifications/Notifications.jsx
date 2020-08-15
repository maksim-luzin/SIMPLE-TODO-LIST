import React from 'react';
import PropTypes from 'prop-types';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Notifications = ({ errorMessage, errorHandle }) => {
  if (errorMessage) {
    NotificationManager.error(errorMessage);
    errorHandle('');
  }

  return <NotificationContainer />;
};

Notifications.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  errorHandle: PropTypes.func.isRequired
};

export default Notifications;

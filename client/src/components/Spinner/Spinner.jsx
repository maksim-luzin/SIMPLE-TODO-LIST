/* eslint-disable no-unused-vars */
import React from 'react';
import { Spinner as SpinnerWaiting } from 'react-bootstrap';

import './spinner.scss';

const Spinner = () => (
  <div className="flex-grow-1  d-flex flex-column justify-content-center">
    <div className="text-center">
      <div className="spinner">&nbsp;</div>
    </div>
  </div>
);

export default Spinner;

import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center">
    <span className="display-1 d-block">404</span>
    <div className="mb-4 lead">The page you are looking for was not found.</div>
    <NavLink to="/" className="btn btn-link">Back to Home</NavLink>
  </div>
);

export default NotFound;

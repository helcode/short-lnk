import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Not Found Component</h1>
        <p>We're unable to find that page.</p>
        <Link to="/" className="button button--link">HEAD HOME</Link>
      </div>
    </div>
  );
};
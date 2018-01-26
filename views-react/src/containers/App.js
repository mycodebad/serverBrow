/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 */

import React from 'react';
import PropTypes from 'prop-types';
import './app.scss';

import Header from './../shared/header';

const App = ({ children }) => {
  return (
    <div className="containerApp w-100">
      <Header />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
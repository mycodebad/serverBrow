/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 */

import React, { Component } from 'react';
import './home.scss';
import ListItem from '../../components/ListItem/ListItem'

class Home extends Component {

  render() {
    return (
      <div className="containerHome">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <ListItem title={'Lista de Consolas'} />
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <ListItem title={'API REST'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './home.scss';
import ListItem from '../../components/ListItem/ListItem'
import io from 'socket.io-client';
import dataItem from './../../utils/dataItem';


class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      urlConnect: this.props.urlConnect,
      portConnect: this.props.portConnect
    }
    this.onLogger = this.onLogger.bind(this);
    this.onMiddleware = this.onMiddleware.bind(this);
    this.onGroup = this.onGroup.bind(this);
    this.formatData = this.formatData.bind(this);
  }
  
  componentDidMount () {
    console.log('componentDidMount', this.state);
    let { urlConnect, portConnect } = this.state;
    var socket = io(`${urlConnect + `:` + portConnect}`);
    socket.on('log', (data) => this.onLogger(this, data));
    socket.on('middleware', (data) => this.onMiddleware(this, data));
    socket.on('group', (data) => this.onGroup(this, data));
  }
  onLogger (Context, Data) {
    console.log('onLogger');
    console.log('Context', Context);
    console.log('Data', Data);
    let { items } = this.refs.ListaConsolas.state;

    this.formatData(Data)
    .then(newFormatData => {
      items.unshift(newFormatData);
      setTimeout(() => {
        this.refs.ListaConsolas.setState({
          items: items
        })
      }, 1000)
    })
    .catch(err  => {
      console.log('promise failed', err);
    });

  }

  onMiddleware (Context, Data) {
    console.log('onMiddleware');
    console.log('Context', Context);
    console.log('Data', Data);
  }

  onGroup (Context, Data) {
    console.log('onGroup');
    console.log('Context', Context);
    console.log('Data', Data);
  }

  formatData (Data) {
    console.log('formatData', Data);
    return new Promise((resolve, reject) => {
       let newDataFormat = new dataItem(Data);
       console.log('newDataFormat', newDataFormat);
       if (newDataFormat) {
        resolve(newDataFormat)
       } else {
        reject({
          message: 'error in constructor dataItem'
        })
       }
    });
  }

  render() {
    return (
      <div className="containerHome">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <ListItem ref='ListaConsolas' title={'Lista de Consolas'} />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              {<ListItem ref='ListaRestApi' title={'API REST'} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Home.propTypes = {
  urlConnect: PropTypes.string,
  portConnect: PropTypes.number
}

Home.defaultProps = {
  urlConnect: 'http://localhost',
  portConnect: 8888
};

export default Home;
/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
    this.onPagination = this.onPagination.bind(this);
    this.formatData = this.formatData.bind(this);
  }
  
  componentDidMount () {
    console.log('componentDidMount', this.state);
    let { urlConnect, portConnect } = this.state;
    var socket = io(`${urlConnect + `:` + portConnect}`);
    
    // Channel for logs individual.
    // socket.on('log', (data) => this.onLogger(this, data));
    // socket.on('group', (data) => this.onGroup(this, data));


    socket.on('all', (data) => this.onAll(this, data));
    socket.on('list-pagination', (data) => this.onPagination(this, data));
    socket.on('middleware', (data) => this.onMiddleware(this, data));
  }

  /**
   * @description All for consoles.
   * @param {*} Context 
   * @param {*} Data 
   */
  onAll (Context, Data) {
    console.log("onAll", Data);
    console.log("onAll", Data);
    this.cleanListParent('ListaConsolas');
    this.onEmitPagination();
  }
  /**
   * @description Specific source for consoles type: console.log
   * @param {*} Context 
   * @param {*} Data 
   */
  onLogger (Context, Data) {
    console.log('onLogger');
    console.log('Context', Context);
    console.log('Data', Data);
    // this.onConsoleBrow(Context, Data, 'info');
    this.cleanListParent('ListaConsolas');
    this.onEmitPagination();
  }

  /**
   * @description Specific source for consoles type: middleware
   * @param {*} Context 
   * @param {*} Data 
   */
  onMiddleware (Context, Data) {
    console.log('onMiddleware');
    console.log('Context', Context);
    console.log('Data', Data);
  }

  /**
   * @description Specific source for consoles type: console.groupKey
   * @param {*} Context 
   * @param {*} Data 
   */
  onGroup (Context, Data) {
    console.log('onGroup===>', Data);
    // this.onConsoleBrow(this, Data, 'group');
    this.cleanListParent('ListaConsolas');
    // this.onEmitPagination();
  }

  /**
   * @description Socker for pagination data.
   * @param {*} Context 
   * @param {*} Data 
   */
  onPagination (Context, Data) {
    console.log('onPagination===>', Data);
    let { total_logs, total_pages, results } = Data;

    this.cleanListParent('ListaConsolas');
    console.log("asdasdasdasdasdasdasdasdasdasd");
    _.forEach(results, pRes => {
      console.log('Resultado del paginado', pRes);
      this.onConsoleBrow(this, pRes, pRes.type, { totalLogs: total_logs, totalPages: total_pages} );
    });
  } 

  /**
   * @description Function that displays each of the consoles that are printed on the server
   * @param {*} Context 
   * @param {*} Data 
   * @param {*} Type 
   */
  onConsoleBrow (Context, Data, Type, Pagination = null) {
    let { items } = this.refs.ListaConsolas.state;
    this.formatData(Data)
    .then(newFormatData => {
      items.unshift(newFormatData);
      // setTimeout(() => {
        if (Pagination !== null) {
          this.refs.ListaConsolas.setState({
            items: items,
            totalPages: Pagination.totalPages,
            totalLogs: Pagination.totalLogs
          })
        } else {
          this.refs.ListaConsolas.setState({
            items: items
          })
        }
      // }, 1000)
    })
    .catch(err  => {
      console.log('promise failed', err);
    });
  }

  /**
   * @description Return new format for data
   * @param {*} Data 
   */
  formatData (Data) {
    return new Promise((resolve, reject) => {
       let newDataFormat = new dataItem(Data);
       if (newDataFormat) {
        resolve(newDataFormat)
       } else {
        reject({
          message: 'error in constructor dataItem'
        })
       }
    });
  }

  /**
   * @description Emit socket when change pagination
   * @param {*} page 
   * @param {*} limit 
   * @param {*} type 
   */
  onEmitPagination (page=0, limit=10, type='all') {
    console.log('onEmitPagination===>', page);

    let { urlConnect, portConnect } = this.state;
    var socket = io(`${urlConnect + `:` + portConnect}`);
    
    socket.emit('list', {
      page: page,
      limit: limit,
      type: type
    });
  }

  /**
   * @description Clean Prop Item of Component
   * @param {*} pRef 
   */
  cleanListParent (pRef) {
    console.log('cleanListParent', pRef);
    this.refs[pRef].setState({
      items: []
    })
  }

  /**
   * @description Return page selected
   * @param {*} pageSelected 
   */
  selectedPageParent (pageSelected, pRef) {
    console.log('selectedPageParent', pageSelected);
    this.cleanListParent(pRef);
    this.onEmitPagination(pageSelected)
  }
  render() {
    return (
      <div className='containerHome'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
              <ListItem
               ref='ListaConsolas' 
               title={'Lista de Consolas'} 
               cleanList={() => this.cleanListParent('ListaConsolas')}
               selectedPage={(pageSelected) => this.selectedPageParent(pageSelected, 'ListaConsolas')}
               />
            </div>
            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
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
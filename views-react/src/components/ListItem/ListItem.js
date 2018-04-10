/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid';
import './ListItem.scss';
import Item from './../Item/Item';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      items: this.props.items
    }
    this.cleanList = this.cleanList.bind(this);
  }
  
  componentWillReceiveProps (nextprops) {
    if (nextprops.title !== undefined && nextprops.title !== null) {
      this.setState({ title: nextprops.title })
    }
    if (nextprops.items !== undefined && nextprops.items !== null) {
      this.setState({ items: nextprops.items })
    }
  }

  /**
   * @description Mapping state items on rendered component
   */
  renderItems () {
    let { items } = this.state;
    return _.map(items, pItemData => {
      return <Item {...pItemData} key={uuid.v4()} />  
    })
  }
  
  cleanList () {
    console.log('asdasd');
    if (this.props.cleanList !== undefined) {
      this.props.cleanList()
    }
  }

  render() {
    let { title } = this.state;
    
    return (
      <div className="containerListItem">
        <div className="recent-activities card">
          <div className="card-header">
            <h3 className="h4">{title} <i className="btn btn-danger  fa fa-trash t-right" onClick={this.cleanList} /></h3>
          </div>
          <div className="card-body no-padding">
            {this.renderItems()}
          </div>
        </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  cleanList: PropTypes.func
};

ListItem.defaultProps = {
  title: 'List Items',
  items: []
};
export default ListItem;


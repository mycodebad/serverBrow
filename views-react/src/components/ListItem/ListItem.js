/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ListItem.scss';

import Item from './../Item/Item'
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      items: this.props.items
    }
  }

  render() {
    let { title } = this.state;
    return (
      <div className="containerListItem">
        <div className="recent-activities card">
          <div className="card-header">
            <h3 className="h4">{title}</h3>
          </div>
          <div className="card-body no-padding">
            <Item />
            <Item />
            <Item />
          </div>
        </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array
};

ListItem.defaultProps = {
  title: 'List Items',
  items: []
};
export default ListItem;


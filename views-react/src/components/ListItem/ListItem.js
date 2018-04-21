/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid';
import ReactPaginate from 'react-paginate';
import './ListItem.scss';
import Item from './../Item/Item';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      items: this.props.items,
      totalPages: this.props.totalPages,
      totalLogs: this.props.totalLogs,
      textPrevious: this.props.textPrevious,
      textNext: this.props.textNext
    }
    this.cleanList = this.cleanList.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }
  
  componentWillReceiveProps (nextprops) {
    if (nextprops.title !== undefined && nextprops.title !== null) {
      this.setState({ title: nextprops.title });
    }
    if (nextprops.items !== undefined && nextprops.items !== null) {
      this.setState({ items: nextprops.items });
    }
    if (nextprops.totalPages !== undefined && nextprops.totalPages !== null) {
      this.setState({ totalPages: nextprops.totalPages });
    }
    if (nextprops.totalLogs !== undefined && nextprops.totalLogs !== null) {
      this.setState({ totalLogs: nextprops.totalLogs });
    }
    if (nextprops.textPrevious !== undefined && nextprops.textPrevious !== null) {
      this.setState({ textPrevious: nextprops.textPrevious });
    }
    if (nextprops.textNext !== undefined && nextprops.textNext !== null) {
      this.setState({ textNext: nextprops.textNext });
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
  
  /**
   * @description Callback function to parent
   */
  cleanList () {
    console.log('Clean List');
    if (this.props.cleanList !== undefined) {
      this.props.cleanList()
    }
  }

  /**
   * @description Event on change page
   * @param {*} Context 
   * @param {*} Data 
   * @param {*} Other 
   */
  onPageChange (Page) {
    console.log("onPageChange", Page);
    if (this.props.selectedPage !== undefined && this.props.selectedPage !== null) {
      this.props.selectedPage(Page.selected);
    }
  }
  render() {
    let { title, totalPages, textPrevious, textNext } = this.state;
    
    return (
      <div className="containerListItem">
        <div className="recent-activities card">
          <div className="card-header">
            <h3 className="h4">{title + " - Total Pages " + totalPages}  <i className="btn btn-danger fa fa-trash fright" onClick={this.cleanList} /></h3>
          </div>
          <div className="card-body no-padding">
            <div className="">
                <ReactPaginate
                  previousLabel={textPrevious}
                  nextLabel={textNext}
                  breakLabel={<a href="">...</a>}
                  breakClassName={"break-me"}
                  pageCount={totalPages}
                  marginPagesDisplayed={3}
                  pageRangeDisplayed={1}
                  
                  containerClassName={"pagination mauto"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  nextClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextLinkClassName={"page-link"}
                  disabledClassName={"disabled"}
                  activeClassName={"active"} 
                  onPageChange={this.onPageChange} />
              </div>
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
  totalPages: PropTypes.number,
  totalLogs: PropTypes.number,
  textPrevious: PropTypes.string,
  textNext: PropTypes.string,
  cleanList: PropTypes.func,
  selectedPage: PropTypes.func
};

ListItem.defaultProps = {
  title: 'List Items',
  totalPages: 3,
  totalLogs: 0,
  textPrevious: 'Previous',
  textNext: 'Next',
  items: []
};
export default ListItem;


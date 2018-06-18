/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import uuid from "uuid";
import "./ListItem.scss";
import Item from "./../Item/Item";
import DataEmpty from "../Empty/DataEmpty";
import Paginator from "../Paginator/Paginator";
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.cleanList = this.cleanList.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }
  /**
   * @description Return true si tiene elementos
   */
  validateItems() {
    let { items } = this.props;
    return (
      typeof items !== undefined && items !== undefined && items.length > 0
    );
  }
  /**
   * @description Mapping state items on rendered component
   */
  renderItems() {
    if (this.validateItems()) {
      let { items } = this.props;
      return _.map(items, pItemData => {
        return (
          <Item
            {...pItemData}
            key={uuid.v4()}
            onClickCode={this.props.onClickCode}
          />
        );
      });
    } else {
      return (
        <div>
          <DataEmpty />
        </div>
      );
    }
  }

  /**
   * @description Callback function to parent
   */
  cleanList() {
    console.log("Clean List");
    if (this.props.cleanList !== undefined) {
      this.props.cleanList();
    }
  }

  /**
   * @description Event on change page
   * @param {*} Context
   * @param {*} Data
   * @param {*} Other
   */
  onPageChange(Page) {
    console.log("onPageChange", Page);
    if (
      this.props.selectedPage !== undefined &&
      this.props.selectedPage !== null
    ) {
      this.props.selectedPage(Page.selected);
    }
  }
  onPaginationChange(Page) {
    console.log("onPaginationChange", Page);
    if (
      this.props.selectedPage !== undefined &&
      this.props.selectedPage !== null
    ) {
      this.props.selectedPage(Page);
    }
  }
  render() {
    let { title, page, totalPages } = this.props;

    return (
      <div className="containerListItem">
        <div className="recent-activities card">
          <div className="card-header">
            <h3 className="h4">
              {title}{" "}
              <i
                className="btn btn-danger fa fa-trash fright"
                onClick={this.cleanList}
              />
            </h3>
          </div>
          <div className="card-body no-padding">
            <div className="">
              {this.validateItems() ? (
                <div>
                  <Paginator
                    totalPages={totalPages}
                    page={page}
                    handlePageChange={this.onPaginationChange}
                  />
                </div>
              ) : (
                ""
              )}
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
  page: PropTypes.number,
  totalPages: PropTypes.number,
  totalLogs: PropTypes.number,
  textPrevious: PropTypes.string,
  textNext: PropTypes.string,
  cleanList: PropTypes.func,
  selectedPage: PropTypes.func,
  onClickCode: PropTypes.func
};

ListItem.defaultProps = {
  title: "List Items",
  totalPages: 3,
  totalLogs: 0,
  page: 0,
  textPrevious: "Previous",
  textNext: "Next",
  items: []
};

export default ListItem;

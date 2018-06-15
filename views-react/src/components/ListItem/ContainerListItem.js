import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ListItem from "./ListItem";
import { cleanListAction, emitPagination } from "../../actions";

class ContainerListItem extends Component {
  render() {
    let { items, page, totalPages, title } = this.props;
    return (
      <ListItem
        ref="ListItem"
        title={title}
        items={items}
        page={page}
        totalPages={totalPages}
        cleanList={() => this.props.cleanList()}
        selectedPage={pageSelected => this.props.selectedPage(pageSelected)}
      />
    );
  }
}

ContainerListItem.propTypes = {
  items: PropTypes.array,
  page: PropTypes.number,
  cleanList: PropTypes.func,
  selectedPage: PropTypes.func
};

ContainerListItem.defaultProps = {
  items: []
};

const mapStateToProps = state => {
  console.log("mapStateToProps", state);
  return {
    items: state.LogsReducer.items,
    page: state.LogsReducer.page,
    totalPages: state.LogsReducer.totalPages,
    totalLogs: state.LogsReducer.totalLogs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cleanList() {
      console.log("======cleanList======");
      dispatch(cleanListAction());
    },
    selectedPage(pageSelected) {
      console.log("================selectedPage================", pageSelected);
      dispatch(emitPagination(pageSelected));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerListItem);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import List from "./List";
import {
  cleanListRequest,
  emitPagination,
  sendRequest,
  toggleModal
} from "../../actions";

class ContainerList extends Component {
  render() {
    let { requests, page, totalPages, title } = this.props;
    return (
      <List
        ref="ListItem"
        title={title}
        items={requests}
        page={page}
        totalPages={totalPages}
        cleanList={() => this.props.cleanList()}
        newRequest={() => this.props.newRequest()}
        sendRequest={DataRequest => this.props.sendRequest(DataRequest)}
        selectedPage={pageSelected => this.props.selectedPage(pageSelected)}
      />
    );
  }
}

ContainerList.propTypes = {
  requests: PropTypes.array,
  page: PropTypes.number,
  cleanList: PropTypes.func,
  selectedPage: PropTypes.func,
  sendRequest: PropTypes.func
};

ContainerList.defaultProps = {
  items: []
};

const mapStateToProps = state => {
  console.log("mapStateToProps", state);
  return {
    requests: state.RequestsReducer.requests,
    page: state.RequestsReducer.page,
    totalPages: state.RequestsReducer.totalPages,
    totalLogs: state.RequestsReducer.totalLogs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cleanList() {
      dispatch(cleanListRequest());
    },
    selectedPage(pageSelected) {
      dispatch(emitPagination(pageSelected));
    },
    sendRequest(DataRequest) {
      dispatch(sendRequest(DataRequest));
    },
    newRequest() {
      dispatch(toggleModal(true));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerList);

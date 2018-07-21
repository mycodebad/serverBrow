import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "./Modal";
import { newRequest, toggleModal, sendRequest } from "../../actions";

class ContainerModal extends Component {
  render() {
    let { openModal, contentHtml } = this.props;
    return (
      <Modal
        ref="ModalViewFile"
        openModal={openModal}
        contentHtml={contentHtml}
        sendNewRequest={DataRequest => this.props.sendNewRequest(DataRequest)}
        toggleModal={openModal => this.props.toggleModal(openModal)}
      />
    );
  }
}

ContainerModal.propTypes = {
  openModal: PropTypes.bool,
  contentHtml: PropTypes.string
};

ContainerModal.defaultProps = {
  openModal: false,
  contentHtml: ""
};

const mapStateToProps = state => {
  console.log("mapStateToProps ContainerModal", state);
  return {
    openModal: state.RequestsReducer.modalNewRequest,
    contentHtml: state.RequestsReducer.contentHtml
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newRequest() {
      dispatch(newRequest());
    },
    toggleModal(openModal) {
      dispatch(toggleModal(openModal));
    },
    sendNewRequest(DataRequest) {
      dispatch(sendRequest(DataRequest));
      dispatch(toggleModal(false));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerModal);

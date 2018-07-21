import React, { Component } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import {
  Button,
  Modal as ModalTrap,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: this.props.openModal,
      contentHtml: this.props.contentHtml,
      contentJson: this.props.contentJson
    };
    this.toggle = this.toggle.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.openModal !== undefined && nextProps.openModal !== null) {
      this.setState({ openModal: nextProps.openModal });
    }
    if (nextProps.contentHtml !== undefined && nextProps.contentHtml !== null) {
      this.setState({ contentHtml: nextProps.contentHtml });
    }
    if (nextProps.contentJson !== undefined && nextProps.contentJson !== null) {
      this.setState({ contentJson: nextProps.contentJson });
    }
  }
  toggle() {
    console.log("Toggle Open Modal");
    this.setState({
      openModal: !this.state.openModal
    });
    if (this.props.toggleModal !== undefined) {
      this.props.toggleModal(!this.state.openModal);
    }
  }
  sendRequest() {
    var methodNewReq = $("#InputProtocolo").val();
    var urlNewReq = $("#InputUrl").val();
    var bodyNewReq = $("#InputBody").val();
    if (this.props.sendNewRequest !== undefined) {
      this.props.sendNewRequest({
        method: methodNewReq,
        url: urlNewReq,
        request: {
          body: bodyNewReq,
          params: null,
          query: null
        }
      });
    }
  }
  render() {
    return (
      <div>
        <ModalTrap
          isOpen={this.state.openModal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Linea de codigo</ModalHeader>
          <ModalBody>
            <div dangerouslySetInnerHTML={{ __html: this.state.contentHtml }} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.sendRequest}>
              Send Request
              <span>
                <i className="fa fa-send mL5 rounded-circle" />
              </span>
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cerrar Modal
            </Button>
          </ModalFooter>
        </ModalTrap>
      </div>
    );
  }
}

Modal.defaultProps = {
  openModal: false,
  contentHtml: "",
  contentJson: {}
};

Modal.propTypes = {
  openModal: PropTypes.bool,
  contentHtml: PropTypes.string,
  contentJson: PropTypes.object,
  sendNewRequest: PropTypes.func
};

export default Modal;

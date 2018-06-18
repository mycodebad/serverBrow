import React, { Component } from "react";
import PropTypes from "prop-types";
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
  }
  toggle() {
    this.setState({
      openModal: !this.state.openModal
    });
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
  contentJson: PropTypes.object
};

export default Modal;

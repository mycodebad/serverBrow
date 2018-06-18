import React, { Component } from "react";
import Collapse, { Panel } from "rc-collapse";
import "./Request.scss";
import "rc-collapse/assets/index.css";
import ReactJson from "react-json-view";
class Request extends Component {
  sendRequest() {
    console.log("sendRequest REQUEST CP");
    if (
      this.props.sendRequest !== undefined &&
      this.props.sendRequest !== null
    ) {
      this.props.sendRequest(this.props);
    }
  }
  render() {
    let { url, status, method } = this.props;
    return (
      <div className="containerRequest">
        <div className="alert alert-light border border-primary" role="alert">
          <button
            type="button"
            className="btn btn-primary float-right"
            onClick={() => this.sendRequest()}
          >
            Enviar
          </button>
          <button type="button" className="btn btn-primary float-right">
            {method}
          </button>
          <button type="button" className="btn btn-primary float-right">
            {status}
          </button>
          <Collapse accordion={true}>
            <Panel header={url} headerClass="my-header-class">
              <ReactJson src={this.props} />
            </Panel>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default Request;

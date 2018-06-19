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

  swRequest(Status = 200) {
    if (Status >= 200 && Status < 300) {
      return "btn-success";
    } else if (Status >= 300 && Status < 400) {
      return "btn-secondary";
    } else if (Status >= 400 && Status < 500) {
      return "btn-warning";
    } else if (Status >= 500) {
      return "btn-danger";
    } else {
      return "";
    }
  }

  render() {
    let { url, status, method } = this.props;
    let btnStatus = this.swRequest(this.status);
    return (
      <div className="containerRequest">
        <div className="alert alert-light border border-primary" role="alert">
          <button
            type="button"
            className="btn btn-primary float-right mL5"
            onClick={() => this.sendRequest()}
          >
            Enviar
          </button>
          <span className="btn btn-primary float-right mL5">{method}</span>
          <span className={"btn float-right mL5 " + btnStatus}>{status}</span>
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

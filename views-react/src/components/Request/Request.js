import React, { Component } from "react";
import "./Request.scss";
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
          {url}
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
        </div>
      </div>
    );
  }
}

export default Request;

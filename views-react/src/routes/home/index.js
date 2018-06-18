/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import ContainerListItem from "../../components/ListItem/ContainerListItem";
import ContainerList from "../../components/List/ContainerList";
import Modal from "../../components/Modal/Modal";
import store from "../../store";
import { changeItems, emitPagination, changeRequests } from "../../actions";
import "./home.scss";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlConnect: this.props.urlConnect,
      portConnect: this.props.portConnect
    };
    this.onMiddleware = this.onMiddleware.bind(this);
    this.onPagination = this.onPagination.bind(this);
    this.onViewFile = this.onViewFile.bind(this);
  }
  componentDidMount() {
    let { urlConnect, portConnect } = this.state;
    var socket = io(`${urlConnect + `:` + portConnect}`);
    socket.on("all", data => this.onAll(this, data));
    socket.on("list-pagination", data => this.onPagination(this, data));
    socket.on("middleware", data => this.onMiddleware(this, data));
    socket.on("view-file", data => this.onViewFile(data));
  }

  /**
   * @description All for consoles.
   * @param {*} Context
   * @param {*} Data
   */
  onAll(Context, Data) {
    console.log("onAll", Data);
    // store.dispatch(cleanListAction([]));
    store.dispatch(emitPagination());
  }

  /**
   * @description Specific source for consoles type: middleware
   * @param {*} Context
   * @param {*} Data
   */
  onMiddleware(Context, Data) {
    console.log("onMiddleware");
    console.log("Context", Context);
    console.log("Data", Data);
    store.dispatch(changeRequests(Data));
  }
  /**
   * @description Socker for pagination data.
   * @param {*} Context
   * @param {*} Data
   */
  onPagination(Context, Data) {
    console.log("onPagination===>", Data);
    store.dispatch(changeItems(Data));
  }

  onViewFile(Data) {
    console.log("onViewFile", Data);
    this.refs.ModalViewFile.setState({
      openModal: true,
      contentHtml: Data.codeHtml,
      contentJson: Data.codeJson
    });
  }
  render() {
    return (
      <div className="containerHome">
        <div className="container-fluid">
          <Modal ref="ModalViewFile" />
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <ContainerListItem ref="ListaConsolas" title={"Lista de Logs"} />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <ContainerList ref="ListaRestApi" title={"Lista de Requests"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  urlConnect: PropTypes.string,
  portConnect: PropTypes.number
};

Home.defaultProps = {
  urlConnect: "http://localhost",
  portConnect: 8888
};

export default Home;

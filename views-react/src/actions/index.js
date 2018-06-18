import DataItem from "../utils/dataItem";
import DataRequest from "../utils/dataRequest";
import * as Actions from "./actionTypes";
import io from "socket.io-client";
import axios from "axios";
const cleanListAction = items => {
  return {
    type: Actions.CL_LOGS,
    items: [],
    page: 0,
    totalPages: 0,
    totalLogs: 0
  };
};

const cleanListRequest = () => {
  return {
    type: Actions.CL_REQS,
    requests: []
  };
};

const changeItems = Data => {
  return function(dispatch) {
    const _items = Data.results.map(element => {
      return new DataItem(element);
    });

    dispatch({
      type: Actions.CH_ITEMS,
      items: _items,
      limit: Data.limit,
      page: Data.page,
      totalLogs: Data.total_logs,
      totalPages: Data.total_pages
    });
  };
};

const emitPagination = pageSelected => {
  return async function(dispatch) {
    var socket = io("http://localhost:8888");
    await socket.emit("list", {
      page: pageSelected || 0,
      limit: 10,
      type: "all"
    });
    dispatch({
      type: Actions.EMIT_PAG, // "EMIT_PAGINATION",
      items: [],
      limit: 10,
      page: pageSelected
    });
  };
};

const changeRequests = Data => {
  return function(dispatch) {
    const _reqs = new DataRequest(Data);
    dispatch({
      type: Actions.CH_REQS, // "CHANGE_REQUESTS",
      requests: _reqs
    });
  };
};

const sendRequest = DataRequest => {
  return function(dispatch) {
    axios({
      method: DataRequest.method,
      url: DataRequest.url,
      responseType: "stream"
    });
    dispatch({
      type: Actions.SEND_REQS // "SEND_REQUESTS"
    });
  };
};

const onClickCode = LineCode => {
  console.log("onClickCode+++>", LineCode);
  return async function(dispatch) {
    var socket = io("http://localhost:8888");
    await socket.emit("file", {
      line: LineCode
    });
    dispatch({
      type: Actions.EMIT_FILE // "EMIT_FILE",
    });
  };
};

export {
  cleanListAction,
  changeItems,
  emitPagination,
  cleanListRequest,
  changeRequests,
  sendRequest,
  onClickCode
};

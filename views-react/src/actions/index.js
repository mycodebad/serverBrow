import DataItem from "../utils/dataItem";
import DataRequest from "../utils/dataRequest";
import io from "socket.io-client";
import axios from "axios";
const cleanListAction = items => {
  return {
    type: "CLEAN_LIST",
    items: [],
    page: 0,
    totalPages: 0,
    totalLogs: 0
  };
};

const cleanListRequest = items => {
  return {
    type: "CLEAN_LIST_REQUEST",
    requests: []
  };
};

const changeItems = Data => {
  return function(dispatch) {
    const _items = Data.results.map(element => {
      return new DataItem(element);
    });

    dispatch({
      type: "CHANGE_ITEMS",
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
      type: "EMIT_PAGINATION",
      items: [],
      limit: 10,
      page: pageSelected
    });
  };
};

const changeRequests = Data => {
  console.log("changeRequests", Data);
  return function(dispatch) {
    const _reqs = new DataRequest(Data);
    console.log("DataRequests==========>", _reqs);
    dispatch({
      type: "CHANGE_REQUESTS",
      requests: _reqs
    });
  };
};

const sendRequest = DataRequest => {
  console.log("sendRequest ACTION", DataRequest);
  return function(dispatch) {
    axios({
      method: DataRequest.method,
      url: DataRequest.url,
      responseType: "stream"
    });
    dispatch({
      type: "SEND_REQUESTS"
    });
  };
};
export {
  cleanListAction,
  changeItems,
  emitPagination,
  cleanListRequest,
  changeRequests,
  sendRequest
};

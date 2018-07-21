import DataItem from "../utils/dataItem";
import DataRequest from "../utils/dataRequest";
import * as Actions from "./actionTypes";
import SocketUtil from "../utils/SocketUtil";
import ApiServices from "../utils/ApiServices";
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
    await SocketUtil._conection.emit("list", {
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
  return async function(dispatch) {
    await ApiServices.SendRequest(DataRequest).then(res => {
      console.log("SendRequest apiservice", res);
      dispatch({
        type: Actions.SEND_REQS,
        modalNewRequest: false
      });
    });
  };
};

const newRequest = () => {
  return {
    type: Actions.NEW_REQS,
    modalNewRequest: true
  };
};

const onClickCode = LineCode => {
  return async function(dispatch) {
    await SocketUtil._conection.emit("file", {
      line: LineCode
    });
    dispatch({
      type: Actions.EMIT_FILE // "EMIT_FILE",
    });
  };
};

const toggleModal = OpenModal => {
  let contentHtml = "";
  if (OpenModal) {
    contentHtml = `<div>
    <div class="form-group">
      <div class="input-group-prepend">
        <label class="input-group-protocolo" for="protocolo">Métodos HTTP</label>
      </div>
      <select class="custom-select" id="InputProtocolo">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
      </select>
    </div>
    <div class="form-group">
      <label for="InputUrl">Url</label>
      <input type="text" class="form-control" id="InputUrl" placeholder="localhost:3000/data">
    </div>
    <div class="form-group">
      <label for="InputUrl">Body</label>
      <textarea rows="4" cols="50" class="form-control" id="InputBody"></textarea>
    </div>
  </div>`;
  }
  return {
    type: Actions.NEW_REQS,
    modalNewRequest: OpenModal,
    contentHtml: contentHtml
  };
};

export {
  cleanListAction,
  changeItems,
  emitPagination,
  cleanListRequest,
  changeRequests,
  sendRequest,
  newRequest,
  toggleModal,
  onClickCode
};

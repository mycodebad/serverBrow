import DataItem from "../utils/dataItem";
import io from "socket.io-client";

const cleanListAction = items => {
  return {
    type: "CLEAN_LIST",
    items: [],
    page: 0,
    totalPages: 0,
    totalLogs: 0
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

export { cleanListAction, changeItems, emitPagination };

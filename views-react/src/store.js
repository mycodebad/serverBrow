import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const getInitialState = {
  items: [],
  requests: [],
  page: 0,
  limit: 10,
  totalPages: 0,
  totalLogs: 0
};

const reducer = (state, action) => {
  if (action.type === "CLEAN_LIST") {
    return {
      ...state,
      items: []
    };
  } else if (action.type === "CHANGE_ITEMS") {
    console.log("action ===>", action);
    console.log("state ===>", state);
    return {
      ...state,
      items: action.items,
      page: action.page,
      limit: action.limit,
      totalPages: action.totalPages,
      totalLogs: action.totalLogs
    };
  } else if (action.type === "EMIT_PAGINATION") {
    return {
      ...state,
      items: action.items,
      page: action.page
    };
  } else if (action.type === "CHANGE_REQUESTS") {
    console.log("CHANGE_REQUESTS ACTIOIN ===>", action);

    return {
      ...state,
      requests: [action.requests, ...state.requests]
    };
  }

  return state;
};

export default createStore(
  reducer,
  getInitialState,
  applyMiddleware(thunk, logger)
);

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger'

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
  }

  return state;
};

export default createStore(reducer, { items: [] }, applyMiddleware(thunk, logger));

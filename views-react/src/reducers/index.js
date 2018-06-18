import { combineReducers } from "redux";

import RequestsReducer from "./requests.reducer";
import LogsReducer from "./logs.reducers";
import InitialState from "../actions/InitialState";
export default combineReducers(
  {
    LogsReducer,
    RequestsReducer
  },
  {
    ...InitialState.Logs,
    ...InitialState.Requests
  }
);

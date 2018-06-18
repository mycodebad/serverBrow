import * as Actions from "../actions/actionTypes";
import InitialState from "../actions/InitialState";

export default function logsReducer(state = InitialState.Logs, action) {
  switch (action.type) {
    case Actions.CL_LOGS:
      return {
        ...state,
        items: []
      };
    case Actions.CH_ITEMS:
      return {
        ...state,
        items: action.items,
        page: action.page,
        limit: action.limit,
        totalPages: action.totalPages,
        totalLogs: action.totalLogs
      };
    case Actions.EMIT_PAG:
      return {
        ...state,
        items: action.items,
        page: action.page
      };
    case Actions.EMIT_FILE:
      return {
        ...state,
        emitFile: true
      };
    default:
      return state;
  }
}

import * as Actions from "../actions/actionTypes";
import InitialState from "../actions/InitialState";

export default function requestsReducer(state = InitialState.Requests, action) {
  switch (action.type) {
    case Actions.CL_REQS:
      return {
        ...state,
        requests: []
      };
    case Actions.CH_REQS:
      return {
        ...state,
        requests: [action.requests, ...state.requests]
      };
    case Actions.SEND_REQS:
      return state;
    case Actions.NEW_REQS:
      return {
        ...state,
        modalNewRequest: action.modalNewRequest,
        contentHtml: action.contentHtml
      };
    default:
      return state;
  }
}

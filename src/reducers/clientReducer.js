import * as TYPES from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case TYPES.FETCH_ALL_CLIENTS:
      return {
        ...state,
        numClients: action.payload.total,
        client: action.payload.clients,
        // name: action.payload.user.name,
      };
    case TYPES.FETCH_CLIENT_BY_SEARCH:
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        client: action.payload.clients,
      };
    case TYPES.FETCH_CLIENT_BY_CLID:
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        [action.payload.clients[0].CLID]: action.payload.clients,
      };
    default:
      return state;
  }
};

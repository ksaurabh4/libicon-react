import * as TYPES from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case TYPES.FETCH_ALL_EMPLOYEE:
      return {
        ...state,
        ...action.payload.employeeList.reduce((newState, employee) => {
          newState[employee.id] = employee;
          return newState;
        }, {}),
      };
    case TYPES.FETCH_USER:
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

import * as actionType from "../constants/actionTypes";

const searchacoachReducer = (state = { searchacoachdata: null }, action) => {
  switch (action.type) {
    case "ADD_REQERROR":
      return {
        ...state,
        error: action.payload.msg,
      };
    case "ADD_REQERROR1":
      return {
        ...state,
        error: action.payload.msg,
      };

    default:
      return state;
  }
};

export default searchacoachReducer;

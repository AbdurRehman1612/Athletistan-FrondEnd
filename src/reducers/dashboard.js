import * as actionType from "../constants/actionTypes";

const dashboardReducer = (
  state = { updatemyprofdata: null, updateathleteprofdata: null },
  action
) => {
  switch (action.type) {
    case actionType.updatemyprofdata:
      return { ...state, updatemyprofdata: action.data };
    case actionType.updateathleteprofdata:
      return { ...state, updateathleteprofdata: action.data };
    case actionType.report:
      return { ...state, report: action.data };
    case actionType.evalform:
      return { ...state, evalform: action.data };
    case "ADD_ERROR1":
      return {
        ...state,
        error: action.payload.msg,
      };
    case "ADD_ERROR2":
      return {
        ...state,
        error: action.payload.msg,
      };

    default:
      return state;
  }
};

export default dashboardReducer;

import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null, loading: true }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return {
        ...state,
        authData: action.data,
        loading: false,
        errors: null,
        error: null,
      };
    case actionType.getAUTH:
      return { ...state, authData: action.l, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };

    case "NEWTYPE":
      return {
        ...state,
        authData: {
          ...state.authData,
          result: { ...state.authData.result, ...action.payload },
        },
      };
    case "ADD_ERROR":
      return {
        ...state,
        error: action.payload.msg,
      };
    default:
      return state;
  }
};

export default authReducer;

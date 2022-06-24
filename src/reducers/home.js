import * as actionType from "../constants/actionTypes";

const homeReducer = (state = { contactus: null }, action) => {
  switch (action.type) {
    case actionType.contactus:
      return { ...state, contactus: action.data };

    default:
      return state;
  }
};

export default homeReducer;

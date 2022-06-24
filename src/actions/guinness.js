import { breaktherecord } from "../constants/actionTypes";
import * as api from "../api/index";

export const errors = (msg) => {
  return {
    type: "ADD_ERROR1",
    payload: { msg },
  };
};

export const Breakrecord = (details, router) => async (dispatch) => {
  try {
    const data = await api.breaktherecord(details);

    dispatch({ type: breaktherecord, data });
    router.push("/breaktherecord");
  } catch (error) {
    dispatch(errors(error?.response?.data?.message));
  }
};

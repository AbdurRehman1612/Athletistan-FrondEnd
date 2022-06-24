import { AUTH, getAUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const errors = (msg) => {
  return {
    type: "ADD_ERROR",
    payload: { msg },
  };
};

export const auth = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    "data", data;
    dispatch({ type: AUTH, data });

    router.push("/dashboard");
  } catch (error) {
    dispatch(errors(error?.response?.data?.message));
  }
};

export const getauth = (l) => async (dispatch) => {
  try {
    dispatch({ type: getAUTH, l });
  } catch (error) {}
};

export const coachsignup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.coachsignUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    dispatch(errors(error?.response?.data?.message));
  }
};

export const athletesignup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.athletesignUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    dispatch(errors(error?.response?.data?.message));
  }
};

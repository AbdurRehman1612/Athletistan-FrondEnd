import {
  updatemyprofdata,
  resetpassword,
  getdetails,
} from "../constants/actionTypes";
import * as api from "../api/index";

export const errors = (msg) => {
  return {
    type: "ADD_ERROR1",
    payload: { msg },
  };
};
export const errors1 = (msg) => {
  return {
    type: "ADD_ERROR2",
    payload: { msg },
  };
};

export const changepassword = (resetpass, router) => async (dispatch) => {
  try {
    const data = await api.resetpassword(resetpass);

    dispatch({ type: resetpassword, data });
    router.push("/myprofile");
  } catch (error) {
    dispatch(errors(error?.response?.data?.message));
  }
};

export const changeathletepassword =
  (resetpass, router) => async (dispatch) => {
    try {
      const { data } = await api.resetathletepassword(resetpass);

      dispatch({ type: resetpassword, data });
      router.push("/myprofile");
    } catch (error) {}
  };

export const updateprofiledata = (resetprofile, router) => async (dispatch) => {
  try {
    const { data } = await api.updatemyprofdata(resetprofile);

    dispatch({ type: "NEWTYPE", payload: data });
    // dispatch({ type: updatemyprofdata, resetprofile });
    router.push("/myprofile");
  } catch (error) {}
};
export const updateathprofiledata =
  (resetprofile, router) => async (dispatch) => {
    try {
      const { data } = await api.updateathleteprofdata(resetprofile);

      dispatch({ type: "NEWTYPE", payload: data });
      router.push("/athleteprofile");
    } catch (error) {}
  };

export const availabilityandfee = (mydetails, router) => async (dispatch) => {
  try {
    const { data } = await api.Availabilityandfee(mydetails);

    dispatch({ type: "NEWTYPE", payload: data });
    router.push("/availabilityandfee");
  } catch (error) {}
};

export const reportcoach = (report, router) => async (dispatch) => {
  try {
    const { data } = await api.report(report);

    dispatch({ type: report, data });

    router.push("/report");
  } catch (error) {}
};

export const evalform = (alldetails, router) => async (dispatch) => {
  try {
    const { data } = await api.evalform(alldetails);

    dispatch({ type: evalform, data });

    router.push("/evaluationform");
  } catch (error) {
    dispatch(errors1(error?.response?.data?.message));
    alert(error?.response?.data?.message);
  }
};

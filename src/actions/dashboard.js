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
    console.log(data);
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
    } catch (error) {
      console.log(error);
    }
  };

export const updateprofiledata = (resetprofile, router) => async (dispatch) => {
  try {
    const { data } = await api.updatemyprofdata(resetprofile);
    console.log(`actiondata`, data);
    dispatch({ type: "NEWTYPE", payload: data });
    // dispatch({ type: updatemyprofdata, resetprofile });
    router.push("/myprofile");
  } catch (error) {
    console.log(error);
  }
};
export const updateathprofiledata =
  (resetprofile, router) => async (dispatch) => {
    try {
      const { data } = await api.updateathleteprofdata(resetprofile);
      console.log(`actiondata`, data);
      dispatch({ type: "NEWTYPE", payload: data });
      router.push("/athleteprofile");
    } catch (error) {
      console.log(error);
    }
  };

export const availabilityandfee = (mydetails, router) => async (dispatch) => {
  try {
    const { data } = await api.Availabilityandfee(mydetails);
    console.log(`actiondata`, data);
    dispatch({ type: "NEWTYPE", payload: data });
    router.push("/availabilityandfee");
  } catch (error) {
    console.log(error);
  }
};

export const reportcoach = (report, router) => async (dispatch) => {
  try {
    const { data } = await api.report(report);

    dispatch({ type: report, data });

    router.push("/report");
  } catch (error) {
    console.log(error);
  }
};

export const evalform = (alldetails, router) => async (dispatch) => {
  console.log("alldetails :>> ", alldetails);
  try {
    const { data } = await api.evalform(alldetails);
    // console.log("data1 :>> ", data);
    dispatch({ type: evalform, data });

    router.push("/evaluationform");
  } catch (error) {
    dispatch(errors1(error?.response?.data?.message));
    alert(error?.response?.data?.message);
  }
};

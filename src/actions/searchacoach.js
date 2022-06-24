import { addtraining, addcustraining } from "../constants/actionTypes";
import * as api from "../api/index";

export const errors = (msg) => {
  return {
    type: "ADD_REQERROR",
    payload: { msg },
  };
};
export const errors1 = (msg) => {
  return {
    type: "ADD_REQERROR1",
    payload: { msg },
  };
};

export const submittraining = (alldetails, router) => async (dispatch) => {
  try {
    const { data } = await api.addtraining(alldetails);
    // const mess = useSelector((state) => state.searchacoachReducer?.error);
    dispatch({ type: addtraining, data });

    // alert(mess);

    router.push("/searchacoach");
  } catch (error) {
    dispatch(errors(error?.response?.data?.message));
    alert(error?.response?.data?.message);
  }
};
export const submittrainingcustomized =
  (alldetails, router) => async (dispatch) => {
    try {
      const { data } = await api.addcustraining(alldetails);
      // const mess = useSelector((state) => state.searchacoachReducer?.error);
      dispatch({ type: addcustraining, data });

      // alert(mess);

      router.push("/searchacoach");
    } catch (error) {
      dispatch(errors1(error?.response?.data?.message));
      alert(error?.response?.data?.message);
    }
  };

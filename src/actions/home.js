import { contactus } from "../constants/actionTypes";
import * as api from "../api/index";

export const Contactus = (details) => async (dispatch) => {
  try {
    const data = await api.contactus(details);

    dispatch({ type: contactus, data });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

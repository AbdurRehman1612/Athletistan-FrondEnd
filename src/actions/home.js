import { contactus } from "../constants/actionTypes";
import * as api from "../api/index";

export const Contactus = (details) => async (dispatch) => {
  try {
    const data = await api.contactus(details);

    dispatch({ type: contactus, data });
  } catch (error) {}
};

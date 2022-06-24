import { combineReducers } from "redux";

import auth from "./auth";
import olympics from "./olympics";
import dashboardReducer from "./dashboard";
import homeReducer from "./home";
import searchacoachReducer from "./searchacoach";

export const reducers = combineReducers({
  auth,
  olympics,
  dashboardReducer,
  homeReducer,
  searchacoachReducer,
});

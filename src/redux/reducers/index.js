import { combineReducers } from "redux";
import { memberReducer } from "./memberReducer";

export const allReducers = combineReducers({
  allMembers: memberReducer,
});

export default allReducers;
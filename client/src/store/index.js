import { combineReducers } from "redux";
import { categories } from "./Categories/Reducer";
import { tasks } from "./Tasks/Reducer";
import { modal } from "./Modals/Reducer";
import { spinner } from "./Spinner/Reducer";
import { errors } from "./Errors/Reducer";
import { authorizied } from "./Authorizied/Reducer";

export default combineReducers({
  categories,
  tasks,
  modal,
  spinner,
  authorizied,
  errors,
});

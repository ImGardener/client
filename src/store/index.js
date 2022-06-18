import { combineReducers, createStore } from "redux";
import statusReducer from "./modules/status";

const rootReducer = combineReducers({
  status: statusReducer,
});
const store = createStore(rootReducer);
export default store;

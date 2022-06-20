import { combineReducers, createStore, applyMiddleware } from "redux";
import loginReducer from "./modules/login";
import statusReducer from "./modules/status";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  status: statusReducer,
  login: loginReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;

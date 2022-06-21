import { combineReducers, createStore, applyMiddleware } from "redux";
import loginReducer from "./modules/login";
import thunkMiddleware from "redux-thunk";
import searchReducer from "./modules/search";

const rootReducer = combineReducers({
  login: loginReducer,
  search: searchReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;

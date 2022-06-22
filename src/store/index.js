import { combineReducers, createStore, applyMiddleware } from "redux";
import loginReducer from "./modules/auth";
import thunkMiddleware from "redux-thunk";
import searchReducer from "./modules/plants";

const rootReducer = combineReducers({
  login: loginReducer,
  plants: searchReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;

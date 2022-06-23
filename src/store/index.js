import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./modules/auth";
import thunkMiddleware from "redux-thunk";
import searchReducer from "./modules/plants";

const rootReducer = combineReducers({
  auth: authReducer,
  plants: searchReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;

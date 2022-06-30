import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./modules/auth";
import thunkMiddleware from "redux-thunk";
import searchReducer from "./modules/plants";
import collectionReducer from "./modules/collection";

const rootReducer = combineReducers({
  auth: authReducer,
  plants: searchReducer,
  collections: collectionReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;

import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { coins, search } from "./reducer";

const reducer = combineReducers({ coins, search });
const middleWare = [thunk];
// const data = JSON.parse(localStorage.getItem("posts"))
//   ? JSON.parse(localStorage.getItem("posts"))
//   : [];
// const initialState = { posts: { data: [...data], loading: false, error: "" } };
const store = createStore(
  reducer,
  // initialState,
  applyMiddleware(...middleWare)
);
export default store;

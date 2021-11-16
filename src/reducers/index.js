import { combineReducers } from "redux";
import BillsReducers from "./BillsReducers";

const reducers = combineReducers({
  bills: BillsReducers
});

export default reducers;
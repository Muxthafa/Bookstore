import { combineReducers } from "redux";
import { bookReducer} from "./BookReducer";

const reducers = combineReducers({
  allBooks: bookReducer,
});

export default reducers;
import { combineReducers } from "redux";
import Trigger from "./TriggerReducer";
import Kanji from "./KanjiReducer";
import User from "./UserReducer";
const rootReducer = combineReducers({
  Trigger,
  Kanji,
  User,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

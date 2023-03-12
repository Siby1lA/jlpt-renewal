import { combineReducers } from "redux";
import Trigger from "./TriggerReducer";
import Kanji from "./KanjiReducer";
const rootReducer = combineReducers({
  Trigger,
  Kanji,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

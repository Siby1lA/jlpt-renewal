const init = {
  isHiragana: false,
  isImi: false,
  isIten: false,
  isReset: false,
};
export default function (state = init, action: any) {
  switch (action.type) {
    case "SET_HIRAGANA":
      return {
        ...state,
        isHiragana: action.data,
      };
    case "SET_IMI":
      return {
        ...state,
        isImi: action.data,
      };
    case "SET_ITEN":
      return {
        ...state,
        isIten: action.data,
      };
    case "SET_RESET":
      return {
        ...state,
        isReset: action.data,
      };
    default:
      return state;
  }
}

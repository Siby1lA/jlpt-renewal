const init = {
  isHiragana: false,
  isImi: false,
  isReibun: true,
  isReset: false,
  isUpdate: false,
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
    case "SET_REIBUN":
      return {
        ...state,
        isReibun: action.data,
      };
    case "SET_RESET":
      return {
        ...state,
        isReset: action.data,
      };
    case "SET_UPDATE":
      return {
        ...state,
        isUpdate: action.data,
      };
    default:
      return state;
  }
}

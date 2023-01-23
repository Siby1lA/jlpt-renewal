const init = {
  isWhat: [],
  isId: "",
  isTitle: "",
};
export default function (state = init, action: any) {
  switch (action.type) {
    case "SET_WHAT":
      return {
        ...state,
        isWhat: action.data,
      };
    case "SET_ID":
      return {
        ...state,
        isId: action.data,
      };
    case "SET_TITLE":
      return {
        ...state,
        isTitle: action.data,
      };
    default:
      return state;
  }
}

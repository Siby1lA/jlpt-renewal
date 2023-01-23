const init = {
  isWhat: [],
  isChapter: [],
};
export default function (state = init, action: any) {
  switch (action.type) {
    case "SET_WHAT":
      return {
        ...state,
        isWhat: action.data,
      };
    case "SET_CHAPTER":
      return {
        ...state,
        isChapter: action.data,
      };
    default:
      return state;
  }
}

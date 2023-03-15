export interface IUser {
  userInfo: {
    displayName: string;
    email: string;
    photoURL: string;
  };
}

const init: IUser = {
  userInfo: {
    displayName: "",
    email: "",
    photoURL: "",
  },
};
export default function (state = init, action: any) {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.data,
      };
    default:
      return state;
  }
}

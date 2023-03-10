export const setHiragana = (data: boolean) => ({
  type: "SET_HIRAGANA",
  data: data,
});

export const setImi = (data: boolean) => ({
  type: "SET_IMI",
  data: data,
});

export const setReibun = (data: boolean) => ({
  type: "SET_REIBUN",
  data: data,
});

export const setReset = (data: boolean) => ({
  type: "SET_RESET",
  data: data,
});

export const setUpdate = (data: boolean) => ({
  type: "SET_UPDATE",
  data: data,
});

export const setMovePage = (data: number) => ({
  type: "SET_MOVE_PAGE",
  data: data,
});

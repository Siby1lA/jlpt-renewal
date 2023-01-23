export const setHiragana = (data: boolean) => ({
  type: "SET_HIRAGANA",
  data: data,
});

export const setImi = (data: boolean) => ({
  type: "SET_IMI",
  data: data,
});

export const setReinun = (data: boolean) => ({
  type: "SET_REIBUN",
  data: data,
});

export const setReset = (data: boolean) => ({
  type: "SET_RESET",
  data: data,
});

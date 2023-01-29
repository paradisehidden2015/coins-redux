import { failed, loading, success } from "../constantsts";
export const coins = (
  store = { data: [], loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case loading:
      return payload;
    case success:
      return payload;
    case failed:
      return payload;
    default:
      return store;
  }
};
export const search = (store = "", { type, payload }) => {
  switch (type) {
    case "Search":
      return payload;
    default:
      return store;
  }
};

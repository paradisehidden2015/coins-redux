import { failed, loading, success } from "../constantsts";
import axios from "axios";

export const getData = (x) => async (dispatch, getState) => {
  dispatch({
    type: loading,
    payload: { data: [], error: "", loading: true },
  });
  try {
    const { data } = await axios(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    dispatch({
      type: success,
      payload: { data: [...data], error: "", loading: false },
    });
    localStorage.setItem("posts", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: failed,
      payload: { data: [], error: error.message, loading: false },
    });
  }
};

import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./redux/action";
import { Form, Spinner } from "react-bootstrap";
import { type } from "@testing-library/user-event/dist/type";

function App() {
  const dispatch = useDispatch();
  const [Sort, setSort] = useState("");
  const { data, loading, error } = useSelector((state) => state.coins);
  const search = useSelector((state) => state.search);
  useEffect(() => {
    dispatch(getData());
  }, []);
  return (
    <div className="App">
      {loading ? (
        <Spinner
          animation="border"
          variant="info"
          style={{ marginTop: "200px" }}
        />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,auto)",
              justifyContent: "center",
              padding: "20px 20px",
            }}
          >
            <Form.Control
              type="email"
              placeholder="Search ...."
              style={{ width: "400px", marginRight: "20px" }}
              onChange={(e) =>
                dispatch({ type: "Search", payload: e.target.value })
              }
            />
            <select
              className="form-select"
              onChange={(e) => setSort(e.target.value)}
            >
              <option>Market Cap</option>
              <option>Hoghest</option>
              <option>Lowest</option>
              <option>A-Z</option>
              <option>Z-A</option>
            </select>
          </div>
          <div
            style={{
              width: "80%",
              display: "grid",
              gridTemplateColumns: "repeat(5,18%)",
              justifyContent: "space-evenly",
              alignItems: "center",
              justifyItems: "center",
              textAlign: "center",
              marginBottom: "15px",
              borderBottom: "2px solid white",
              padding: "20px 20px",
              margin: "0 auto",
              fontSize: "1.5rem",
              color: "lightblue",
            }}
          >
            <p>Image</p>
            <p>Symbol</p>
            <p>Name</p>
            <p>Current Price</p>
            <p>Market Cap</p>
          </div>
          {data
            .sort((x, y) => {
              switch (Sort) {
                case "Market Cap":
                  return y.market_cap - x.market_cap;
                case "Hoghest":
                  return y.current_price - x.current_price;
                case "Lowest":
                  return x.current_price - y.current_price;
                case "A-Z":
                  return x.name.localeCompare(y.name);
                case "Z-A":
                  return y.name.localeCompare(x.name);
                default:
                  return y.market_cap - x.market_cap;
              }
            })
            .filter(
              (item) =>
                item.name.toLowerCase().includes(search.trim().toLowerCase()) ||
                item.symbol.toLowerCase().includes(search.trim().toLowerCase())
            )
            .map((item, index) => {
              return (
                <div key={item.id}>
                  <div
                    style={{
                      width: "80%",
                      display: "grid",
                      gridTemplateColumns: "repeat(5,18%)",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      justifyItems: "center",
                      textAlign: "center",
                      marginBottom: "15px",
                      borderBottom: "2px solid white",
                      padding: "20px 20px",
                      margin: "0 auto",
                      fontSize: "1.3rem",
                    }}
                  >
                    <img
                      src={item.image}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <p>{item.symbol}</p>
                    <p>{item.name}</p>
                    <p>{item.current_price}</p>
                    <p>{item.market_cap}</p>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default App;

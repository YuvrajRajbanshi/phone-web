import React, { useEffect } from "react";
import axios from "axios";

import AppContext from "./AppContext";

const AppState = (props) => {
  const data = 10;
  const url = "http://localhost:1000/api";

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data);
    };

    fetchProduct();
  });
  return (
    <AppContext.Provider value={{ data }}>{props.children}</AppContext.Provider>
  );
};

export default AppState;

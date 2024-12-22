import React, { useEffect, useState } from "react";
import axios from "axios";

import AppContext from "./AppContext";

const AppState = (props) => {
  const data = 10;
  const url = "http://localhost:1000/api";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setProducts(api.data.products);
      console.log(api.data.products);
    };

    fetchProduct();
  }, []);
  return (
    <AppContext.Provider value={{ products }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;

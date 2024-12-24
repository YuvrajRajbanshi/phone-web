import React, { useEffect, useState } from "react";
import axios from "axios";

import AppContext from "./AppContext";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AppState = (props) => {
  const data = 10;
  const url = "http://localhost:1000/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setProducts(api.data.products);
      // console.log(api.data.products);
      setFilteredData(api.data.products);
      userProfile();
    };

    fetchProduct();
    userCart();
  }, [token, reload]);

  useEffect(() => {
    // setToken(localStorage.getItem("token"));
    let lstoken = localStorage.getItem("token");

    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);
    }
    // console.log("Token", lstoken);
  }, []);

  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    // alert(api.data.message);
    // console.log("User register ", api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    return api.data;
  };

  // login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    setToken(api.data.token);
    setIsAuthenticated(true);
    localStorage.setItem("token", api.data.token);
    return api.data;
  };

  // logout user

  const logout = async () => {
    setIsAuthenticated(false);
    setToken(" ");
    localStorage.removeItem("token");
    toast.success("Logout successfully.....!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // user profile

  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("User Profile", api);
    setUser(api.data.user);
  };

  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    // console.log("My cart ", api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // user cart

  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    // console.log("user cart", api);
    // setUser();
    setCart(api.data.cart);
  };

  // --qty
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );

    setReload(!reload);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    setReload(!reload);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    setReload(!reload);
    console.log("Clear cart", api);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        isAuthenticated,
        setIsAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        userProfile,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;

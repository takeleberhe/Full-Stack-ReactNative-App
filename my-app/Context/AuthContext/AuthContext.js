import React, { createContext, useState, useReducer, useEffect } from "react";
import axios from "axios";

import {
  ProductReducer,
  cartReducer,
  searchReducer,
  addcategoryReducer,
} from "./Reducer";
axios.defaults.withCredentials = true;

/* global object(state)*/
const AuthContext = createContext();

/* parent component */
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  /* Product State*/
  const [state, prodDispatch] = useReducer(ProductReducer, {
    product: [],
    error: "",
  });
  /* cartegory state*/
  const [categoryState, categoryDispatch] = useReducer(addcategoryReducer, {
    categ: [],
    error: "",
  });
  /* cart state */
  const [cartstate, cartdispatch] = useReducer(cartReducer, {
    cart: [],
  });

  /*search state*/
  const [searchstate, searchDispatch] = useReducer(searchReducer, {
    searchQuery: "",
  });

  /* Registration Api Call*/
  const RegisterAPICall = async (payload) => {
    await axios.post("http://localhost:5000/Api/signup", payload, {
      withCredentials: true,
    });
  };
  /* Login API Call */
  const LoginApiCall = async (payload) => {
    await axios.post("http://localhost:5000/Api/login", payload, {
      withCredentials: true,
    });

    /* get user profile Api call */
    const userprofile = await axios.get(
      "http://localhost:5000/Api/userprofile",
      {
        withCredentials: true,
      }
    );
    setUser(userprofile.data);
  };

  /* Logout Api Call */
  const logoutAPICall = async () => {
    /* logout from the server side */
    await axios.get("http://localhost:5000/Api/logout", {
      withCredentials: true,
    });
    /* logout from client side or remove values and tokens the user from browser */
    localStorage.removeItem("userprofile");
    setUser(null);
  };

  /* Fetch Product API CALL */
  async function fetchData() {
    const response = await axios.get("http://10.0.2.2:5000/Api/products");
    const data = await response.data;
    // console.log(data);
    return data;
  }
  useEffect(() => {
    fetchData()
      .then((data) => {
        prodDispatch({ type: "Fetch_Success", payload: data.products });
      })
      .catch((error) => {
        prodDispatch({ type: "Fetch_Error" });
      });
  }, []);

  /* Categories Fetch API Call */
  async function fetchCategory() {
    const response = await axios.get("http://10.0.2.2:5000/Api/category");
    const data = await response.data;
    //console.log(data);
    return data;
  }
  useEffect(() => {
    fetchCategory()
      .then((data) => {
        categoryDispatch({ type: "Fetch_Success", payload: data.categoryList });
      })
      .catch((error) => {
        categoryDispatch({ type: "Fetch_Error" });
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        LoginApiCall,
        logoutAPICall,
        RegisterAPICall,
        prodDispatch,
        categoryDispatch,
        searchDispatch,
        cartdispatch,
        user,
        state,
        cartstate,
        categoryState,
        searchstate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

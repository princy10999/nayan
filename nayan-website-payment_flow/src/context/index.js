import { useReducer, createContext, useEffect } from "react"; // store user state
//import axios from 'axios'

// initial state
const initialState = {
  user: null,
};

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    // This is not secure, we can check via api call to make more secure
    const checkToken = JSON.parse(localStorage.getItem("token"));
    if (checkToken && checkToken?.email) {
      dispatch({
        type: "LOGIN",
        payload: checkToken,
      });
    } else {
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
    }
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };

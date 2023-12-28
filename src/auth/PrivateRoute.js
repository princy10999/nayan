import React from "react";
import { Route } from "react-router-dom";
import { isLogin } from "../api/commonApi";
import { useHistory } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();

  const userLogin = () => {
    localStorage.setItem("loginModal", true);
    history.push("/userLogin");
    //toast.error("Please login to continue");
  };

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => (isLogin() ? <Component {...props} /> : userLogin())}
    />
  );
};

export default PrivateRoute;

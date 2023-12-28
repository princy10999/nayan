import React, { useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Style from "./LoginPopup.module.scss";
import UserLogin from "../UserLogin";
import { LoginSignupContext } from "../../context/loginSignupModal";
import '../BillBoardPopup/BillBoardPopup.module.scss'
import { Context } from "../../context";
import { useLocation } from "react-router-dom";
function LoginPopup() {

  const location = useLocation();

  const { state: { user } } = useContext(Context);

  // State for Login/Signup Modal
  const {
    loginSignupState: { isLogin, redirectToPath },
    dispatchLoginSignup,
  } = useContext(LoginSignupContext);

  const authRoutes = [
    "/innerDetails"
  ]

  useEffect(() => {
    if (!user && authRoutes.includes(location.pathname)) {
      dispatchLoginSignup({ type: "LOGIN" });
    }
  }, []);

  const redirectPath = authRoutes.includes(location.pathname) ? location.pathname + location.search : (redirectToPath || null)

  return (
    <>
      <Modal
        show={isLogin}
        dialogClassName="login_modal custom_styling"
        centered
      >
        <Modal.Header
          onClick={() =>{
            dispatchLoginSignup({ type: "CLOSE_LOGIN_SIGNUP" })
            sessionStorage.removeItem('islogin_modal') 
          }}
        >
          <div className={Style.modal_header}>x</div>
        </Modal.Header>
        <Modal.Body>
          <UserLogin redirectPath={redirectPath} />
        </Modal.Body>
      </Modal>
    </>
  );
}
export default LoginPopup;

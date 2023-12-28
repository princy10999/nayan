import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import Style from "./SignUpModal.module.scss";
import UserSignup from "../UserSignup";
import { LoginSignupContext } from "../../context/loginSignupModal";


function SignupModal() {
  // State for Login/Signup Modal
  const {
    loginSignupState: { isSignup },
    dispatchLoginSignup,
  } = useContext(LoginSignupContext);

  return (
    <>
      <Modal
        show={isSignup}
        dialogClassName="signup_modal custom_styling"
        centered
      >
        <Modal.Header
          onClick={() => {
            dispatchLoginSignup({ type: "CLOSE_LOGIN_SIGNUP" });
            sessionStorage.removeItem("isSignUp_modal");
          }}
        >
          <div className={Style.modal_header}>x</div>
        </Modal.Header>
        <Modal.Body>
          <UserSignup />
        </Modal.Body>
      </Modal>
    </>
  );
}
export default SignupModal;

// import React, { useContext, useEffect } from "react";
// import { Modal } from "react-bootstrap";
// // import Style from "./LoginPopup.module.scss";
// import FormDetail from "../formDetail/formDetails";
// import { LoginSignupContext } from "../../context/loginSignupModal";
// import '../BillBoardPopup/BillBoardPopup.module.scss'
// import { Context } from "../../context";
// import { useLocation } from "react-router-dom";
// function FormDetails() {

//   const location = useLocation();

//   const { state: { user } } = useContext(Context);

//   // State for Login/Signup Modal
//   const {
//     loginSignupState: { showPaymentForm },
//     dispatchLoginSignup,
//   } = useContext(LoginSignupContext);

// //   const authRoutes = [
// //     "/innerDetails"
// //   ]

// //   useEffect(() => {
// //     if (!user && authRoutes.includes(location.pathname)) {
// //       dispatchLoginSignup({ type: "LOGIN" });
// //     }
// //   }, []);

// //   const redirectPath = authRoutes.includes(location.pathname) ? location.pathname + location.search : (redirectToPath || null)

//   return (
//     <>
//       <Modal
//         show={showPaymentForm}
//         dialogClassName="login_modal custom_styling"
//         centered
//       >
//         <Modal.Header
//           onClick={() => dispatchLoginSignup({ type: "HIDE_PAYMENT_FORM" })}
//         >
//           <div>x</div>
//         </Modal.Header>
//         <Modal.Body>
//           <FormDetail/>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }
// export default FormDetails;


import React, { useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Style from "./formDetail.scss";
import FormDetail from "../formDetail/index";
import { LoginSignupContext } from "../../context/loginSignupModal";
import '../BillBoardPopup/BillBoardPopup.module.scss'
import { Context } from "../../context";
import { useLocation } from "react-router-dom";
import SignupModal from "../UserSignup/index";
function LoginPopup({displayRazorpay}) {

  const location = useLocation();

  const { state: { user } } = useContext(Context);

  // State for Login/Signup Modal
  const {
    loginSignupState: { isLogin, redirectToPath,showPaymentForm },
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
        show={showPaymentForm}
        dialogClassName="login_modal payment_modal"
        centered
        size="lg"
      >
        <Modal.Header
          className="p-0 border-0"
          onClick={() => dispatchLoginSignup({type: "HIDE_PAYMENT_FORM"  })}
        >
          <div className="close_button">x</div>
        </Modal.Header>
        <Modal.Body >
          <FormDetail redirectPath={redirectPath} displayRazorpay={displayRazorpay} />
        </Modal.Body>
      </Modal>
    </>
  );
}
export default LoginPopup;


import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import Style from "./FormDetail.module.scss";
import { useHistory, Redirect, Link } from "react-router-dom";
import Assets from "../Layout/CommonLayout/Asset";
import { register } from "../../api/commonApi";
import Alert from "react-bootstrap/Alert";
import { LoginSignupContext } from "../../context/loginSignupModal";
// import ReactGA from "react-ga4";

function UserSignup({displayRazorpay}) {
  const history = useHistory();

  const { dispatchLoginSignup } = useContext(LoginSignupContext);

  const [values, setValues] = useState({
    address:"",
    city:"",
    country:"",
    zipCode:"",
    email: "",
    name: "",
    company_name: "",
    designation: "",
    mobileNumber:""
  });

  const {
    email,
    password,
    password_confirmation,
    name,
    company_name,
    designation,
    mobileNumber,
    address,
    city,
    zipCode,
    country
  } = values;

  const [btnloading, setBtnloading] = useState(false);
  const [redirectToUser, setRedirectToUser] = useState(false);


  // For Handling Modal
  const userLogin = () => {
    localStorage.setItem("loginModal", true);
    // history.push("/userLogin");
    displayLoginSignupModal("LOGIN");

  };
  // for Login modal
  const displayLoginSignupModal = (type) => {
    dispatchLoginSignup({ type });
  };

  const [backButton, setBackButton] = useState(true);

  useEffect(() => {
    setBackButton(
      JSON.parse(localStorage.getItem("signupModal")) ||
        JSON.parse(localStorage.getItem("loginModal"))
    );
  }, []);

  // Error Values
  const [errorValues, setErrorValues] = useState({
    showError: false,
    error: "",
  });


//   const handleEvent=(category,action,label)=>{
//     return ReactGA.event({
//         category: category,
//         action: action,
//         label: label // optional 
// })
// }


  const { showError, error } = errorValues;

  // For changing login values
  const handleChange = (name) => (event) => {
    setBtnloading(false);

   
      setValues({ ...values, [name]: event.target.value });

    if (showError) {
      setErrorValues({ ...errorValues, showError: false, error: "" });
    }
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    console.log('clicked---')
    dispatchLoginSignup({type: "HIDE_PAYMENT_FORM"  })
    displayRazorpay()
  
    // register(
    //   setBtnloading,
    //   errorValues,
    //   setErrorValues,
    //   setRedirectToUser,
    //   dispatchLoginSignup,
    //   password,
    //   password_confirmation,
    //   email,
    //   name,
    //   company_name,
    //   designation
    // );
    // handleEvent("Sign Up","User Signed Up",'sign up')
  };

  const checkRedirectToReferrer = () => {
    if (redirectToUser) return <Redirect to="/userLogin" />;
  };

  return (
    <>
      {/*   <CommonLayout> */}

      <div className={Style.payment_wrapper}>
        <div className={Style.inner_payment_wrapper}> 
          {/* {backButton && (
            <div className={Style.back_to_page}>
              <Button bsPrefix="custom" onClick={userLogin}></Button>
            </div>
          )} */}
          <div className="text-center pb-3">
            <h3 className="fw-bold ">Set up your Details </h3>
          </div>

          {/* <div className={Style.logo_wrapper_inner}>
            <div className={Style.container}>
              <img
                src={Assets.logoMain}
                alt=""
                onClick={() => history.push("/")}
              />
            </div>
          </div> */}

          {showError && (
            <Alert
              variant="danger"
              onClose={() =>
                setErrorValues({
                  ...errorValues,
                  showError: false,
                  error: "",
                })
              }
              dismissible
            >
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>{error}</p>
            </Alert>
          )}

          <div className={Style.form_wrapper}>
            <form onSubmit={clickSubmit} className={Style.form_wrapper_inner}>
              <div className="row">
                <div className="col-md-4">
                  <div className={Style.from_group}>
                    <label htmlFor="">
                      Full Name
                      <span className={Style.rq}>*</span>
                    </label>
                    <input
                      type="text"
                      onChange={handleChange("name")}
                      value={name}
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className={Style.from_group}>
                    <label htmlFor="">
                      Company Name
                      {/* <span className={Style.rq}>*</span> */}
                    </label>
                    <input
                      type="text"
                      onChange={handleChange("company_name")}
                      value={company_name}
                      // required
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className={Style.from_group}>
                    <label htmlFor="">Designation </label>
                    <input
                      type="text"
                      onChange={handleChange("designation")}
                      value={designation}
                      autoComplete="off"
                    />
                  </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                  <div className={Style.from_group}>
                    <label htmlFor="">Mobile Number </label>
                    <input
                      type="tel"
                      onChange={handleChange("mobileNumber")}
                      value={mobileNumber}
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>
                

                <div className="col-md-6">
                  <div className={Style.from_group}>
                    <label htmlFor="">
                      Email ID
                      <span className={Style.rq}>*</span>
                    </label>
                    <input
                      type="email"
                      onChange={handleChange("email")}
                      value={email}
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                  <div className={Style.from_group}>
                    <label htmlFor="">
                      Address
                      <span className={Style.rq}>*</span>
                    </label>
                    <input
                      type="text"
                      onChange={handleChange("address")}
                      value={address}
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={Style.from_group}>
                    <label htmlFor="">
                      City
                      <span className={Style.rq}>*</span>
                    </label>
                    <input
                      type="text"
                      onChange={handleChange("city")}
                      value={city}
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className={Style.from_group}>
                    <label htmlFor="">
                     Country
                      <span className={Style.rq}>*</span>
                    </label>
                    <input
                      type="text"
                      onChange={handleChange("country")}
                      value={country}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className={Style.from_group}>
                    <label htmlFor="">
                     ZIP/Postcode
                      <span className={Style.rq}>*</span>
                    </label>
                    <input
                      type="text"
                      onChange={handleChange("zipCode")}
                      value={zipCode}
                      pattern="[0-9]*"
                      autoComplete="off"
                    />
                  </div>
                </div>
                </div>
              

              <div className={Style.from_group}>
                <Button
                  disabled={btnloading}
                  bsPrefix="custom"
                  type="submit"
                  className={
                    Style.login_btn
                  } /* onClick={()=>history.push("/userLogin")} */
                >
                  {btnloading ? "Loading..." : "Continue"}
                </Button>
              </div>
              

            

              {/* <div className={Style.social_media_login}>
                                <Button
                                    bsPrefix="custom"
                                    className={Style.facebook}
                                >
                                    <img src={Assets.facebook} alt="" />
                                    <span>Facebook</span>
                                </Button>
                                <Button
                                    bsPrefix="custom"
                                    className={Style.google}
                                >
                                    <img src={Assets.google} alt="" />
                                    <span>Google</span>
                                </Button>
                            </div> */}
            </form>
          </div>
        </div>
      </div>
      {/*  </CommonLayout> */}
    </>
  );
}

export default UserSignup;

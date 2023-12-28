import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { Button } from "react-bootstrap";
import Style from "./UserSignup.module.scss";
import { useHistory, Redirect, Link } from "react-router-dom";
import Assets from "../Layout/CommonLayout/Asset";
import { register } from "../../api/commonApi";
import Alert from "react-bootstrap/Alert";
import { LoginSignupContext } from "../../context/loginSignupModal";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  LoginSocialLinkedin,
} from "reactjs-social-login";

import {
  FacebookLoginButton,
  GoogleLoginButton,
  LinkedInLoginButton,
} from "react-social-login-buttons";
// import ReactGA from "react-ga4";

function UserSignup() {
  const history = useHistory();

  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);
  const googleRef = useRef(null);
  const facebookRef = useRef(null);
  const linkedinRef = useRef(null);

  const { dispatchLoginSignup } = useContext(LoginSignupContext);

  const [values, setValues] = useState({
    password: "",
    password_confirmation: "",
    email: "",
    name: "",
    company_name: "",
    designation: "",
  });

  const {
    email,
    password,
    password_confirmation,
    name,
    company_name,
    designation,
  } = values;

  const [btnloading, setBtnloading] = useState(false);
  const [redirectToUser, setRedirectToUser] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // For Handling Modal
  const userLogin = () => {
    localStorage.setItem("loginModal", true);
    // history.push("/userLogin");
    sessionStorage.removeItem("isSignUp_modal");
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

    if (name === "acceptTerms") {
      setAcceptTerms(!acceptTerms);
    } else {
      setValues({ ...values, [name]: event.target.value });
    }

    if (showError) {
      setErrorValues({ ...errorValues, showError: false, error: "" });
    }
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      //toast.error("Please accept the terms and conditions to continue.");
      setErrorValues({
        ...errorValues,
        showError: true,
        error: "Please accept the terms and conditions to continue.",
      });
      return;
    }
    register(
      setBtnloading,
      errorValues,
      setErrorValues,
      setRedirectToUser,
      dispatchLoginSignup,
      password,
      password_confirmation,
      email,
      name,
      company_name,
      designation
    );
    // handleEvent("Sign Up","User Signed Up",'sign up')
  };

  const checkRedirectToReferrer = () => {
    if (redirectToUser) return <Redirect to="/userLogin" />;
  };

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutFailure = useCallback(() => {
    alert("logout fail");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {
    switch (provider) {
      case "facebook":
        facebookRef.current?.onLogout();
        break;
      case "google":
        googleRef.current?.onLogout();
        break;
      case "linkedin":
        linkedinRef.current?.onLogout();
        break;
      default:
        break;
    }
  }, [provider]);
  console.log("data", profile);
  console.log("provider", provider);

  return (
    <>
      {/*   <CommonLayout> */}

      <div className={Style.login_wrapper}>
        <div className={Style.login_inner}>
          {backButton && (
            <div className={Style.back_to_page}>
              <Button bsPrefix="custom" onClick={userLogin}></Button>
            </div>
          )}

          <div className={Style.logo_wrapper_inner}>
            <div className={Style.container}>
              <img
                src={Assets.logoMain}
                alt=""
                onClick={() => {
                  history.push("/");
                  sessionStorage.removeItem("isSignUp_modal");
                }}
              />
            </div>
          </div>

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
                <div className="col-md-6">
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

                <div className="col-md-6">
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

                <div className="col-md-6">
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

                <div className="col-md-6">
                  <div className={Style.from_group}>
                    <label htmlFor="">
                      Password
                      <span className={Style.rq}>*</span>
                    </label>
                    <input
                      type="password"
                      onChange={handleChange("password")}
                      value={password}
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className={Style.from_group}>
                    <label htmlFor="">
                      Confirm Password
                      <span className={Style.rq}>*</span>
                    </label>
                    <input
                      type="password"
                      onChange={handleChange("password_confirmation")}
                      value={password_confirmation}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>

              <div className={Style.from_group}>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  id="checkbox2"
                />
                <label htmlFor="checkbox2">
                  <span className={Style.check}></span>I Accept&nbsp;
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://traffic.nayan.co/policies"
                  >
                    Terms and Conditions
                  </a>
                </label>
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
                  {btnloading ? "Loading..." : "Sign Up"}
                </Button>
              </div>

              <div className={Style.action_wrapper}>
                <p>
                  Already a member? <Link to="/userLogin">Login</Link>
                </p>
              </div>

              <div className={Style.social_media_login}>
                <LoginSocialFacebook
                  ref={facebookRef}
                  appId={226566191233794}
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  onLoginStart={onLoginStart}
                  onLogoutSuccess={onLogoutSuccess}
                  onResolve={({provider, data}) => {
                    setProvider(provider);
                    console.log(data, "dataa");
                    setProfile(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <FacebookLoginButton />
                </LoginSocialFacebook>

                <LoginSocialGoogle
                  ref={googleRef}
                  client_id={"973589919733-ciqrdnfrnuqba9fgjji1ejttmflhjhqi.apps.googleusercontent.com"}
                  onLogoutFailure={onLogoutFailure}
                  onLoginStart={onLoginStart}
                  onLogoutSuccess={onLogoutSuccess}
                  onResolve={({provider, data}) => {
                    setProvider(provider);
                    setProfile(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <GoogleLoginButton />
                </LoginSocialGoogle>
                <LoginSocialLinkedin
                  ref={linkedinRef}
                  client_id={"77qot0tge7gmam"}
                  client_secret={
                    "O6QfxqNYJEIvODqv"
                  }
                  redirect_uri={"http://localhost:3000/login/linkedin/callback"}
                  onLoginStart={onLoginStart}
                  onLogoutSuccess={onLogoutSuccess}
                  onResolve={({provider, data}) => {
                    setProvider(provider);
                    setProfile(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <LinkedInLoginButton />
                </LoginSocialLinkedin>
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
      {checkRedirectToReferrer()}
      {/*  </CommonLayout> */}
    </>
  );
}

export default UserSignup;

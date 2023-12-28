import React, { useState, useEffect, useContext,useCallback, useRef } from "react";
import { Context } from "../../context";
import { Button } from "react-bootstrap";
// import ReactGA from "react-ga4";
import Style from "./UserLogin.module.scss";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
//import CommonLayout from "../Layout/CommonLayout";
import Assets from "../Layout/CommonLayout/Asset";
import { toast } from "react-toastify";
import { axiosInstance } from "../../axios";
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

function UserLogin(props) {

  const { redirectPath } = props;

  const history = useHistory();
  const location = useLocation();


  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);
  const googleRef = useRef(null);
  const facebookRef = useRef(null);
  const linkedinRef = useRef(null);
  // context state
  const { dispatch } = useContext(Context);

  // State for Login/Signup Modal
  const {
    loginSignupState: { isLogin },
    dispatchLoginSignup,
  } = useContext(LoginSignupContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
    btnloading: false,
  });

  const { email, password, btnloading } = values;
  const [redirectToUser, setRedirectToUser] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  // For checking back button
  const [backButton, setBackButton] = useState(true);

  // Error Values
  const [errorValues, setErrorValues] = useState({
    showError: false,
    error: "",
  });

  const { showError, error } = errorValues;

  useEffect(() => {
    // For checking the user is already Login or not
    // if login redirect to homepage
    const checkToken = JSON.parse(localStorage.getItem("token"));
    if (checkToken && checkToken?.email) {
      setRedirectToUser(true);
    }
  }, []);

//   const handleEvent=(category,action,label)=>{
//     return ReactGA.event({
//         category: category,
//         action: action,
//         label: label // optional 
// })
// }

  // For changing login values
  const handleChange = (name) => (event) => {
    if (name === "acceptTerms") {
      setAcceptTerms(!acceptTerms);
    } else {
      setValues({
        ...values,
        [name]: event.target.value,
        btnloading: false,
      });
    }

    if (showError) {
      setErrorValues({ ...errorValues, showError: false, error: "" });
    }
  };

  // For Login Function
  const clickSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      setErrorValues({
        ...errorValues,
        showError: true,
        error: "Please accept the terms and conditions to continue.",
      });
      return;
    }
    try {
      setValues({ ...values, btnloading: true });
      const results = await axiosInstance.post("/api/auth/sign_in", {
        email,
        password,
      });

      const { headers, data } = results;

      if (data?.data) {
        const tokenData = {
          id: data?.data?.id,
          email: data?.data?.email,
          name: data?.data?.name,
          token: headers["access-token"],
          tokenType: headers["token-type"],
          client: headers["client"],
          exp: headers["expiry"],
          isSuperAdmin: !!data?.data?.active_roles.find(
            (item) => item === "super_admin"
          ),
        };
        // handleEvent("Log In ","User Logged In",'log in')
        localStorage.setItem("token", JSON.stringify(tokenData));
        dispatch({
          type: "LOGIN",
          payload: tokenData,
        });
        dispatchLoginSignup({ type: "CLOSE_LOGIN_SIGNUP" });
        toast.success("Your account has been successfully Login.");
        setValues({
          ...values,
          email: "",
          password: "",
          btnloading: false,
        });
        setAcceptTerms(false);
        if (JSON.parse(sessionStorage.getItem("isMapPage"))) {
          sessionStorage.removeItem("isMapPage");
          const tempInfo = JSON.parse(sessionStorage.getItem("mapInfo"));
          const zoomInfo = JSON.parse(sessionStorage.getItem("mapCurrentZoom"));
          sessionStorage.removeItem("mapInfo");
          sessionStorage.removeItem("mapCurrentZoom");
          if (tempInfo) {
            return history.push(
              `/map?search=${tempInfo?.type}&id=${tempInfo?.id}&shouldZoom=${tempInfo?.isPointerClick}&lat=${tempInfo?.currentEventPos?.lat}&lng=${tempInfo?.currentEventPos?.lng}&zoom=${zoomInfo?.zoom ?? 22}`
            );
          }
        }
        if (backButton && !isLogin) {
          sessionStorage.removeItem("isMapPage");
          setRedirectToUser(true);
        } else {
          if (
            location.pathname == "/aboutus" ||
            location.pathname == "/aboutus" ||
            location.pathname == "/marketplace" ||
            location.pathname == "/usecases"
          ) {
            return;
          }
          if(redirectPath) {
            return history.push(redirectPath);
          } else {
            return history.push("/");
          }
        }
      } else {
        setValues({ ...values, btnloading: false });
        //toast.error("Something went wrong, Please try again.");
        setErrorValues({
          ...errorValues,
          showError: true,
          error: "Something went wrong, Please try again.",
        });
      }
    } catch (error) {
      setValues({ ...values, btnloading: false });
      setErrorValues({
        ...errorValues,
        showError: true,
        error:
          error?.response?.data?.errors[0] ||
          "Something went wrong, Please try again.",
      });
      //toast.error(error?.response?.data?.errors[0] || "Something went wrong, Please try again.");
    }
  };

  const checkRedirectToReferrer = () => {
    if (redirectToUser) return <Redirect to="/billboardssearch" />;
  };

  const goToPreviousPath = () => {
    sessionStorage.setItem("dis_anim", true);
    const backData = JSON.parse(sessionStorage.getItem("backMap"));
    if (backData) {
      sessionStorage.removeItem("backMap");
      return history.push(backData);
    }
    return history.push("/map");
  };

  useEffect(() => {
    setBackButton(JSON.parse(localStorage.getItem("loginModal")));
  }, []);

  // Check it is Page or Modal
  const checkSignUpPage = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatchLoginSignup({ type: "SIGNUP" });
    } else {
      return history.push("/userSignup");
    }
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

  return (
    <>
      {/*  <CommonLayout> */}

      <div className={Style.login_wrapper}>
        <div className={Style.login_inner}>
          {backButton && (
            <div className={Style.back_to_page}>
              <Button
                bsPrefix="custom"
                onClick={() => goToPreviousPath()}
              ></Button>
            </div>
          )}
          <div className={Style.logo_wrapper_inner}>
            <div className={Style.container}>
              <img
                src={Assets.logoMain}
                alt=""
                onClick={() => history.push("/")}
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
              <div className={Style.from_group}>
                <label htmlFor="">Email ID</label>
                <input
                  type="email"
                  onChange={handleChange("email")}
                  value={email}
                  required
                  autoComplete="off"
                />
              </div>

              <div className={Style.from_group}>
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  onChange={handleChange("password")}
                  value={password}
                  required
                />
              </div>

              {/* <div className={Style.from_group}>
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={handleChange("acceptTerms")}
                                    id="checkbox1"
                                />
                                <label htmlFor="checkbox1">
                                    <span className={Style.check}></span>I
                                    Accept&nbsp;
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href="https://traffic.nayan.co/policies"
                                    >
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div> */}

              <div className={Style.from_group}>
                <Button
                  disabled={btnloading}
                  bsPrefix="custom"
                  type="submit"
                  className={Style.login_btn}
                >
                  {btnloading ? "Loading..." : "Log In"}
                </Button>
              </div>

              {/*  <div className={Style.social_media_login}>
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

              <div className={Style.action_wrapper}>
                <p>
                  <Link to="/forgot-password">Forgot Password?</Link>
                </p>
              </div>

              <div className={Style.action_wrapper}>
                <p>
                  New member?{" "}
                  <a href="#/" onClick={(e) => checkSignUpPage(e)}>
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>
          <div className={Style.social_media_login}>
                <LoginSocialFacebook
                  ref={facebookRef}
                  appId={process.env.REACT_APP_FB_APP_ID || ""}
                  fieldsProfile={
                    "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                  }
                  onLoginStart={onLoginStart}
                  onLogoutSuccess={onLogoutSuccess}
                  onResolve={(provider,data)=>{
                    setProvider(provider);
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
                  client_id={process.env.REACT_APP_GG_APP_ID || ""}
                  onLogoutFailure={onLogoutFailure}
                  onLoginStart={onLoginStart}
                  onLogoutSuccess={onLogoutSuccess}
                  onResolve={(provider,data)=>{
                    setProvider(provider);
                    setProfile(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <GoogleLoginButton />
                </LoginSocialGoogle>
              </div>
        </div>
      
      
      
      
      </div>
      {checkRedirectToReferrer()}
     
      {/*  </CommonLayout> */}
    </>
  );
}

export default UserLogin;

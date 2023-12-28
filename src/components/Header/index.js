import React, { useState, useContext, useEffect, useRef } from "react";
import Style from "./Header.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import { useLocation, useHistory, Link } from "react-router-dom";
import { Context } from "../../context";
import { LoginSignupContext } from "../../context/loginSignupModal";
import LoginPopup from "../LoginPopup";
import SignupModal from "../SignUpModal";
import AccountSettings from "../AccountSettings";
// import ReactGA from "react-ga4";

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const history = useHistory();

  const menuRef = useRef();

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  // State for Login/Signup Modal
  const { dispatchLoginSignup } = useContext(LoginSignupContext);

  // Check the user is logged in or not
  useEffect(() => {
    // if user is logged in close the login/Signup Modal
    if (user !== null) dispatchLoginSignup({ type: "CLOSE_LOGIN_SIGNUP" });
  }, [user, dispatchLoginSignup]);

  // For closing menu, whenver we click outside
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          //setActions(false);
          if (event.target.id !== "hamb___btn") {
            setMenuOpen(false);
          }
        }
      };

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(menuRef);

  const displayLoginSignupModal = (e, type) => {
    e.preventDefault();
    dispatchLoginSignup({ type });
    if (JSON.parse(sessionStorage.getItem("isMapPage"))) {
      sessionStorage.removeItem("isMapPage");
    }
  };
  const [usecaseOn, setUsecasOn] = useState(false);

  const showUsecase = () => {
    setUsecasOn(!usecaseOn);
  };

//   const handleEvent=(category,action,label)=>{
//     return ReactGA.event({
//         category: category,
//         action: action,
//         label: label // optional 
// })
// }

  const handleLogin =(e)=>{
    // handleEvent("Header","Login Click",'Login')
    displayLoginSignupModal(e, "LOGIN")
  }
  const handleSignUp=(e)=>{
    // handleEvent("Header","Sign-up Click",'Sign-up')
    displayLoginSignupModal(e, "SIGNUP")
  }

  useEffect(() => {
    if (!menuOpen) setUsecasOn(false);
    else {
      setProfileOpen(false);
      let suggestDiv = document.getElementById("suggestionList");
      if (suggestDiv) {
        suggestDiv.style.display = "none";
      }
    }
  }, [menuOpen]);
  const securityIcon = (
    <div className={Style.action_item}>
      <a
        href="https://nayan.co/"
        target="_blank"
        rel="noreferrer"
        className={Style.login_link}
      >
        Traffic
      </a>
    </div>
  );

  return (
    <header
      className={`${Style.header_wrapper} ${
        location.pathname === "/" &&
        `${Style.active} ${Style.home_page} ${Style.only_home_page}`
      } ${
        location.pathname === "/map" &&
        `${Style.showmenu} ${Style.mappage} ${Style.home_page}`
      }`}
      id="headerId"
    >
      <div className={Style.header_inner}>
        <div className={`${Style.hamburger_menu} ${menuOpen && Style.active}`}>
          <div
            className={Style.hamburger_icon}
            // onclick="hamburger()"
            id="hamb___btn"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={Style.hamburger_item_wrapper}>
            <div
              className={Style.close_icon}
              // onclick="hamburger()"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
              /* ref={menuRef} */
            >
              <span></span>
              <span></span>
            </div>
            <ul ref={menuRef} className={Style.hamburger_item_inner}>
              <li
                style={{ backgroundColor: "inherit" }}
                className={Style.hamburger_item}
              >
                <Link className={Style.linkMenu} to="/">
                  Home
                </Link>
                <Link className={Style.linkMenu} to="/aboutus">
                  About Us
                </Link>
                <Link className={Style.linkMenu} to="/usecases">
                  UseCases
                </Link>
                <a
                  href="https://traffic.nayan.co"
                  target="_blank"
                  className={Style.linkMenu}
                >
                  Traffic
                </a>
                <a
                  href="https://traffic.nayan.co/ai-services"
                  target="_blank"
                  className={Style.linkMenu}
                >
                  AI Services
                </a>
                <a
                  href="https://traffic.nayan.co/roadways"
                  target="_blank"
                  className={Style.linkMenu}
                >
                  Roadways
                </a>
              </li>
              {/* <li className={Style.hamburger_item}>
                <Link className={Style.linkMenu} to="/aboutus">
                  About us
                </Link>
              </li>
              <li className={Style.hamburger_item}>
                <Link className={Style.linkMenu} to="/marketplace">
                  Market place
                </Link>
              </li> */}
              {/* <li
                className={Style.hamburger_item}
                style={{ cursor: "pointer" }}
              >
                <a onClick={showUsecase} className={Style.dropDownItem}>
                  Usecases
                </a>
                {usecaseOn && (
                  <div style={{ paddingTop: "9px" }}>
                    <ul>
                      <li className={Style.hamburger_item}>
                        <a
                          href="https://traffic.nayan.co"
                          target="_blank"
                          className={Style.subMenuLink}
                        >
                          Traffic
                        </a>
                      </li>
                      <li className={Style.hamburger_item}>
                        <a
                          href="https://traffic.nayan.co/ai-services"
                          target="_blank"
                          className={Style.subMenuLink}
                        >
                          AI Services
                        </a>
                      </li>
                      <li className={Style.hamburger_item}>
                        <a
                          href="https://traffic.nayan.co/roadways"
                          target="_blank"
                          className={Style.subMenuLink}
                        >
                          RoadWays
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </li> */}

              {/* <li className={Style.hamburger_item}>
                <a href="https://traffic.nayan.co" target="_blank">
                  Traffic
                </a>
              </li>
              <li className={Style.hamburger_item}>
                <a href="https://traffic.nayan.co/ai-services" target="_blank">
                  AI Services
                </a>
              </li>
              <li className={Style.hamburger_item}>
                <a href="https://traffic.nayan.co/roadways" target="_blank">
                  Roadways
                </a>
              </li> */}
              {/* {user === null && (
                                <li
                                    className={`${location.pathname === "/"} ${
                                        Style.logins
                                    }`}
                                >
                                    <div className={Style.extra_info_wrapper}>
                                        <div className={Style.action_wrapper}>
                                            <div className={Style.action_item}>
                                                <a
                                                    href="#/"
                                                    className={Style.login_link}
                                                    onClick={(e) =>
                                                        displayLoginSignupModal(
                                                            e,
                                                            "LOGIN"
                                                        )
                                                    }
                                                >
                                                    Log In
                                                </a>
                                            </div>
                                            <div className={Style.action_item}>
                                                <a
                                                    href="#/"
                                                    className={
                                                        Style.signup_link
                                                    }
                                                    onClick={(e) =>
                                                        displayLoginSignupModal(
                                                            e,
                                                            "SIGNUP"
                                                        )
                                                    }
                                                >
                                                    Sign Up
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )} */}
            </ul>
          </div>
        </div>

        <div className={Style.logo_wrapper}>
          <div className={Style.logo_container}>
            <img
              src={Assets.logoMain}
              alt="logo Nayanz"
              onClick={() => history.push("/")}
            />
          </div>
        </div>

        {user !== null && (
          <div
            className={`${Style.profile__wrapper__billboard} ${
              (location.pathname === "/map" ||
                location.pathname === "/" ||
                location.pathname === "/billboardssearch" ||
                location.pathname === "/billboards" ||
                location.pathname === "/innerDetails" ||
                location.pathname === "/billBoardDescription") &&
              `${Style.show_this}`
            } ${
              location.pathname === "/" && `${Style.profile__wrapperfor__home}`
            }`}
          >
            <div className={Style.profile__wrapper__button}>
              <AccountSettings menuOpen={menuOpen} />
            </div>
          </div>
        )}

        {user === null && (
          <div
            className={`${Style.profile__wrapper__billboard} ${
              location.pathname === "/" && `${Style.show_this_home}`
            } ${location.pathname === "/map" && `${Style.show_this}`}`}
          >
            <div className={Style.profile__wrapper__button}>
              <AccountSettings
                displayLoginSignupModal={displayLoginSignupModal}
                menuOpen={menuOpen}
              />
            </div>
          </div>
        )}

        {user === null && (
          <div
            className={`${Style.extra_info_wrapper} ${
              location.pathname === "/map" && `${Style.nil}`
            }`}
          >
            <div className={Style.action_wrapper}>
              {/* {securityIcon} */}
              <div className={Style.action_item}>
                <a
                  href="#/"
                  className={`${Style.login_link} ${
                    location.pathname === "/map" && `${Style.text_white}`
                  }`}
                  onClick={(e) =>handleLogin(e)}
                >
                  Log In
                </a>
              </div>
              <div className={Style.action_item}>
                <a
                  href="#/"
                  className={Style.signup_link}
                  onClick={(e) =>handleSignUp(e)}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <LoginPopup />
      <SignupModal />
    </header>
  );
}

export default Header;

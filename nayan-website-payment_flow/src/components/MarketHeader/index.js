import React, { useEffect, useContext, useState, toggle, useCallback } from "react";
import Style from "./MarketHeader.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import SocialMedia from "../SocialMedia";
import { Context } from "../../context";
import { LoginSignupContext } from "../../context/loginSignupModal";
import AccountSettings from "../AccountSettings";
import LoginPopup from "../LoginPopup";
import SignupModal from "../SignUpModal";

function MarketHeader() {
    const searchActive = () => {
        document.querySelector("#headernavs").classList.add("searchactive");
    };
    const searchonBlur = () => {
        document.querySelector("#headernavs").classList.remove("searchactive");
    };
    const hamburger = () => {
        var mainnavelement = document.querySelector("#main_nav");
        mainnavelement.classList.toggle("active");
    };
    const searchShow = () => {
        document.querySelector("#head_search").classList.add("show");
    };
    const searchClose = () => {
        document.querySelector("#head_search").classList.remove("show");
    };

    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    });

    const isSticky = (e) => {
        const header = document.querySelector(`.${Style.siteheader}`);
        const scrollTop = window.scrollY;
        scrollTop >= 100
            ? header.classList.add(`${Style.sticky_header}`)
            : header.classList.remove(`${Style.sticky_header}`);
    };

      // State for Login/Signup Modal
  const { dispatchLoginSignup } = useContext(LoginSignupContext);

    const displayLoginSignupModal = (e, type) => {
        e.preventDefault();
        dispatchLoginSignup({ type });
        if (JSON.parse(sessionStorage.getItem("isMapPage"))) {
          sessionStorage.removeItem("isMapPage");
        }
      };
    

    return (
        <React.Fragment>
            <section className={Style.siteheader}>
                <div className={Style.container}>
                    <div className={Style.topheader}>
                        <SocialMedia />
                    </div>
                </div>

                <div className={Style.mainheader}>
                    <div className={Style.container}>
                        <div className={Style.headerwrap}>
                            <div className={Style.logosec}>
                                <Link to="/">
                                    <img src={Assets.logoMain} alt="Nayanz" />
                                </Link>
                            </div>
                            <div className={Style.rightsec} id="headernavs">
                                <Nav className={Style.mainav} id="main_nav">
                                    <ul className={Style.mainmenu}>
                                        <li>
                                            <Link to="/aboutus">About Us</Link>
                                        </li>
                                        {/* <li>
                                            <Link to="/marketplace">Market Place</Link>
                                        </li> */}
                                        <li>
                                            <Link to="/usecases">Use Cases</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact-us">Contact Us</Link>
                                        </li>
                                    </ul>

                                    <div className={Style.seacrh_admin}>
                                        <div className={Style.search_ico_mble}>
                                            <button
                                                type="submit"
                                                className={Style.searchicon}
                                                onClick={searchShow}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="19"
                                                    height="19"
                                                    viewBox="0 0 19 19"
                                                >
                                                    <path d="M8,16A8,8,0,0,1,2.344,2.344,8,8,0,1,1,13.657,13.657,7.947,7.947,0,0,1,8,16ZM8,1.526A6.474,6.474,0,1,0,14.474,8,6.481,6.481,0,0,0,8,1.526Z" />
                                                    <path
                                                        d="M6.761,5.606,1.394.239A.816.816,0,1,0,.239,1.394L5.606,6.761A.816.816,0,0,0,6.761,5.606Z"
                                                        transform="translate(12 12)"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className={Style.searchbar} id="head_search">
                                            <span
                                                className={Style.search_close_mble}
                                                onClick={searchClose}
                                            >
                                                <span class="icon-map-08"></span>
                                            </span>
                                            <form action="">
                                                <div className={Style.input_holder}>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        id=""
                                                        className={Style.form_control}
                                                        onFocus={searchActive}
                                                        onBlur={searchonBlur}
                                                        autoComplete="off"
                                                    />
                                                    <button type="submit" className={Style.searchicon}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="19"
                                                            height="19"
                                                            viewBox="0 0 19 19"
                                                        >
                                                            <path d="M8,16A8,8,0,0,1,2.344,2.344,8,8,0,1,1,13.657,13.657,7.947,7.947,0,0,1,8,16ZM8,1.526A6.474,6.474,0,1,0,14.474,8,6.481,6.481,0,0,0,8,1.526Z" />
                                                            <path
                                                                d="M6.761,5.606,1.394.239A.816.816,0,1,0,.239,1.394L5.606,6.761A.816.816,0,0,0,6.761,5.606Z"
                                                                transform="translate(12 12)"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className={Style.admin_login}>
                                            <div className={Style.wrapper}>
                                            <AccountSettings
                displayLoginSignupModal={displayLoginSignupModal}
              />
                                            </div>
                                        </div>
                                        {/* <div className={Style.admin_login}>
                            <ul className={Style.mainmenu}>
                                <li>
                                    <Link to="/aboutus">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/marketplace">Market Place</Link>
                                </li>
                                <li>
                                    <Link to="/usecases">Use cases</Link>
                                </li>
                                <li>
                                    <Link to="/">Contact</Link>
                                </li>
                            </ul>
                            
                            <div className={Style.seacrh_admin}>
                                <div className={Style.search_ico_mble}>
                                    <button type="submit" className={Style.searchicon} onClick={searchShow}><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19"><path d="M8,16A8,8,0,0,1,2.344,2.344,8,8,0,1,1,13.657,13.657,7.947,7.947,0,0,1,8,16ZM8,1.526A6.474,6.474,0,1,0,14.474,8,6.481,6.481,0,0,0,8,1.526Z" /><path d="M6.761,5.606,1.394.239A.816.816,0,1,0,.239,1.394L5.606,6.761A.816.816,0,0,0,6.761,5.606Z" transform="translate(12 12)"/></svg></button>
                                </div>
                                <div className={Style.searchbar} id="head_search">
                                    <span className={Style.search_close_mble} onClick={searchClose}><span class="icon-map-08"></span></span>
                                    <form action="">
                                        <div className={Style.input_holder}>
                                            <input type="text" name="" id="" className={Style.form_control} onFocus={searchActive} onBlur={searchonBlur} />
                                            <button type="submit" className={Style.searchicon} ><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19"><path d="M8,16A8,8,0,0,1,2.344,2.344,8,8,0,1,1,13.657,13.657,7.947,7.947,0,0,1,8,16ZM8,1.526A6.474,6.474,0,1,0,14.474,8,6.481,6.481,0,0,0,8,1.526Z" /><path d="M6.761,5.606,1.394.239A.816.816,0,1,0,.239,1.394L5.606,6.761A.816.816,0,0,0,6.761,5.606Z" transform="translate(12 12)"/></svg></button>
                                        </div>
                                    </form>
                                </div>
                                <div className={Style.admin_login}>
                                    <div className={Style.wrapper} >
                                        <AccountSettings/>
                                    </div>
                                </div>
                                {/* <div className={Style.admin_login}>
                                    <div className={Style.wrapper}>
                                        <div className={Style.hamb}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        <div className={Style.avatar}><img src={Assets.log} alt=""/></div>
                                    </div>
                                </div> */}
                                    </div>

                                    {/* <div className={Style.close_icon}  onClick={hamburger}>
                                <span></span>
                                <span></span>
                            </div> */}
                                </Nav>
                                {/* <div className={Style.hamburger_icon} onClick={hamburger}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className={Style.haederspacing}></div>
            <LoginPopup />
      <SignupModal />
        </React.Fragment>
    );
}

export default MarketHeader;
import React, { useState, useContext, memo, useEffect } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Context } from "../../context";
import "./AccountSettings.module.scss";
//import { useHistory } from "react-router";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import { Security } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useLocation, useHistory, Link } from "react-router-dom";
import Assets from "../Layout/CommonLayout/Asset";
import SocialMedia from "../SocialMedia";
// import ReactGA from "react-ga4";

function AccountSettings({ displayLoginSignupModal, menuOpen }) {
  const location = useLocation();
  const history = useHistory();
  const {
    state: { user },
    dispatch,
  } = useContext(Context);


  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  let handleClickTimer = null;

  useEffect(() => {
    return () => {
        handleClickTimer && clearTimeout(handleClickTimer)
    }
  }, [])

//   const handleEvent=(category,action,label)=>{
//     return ReactGA.event({
//         category: category,
//         action: action,
//         label: label // optional 
// })
// }

  const handleClick = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
    let suggestDiv = document.getElementById("suggestionList");
    if (suggestDiv) {
      suggestDiv.style.display = "none";
    }
    handleClickTimer = setTimeout(() => {
      document.body.style.overflow = "visible";
    }, [200]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchActive = () => {
    document.querySelector("#headernavs_mobile").classList.add("searchactive");
  };

  const LogoutUser = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    toast.success("Your account has been successfully Logout.");
    history.push("/");
  };

  const handleLogin =(e)=>{
    // handleEvent("Account Setting","Login",'Login')
    sessionStorage.setItem("islogin_modal", true);
    displayLoginSignupModal(e, "LOGIN")
  }
  const handleSignUp=(e)=>{
    // handleEvent("Account Setting","Sign-up",'Sign-up')
    sessionStorage.setItem("isSignUp_modal", true);
    displayLoginSignupModal(e, "SIGNUP")
  }
  const securityIcon = (
    <Link
      style={{ color: "grey" }}
      to={{ pathname: "https://nayan.co/" }}
      target="_blank"
    >
      <MenuItem style={{ padding: "8px 14px" }}>
        <Security fontSize="medium" />{" "}
        <span style={{ marginLeft: "5px", color: "black" }}>Traffic</span>
      </MenuItem>
    </Link>
  );

  useEffect(() => {
    if (menuOpen) {
      setAnchorEl(null);
    }
  }, [menuOpen]);

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          className="admin_user"
        >
          <Avatar className="avtr" src={Assets.profileicon} />
          <div className="profile__dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        className="admin_nav"
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user !== null ? (
          <div>
            <Link style={{ color: "black" }} to="/billboardssearch">
              <MenuItem>
                <Avatar fontSize="small" />

                {user?.name || ""}
              </MenuItem>
            </Link>
            <Divider />
            {/* {securityIcon} */}

            {location?.pathname === "/usecases" ||
            location?.pathname === "/marketplace" ||
            location?.pathname === "/aboutus" ||
            location?.pathname === "/mycollection" ||
            location.pathname == "/mydownloads" ||
            location.pathname == "/productview" ||
            location.pathname == "/allcollection" ? (
              <>
                {/* <Link to="/mycollection" style={{ color: "black" }}>
                  <MenuItem style={{ fontWeight: "500", color: "black" }}>
                    My Collections
                  </MenuItem>
                </Link>
                <Link to="/mydownloads" style={{ color: "black" }}>
                  <MenuItem style={{ fontWeight: "500", color: "black" }}>
                    My Downloads
                  </MenuItem>
                </Link>
                <MenuItem>My Profile</MenuItem> */}
                <Divider />
                <ul className="mainmenu" style={{ paddingTop: "0px" }}>
                  <li>
                    <Link to="/aboutus">About Us</Link>
                  </li>
                  <li>
                    <Link to="/marketplace">Market Place</Link>
                  </li>
                  <li>
                    <Link to="/usecases">Use Cases</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
                <Divider className="device-only" />
                <li className="device-only smedia_mble">
                  <SocialMedia />
                </li>
                <Divider />
              </>
            ) : (
              <></>
            )}
            <MenuItem
              onClick={(e) => {
                LogoutUser(e);
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        ) : (
          <div>
            {/* {securityIcon} */}
            {/* <Divider /> */}
            <MenuItem onClick={(e) => handleLogin(e)}>
              Login
            </MenuItem>

            <Divider />
            <MenuItem onClick={(e) =>handleSignUp(e)}>
              Sign Up
            </MenuItem>
            {location?.pathname === "/usecases" ||
            location?.pathname === "/marketplace" ||
            location?.pathname === "/aboutus" ||
            location?.pathname === "/mycollection" ? (
              <>
                <Divider />
                <ul className="mainmenu">
                  <li>
                    <Link to="/aboutus">About Us</Link>
                  </li>
                  <li>
                    <Link to="/marketplace">Market Place</Link>
                  </li>
                  <li>
                    <Link to="/usecases">Use Cases</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
                <Divider className="device-only" />
                <li className="device-only smedia_mble">
                  <SocialMedia />
                </li>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </Menu>
    </>
  );
}

export default memo(AccountSettings);

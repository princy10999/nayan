import React, { useState } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import Style from "./AccountSettings.module.scss";
import { useHistory } from "react-router";
import LoginPopup from "../LoginPopup";
import SignupModal from "../SignUpModal";
import Assets from "../Layout/CommonLayout/Asset";
import { Link } from "react-router-dom";

import SocialMedia from "../SocialMedia";

function AccountSettings() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setModal] = useState(false);
  const [showSignUpModal, setSignUpModal] = useState(false);
  const openLogin = () => {
    setModal(true);
    localStorage.setItem("loginModal", false);
  };
  const openSignUp = () => {
    setSignUpModal(true);
    localStorage.setItem("signupModal", false);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  const menuClick = (url) => {
    history.push(url);
  };
  const searchActive = () => {
      document.querySelector('#headernavs_mobile').classList.add("searchactive");
  };
  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          className="admin_user"
        >
          <Avatar className="avtr"/>
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
        <MenuItem onClick={openSignUp}>Sign Up</MenuItem>

        <Divider />

        <MenuItem onClick={openLogin}>Login</MenuItem>
      </Menu>

      <LoginPopup show={showModal} handleClose={setModal} />
      <SignupModal show={showSignUpModal} handleClose={setSignUpModal} />
    </>
  );
}

export default AccountSettings;

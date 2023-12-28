import React, { useState } from "react";
import Style from "./SocialMedia.module.scss";
import Assets from "../Layout/CommonLayout/Asset";

function SocialMedia() {
  
  return (
    <>
      <ul className={Style.smedia}>
          <li><a href="https://www.facebook.com/NAYANCAM/" target="_blank"><img src={Assets.facebook} alt="facebookIcon"/></a></li>
          <li><a href="https://twitter.com/nayancam" target="_blank"><img src={Assets.tweet} alt="twitterIcon"/></a></li>
          <li><a href="https://www.instagram.com/nayantechno/" target="_blank"><img src={Assets.instagram} alt="instagramIcon"/></a></li>
      </ul>
    </>
  );
}

export default SocialMedia;

import React, { useState } from "react";
import Style from "./MarketFooter.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import { Link } from "react-router-dom";

function MarketFooter() {
  const [socialMedias, setSocialMedias] = useState([
    { image: Assets.fb_white, link: "https://www.facebook.com/NAYANCAM/" },
    {
      image: Assets.tweet_white,
      link: "https://twitter.com/nayancam",
    },
    {
      image: Assets.insta_white,
      link: "https://www.instagram.com/nayantechno/",
    },
  ]);
  const [links, setLinks] = useState([
    { name: "About Us", link: "/aboutus" },
    // { name: "Market Place", link: "/marketplace" },
    { name: "Use Cases", link: "/usecases" },
  ]);
  const [services, setServices] = useState([
    { name: "Traffic", link: "https://traffic.nayan.co/" },
    { name: "AI Services", link: "https://traffic.nayan.co/ai-services" },
    { name: "Roadways", link: "https://traffic.nayan.co/roadways" },
  ]);
  const [rights, setRights] = useState([
    // { name: "Site Map", link: "https://traffic.nayan.co/policies" },
    { name: "Privacy Policy", link: "https://traffic.nayan.co/policies" },
    // { name: "Terms & Conditions", link: "https://traffic.nayan.co/policies" },
  ]);

  return (
    <footer className={Style.sitefooter}>
      <div className="container">
        <div className={Style.custom_container}>
          <div className="row">
            <div className={Style.ftrcol}>
              <div className={Style.wrap}>
                <header>
                  <Link to="/">
                    <img src={Assets.logo_white_svg} alt="" />
                  </Link>
                </header>

                <p>
                  <b>NAYAN</b>
                  <br />
                  <b>Dubai office:</b>
                  <br />
                  NAYAN FZ LLC, HD49B, 1st <br />
                  Floor, In5 Tech, Dubai, UAE
                  <br />
                </p>
                <ul>
                  {socialMedias.map((media) => {
                    return (
                      <li>
                        <a href={media.link} target="_blank">
                          <img src={media.image} alt="" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={Style.ftrcol}>
              <div className={Style.wrap}>
                {/* <header>Our Expertise</header> */}
                <ul>
                  {links.map((link) => {
                    return (
                      <li>
                        <a href={link.link}>{link.name}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={Style.ftrcol}>
              <div className={Style.wrap}>
                {/* <header>Our Services</header> */}
                <ul>
                  {services.map((service) => {
                    return (
                      <li>
                        <a href={service.link}>{service.name}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className={Style.btmbar}>
            <div className={Style.col}>
              <p>{`Copyright © ${new Date().getFullYear()}. All rights reserved.`}</p>
            </div>
            <div className={Style.col}>
              <ul>
                {rights.map((item) => {
                  return (
                    <li>
                      <a href={item.link}>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MarketFooter;

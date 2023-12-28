import React, { useState } from "react";
import Style from "./Footer.module.scss";

function Footer() {
  const [leftLinks, setLeftLinks] = useState([
    { name: "About us", link: "/aboutus" },
    // { name: "Market Place", link: "/marketplace" },
    { name: "Usecases", link: "/usecases" },
    { name: "Traffic", link: "https://traffic.nayan.co/" },
    { name: "AI Services", link: "https://traffic.nayan.co/ai-services" },
    { name: "Roadways", link: "https://traffic.nayan.co/roadways" },
  ]);

  /* const [rightLinks, setRightLinks] = useState([
        { name: "Privacy", link: "https://traffic.nayan.co/policies" },
        { name: "Terms", link: "https://traffic.nayan.co/policies" },
        { name: "Setting", link: "#/" },
    ]); */

  return (
    <footer
      data-mobile-hide="true"
      className={`${Style.footer_main} ${Style.active}`}
    >
      <div className={Style.footer_wrapper}>
        <ul className={Style.footer_links}>
          {leftLinks.map((link, i) => {
            return (
              <li key={i}>
                <a href={link?.link}>{link?.name}</a>
              </li>
            );
          })}
        </ul>

        <ul className={Style.footer_links}>
          {/*  {rightLinks.map((link, i) => {
                        return (
                            <li key={i}>
                                <a href={link?.link}>{link?.name}</a>
                            </li>
                        );
                    })} */}
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://traffic.nayan.co/policies"
            >
              Terms and Conditions
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://traffic.nayan.co/policies"
            >
              Privacy
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://traffic.nayan.co/blog/"
            >
              Blog
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://traffic.nayan.co/careers"
            >
              Careers
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

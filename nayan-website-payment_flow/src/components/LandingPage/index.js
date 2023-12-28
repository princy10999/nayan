// import React, { useState } from "react";
// import { Container, Typography } from "@mui/material";
import React from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

// import { Button } from "react-bootstrap";
// import SocialMedia from "../SocialMedia";
import ReactPlayer from "react-player/youtube";

import Style from "./LandingPage.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import secSectionImg from "../../assets/images/landing-page/sec-section-img.png";
import howItWorksImg1 from "../../assets/images/landing-page/how-it-block-img1.png";
import howItWorksImg2 from "../../assets/images/landing-page/how-it-block-img2.png";
import howItWorksImg3 from "../../assets/images/landing-page/how-it-block-img3.png";
import howItWorksImg4 from "../../assets/images/landing-page/how-it-block-img4.png";
import whySearchImg1 from "../../assets/images/landing-page/why-search-img-1.png";
import whySearchImg2 from "../../assets/images/landing-page/why-search-img-2.png";
import whySearchImg3 from "../../assets/images/landing-page/why-search-img-3.png";
import whySearchImg4 from "../../assets/images/landing-page/why-search-img-4.png";
import footerLogo from "../../assets/images/landing-page/footer-logo.png";

function LandingPage() {
  const history = useHistory();
  return (
    <div className={Style.landingPage_wrapper}>
      <div className={Style.landing_banner}>
        <Container className={Style.banner_inner}>
          <Row className="justify-content-center ">
            <Col xl={6} className="mt-4 mt-lg-5">
              <div className={Style.landing_logo}>
                <img src={Assets.logoMain} alt="Nayan.co" />
              </div>
              <h1 className={Style.landing_title}>
                Searching on data In sight
              </h1>
              <p className={Style.text_para}>
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don&apos;t simply skip over it entirely.
              </p>
              <div className="mt-4 text-center">
                <Button
                  bsPrefix="custom"
                  onClick={() => history.push("/")}
                  className={Style.btn_blue}
                >
                  Let's get started
                </Button>
              </div>
            </Col>
            <Col xs={12} className="mt-5">
              <div className={Style.vdo_banner}>
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=RCIbH-UK79A&feature=youtu.be"
                  controls
                  width="100%"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className={Style.sec_section}>
        <Container>
          <Row className="flex-lg-row-reverse">
            <Col lg={6} className="">
              <div className="pb-3 pb-lg-0">
                <img
                  src={secSectionImg}
                  className={Style.sec_section_img}
                  alt="Nayan"
                />
              </div>
            </Col>
            <Col lg={6} className="text-start pe-xl-5 mt-4 mt-lg-0">
              <h2 className={Style.section_title}>
                AI – driven search for anything. Literally, anything.
              </h2>
              {/* <p className={Style.sec_section_text}>
                From “how may commercial vehicle violations are there in Delhi”
                to find my any garbage nearby”, We search for data on demand, in
                real time, and all the time.
              </p>
              <p className={Style.sec_section_text}>
                Nayan gathers images and videos records from multiple sources
                and as per users’ requests. Then uses a powerful AI to identify
                and label each object on the record and find the exact details
                You have Asked for.
              </p> */}
              {/* <div className="mt-4 mb-3 mb-lg-4"> */}
                {/* <h3 className={Style.title_sm}></h3> */}
                {/* <p className={Style.sec_section_text}>
                  <strong>Nayan collects data through</strong>
                </p>
              </div>
              <ul className={Style.list_1}>
                <li>Street cameras</li>
                <li>Dashboard mobile cameras</li>
                <li>Drone cameras</li>
                <li>CCTV 1</li>
                <li>CCTV 2</li>
                <li>Highway CCTV cameras</li>
              </ul> */}
              <p className={Style.sec_section_text}>
                From Traffic Violations to Waste Management issues to Adverts on
                Billboards, whatever data you want, NAYAN can find it for you.
                We search for Data On Demand, as well as provide archived and
                historical visual data to our customers..
              </p>
              <p className={Style.sec_section_text}>
                NAYAN is the only company in the world that provides
                Crowdsourced visual data. We gather visual data from multiple
                sources and as per users’ requests. Our powerful and patented AI
                solutions then identify and label each object on the record and
                find the exact details you have asked for.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className={Style.how_it_works}>
        <Container>
          <Row>
            <Col xs={12}>
              <h2 className={Style.section_title}>How it works</h2>
            </Col>
          </Row>
        </Container>
        <Container className="pt-lg-4">
          <Row>
            <Col xs={12} className="">
              <div className={Style.howit_item_1}>
                <div className={Style.howit_block}>
                  <img
                    src={howItWorksImg1}
                    alt="Nayan.co"
                    className={Style.block_img}
                  />
                  <h3 className={Style.block_text}>
                    {" "}
                    <span>1.</span> Enter your search request, choose the area
                    on the map, and apply what filters you need.
                  </h3>
                </div>
              </div>
              <div className={Style.howit_item_2}>
                <div className={Style.howit_block}>
                  <img
                    src={howItWorksImg2}
                    alt="Nayan.co"
                    className={Style.block_img}
                  />
                  <h3 className={Style.block_text}>
                    {" "}
                    <span>2.</span> Scroll through all the search results by
                    clicking on the Pins on the Map or the Images in the
                    Sidebar.
                  </h3>
                </div>
              </div>
              <div className={Style.howit_item_3}>
                <div className={Style.howit_block}>
                  <img
                    src={howItWorksImg3}
                    alt="Nayan.co"
                    className={Style.block_img}
                  />
                  <h3 className={Style.block_text}>
                    {" "}
                    <span>3.</span> Before you start viewing the details of your
                    searches, use the Sign up button provided to register
                    yourself. If already signed up, then just Log In.
                  </h3>
                </div>
              </div>
              <div className={Style.howit_item_4}>
                <div className={Style.howit_block}>
                  <img
                    src={howItWorksImg4}
                    alt="Nayan.co"
                    className={Style.block_img}
                  />
                  <h3 className={Style.block_text}>
                    {" "}
                    <span>4.</span> While the search is in progress, Monitor
                    results in your Nayan account.
                  </h3>
                </div>
              </div>
            </Col>
            <Col xs={12} className="mt-4 text-center">
              <Button
                bsPrefix="custom"
                onClick={() => history.push("/")}
                className={Style.btn_blue}
              >
                Let's get started
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className={Style.cta_section}>
        <Container>
          <Row>
            <Col xs={12}>
              <div className={Style.cta_block}>
                <h2 className={Style.cta_text}>
                  If that is something you can think of, that is something we
                  can find
                </h2>
                <div className={Style.cta_btn}>
                  <Button
                    bsPrefix="custom"
                    className={Style.btn_blue}
                    onClick={() => history.push("/contact-us")}
                  >
                    Contact Now
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className={Style.why_search}>
        <Container className="pt-lg-4">
          <Row>
            <Col xs={12} className="mt-4 text-center">
              <h2 className={Style.section_title}>
                Why search for data with Nayan?
              </h2>
              <p className={Style.sub_text}>
                Nayan’s fast and economical AI-based solution is easy to
                customize for any industry, query, or scale
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <div className={Style.why_search_item}>
            <Row className="align-items-center">
              <Col lg={6} className="mt-0">
                <div className="">
                  <img
                    src={whySearchImg1}
                    className={Style.why_search_img}
                    alt="Nayan"
                  />
                </div>
              </Col>
              <Col lg={6} className="mt-0">
                <div className={Style.block_wrap}>
                  <h3 className={Style.block_title}>Data within reach</h3>
                  <p className={Style.block_text}>
                    Companies that own surveillance assets - street cameras,
                    drone cameras, CCTV 1 &amp; CCTV 2, others - do not usually
                    let ordinary people use them. Even at a high cost.
                  </p>
                  <p className={Style.block_text}>
                    Nayan captures, analyzes and provides exactly the data users
                    need; without them having to spend thousands on setting up
                    pricey hardware across a city.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <div className={Style.why_search_item}>
            <Row className="flex-lg-row-reverse align-items-center">
              <Col lg={6} className="">
                <div className="">
                  <img
                    src={whySearchImg2}
                    className={Style.why_search_img}
                    alt="Nayan"
                  />
                </div>
              </Col>
              <Col lg={6} className="mt-0">
                <div className={Style.block_wrap2}>
                  <h3 className={Style.block_title}>Any-wide ranging</h3>
                  <p className={Style.block_text}>
                    When training AI algorithms, we not only focus on certain
                    data points like road safety - as most companies in our
                    industry do.
                  </p>
                  <p className={Style.block_text}>
                    Our extremely strong, best-in-class AI solution is not bound
                    by any limitations, and finding new data points, any data
                    points is easy for us.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <div className={Style.why_search_item}>
            <Row className="align-items-center">
              <Col lg={6} className="mt-0">
                <div className="">
                  <img
                    src={whySearchImg3}
                    className={Style.why_search_img}
                    alt="Nayan"
                  />
                </div>
              </Col>

              <Col lg={6} className="mt-0">
                <div className={Style.block_wrap}>
                  <h3 className={Style.block_title}>
                    Scalable, as much as needed
                  </h3>
                  <p className={Style.block_text}>
                    Nayan doesn't depend on setting up new cameras or any such
                    hardware across each new city. We collaborate with local
                    drivers instead, directing them to routes and asking them to
                    record videos.
                  </p>
                  <p className={Style.block_text}>
                    That’s how we can scale our operations as per customer
                    demand.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <div className={Style.why_search_item}>
            <Row className="flex-lg-row-reverse align-items-center">
              <Col lg={6} className="">
                <div className="">
                  <img
                    src={whySearchImg4}
                    className={Style.why_search_img}
                    alt="Nayan"
                  />
                </div>
              </Col>
              <Col lg={6} className="mt-0">
                <div className={Style.block_wrap2}>
                  <h3 className={Style.block_title}>Powerfully secure</h3>
                  <p className={Style.block_text}>
                    To our enterprise clients who want an extra security layer,
                    we offer solutions that allow them to integrate our powerful
                    AI software into their existing camera network and servers.
                  </p>
                  <p className={Style.block_text}>
                    If they require extra hardware - CCTV cameras, drones, or
                    anything else - we can provide it as well.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      <div className={Style.footer}>
        <Container>
          <Row className="justify-content-center">
            <Col xl={9}>
              <Row className="justify-content-center">
                <Col md={12} lg={5} className="pb-2 pb-lg-0">
                  <div className={Style.logo}>
                    <Link to="/">
                      <img src={footerLogo} alt="Nayan.co" />
                    </Link>
                  </div>
                  <div className={Style.about_text}>
                    <div>
                      <strong>NAYAN</strong>
                      <br />
                      <b>Dubai office:</b>
                      <br />
                      NAYAN FZ LLC, HD49B, 1st <br />
                      Floor, In5 Tech, Dubai, UAE
                      <br />
                    </div>
                  </div>
                  <ul className={Style.social_links}>
                    <li>
                      <a href="https://www.facebook.com/NAYANCAM/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12.854"
                          height="24"
                          viewBox="0 0 12.854 24"
                        >
                          <g transform="translate(-0.042)">
                            <path
                              d="M12.012,13.5l.667-4.343H8.511V6.338a2.172,2.172,0,0,1,2.449-2.347h1.895V.293A23.105,23.105,0,0,0,9.491,0C6.059,0,3.815,2.08,3.815,5.846v3.31H0V13.5H3.815V24h4.7V13.5Z"
                              transform="translate(0.042)"
                              fill="#fff"
                            />
                          </g>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/nayancam">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22.154"
                          height="17.993"
                          viewBox="0 0 22.154 17.993"
                        >
                          <path
                            d="M19.877,4.484c.014.2.014.394.014.59A12.83,12.83,0,0,1,6.972,17.993,12.831,12.831,0,0,1,0,15.955a9.393,9.393,0,0,0,1.1.056,9.093,9.093,0,0,0,5.637-1.94,4.548,4.548,0,0,1-4.245-3.149,5.726,5.726,0,0,0,.858.07,4.8,4.8,0,0,0,1.195-.155A4.541,4.541,0,0,1,.9,6.382V6.326A4.573,4.573,0,0,0,2.952,6.9,4.547,4.547,0,0,1,1.546.829a12.906,12.906,0,0,0,9.362,4.751A5.126,5.126,0,0,1,10.8,4.54a4.545,4.545,0,0,1,7.858-3.107,8.939,8.939,0,0,0,2.882-1.1,4.528,4.528,0,0,1-2,2.5,9.1,9.1,0,0,0,2.615-.7A9.76,9.76,0,0,1,19.877,4.484Z"
                            fill="#fff"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/nayantechno/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23.96"
                          height="23.954"
                          viewBox="0 0 23.96 23.954"
                        >
                          <g transform="translate(-0.05 -0.044)">
                            <path
                              d="M11.98,23.954c-2.127,0-4.021-.032-4.942-.084A7.1,7.1,0,0,1,2.02,21.936,7.041,7.041,0,0,1,.085,16.916c-.112-1.986-.112-7.9,0-9.884A7.064,7.064,0,0,1,2.02,2.014,7.069,7.069,0,0,1,7.038.085C7.953.032,9.847,0,11.98,0s4.027.032,4.942.085A7.081,7.081,0,0,1,21.941,2.02a7.04,7.04,0,0,1,1.935,5.018c.112,1.985.112,7.893,0,9.878a7.089,7.089,0,0,1-1.935,5.019,7.041,7.041,0,0,1-5.019,1.935C16,23.922,14.107,23.954,11.98,23.954Zm0-2.158c.248,0,.542,0,.853.006.385,0,.819.008,1.271.008a16.843,16.843,0,0,0,4.937-.5,4.048,4.048,0,0,0,2.277-2.277c.536-1.347.507-4.271.487-6.206,0-.314-.006-.608-.006-.856s0-.542.006-.853c.02-1.935.049-4.855-.487-6.207a4.053,4.053,0,0,0-2.277-2.278,17.218,17.218,0,0,0-4.993-.494c-.439,0-.861,0-1.233.008-.3,0-.592.006-.835.006s-.541,0-.851-.006c-.383,0-.816-.008-1.265-.008a16.9,16.9,0,0,0-4.945.495A4.052,4.052,0,0,0,2.644,4.917C2.111,6.268,2.139,9.2,2.158,11.14c0,.305.006.593.006.838s0,.541-.006.851c-.02,1.935-.049,4.858.487,6.21a4.052,4.052,0,0,0,2.277,2.277,17.164,17.164,0,0,0,4.985.494c.441,0,.865,0,1.239-.008C11.45,21.8,11.738,21.8,11.983,21.8Zm0-3.677a6.133,6.133,0,1,1,4.345-1.8A6.1,6.1,0,0,1,11.983,18.119Zm0-10.134a3.993,3.993,0,1,0,3.993,3.992A4,4,0,0,0,11.983,7.985Zm6.393-.967a1.433,1.433,0,1,1,1.433-1.433A1.434,1.434,0,0,1,18.375,7.017Z"
                              transform="translate(0.049 0.044)"
                              fill="#fff"
                            />
                          </g>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col md={6} lg={3}>
                  {/* <h3 className={Style.footer_title}>Our Expertise</h3> */}
                  <ul className={Style.footer_links}>
                    <li>
                      <Link to="/aboutus" className={Style.footer_links}>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/usecases" className={Style.footer_links}>
                        Use Cases
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col md={6} lg={4}>
                  {/* <h3 className={Style.footer_title}>Our Services</h3> */}
                  <ul className={Style.footer_links}>
                    <li>
                      <a href="https://traffic.nayan.co/" target="_blank">
                        Traffic
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://traffic.nayan.co/ai-services"
                        target="_blank"
                      >
                        AI Services
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://traffic.nayan.co/roadways"
                        target="_blank"
                      >
                        Roadways
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col md={12} className={Style.footer_botm}>
                  <Row className="align-items-center">
                    <Col md={6}>
                      <p
                        className={Style.copyright}
                      >{`Copyright © ${new Date().getFullYear()}. All rights reserved.`}</p>
                    </Col>
                    <Col md={6}>
                      <ul className={Style.bottom_links}>
                        <li>
                          <a
                            href="https://traffic.nayan.co/policies"
                            target="_blank"
                          >
                            Privacy Policy
                          </a>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div className="text-dark">LandingPage</div> */}
    </div>
  );
}

export default LandingPage;

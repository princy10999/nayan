import React, { useState } from "react";
import Style from "./AboutUs.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import ReactPlayer from "react-player";
import Slider from "react-slick";
//import { Link } from "@mui/material";
import { Link } from "react-router-dom";
function AboutUs() {
  const [services, setServices] = useState([
    { image: "https://drive.google.com/uc?export=download&id=1NiUjVurLwBfNGNbmW3n21SZHIAnG1OQ4" , name: "Traffic and Road Monitoring",link:"Traffic" },
    { image: "https://drive.google.com/uc?export=download&id=1AU2qdvXsUIlR240ssQvJpKsWNEkBC0oP", name: "Health",link:"Health"  },
    { image: "https://drive.google.com/uc?export=download&id=1Y8jLC7FapSfZj49eR8KypxrL89u8lut9", name: "Billboard Monitoring and AI based Brand recognition metrics",link:"Billboard" },
    { image: "https://drive.google.com/uc?export=download&id=1NZA4w9BKsrw4JBXJ57UpCbCOuZKNFy1k", name: "Public Infrastructure Monitoring" ,link:"Public Space Monitoring"},
    { image: "https://drive.google.com/uc?export=download&id=10oVK_72t1AtePsz5V7g8ZTfwXSHZCZbi", name: "Fleet Management" ,link:"Fleet Management"},
    { image: "https://drive.google.com/uc?export=download&id=138x2EpMQ6fulnFisNpAoGXb-_DSQ-KsN", name: "Manufacturing SuperVision" ,link:"Manufacturing Supervision"},
    { image: "https://drive.google.com/uc?export=download&id=1isiY4Jp9Q1XRpPzcMWD5QGpjX7XrZNra", name: "Retail" ,link:"Retail"},
  ]);
  const [useCases, setUseCases] = useState([
    {
      heading: "Fleet Management",
      description:
        "NAYAN Search provides state-of-the-art intelligent fleet management solutions ....",
    },
    {
      heading: "Billboard",
      description:
      "Use NAYAN search to detect Billboards and analyze your company logos ...",
    },
  ]);
  const [volume, setVolume] = useState(100);
  const [play, setPlay] = useState(false);
  const settings = {
    /* prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow/>, */
    infinite: false,
    arrows: true,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className={Style.whiteBg}>
      <section className="slimbnr">
        <div className="container">
          <header className="pagetitle">
            <h1>About Us</h1>
          </header>
        </div>
      </section>

      <section className={Style.abtintro}>
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className={Style.imgsec}>
                <figure className={Style.imgwrap}>
                  <img src="https://drive.google.com/uc?export=download&id=1JyFEJ2IhtVRF3wJFq_c7jI0pqOFIeIRA" alt="" />
                </figure>
                {/* <figure className={Style.imgwrap}>
                  <img src={Assets.about_02} alt="" />
                </figure> */}
              </div>
            </div>
            <div className="col-xl-6">
              <div className={Style.cntsec}>
                {/* <h2 className={Style.sectitle}>Big Heading</h2> */}
                <div className={Style.cnt}>
                  <p>
                  NAYAN is a leader in enterprise AI software, services, and applications, helping companies transform their operations and solve the complexities of digital information today. With our AI solutions and rich partner ecosystem, our customers can address their current and future challenges, empowering them to run more efficiently, accelerate decision making, and gain a competitive edge.
                  </p>
                </div>
                <h3>Who we are</h3>
                <p>With our roots in the academic world, we build original and cutting-edge AI technologies that allow us to offer fast, scalable, economical AI-based solutions that can be customized for any industry with nearly zero effort in horizontal and vertical scalability.</p>
                {/* <h3>Sub Heading Two</h3>
                <p>Morbi ornare velit vitae felis</p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Style.servicesec}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h2 className={Style.sectitle}>Why Us</h2>
            </div>
            <div className="col-lg-8">
              <div className={Style.cntsec}>
                <p>
                Our proprietary AI workflows allows us to develop powerful and efficient Computer Vision solutions that are scalable and adaptable for a wide range of applications. Our technologies are trusted by customers and partners in many industry verticals including
                </p>
              </div>
            </div>
          </div>
          <div className={Style.services}>
            <Slider {...settings} className={Style.serviceslider}>
              {services.map((service) => {
                return (
                  <div className={Style.slideitem}>
                    <Link to={`/usecasedetail?usecase=${service.link}`}>
                      <div className={Style.items}>
                        <figure className={Style.iconsec}>
                          <img src={service.image} alt=""  className={Style.aboutUsSliderImage}/>
                        </figure>
                        <header className={Style.itemtitle}>
                          {service.name}
                        </header>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </section>

      <section className={Style.endsec}>
        <div className="container">
          <div className={Style.endsecrow}>
            <div className={Style.videocol}>
              <div className={Style.videosec}>
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=lq6hoXNd9OI"
                  volume={volume}
                  width={"100%"}
                  // playing={true}
                  height={"100%"}
                  controls={true}
                  pip={true}
                  // light={Assets.videoposter}
                  playIcon={
                    <div className={Style.videoposter}>
                      <button className={Style.paybtn}></button>
                    </div>
                  }
                  className={Style.video}
                />
                {/* <video className="video">
                                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                                </video> */}
                {/* <figure className={Style.videoposter}><img src={Assets.videoposter} alt=""/> <button className={Style.paybtn}></button></figure> */}
              </div>
            </div>
            <div className={Style.boxscol}>
              {useCases.map((usecase) => {
                return (
                  <div className={Style.box}>
                    <div className={Style.wrapper}>
                      <header className={Style.boxtitle}>
                        <a href={`/usecasedetail?usecase=${usecase.heading}`}>{usecase.heading}</a>
                      </header>
                      <div className={Style.cntsec}>
                        <p>{usecase.description} </p>
                      </div>
                      <Link
                        to={`/usecasedetail?usecase=${usecase.heading}`}
                        className={Style.arwlink}
                      ></Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;

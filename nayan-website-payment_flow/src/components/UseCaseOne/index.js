import React, { useState } from "react";
import Style from "./UseCaseOne.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import ReactPlayer from "react-player";
import { useLocation, useHistory } from "react-router-dom";
import { style } from "@mui/system";

function UseCaseOne() {
  const searchQuery = useLocation().search;
  const useCaseType = new URLSearchParams(searchQuery).get("usecase");
  const images = {
    Traffic: [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1o_yKIXcc75cfp2nc3dEuPXJPMDBl54RI",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1-T8OUWMkPmalXYzqjWeGuqXQN89Q3bzB",
      },
    ],
    Health: [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1lCeFY-QzSRnSed0W6luoXs3zcDDL_Bg-",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1ipO1wC6CfU8Qe1yRPWi3kmD9Z4CH7Pud",
      },
    ],
    Billboard: [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1cWsOwg-y70w6ub2XaEH5KRGi39touU_T",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1BBUzo-o78ZHcTT26ePaarB63k-KCYqgq",
      },
    ],
    "Fleet Management": [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1jE-zDjIJH_U5KHisgpmZcfXfMIxjAr-b",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1K_6qL6XTXwpg17pRzBbpjdOu2BRkWqU4",
      },
    ],
    Retail: [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1xlqLBJY_YheuXYDSTK5Cr-3Sqc8bQjCv",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1gBlvDtd3Hm3y1wSdny3khBwR88QjV2ny",
      },
    ],
    "Public Space Monitoring": [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1kFwSZ4YeScUA5LXN98DpZjTK2utnm5sn",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1LUrcAwwjjEb823Rgke180kSRm8yOMi0f",
      },
    ],
    "Manufacturing Supervision": [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1FCMnp0M8gOjNBEH3an4fhic49cjVlMjv",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1IsWuoTmrmy_H27xBjeuXUUTZIzpYG2Fb",
      },
    ],
  };

  // const [images,setImages] = useState([{image:Assets.usecasedetail01},{image:Assets.usecasedetail02}]);
  // const [relatedImages,setRelatedImages] = useState([{image:Assets.usecasedetail03},{image:Assets.usecasedetail04},{image:Assets.usecasedetail05}])
  const relatedImages = {
    Traffic: [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1f0__uoc4TSifWhzohAIOgKpiv_WByY1Z",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1jxnp4k2luPIO9T7rislz6WUXBGdxgPJr",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1Bv__w8iXwEHeNrJw0V-RDIMZYCNE2ltM",
      },
    ],
    Health: [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1F2qy2ac7c9hrOdxaUVFCEw-7GWcftFfY",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1jI66KqMxohRMb0A2rVJvkIEHMB1arbeJ",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1-AL9RBpXzAjTE-BiF5ppGhLIBz5Euqfi",
      },
    ],
    Billboard: [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1N9Ft9lnZDi8h4wU3PXExNQ4EE6KVMl8C",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=14KayRvkmuyJ5ZxA86Bofj71q-5KCnlMq",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1y-hzLeMY7MvgDH7c4Wa4uxk6R2LD7XLI",
      },
    ],
    "Fleet Management": [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1qvb5huKNi5fQiF11YjA_PXtY6g70ODt5",
      },
      {
        image:
          " https://drive.google.com/uc?export=download&id=1BjUv_pyqREDirAEsZ69gbPoXewNK_KPJ",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=1FUGKr2A6AIFxarYC3JyUB-iX-DpUlYsc",
      },
    ],
    Retail: [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1UxrSnXI9MtI_ksoyHJDyMCYI_wgheg5v",
      },
      {
        image:
          " https://drive.google.com/uc?export=download&id=1HUkz4iERHhMfRwczM2ZIvzMofVp6xKxC",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=16arZvBHBK69KCm_r9nNJAjsqxEv-jLSs",
      },
    ],
    "Public Space Monitoring": [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1_J00svksI3xh-cVrkAtbs4Dqey_gsSSx",
      },
      {
        image:
          " https://drive.google.com/uc?export=download&id=1hF3wuCp4b1UAiP1DwFM30Q3-W1AzvVbG",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=12wtJm1K5oImEzOwqCzIMXh6LI5wYzE8U",
      },
    ],
    "Manufacturing Supervision": [
      {
        image:
          "https://drive.google.com/uc?export=download&id=1LwpeiLn4Jdi_dhr6yQTktKt5fNiZhgzh",
      },
      {
        image:
          " https://drive.google.com/uc?export=download&id=11gYQqYSxhpWB9fOHDMdT3Nco-VeHmfHw",
      },
      {
        image:
          "https://drive.google.com/uc?export=download&id=16xFTWgmP-OX91Pv9eybvrpq5ybLZRRsb",
      },
    ],
  };

  const description = {
    Traffic: {
      desc: "NAYAN provides constant traffic and Road Monitoring . Our AI powered NAYAN Search platform can   notify our Government, Business and Individual clients of any accidents, traffic violations,  impending slowdowns and traffic bottlenecks. Our innovative computer vision based system is developed to provide efficient analysis of traffic flow and tracking vehicles of interest. Our coverage of all road infrastructure ensures that we can capture data for everywhere, included areas without CCTV coverage.",
      list: [
        "Road Monitoring",
        "Vehicles monitoring",
        "Automatic incident reporting",
        "Automated Violations Capture and Ticket Generation",
        "Vehicle Counting",
        "On Demand Deployment for specific areas/events",
        "Cloud and On premise storage.",
      ],
      video:
        "https://www.youtube.com/watch?v=8ZQqTodv994",
    },
    Health: {
      desc: "NAYAN’s AI technology is tailored to deliver improved results across a growing array of applications and deployment options for Healthcare related applications.  Whether the client is a Hospital, Business requiring PPE kit adoption, Event Organizer monitoring attendees or City Planners and Citizens identifying COVID breakout zones, NAYAN”s computer vision drives improvement in human outcomes by replicating visual recognition with AI to identify objects, images and actions. Contact-free? Automated continuous monitoring? We have them all. Our AI system serves as an optimizer for your care efficiency and a powerful facilitator for your operations.",
      list: [
        "PPE Kit Detection ",
        "Cough and Mask Detection",
        "Automated Surgical Logs: Operating room procedure detection",
        "Facial Authentication",
        "Medical Imaging Analysis",
        "Patient Fall Detection",
        "Queue Management.",
        "Home based remote Patient monitoring.",
        "Shift Monitoring",
      ],
      video:
        "https://www.youtube.com/watch?v=1uqzsSdnRo4",
    },
    Billboard: {
      desc: "Use NAYAN search to detect Billboards and analyze your company logos and brand exposure in images and videos to monitor and monetize your visual content. Measure a Billboard's/ Signage size, clarity, centrality, and exclusivity, algorithmically calibrated with human response data. Our Billboard Analysis offering combines three state-of-the-art AI models in one: logo, prominence, and placement.",
      list: [
        "Video and Image captures of Public Space branding",
        "Capture video and image evidence against fraudulent Branding and Copyrights infringement",
        "Details of locations where branding is found",
        "Providing Metrics of Branding recognition",
        "Quality Analysis and crowd analysis of Billboard Branding",
        "Identify open billboard and branding space in Public Areas",
      ],
      video:
        "https://www.youtube.com/watch?v=x9-ex_VvkFI",
    },
    "Fleet Management": {
      desc: "NAYAN Search provides state-of-the-art intelligent fleet management solutions that allows organizations to monitor and Optimize Fleet Operations and Last Mile Delivery Drivers Powered by artificial intelligence, NAYAN SEARCH  collects a wide range of vehicle location, driver behavior and diagnostics data that can be tracked remotely. Our AI dynamically detects events that are important to fleet operators, such as Driver Detection, Violation Analysis, and object recognition.",
      list: [
        "HD video of driver and road",
        "Video of events leading up to, during, and after an incident",
        "Capturing Non Accident Incidents of note. For example, Driver driving without Helmet. ",
        "Distracted and Drowsy driver detection to prevent accidents",
        "ANPR automatically identifies drivers for accurate data and reports",
        "Accident detection detects potential accidents and sends an alert to fleet manager",
        "Secure Cloud Storage of Data",
        "Insurance and Driver hours compliance information.",
        "Driver Rating with behavior analysis",
      ],
      video:
        "https://www.youtube.com/watch?v=nXoA2r8z1co",
    },
    Retail: {
      desc: "NAYAN provides solutions to allow retailers to collect large volumes of visual data helpful in designing a better customer and employee experience. Our AI can help count and identify customers, provide entry/exit analysis and even help chart the customer journey within an area by tracking movements.  Additionally NAYAN can also provide visual supervision of entry/exit points of Competitors as a solution of Competitor Analytics.",
      list: [
        "Street Supervision of Market",
        "People counting",
        "Crowd Analysis - MAG ( Mood, Age, Gender Analysis)",
        "On Demand Supervision of Events - Shop opening etc",
        "Crowd Movement Heatmap analytics",
        "Theft projection",
        "Object Identification",
      ],
      video:
        "https://www.youtube.com/watch?v=1uqzsSdnRo4",
    },
    "Public Space Monitoring": {
      desc: "NAYAN as a company has been very cognizant of the role it can play in improving citywide infrastructure. Hence we have devoted significant resources into building services to assist City Authorities, NGO’s and Businesses that require visual data of negative externalities in the city. We work with Municipalities and City Planners to identify unpicked garbage, illegal street settlements, broken public infrastructure etc to assist them in improving their services. We also provide NGO’s with visual data relevant to their initiatives - Identify Water Stagnation in Public Spaces, Public Bathroom Availability, Low Income Housing and Healthcare availability, Women Care clinics etc.",
      list: [
        "Object Recognition",
        "Incident reporting",
        "Location and Visual Details of Public issues like Unpicked Garbage, Potholes",
        "Alerts for broken traffic lights, street lights",
        "Public Transportation monitoring",
        "Violence and Rioting Alerts",
        "Fire and Safety Hazard Alerts",
        "Monitoring of Public Services like Parks and Public Restrooms",
      ],
      video:
        "https://www.youtube.com/watch?v=92pWmDuk3SE",
    },
    "Manufacturing Supervision": {
      desc: "The manufacturing industry has already adopted a wide range of automation solutions powered by NAYAN’s Computer Vision. From automating quality control, detecting breakages, minimizing safety risks, to increasing production efficiency. Our systems can collect real-time data and leverage computer vision and machine learning algorithms to analyze it and benchmark the results against a predefined set of standards and provide both raw data and actionable insights to Industries and Manufacturers.",
      list: [
        "Event recognition",
        "Predictive maintenance",
        "Remote measurement",
        "Object counting",
        "Safety Alerts",
        "Defect Inspection",
        "Shift Monitoring",
        "Fall Detection",
        "Fire and Hazard Warnings",
      ],
      video:
        "https://www.youtube.com/watch?v=E863mYrozbc",
    },
  };
  const [volume, setVolume] = useState(100);
  const [play, setPlay] = useState(false);
  return (
    <>
      <section className="slimbnr">
        <div className="container">
          <header className="pagetitle">
            <h1>Use Case</h1>
          </header>
        </div>
      </section>

      <section className={Style.pagecntsec}>
        <div className="container">
          <div className={Style.secwrapper}>
            <div className={Style.titlewrap}>
              <h2 className={Style.sectitle}>{useCaseType}</h2>
            </div>
            <p>
              {description[useCaseType] && description[useCaseType].desc
                ? description[useCaseType].desc
                : ""}
            </p>

            <div className={Style.videoimgs}>
              <div className={Style.videowrapper}>
                <div className={Style.usecase_videosec}>
                  <ReactPlayer
                    url={
                      description[useCaseType] && description[useCaseType].video
                        ? description[useCaseType].video
                        : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    }
                    volume={volume}
                    width={"100%"}
                    playing={true}
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
                  {/* <video className={Style.video}>
                                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                                </video> */}
                  {/* <figure className={Style.videoposter playpause}><img src="assets/images/use-cases/detail/use_videoposter.jpg" alt=""/> <button className={Style.paybtn"></button></figure> */}
                </div>
              </div>
              <div className={Style.imgswrapper}>
                {images[useCaseType] &&
                  images[useCaseType].length &&
                  images[useCaseType].map((image) => {
                    return (
                      <figure className={Style.imgsec}>
                        <img src={image.image} alt="" />
                      </figure>
                    );
                  })}
              </div>
            </div>

            <h4 className={Style.sectitleh4}>What NAYAN can do for you :</h4>
            <ul>
              {description[useCaseType] &&
                description[useCaseType].list &&
                description[useCaseType].list.map((list) => (
                  <li className="list_style">{list}</li>
                ))}
            </ul>

            <div className={Style.relatedimgs}>
              {relatedImages[useCaseType] &&
                relatedImages[useCaseType].length &&
                relatedImages[useCaseType].map((image) => {
                  return (
                    <figure className={Style.imgsec}>
                      <img src={image.image} alt="" />
                    </figure>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UseCaseOne;

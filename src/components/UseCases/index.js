import React, { useState } from "react";
import Style from "./UseCases.module.scss";
import UseCasesContent from "../UseCasesContent";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Assets from "../Layout/CommonLayout/Asset";

function UseCases() {
  const tabs = [
    {
      eventKey: "All",
      title: "All",
      mobHead: "All",
      deskHead: "deskAll",
      data: [
        {
          image: Assets.fleet_management,
          heading: "Fleet Management",
          description:
            "NAYAN Search provides state-of-the-art intelligent fleet management solutions ....",
        },
        {
          image: Assets.health,
          heading: "Health",
          description:
            "NAYAN’s AI technology is tailored to deliver improved results across a growing array ....",
        },
        {
          image: Assets.traffic,
          heading: "Traffic",
          description:
            "NAYAN provides constant traffic and Road Monitoring . Our AI powered NAYAN Search....",
        },
        {
          image: Assets.billboard,
          heading: "Billboard",
          description:
            "Use NAYAN search to detect Billboards and analyze your company logos ...",
        },
        {
          image: Assets.manufacturing,
          heading: "Manufacturing Supervision",
          description:
            "The manufacturing industry has already adopted a wide range of automation solutions ...",
        },
        {
          image: Assets.retail,
          heading: "Retail",
          description:
            "NAYAN provides solutions to allow retailers to collect large volumes of visual data helpful ....",
        },
        {
          image: Assets.publicSpace,
          heading: "Public Space Monitoring",
          description:
            "NAYAN as a company has been very cognizant of the role it can play in improving citywide ....",
        },
      ],
    },
    {
      eventKey: "Traffic",
      title: "Traffic",
      mobHead: "Traffic",
      deskHead: "deskTraffic",
      data: [
        {
          image: Assets.traffic,
          heading: "Traffic",
          description:
            "NAYAN provides constant traffic and Road Monitoring . Our AI powered NAYAN Search....",
        },
      ],
    },
    {
      eventKey: "Health",
      title: "Health",
      mobHead: "Health",
      deskHead: "deskHealth",
      data: [
        {
          image: Assets.health,
          heading: "Health",
          description:
            "NAYAN’s AI technology is tailored to deliver improved results across a growing array ....",
        },
      ],
    },
    {
      eventKey: "Billboard",
      title: "Billboard",
      mobHead: "Billboard",
      deskHead: "deskBillboard",
      data: [
        {
          image: Assets.billboard,
          heading: "Billboard",
          description:
            "Use NAYAN search to detect Billboards and analyze your company logos ...",
        },
      ],
    },
    {
      eventKey: "Manufacturing SuperVision",
      title: "Manufacturing SuperVision",
      mobHead: "Manufacturing SuperVision",
      deskHead: "deskIManufacturingSuperVision",
      data: [
        {
          image: Assets.manufacturing,
          heading: "Manufacturing Supervision",
          description:
            "The manufacturing industry has already adopted a wide range of automation solutions ...",
        },
      ],
    },
    {
      eventKey: "Fleet Management",
      title: "Fleet Management",
      mobHead: "Fleet Management",
      deskHead: "deskFleetManagement",
      data: [
        {
          image: Assets.fleet_management,
          heading: "Fleet Management",
          description:
            "NAYAN Search provides state-of-the-art intelligent fleet management solutions ....",
        },
      ],
    },
    {
      eventKey: "Retail",
      title: "Retail",
      mobHead: "Retail",
      deskHead: "deskRetail",
      data: [
        {
          image: Assets.retail,
          heading: "Retail",
          description:
            "NAYAN provides solutions to allow retailers to collect large volumes of visual data helpful ....",
        },
      ],
    },
    {
      eventKey: "Public Space Monitoring",
      title: "Public Space Monitoring",
      mobHead: "Public Space Monitoring",
      deskHead: "deskPublicSpaceMonitoring",
      data: [
        {
          image: Assets.publicSpace,
          heading: "Public Space Monitoring",
          description:
            "NAYAN as a company has been very cognizant of the role it can play in improving citywide ....",
        },
      ],
    },
  ];

  const scrolLeft = () => {
    let element = document.querySelector(".nav-tabs");
    element.scrollLeft += 50;
  };
  return (
    <>
      <section className="slimbnr">
        <div className="container">
          <header className="pagetitle">
            <h1>Use Cases</h1>
          </header>
        </div>
      </section>

      <section className={Style.usecasesec}>
        <div class="container">
          <div className={`${Style.casestabwrapper} ${Style.responsive_tabs}`}>
            <button className={Style.slideright_arw} onClick={scrolLeft}>
              <span className="icon-arrow-right"></span>
            </button>
            <Tabs
              defaultActiveKey="All"
              id="uncontrolled-tab-example"
              className={Style.nav_tabs}
            >
              {tabs.map((tab, index) => (
                <Tab
                  eventKey={tab.eventKey}
                  id={tab.eventKey}
                  title={tab.title}
                  className={Style.nav_item}
                >
                  <UseCasesContent
                    mobHead={tab.mobHead}
                    deskHead={tab.deskHead}
                    data = {tab.data}
                  />
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}

export default UseCases;

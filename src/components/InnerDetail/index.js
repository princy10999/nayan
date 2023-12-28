import React, { useEffect, useState, useContext } from "react";
import Moment from "react-moment";
import { Context } from "../../context";
import { fetchEventDetailsById, loadSearchData } from "../../api/userApi";
import Style from "./InnerDetail.module.scss";
import CommonLayout from "../Layout/CommonLayout";
import Assets from "../Layout/CommonLayout/Asset";
//import Actions from "../Actions";
import ShareDetails from "../ShareDetails";
import ChatInputs from "../ChatInputs";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import EditInputs from "../EditInputs";
import { saveAs } from "file-saver";
import BillBoardPopup from "../BillBoardPopup";
import { Skeleton } from "@mui/material";
import GoogleMap from "../Map/googlemap";
import { TitleCaseConverter } from "../../utils/string-helper";

function InnerDetail() {
  // context state
  const {
    state: { user },
  } = useContext(Context);

  const history = useHistory();
  // State for Info Window

  // Get the search Keyword from the Url
  const searchQuery = useLocation().search;
  const boardName = new URLSearchParams(searchQuery).get("id");

  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState({});
  const [violationImage, setViolationImage] = useState("");
  const [showActions, setActions] = useState(false);
  const [showSmiley, setSmiley] = useState(false);
  const [isBlur, setIsBlur] = useState(true);
  const [smileyList, setSmileyList] = useState([
    { image: Assets.smile },
    { image: Assets.love },
    { image: Assets.sad },
  ]);
  const [showMedias, setMedias] = useState(false);
  const [showChat, setChat] = useState(false);
  const [showEdit, setEdit] = useState(false);
  const [setInitial, setInitialScreen] = useState(true);

  const [subImages, setSubImages] = useState([
    { image: Assets.billboard01 },
    { image: Assets.billboard02 },
  ]);
  const [showModal, setModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([]);
  const [mapDatas, setmapDatas] = useState([]);

  const [currentSmiley, setInitialSmiley] = useState("");

  const [nearByLocations, setNearbyLocations] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  /* useEffect(() => {
    setViolationImage(history?.location?.state?.image_url);
  }, [history]); */

  useEffect(() => {
    if (user !== null) {
      fetchEventDetailsById(
        setEventData,
        setLoading,
        boardName,
        user?.token,
        user?.tokenType,
        user?.email,
        user?.client,
        user?.exp
      );
    }
  }, [boardName, user]);

  useEffect(() => {
    if (eventData?.latitude && eventData?.longitude) {
      let locationArray = [eventData];
      setCurrentLocation(locationArray);

      setmapDatas(locationArray);
    }

    if (eventData) {
      let input = eventData.eventType;
      let selectRange = 2;
      let currentMapCenter = {
        lat: eventData.latitude,
        lng: eventData.longitude,
      };
      let selectCity = "";
      let startDate = "";
      let endDate = "";
      if (input)
        // Api call to fetch nearby points also
        loadSearchData({
          input,
          selectCity,
          selectRange,
          startDate,
          endDate,
          email: user?.email,
          token: user?.token,
          client: user?.client,
          expiry: user?.exp,
          currentMapCenter,
          setNearbyLocations,
        });
    }
  }, [eventData]);

  useEffect(() => {
    let array = currentLocation;

    if (nearByLocations) {
      const resultArray = array.concat(nearByLocations);
      setAllLocations(resultArray);
    }
  }, [nearByLocations]);

  // initially set smiley
  useEffect(() => {
    setInitialSmiley(Assets.happy);
  }, []);

  useEffect(() => {
    if (eventData?.images?.length) {
      const imagesArray = eventData.images.map((image) => ({ image }));
      setSubImages(imagesArray.reverse());

      setViolationImage(imagesArray[0].image);
    }
  }, [eventData?.images]);

  const showPopup = (imgPath) => {
    setViolationImage(imgPath);
    setModal(true);
  };
  const hidemodal = () => {
    setModal(false);
  };
  useEffect(() => {});
  const setShowActions = () => {
    if (!showActions) setActions(true);
    else setActions(false);
  };

  const setShowSmiley = () => {
    if (!showSmiley) setSmiley(true);
    else setSmiley(false);
  };

  const setShowMedias = () => {
    if (!showMedias) {
      setMedias(true);
      setInitialScreen(false);
      setSmiley(false);
    } else setMedias(false);
  };

  const setShowChat = () => {
    if (!showChat) {
      setChat(true);
      setEdit(false);
      setInitialScreen(false);
      setSmiley(false);
    } else setChat(false);
  };

  const setShowEdit = () => {
    if (!showEdit) {
      setChat(false);
      setEdit(true);
      setInitialScreen(false);
      setSmiley(false);
    } else setEdit(false);
  };

  const downloadImage = () => {
    saveAs(Assets.main_image, Assets.main_image);
  };

  const hideMediaDetails = () => {
    setInitialScreen(true);
    setMedias(false);
  };

  const cancelChat = () => {
    setInitialScreen(true);
    setChat(false);
  };
  const imageSwitch = (image1) => {
    setViolationImage(image1);
  };

  // change reaction
  const changeEmoji = (smiley) => {
    setInitialSmiley(smiley.image);
    setSmiley(false);
  };
  const toggleBlur = () => {
    setIsBlur((prevState) => !prevState);
  };

  const showLoading = () => (
    <>
      <div className={Style.billboradRow}>
        <div className={Style.leftcol}>
          <div className={Style.mainImg}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={441}
              height={441}
              style={{ borderRadius: "8px" }}
            />
          </div>
          {/* */}
        </div>
        <div className={Style.rightcol}>
          <div className={Style.detail_n_share}>
            <div className={Style.detail_cnt}>
              <header>
                <Skeleton variant="text" animation="wave" width="80%" />
              </header>
              <div className={Style.detailwrap}>
                <div className={Style.cols}>
                  <ul>
                    <li>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={120}
                        height={20}
                      />
                    </li>
                    <li>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={120}
                        height={20}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={Style.mapView}>
              <div className={Style.mapsec}>
                {/* <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    width={250}
                                    height={100}
                                /> */}
              </div>
            </div>

            <div className={Style.action_sec}></div>
          </div>
          <div className={Style.thumbNails}>
            <div className={Style.thumbWrap}>
              <figure className={Style.imgOuter}>
                <Skeleton variant="circular" width={40} height={40} />
              </figure>
            </div>
            <div className={Style.thumbWrap}>
              <figure className={Style.imgOuter}>
                <Skeleton variant="circular" width={40} height={40} />
              </figure>
            </div>
            <div className={Style.thumbWrap}>
              <figure className={Style.imgOuter}>
                <Skeleton variant="circular" width={40} height={40} />
              </figure>
            </div>
            <div className={Style.thumbWrap}>
              <figure className={Style.imgOuter}>
                <Skeleton variant="circular" width={40} height={40} />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // // func for show on Map
  // const redirectToPage = () => {
  //   // Coming from Map Page
  //   if (JSON.parse(sessionStorage.getItem("isMapBoard"))) {
  //     sessionStorage.removeItem("isMapBoard");
  //     history.goBack();
  //   } else {
  //     sessionStorage.setItem("dis_anim", true);
  //     history.push(`/map?search=${eventData?.eventType}&id=${boardName}`);
  //   }
  // };

  // func for show on Map
  const redirectToPage = () => {
    // Coming from Map Page
    if (JSON.parse(sessionStorage.getItem("isMapBoard"))) {
      sessionStorage.removeItem("isMapBoard");

      // history.goBack();
      history.push(
        `/map?search=${eventData?.eventType}&id=${boardName}&lat=${eventData?.latitude}&long=${eventData?.longitude}`
      );
    } else {
      sessionStorage.setItem("dis_anim", true);
      history.push(
        `/map?search=${eventData?.eventType}&id=${boardName}&lat=${eventData?.latitude}&long=${eventData?.longitude}`
      );
    }
  };

  return (
    <>
      <CommonLayout>
        <div className={Style.billboard_wrapper}>
          {/* <div className={Style.dashboard_action_wrapper}>
            <div className={Style.filter_wrapper} onClick={setShowActions}>
              <img src={Assets.billicon01} alt="" />
            </div>
            <div className={Style.action_wrapper}>
              <img src={Assets.billicon02} alt="" />
            </div>
            {showActions === true ? <Actions /> : null}
          </div> */}

          <div className={Style.main_head}>
            {TitleCaseConverter(user?.name || "", " ")}
          </div>
        </div>
        <div className={Style.project_extra_wrapper}>
          <div className={Style.back_btn}>
            <Button bsPrefix="custom" onClick={() => history.goBack()}>
              <span className="icon-back-arw"></span>
            </Button>
          </div>

          <div className={Style.project_extra_inner}>
            <div className={Style.bilboardDetailWrapper}>
              {loading && showLoading()}
              {!loading && (
                <div className={Style.billboradRow}>
                  <div className={Style.leftcol}>
                    <div className={Style.mainImg}>
                      <figure className={Style.imgOuter}>
                        <img
                          className={
                            (eventData?.eventType?.toLowerCase() ===
                              "commercial vehicle violation" ||  eventData?.eventType?.toLowerCase() ==="violation")&& isBlur
                              ? "blur-layer"
                              : ""
                          }
                          src={violationImage || ""}
                          alt=""
                          onClick={() =>
                            showPopup(violationImage || subImages[0]?.image)
                          }
                        />
                      </figure>
                    </div>
                  </div>
                  <div className={Style.rightcol}>
                    <div className={Style.detail_n_share}>
                      <div className={Style.detail_cnt}>
                        <header>{eventData.eventType || " "}</header>
                        <div className={Style.detailwrap}>
                          <div className={Style.cols}>
                            <ul>
                              <li>
                                <span>ID</span>
                                {eventData?.id}
                              </li>
                              <li>
                                <span>Recorded On</span>
                                <Moment format="DD/MM/YYYY hh:mm A">
                                  {eventData?.recorded_on}
                                </Moment>
                              </li>
                              {eventData?.location && (
                                <li>
                                  <span>Physical Location</span>
                                  {eventData?.location || "N/A"}
                                </li>
                              )}
                            </ul>
                          </div>
                          {eventData?.data && (
                            <div className={Style.cols}>
                              <ul>
                                {Object.entries(eventData?.data).map(
                                  ([title, value], index) => {
                                    return title && value ? (
                                      <li key={title + value}>
                                        <span>{TitleCaseConverter(title)}</span>
                                        <span
                                          style={
                                            title === "violation_type"
                                              ? {
                                                  textTransform: "uppercase",
                                                  fontWeight: "500",
                                                }
                                              : {
                                                  fontWeight: "500",
                                                }
                                          }
                                        >
                                          {value}
                                        </span>
                                      </li>
                                    ) : null;
                                  }
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {(eventData?.eventType?.toLowerCase() ===
                        "commercial vehicle violation"||eventData?.eventType?.toLowerCase() === "violation") &&
                        !user?.isSuperAdmin && (
                          <div className="mb-5">
                            <span style={{ float: "right" }}>
                              {TitleCaseConverter(
                                "To view this image contact us: "
                              )}
                              <a href="mailto:info@nayantech.com?subject=Request Image View">
                                click here
                              </a>
                            </span>
                          </div>
                        )}

                      <div className={Style.mapView}>
                        <div className={Style.mapsec}>
                          {/* <img src={Assets.innemapbg} alt="" /> */}

                          <GoogleMap
                            mapDatas={allLocations}
                            descriptionCenter={currentLocation || []}
                            isLoading={false}
                          />
                        </div>
                        <div className={Style.btnWrap}>
                          {/* <div className={Style.mappointer}>
                            <img src={Assets.mappointer} alt="" />
                          </div> */}
                          <Button
                            bsPrefix="custom"
                            className={Style.btn}
                            onClick={() => {
                              redirectToPage();
                            }}
                          >
                            Show on Map
                          </Button>
                        </div>
                      </div>

                      <div className={Style.action_sec}>
                        {showMedias ? (
                          <ShareDetails hideMediaDetails={hideMediaDetails} />
                        ) : null}

                        {showChat ? (
                          <ChatInputs cancelChat={cancelChat} />
                        ) : null}
                        {showEdit ? <EditInputs /> : null}
                        {showSmiley ? (
                          <div className={Style.reaction_wrapper}>
                            <ul>
                              {smileyList.map((smiley) => {
                                return (
                                  <li>
                                    <Button bsPrefix="custom">
                                      <img
                                        src={smiley.image}
                                        alt=""
                                        onClick={() => changeEmoji(smiley)}
                                      />
                                    </Button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ) : null}

                        {setInitial ? (
                          <>
                            <div className={Style.action_project_wrapper}>
                              <ul>
                                {/* <li>
                                  <Button
                                    bsPrefix="custom"
                                    onClick={setShowSmiley}
                                  >
                                    <img src={currentSmiley} alt="" />
                                  </Button>
                                </li> */}
                                <li>
                                  <Button
                                    bsPrefix="custom"
                                    onClick={downloadImage}
                                  >
                                    <img src={Assets.download} alt="" />
                                  </Button>
                                </li>
                                <li>
                                  <Button
                                    bsPrefix="custom"
                                    onClick={setShowMedias}
                                  >
                                    <img src={Assets.share} alt="" />
                                  </Button>
                                </li>
                                {/* <li>
                                  <Button bsPrefix="custom">
                                   
                                    <img
                                      src={Assets.chatnew}
                                      alt=""
                                      onClick={setShowChat}
                                    />
                                   
                                  </Button>
                                </li> */}
                              </ul>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                    {(eventData?.eventType?.toLowerCase() ===
                      "commercial vehicle violation" ||eventData?.eventType?.toLowerCase() === "violation")&& (
                      <div
                        className={`d-flex justify-content-center align-content-center mb-3 ${
                          !user?.isSuperAdmin && "d-none"
                        }`}
                      >
                        <Button
                          className="d-flex justify-content-center align-content-center"
                          onClick={toggleBlur}
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-eye"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                          </span>{" "}
                        </Button>
                      </div>
                    )}
                    <div className={Style.thumbNails}>
                      {subImages.map((subImage, i) => {
                        return (
                          <div key={i} className={Style.thumbWrap}>
                            <figure className={Style.imgOuter}>
                              <img
                                className={
                                  (eventData?.eventType?.toLowerCase() ===
                                    "commercial vehicle violation"|| eventData?.eventType?.toLowerCase() === "violation") && isBlur
                                    ? "blur-layer"
                                    : ""
                                }
                                src={subImage.image}
                                alt=""
                                onClick={() => showPopup(subImage.image)}
                              />
                            </figure>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <BillBoardPopup
          show={showModal}
          handleClose={hidemodal}
          violationImage={violationImage}
          subImages={subImages || []}
          imageSwitch={imageSwitch}
          isBlur={isBlur}
          eventType={eventData?.eventType ? eventData.eventType : ""}
        />
      </CommonLayout>
    </>
  );
}

export default InnerDetail;

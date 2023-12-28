import React, { useEffect, useState, useContext, useCallback } from "react";
import Style from "./BoardDescription.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import ShareDetails from "../ShareDetails";
import { MapStateContext } from "../../context/mapStateControl";
import { saveAs } from "file-saver";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import BillBoardPopup from "../BillBoardPopup";
import { Context } from "../../context";
import { Skeleton } from "@mui/material";
import { fetchEventDetailsById } from "../../api/userApi";
import { useSwipeable } from "react-swipeable";
import GoogleMap from "../Map/googlemap";
import Moment from "react-moment";
import { TitleCaseConverter } from "../../utils/string-helper";
import { LoginSignupContext } from "../../context/loginSignupModal";

function BoardDescription({
  mapDatas,
  checkUsertoRedirect,
  isMap,
  isLoading,
  currentMapCenter,
  fetchDataByFilter,
  setNewCurrentMapCenter,
  setSelectRange,
  selectRange,
  markerCluster,
  setMarkerCluster
}) {
  // context state
  const {
    state: { user },
  } = useContext(Context);

  const { dispatchLoginSignup } = useContext(LoginSignupContext);

  // State for Info Window
  const {
    mapState: { currentLocation },
    dispatchMapState,
  } = useContext(MapStateContext);

  // Get the search Keyword from the Url
  const location = useLocation();
  const searchQuery = useLocation().search;
  const boardName = new URLSearchParams(searchQuery).get("id");

  const [eventData, setEventData] = useState({});
  const [isError, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [violationImage, setViolationImage] = useState("");

  const [showModal, setModal] = useState(false);
  const [isBlur, setIsBlur] = useState(true);
  const [subImages, setSubImages] = useState([
    /* { image: Assets.billboard01 },
        { image: Assets.billboard02 }, */
  ]);


  let locationExists = sessionStorage.getItem("currentLocation")
    ? JSON.parse(sessionStorage.getItem("currentLocation"))
    : null;

  const history = useHistory();

  useEffect(() => {
    setError(null);
    if (user !== null) {
      fetchEventDetailsById(
        setEventData,
        setLoading,
        boardName,
        user?.token,
        user?.tokenType,
        user?.email,
        user?.client,
        user?.exp,
        setError
      );
    } else {
      login();
    }
  }, [boardName, user]);

  const login = useCallback(() => {
    dispatchLoginSignup({
      type: "LOGIN",
      redirectToPath: location.pathname + location.search,
    });
  }, [dispatchLoginSignup, location.pathname, location.search]);

  useEffect(() => {
    if (
      isError &&
      isError === "You need to sign in or sign up before continuing."
    ) {
      login();
    }
  }, [isError, login]);

  useEffect(() => {
    if (eventData?.images?.length) {
      const imagesArray = eventData.images.map((image) => ({ image }));
      setSubImages(imagesArray.reverse());

      setViolationImage(imagesArray[0].image);
    }
  }, [eventData?.images]);

  // update event locations
  useEffect(() => {
    if (eventData?.latitude && eventData?.longitude) {
      dispatchMapState({
        type: "SHOW_INFO_MAP",
        payload: { id: eventData?.id },
      });
      dispatchMapState({
        type: "SET_CURRENT_LOCATION",
        payload: [ 
          {
            latitude: Number(eventData?.latitude),
            longitude: Number(eventData?.longitude),
          },
        ],
      });
    }
  }, [eventData, dispatchMapState]);

  const hidemodal = () => {
    setModal(false);
  };

  const toggleBlur = () => {
    setIsBlur((prevState) => !prevState);
  };

  const showBillBoardPopup = (imgPath) => {
    setViolationImage(imgPath);
    setModal(true);
  };
  const imageSwitch = (image1) => {
    setViolationImage(image1);
  };

  const goToPreviousPath = () => {
    //sessionStorage.setItem("dis_anim", true);
    const backData = JSON.parse(sessionStorage.getItem("backBillMap"));
    if (backData) {
      sessionStorage.removeItem("backBillMap");
      return history.push(backData);
    }
    return history.goBack();
  };

  const showLoading = () => (
    <>
      <div className={Style.main_image_slider} id="main_image_slider">
        <div className="items">
          {" "}
          <figure>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={378}
              height={253}
            />
          </figure>{" "}
        </div>
      </div>
      <div className={Style.thumb_slider} id="thumb_slider">
        <div className="items">
          {" "}
          <figure className={Style.thumb_imgs}>
            {" "}
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={84}
              height={84}
            />{" "}
          </figure>{" "}
        </div>
        <div className="items">
          {" "}
          <figure className={Style.thumb_imgs}>
            {" "}
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={84}
              height={84}
            />{" "}
          </figure>{" "}
        </div>
      </div>
    </>
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const swipeThis = () => {
    document
      .querySelector("#project_extra_inner")
      .classList.toggle("map_full_view");
    scrollToTop();
  };

  const swipeUp = () => {
    document
      .querySelector("#project_extra_inner")
      .classList.remove("map_full_view");
    scrollToTop();
  };

  const swipeDown = () => {
    document
      .querySelector("#project_extra_inner")
      .classList.add("map_full_view");
    scrollToTop();
  };

  const swiperhandlers = useSwipeable({
    onSwipedUp: () => swipeUp(),
    onSwipedDown: () => swipeDown(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const redirectToPage = () => {
    sessionStorage.removeItem("isMapBoard");
    if (
      location.pathname === "/map" ||
      location.pathname === "/billBoardDescription"
    ) {
      sessionStorage.setItem("isMapBoard", true);
    }
    history.push({
      pathname: "/innerDetails",
      search: `?id=${boardName}`,
    });
  };

  const showNotFound = () => (
    <div className={Style.not__found}>
      <h3>
        {isError || "Sorry, Something went wrong please try again later."}
      </h3>
    </div>
  );

  // share & download icons logic
  const [showMedias, setMedias] = useState(false);
  const [setInitial, setInitialScreen] = useState(true);

  const setShowMedias = () => {
    if (!showMedias) {
      setMedias(true);
      setInitialScreen(false);
    } else {
      setMedias(false);
    }
  };

  const hideMediaDetails = () => {
    setMedias(false);
    setInitialScreen(true);
  };

  const downloadImage = () => {
    saveAs(Assets.main_image, Assets.main_image);
  };

  const handleDirections = (eventData) => {
    if (!eventData || !eventData?.latitude || !eventData?.longitude) {
      return;
    }

    const origin =
      locationExists && locationExists.lat && locationExists.lng
        ? `${locationExists?.lat},${locationExists?.lng}`
        : "";

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${eventData?.latitude},${eventData?.longitude}&language=en`;

    window.open(url, "_blank");
  };

  return (
    <>
      <div className={Style.project_extra_wrapper}>
        <div className={Style.project_extra_inner} id="project_extra_inner">
          <div className={Style.map_view}>
            <div className={Style.map_wrapper}>
              {/* <GoogleMap mapDatas={currentLocation || []} isLoading={false} descriptionCenter={currentLocation||[]}/> */}

              <GoogleMap
                mapDatas={mapDatas}
                checkUsertoRedirect={checkUsertoRedirect}
                isMap={true}
                isLoading={isLoading}
                currentMapCenter={currentMapCenter}
                fetchDataByFilter={fetchDataByFilter}
                setNewCurrentMapCenter={setNewCurrentMapCenter}
                setSelectRange={setSelectRange}
                selectRange={selectRange}
                descriptionCenter={currentLocation || []}
                markerCluster={markerCluster}
                setMarkerCluster={setMarkerCluster}
              />
              {/* <iframe src="" style="border:0;" allowfullscreen="" loading="lazy"></iframe> */}
            </div>
            <div className={Style.mappointer}>
              <img src={Assets.mappointer} alt="" />
            </div>
          </div>
          <div className={Style.project_extra_main}>
            <Button
              {...swiperhandlers}
              bsPrefix="custom"
              className={Style.swipe_btn}
              onClick={swipeThis}
            >
              <span></span>
            </Button>
            <div className={Style.scroll_view}>
              <div className={Style.slider_wrapper}>
                {loading && showLoading()}
                {!loading && !eventData?.id && showNotFound()}
                {!loading && eventData?.id && (
                  <>
                    <div
                      className={Style.main_image_slider}
                      id="main_image_slider"
                    >
                      <div className="items">
                        {" "}
                        <figure className={Style.main_img}>
                          <img
                            onClick={() =>
                              showBillBoardPopup(violationImage || "")
                            }
                            className={
                              (eventData?.eventType?.toLowerCase() ===
                              "commercial vehicle violation"||  eventData?.eventType?.toLowerCase() ==="violation") && isBlur
                                ? "blur-layer"
                                : ""
                            }
                            src={violationImage!==""?violationImage : eventData.display_image_url}
                            alt="event_image"
                          />
                        </figure>{" "}
                      </div>
                    </div>
                    <div className={Style.thumb_slider} id="thumb_slider">
                      {subImages?.length >= 1 &&
                        subImages.map((subImage, i) => {
                          return (
                            <div key={i} className="items">
                              {" "}
                              <figure className={Style.thumb_imgs}>
                                {" "}
                                <img
                                 className={
                                  (eventData?.eventType?.toLowerCase() ===
                                  "commercial vehicle violation"|| eventData?.eventType?.toLowerCase() === "violation") && isBlur
                                    ? "blur-layer"
                                    : ""
                                }
                                  onClick={() =>
                                    showBillBoardPopup(subImage.image)
                                  }
                                  src={subImage.image}
                                  alt=""
                                />{" "}
                              </figure>{" "}
                            </div>
                          );
                        })}
                    </div>
                  </>
                )}
              </div>  
              {(eventData?.eventType?.toLowerCase() ===
                "commercial vehicle violation"|| eventData?.eventType?.toLowerCase() ==="violation")&& (
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
              {eventData?.id && (
                <div className={Style.detail_cnt}>
                  <h3>{eventData?.eventType || "N/A"}</h3>
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
                      </ul>
                    </div>
                  
                  </div>
                </div>
              )}

              {eventData?.id && (
                <>
                  <div className={Style.mapdir_n_detail}>
                    <Button
                      bsPrefix="custom"
                      onClick={() => handleDirections(eventData)}
                    >
                      <span className="icon-direction"></span>{" "}
                      <div>Direction</div>
                    </Button>
                    {/* <a className="inner--map-direction" href={googleDirectionUrl(geometricLocation)}
                  target="_blank">
                  {gotoDirectionText}
                </a> */}
                    {/* <Button bsPrefix="custom" onClick={() => redirectToPage()}>
                    <span className="icon-message"></span>
                    <div>View Detail</div>
                  </Button> */}
                  </div>

                  <div className={Style.action_project_wrapper}>
                    {showMedias ? (
                      <ShareDetails hideMediaDetails={hideMediaDetails} eventData={eventData} />
                    ) : null}

                    {setInitial ? (
                      <ul>
                        <li>
                          <Button bsPrefix="custom" onClick={downloadImage}>
                            <img src={Assets.download} alt="" />
                          </Button>
                        </li>
                        <li>
                          <Button bsPrefix="custom" onClick={setShowMedias}>
                            <img src={Assets.share} alt="" />
                          </Button>
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <BillBoardPopup
          backUrl={goToPreviousPath}
          show={showModal}
          handleClose={hidemodal}
          violationImage={violationImage}
          subImages={subImages || []}
          imageSwitch={imageSwitch}
          isBlur={isBlur}
          eventType={eventData?.eventType ? eventData.eventType : ""}
          display_image_url={eventData?.display_image_url?eventData.display_image_url:""}
        />
      </div>
    </>
  );
}

export default BoardDescription;

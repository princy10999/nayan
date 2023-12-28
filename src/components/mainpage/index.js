import React, { useEffect, useRef, useState } from "react";
import Assets from "../Layout/CommonLayout/Asset";
import { useHistory } from "react-router-dom";
import Style from "./MainPage.module.scss";
import VideoSearch from "../VideoSearch";
import Chip from "@mui/material/Chip";
import SearchSvg from "../../assets/other/icons/icons8-search.svg";
import Stack from "@mui/material/Stack";
import { loadAutoSearch } from "../../api/commonApi";
import { WelcomeBannerModal } from "../../modal/welcomeBannerModal";

function MainPage() {
  const [defaultDropdownList, setDefaultDropdown] = useState([]);
  const [dropdownList, setDropdown] = useState([]);
  const [search, setSearch] = useState("");
  const [showCard, setCard] = useState(false);
  const [itemSelected, setItemSelected] = useState(false);
  const history = useHistory();
  const [listLoading, setListLoading] = useState(false);
  const [isMostPopularSearchVisible, setIsMostPopularSearchVisible] =
    useState(true);

  useEffect(() => {
    loadAutoSearch("", setDefaultDropdown, setListLoading);
  }, []);

  const hideCard = () => {
    setCard(false);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setItemSelected(false);
    // Else Load Auto Search
    loadAutoSearch(value.trim(), setDropdown, setListLoading);
  };

  const sendSearch = (value = "") => {
    localStorage.setItem("flow", "searchdesktop");
    localStorage.setItem("modalClosed", false);
    sessionStorage.setItem("dis_anim", false);
    history.push(`/map?search=${value || search}`);
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter" || e.charCode === 13) {
      sendSearch();
    }
  };

  const sendSearchViaDropDown = (searchData) => {
    setSearch(searchData);
    setItemSelected(true);
    localStorage.setItem("flow", "searchdesktop");
    localStorage.setItem("modalClosed", false);
    sessionStorage.setItem("dis_anim", false);
    //history.push(`/map?search=${searchData}`);
    return window.location.replace(`/map?search=${searchData}`);
  };

  const focusInput = (e) => {
    let search_field = document.getElementById("searchfield");
    search_field.classList.add("active");
    search_field.focus();
  };

  const foldThis = (e) => {
    document.getElementById("landing_search_box").classList.add("foldthis");
    document.body.classList.add("foldSearch");
    e.target.placeholder = "";
    focusInput();

    // hide most popular search elements on search bar focus
    setIsMostPopularSearchVisible(false);
    setItemSelected(false);

    if (!search) {
      if (defaultDropdownList.length) {
        setDropdown(defaultDropdownList);
      } else {
        // Else Load Auto Search
        loadAutoSearch("", setDefaultDropdown, setListLoading);
      }
    }
  };

  const unfoldThis = (e) => {
    document.getElementById("landing_search_box").classList.remove("foldthis");
    document.body.classList.remove("foldSearch");
    setSearch("");
    document.getElementById("searchfield").classList.remove("active");
  };

  const handlePopularSearchClick = (value) => {
    handleSearchChange(value);
    sendSearch(value);
  };

  const sendSearchViaButton = () => {
    localStorage.setItem("flow", "searchdesktop");
    localStorage.setItem("modalClosed", false);
    sessionStorage.setItem("dis_anim", false);
    history.push(`/map?search=${search}`);
    return window.location.replace(`/map?search=${search}`);
  };

  const wrapperRef = useRef();
  const suggestionListRef = useRef();

  const handleClickOutside = (event) => {
    event.stopPropagation();

    if (
      wrapperRef?.current &&
      !wrapperRef.current.contains(event.target) &&
      suggestionListRef?.current &&
      !suggestionListRef.current.contains(event.target)
    ) {
      if (!search) {
        setIsMostPopularSearchVisible(true);
        setItemSelected(true);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <WelcomeBannerModal />
      <main className={`${Style.main_wrapper} ${Style.active}`}>
        <div className={Style.main_wrapper_inner}>
          <div className={Style.lading_page_wrapper}>
            <div className={Style.lading_page_inner}>
              <div className={Style.lading_page_bg}>
                <img src={Assets.lading_banner} alt="Nayan" />
              </div>

              <div className={Style.lading_search_box} id="landing_search_box">
                <div className={Style.lading_search_heading}>
                  <p>
                    Search for anything. <span>Anywhere.</span>
                  </p>
                  <h4>On your own data / or ours.</h4>

                  {/* <div className={Style.lading_home_icons_container}>
                    <div className={Style.lading_home_icons_item}>
                      <a
                        href="https://traffic.nayan.co"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className={Style.lading_home_icons}
                          src={Assets.home_traffic}
                          alt="Traffic"
                        />
                        <h4>Traffic</h4>
                      </a>
                    </div>
                    <div className={Style.lading_home_icons_item}>
                      <a
                        href="https://traffic.nayan.co/ai-services"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className={Style.lading_home_icons}
                          src={Assets.home_ai}
                          alt="AI"
                        />
                        <h4>AI Services</h4>
                      </a>
                    </div>
                    <div
                      className={Style.lading_home_icons_item}
                      style={{ margin: 0 }}
                    >
                      <a
                        href="https://traffic.nayan.co/roadways"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className={Style.lading_home_icons}
                          src={Assets.home_road}
                          alt="Road"
                        />
                        <h4>Roadways</h4>
                      </a>
                    </div>
                  </div> */}
                </div>

                <div className={Style.lading_search}>
                  <div className={Style.lading_search_main}>
                    <div className={Style.landing_search_left_icon}>
                      <span 
                      // className="icon-search1"
                      >
                        {" "}
                        <svg
                          fill="#fff"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30"
                          width="35px"
                          height="35px"
                        >
                          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
                        </svg>
                      </span>
                      <span
                        className="icon-back-arw"
                        onClick={unfoldThis}
                      ></span>
                    </div>
                    <div className={Style.lading_search_input}>
                      <input
                        ref={wrapperRef}
                        type="text"
                        placeholder="What are you looking for"
                        onChange={(e) => handleSearchChange(e.target.value)}
                        value={search}
                        onFocus={foldThis}
                        onBlur={(e) => {
                          e.target.placeholder = "What are you looking for";
                        }}
                        onKeyPress={handleKeypress}
                        id="searchfield"
                        autoComplete="off"
                      />
                    </div>

                    <div className={Style.lading_action_wrapper}>
                      <button
                        type="submit"
                        className={`${Style.lading_camera_icon} ${
                          search !== "" && Style.active
                        }`}
                        onClick={sendSearchViaButton}
                      >
                        <span className="icon-send"></span>
                      </button>
                      {/* <button
                                                className={`${
                                                    Style.lading_camera_icon
                                                } ${
                                                    search == "" && Style.active
                                                }`}
                                                onClick={setCard}
                                            >
                                                <span className="icon-photo-camera"></span>
                                            </button> */}
                    </div>
                  </div>

                  {showCard ? <VideoSearch handleClose={hideCard} /> : null}

                  {!itemSelected && !listLoading && (
                    <div
                      className={Style.landing_search_result}
                      id="suggestionList"
                      ref={suggestionListRef}
                    >
                      <div className={Style.landing_search_result_inner}>
                        {dropdownList.length >= 1 &&
                          dropdownList.map((res, i) => {
                            return (
                              <button
                                key={i}
                                className={Style.lading_search_result_item}
                                onClick={() => {
                                  sendSearchViaDropDown(
                                    res.placeHolder
                                      ? res.placeHolder
                                      : res?.name
                                  );
                                }}
                              >
                                <div
                                  className={Style.landing_search_item_inner}
                                >
                                  <div className={Style.landing_image_wrapper}>
                                    <div
                                      className={
                                        Style.landing_search_icon_container
                                      }
                                    >
                                      <img src={res?.image} alt="" />
                                    </div>
                                  </div>
                                  <h3>{res?.name}</h3>
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>

                {isMostPopularSearchVisible ? (
                  <div className={Style.lading_search_text}>
                    <small>
                      <strong>Most Popular Searches:</strong>
                    </small>
                    <div className={Style.lading_search_pills}>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          className={Style.lading_search_pill}
                          label="Commercial Vehicle
                      Violation"
                          color="primary"
                          onClick={() =>
                            handlePopularSearchClick(
                              "Commercial Vehicle Violation"
                            )
                          }
                        />
                        <Chip
                          className={Style.lading_search_pill}
                          label="Billboard Brand"
                          color="primary"
                          onClick={() =>
                            handlePopularSearchClick("Billboard Brand")
                          }
                        />
                      </Stack>
                    </div>
                  </div>
                ) : (
                  <div className={Style.lading_search_text}></div>
                )}
              </div>

              <div
                className={Style.landing_apply_icon}
                id="homepage-footer-image"
                data-mobile-hide="true"
              >
                <a
                  href="https://play.google.com/store/apps/details?id=co.nayan.c3specialist_v2.production"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={Assets.android_app_icon} alt="Mobile Nayan App" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;

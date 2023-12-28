import GoogleMap from "../../Map/googlemap";
import React, { useEffect, useState, useContext } from "react";
import { MapStateContext } from "../../../context/mapStateControl";
import { useLocation, useHistory } from "react-router-dom";
import Style from "./MapLayout.module.scss";
import { loadAutoSearch, loadCity, loadRange } from "../../../api/commonApi";
import FiltersView from "../../FiltersView";
import moment from "moment";

function MapLayout({ children }) {
  const history = useHistory();

  // State for Info Window
  const { mapState: { currentLocation } } = useContext(MapStateContext);

  const location = useLocation();
  const [boardName, setBoardName] = useState("Search");
  const [pageLoaded, setPageLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdownList, setDropdown] = useState([]);
  const [itemSelected, setItemSelected] = useState(false);
  const [listLoading, setListLoading] = useState(false);

  // Filter State Start
  const [startDate, setStartDate] = useState(moment().subtract(365, "day"));
  const [endDate, setEndDate] = useState(moment());
  const [cityList, setCityDropdown] = useState([]);
  const [rangeList, setRangeDropdown] = useState([]);
  const [selectCity, setSelectCity] = useState("");
  const [selectRange, setSelectRange] = useState("");
  // Filter End

  // get location and boardName
  useEffect(() => {
    if (history?.location?.state?.type) {
      setBoardName(history?.location?.state?.type);
    }
  }, [history]);

  // fetch city and range data
  useEffect(() => {
    loadCity(setCityDropdown);
    loadRange(setRangeDropdown);
  }, []);

  const [filterView, setFilterView] = useState(false);

  const hideFilters = () => {
    // setMapView(true);
    // setFilters(false);
    setFilterView(false);
    document.body.classList.remove("filterOpen");
  };

  const showFilterView = () => {
    // localStorage.setItem("filterView",true);
    setFilterView(true);
    document.body.classList.add("filterOpen");
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    // For Passing empty value
    if (value.length === 0) {
      setItemSelected(true);
      return;
    }
    //trim will remove white spaces.
    if (value.trim().length === 0) {
      setItemSelected(true);
      return;
    }
    setItemSelected(false);
    // Else Load Auto Search
    loadAutoSearch(value, setDropdown, setListLoading);
  };

  const sendSearch = () => {
    localStorage.setItem("flow", "searchdesktop");
    localStorage.setItem("modalClosed", false);
    return window.location.replace(`/map?search=${search}`);
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
    return window.location.replace(`/map?search=${searchData}`);
  };

  const focusInput = (e) => {
    let search_field = document.getElementById("searchfield");
    search_field.classList.add("active");
    search_field.focus();
  };

  let foldThisTimer = null;

  const foldThis = (e) => {
    document.body.classList.add("foldSearch");
    e.target.placeholder = "";
    document.getElementById("searchfield").placeholder = "";
    foldThisTimer = setTimeout(focusInput, 200);
  };

  const unfoldThis = (e) => {
    document.getElementById("searchfield").classList.remove("active");
    /* var previousUrl = localStorage.getItem("previous");
        history.push(previousUrl); */
    if (search.trim().length === 0) {
      // if the fold search box is open, go to description page else go to previous page
      if (document.body.classList.contains("foldSearch")) {
        document.body.classList.remove("foldSearch");
      } else {
        const backData = JSON.parse(sessionStorage.getItem("backBillMap"));
        if (backData) {
          sessionStorage.removeItem("backBillMap");
          return history.push(backData);
        }
        return history.goBack();
      }
    } else {
      setSearch("");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 50);
    return () => {
      clearTimeout(timer)
      foldThisTimer && clearTimeout(foldThisTimer)
    };
  }, []);

  return (
    <>
      <main
        className={`${Style.main_wrapper} ${pageLoaded ? "" : Style.active}`}
      >
        <div
          className={`${Style.main_wrapper_inner} ${location.pathname === "/billBoardDescription" &&
            `bill_descrip_wrapper_inner`
            }`}
        >
          <div className={Style.map_wrapper}>
            <div className={Style.map_wrapper_inner}>
              <div className={Style.map_main}>
                <GoogleMap mapDatas={currentLocation || []} isLoading={false} />
              </div>
            </div>

            <div className={Style.map_filter}>
              <div className={Style.map_filter_header}>
                <div className={Style.map_search_icon}>
                  <span className="icon-search"></span>
                  <span className="icon-back-arw" onClick={unfoldThis}></span>
                </div>

                <div className={Style.map_input_wrapper} onClick={foldThis}>
                  <input
                    type="text"
                    placeholder={boardName || ""}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    value={search}
                    onBlur={(e) => (e.target.placeholder = boardName || "")}
                    onKeyPress={handleKeypress}
                    id="searchfield"
                    autoComplete="off"
                  />
                </div>

                <div className={Style.map_action_wrapper}>
                  <button
                    className={`${Style.map_message_icon} ${search !== "" && Style.active
                      }`}
                    onClick={sendSearch}
                  >
                    <span className="icon-send"></span>
                  </button>
                  {/* <button
                                        className={`${Style.map_camera_icon} ${
                                            search === "" && Style.active
                                        }`}
                                    >
                                        <span className="icon-photo-camera"></span>
                                    </button> */}
                </div>
                {location.pathname === "/billBoardDescription" ? (
                  <div className={Style.filterbtn_wrapper}>
                    <button
                      className={Style.filterbtn}
                      onClick={showFilterView}
                    >
                      <span class="icon-filter"></span>
                    </button>
                  </div>
                ) : null}
              </div>

              {search !== "" && !itemSelected && !listLoading && (
                <div className={Style.landing_search_result} id="suggestionList">
                  <div className={Style.landing_search_result_inner}>
                    {dropdownList.length >= 1 &&
                      dropdownList.map((res, i) => {
                        return (
                          <button
                            key={i}
                            className={Style.lading_search_result_item}
                            onClick={() => {
                              sendSearchViaDropDown(res.placeHolder?res.placeHolder :res?.name);
                            }}
                          >
                            <div className={Style.landing_search_item_inner}>
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
              <div className={Style.map_info_container}>
                <div className={Style.map_info_inner_scroll}>
                  {filterView ? (
                    <FiltersView
                      handleBackArrow={hideFilters}
                      cityList={cityList}
                      rangeList={rangeList}
                      selectCity={selectCity}
                      selectRange={selectRange}
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      setSelectCity={setSelectCity}
                      setSelectRange={setSelectRange}
                      isMap={false}
                      boardName={boardName}
                    />
                  ) : (
                    <>{children}</>
                  )}
                </div>
              </div>
            </div>

            <div className={Style.floating_right_icon}>
              <div className={Style.floating_right_icon_inner}>
                <div className={Style.layer_wrapper}>
                  <button>
                    <span className="icon-map-01"></span>
                  </button>
                </div>
                <div className={Style.message_wrapper}>
                  <button>
                    <span className="icon-message"></span>
                  </button>
                </div>
                <div className={Style.direction_wrapper}>
                  <button>
                    <span className="icon-direction"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <button className={Style.send_message_item}>SEND MESSAGE</button>
    </>
  );
}

export default MapLayout;

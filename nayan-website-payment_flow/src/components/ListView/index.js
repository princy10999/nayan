import React, { useEffect, useState, useRef } from "react";
import Style from "./ListView.module.scss";
//import { useHistory } from "react-router";
import Assets from "../Layout/CommonLayout/Asset";
import LoadingScreen from "../LoadingScreen";
import { Button } from "react-bootstrap";
import SubscriptionModel from "../SubscriptionModel";
import { loadAutoSearch } from "../../api/commonApi";
import Moment from "react-moment";
import Skeleton from "@mui/material/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

function ListView({
  handleBackArrow,
  showFilters,
  allImageList,
  searchName,
  showNotFound,
  handleUserRedirection,
  setIsMobileList,
}) {
  const [showModal, setModal] = useState(false);
  //const history = useHistory();

  // Search box state
  const [dropdownList, setDropdown] = useState([]);
  const [search, setSearch] = useState("");
  const [itemSelected, setItemSelected] = useState(false);
  const [listLoading, setListLoading] = useState(false);

  // Image List state
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  //pagination state
  const ref = useRef();
  const [pageNumber, setPageNumber] = useState(1);
  const [dataPerPage] = useState(10);
  const [isMoreData, setIsMoreData] = useState(true);

  let foldThisTimer = null;

  useEffect(() => {
    let timer = null;

    if (allImageList) {
      if (allImageList?.length) {
        setImageList(allImageList.slice(0, dataPerPage));
        setLoading(false);
      } else {
        setPageNumber(1);
        timer = setTimeout(() => {
          setLoading(false);
        }, 3500);
      }
    }

    //component close
    return () => {
      setImageList([]);
      setPageNumber(1);
      if(timer) {
        clearTimeout(timer)
      }
      foldThisTimer && clearTimeout(foldThisTimer)
    };
  }, [allImageList]);

  // search box functionalities START

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
    /* history.push(`/map?search=${search}`); */
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
    //history.push(`/map?search=${searchData}`);
    return window.location.replace(`/map?search=${searchData}`);
  };

  // search box functionalities END

  // Image listing functionality START

  const handlePaginate = () => {
    if (!allImageList || !imageList) {
      setIsMoreData(false);
      return;
    }
    let startData;
    let endData;
    let value = pageNumber + 1;
    endData = value * dataPerPage;
    startData = endData - dataPerPage;
    let results = allImageList?.slice(startData, endData);
    if (!results) {
      setIsMoreData(false);
      return;
    }
    setPageNumber(value);
    setImageList((previous) => [...previous, ...results]);
  };

  const [modelImage, setImage] = useState(Assets.one);
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  const hidemodal = () => {
    setModal(false);
  };

  const backtoPrev = () => {
    document.body.classList.remove("filterOpen");
    document.body.classList.remove("foldSearch");
  };

  const handleBackButton = () => {
    handleBackArrow();
    backtoPrev();
  };

  const focusInput = (e) => {
    let search_field = document.getElementById("searchfield");
    search_field.classList.add("active");
    search_field.focus();
  };

  const foldThis = (e) => {
    document.getElementById("mapFilterSec").classList.add("foldthis");
    document.body.classList.add("foldSearch");
    e.target.placeholder = "";
    document.getElementById("searchfield").placeholder = "";
    foldThisTimer = setTimeout(focusInput, 200);
  };

  const unfoldThis = (e) => {
    document.getElementById("mapFilterSec").classList.remove("foldthis");
    document.body.classList.remove("foldSearch");
    setSearch("");
    document.getElementById("searchfield").classList.remove("active");
  };

  // for handling the search box Window
  const handleSearchBackButton = () => {
    document.getElementById("searchfield").classList.remove("active");
    if (search.trim().length === 0) {
      // if the fold search box is open, go to list page else go to map page
      if (document.body.classList.contains("foldSearch")) {
        document.body.classList.remove("foldSearch");
      } else {
        handleBackButton();
      }
    } else {
      setSearch("");
    }
  };

  const handleShowFilters = () => {
    setIsMobileList(true);
    showFilters();
  };

  const showLoading = () => {
    let limit = [1, 2, 3, 4];
    return limit.map((i) => {
      return (
        <div className={Style.filter_result_item} key={i}>
          <div className={Style.filter_result_image}>
            <div>
              <Skeleton variant="rectangular" width={167} height={83} />
            </div>
          </div>
          <div className={Style.filter_result_content}>
            <h4>
              <Skeleton />
            </h4>
            <p>
              <Skeleton />
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {loadingAnimation && <LoadingScreen />}

      <div className={Style.map_filter} id="mapFilterSec">
        <div className={Style.map_filter_header}>
          <div className={Style.map_search_icon}>
            <Button
              bsPrefix="custom"
              onClick={handleSearchBackButton}
              className={Style.searchback}
            >
              <span className="icon-back-arw"></span>
            </Button>
          </div>

          <div className={Style.map_input_wrapper} onClick={foldThis}>
            <input
              type="text"
              placeholder={searchName || ""}
              onChange={(e) => {
                handleSearchChange(e.target.value);
              }}
              value={search}
              onBlur={(e) => (e.target.placeholder = searchName || "")}
              onKeyPress={handleKeypress}
              id="searchfield"
              autoComplete="off"
            />
          </div>

          <div className={Style.map_action_wrapper}>
            <button
              type="submit"
              className={`${Style.map_message_icon} ${
                search !== "" && Style.active
              }`}
              onClick={sendSearch}
            >
              <span className="icon-send"></span>
            </button>
            {/* <button
                            className={`${Style.map_camera_icon} ${
                                search == "" && Style.active
                            }`}
                        >
                            <span className="icon-photo-camera"></span>
                        </button> */}
          </div>
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
                          <div className={Style.landing_search_icon_container}>
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
          <div className="filterbtns">
            <Button bsPrefix="custom" onClick={handleBackButton}>
              <span className="icon-map"></span> Map
            </Button>
            <Button bsPrefix="custom" onClick={handleShowFilters}>
              <span className="icon-filter"></span> Filters
            </Button>
          </div>
          <div
            /*  onScroll={onScrollBoard} */
            id="listScrollableDiv"
            ref={ref}
            className={Style.map_info_inner_scroll}
          >
            <div className={Style.filter_result_wrapper}>
              {loading && showLoading()}

              {!loading && imageList.length <= 0 && showNotFound()}

              <InfiniteScroll
                dataLength={imageList?.length} //This is important field to render the next data
                next={() => handlePaginate()}
                style={{ overflow: "visible" }}
                hasMore={isMoreData}
                loader={
                  !loading &&
                  imageList?.length >= 1 && (
                    <div className={Style.filter_result_item}>
                      <div className={Style.filter_result_image}>
                        <div>
                          <Skeleton
                            variant="rectangular"
                            width={167}
                            height={83}
                          />
                        </div>
                      </div>
                      <div className={Style.filter_result_content}>
                        <h4>
                          <Skeleton />
                        </h4>
                        <p>
                          <Skeleton />
                        </p>
                      </div>
                    </div>
                  )
                }
                scrollableTarget="listScrollableDiv"
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                // below props only if you need pull down functionality
              >
                {!loading &&
                  imageList.length >= 1 &&
                  imageList.map((image) => {
                    return (
                      <div key={image?.id} className={Style.filter_result_item}>
                        <div className={Style.filter_result_image}>
                          <div className={Style.filter_result_image_container}>
                            <img
                              style={{
                                cursor: "pointer",
                              }}
                              src={image?.display_image_url}
                              alt=""
                              /* onClick={() =>
                                                              setModelImage(image)
                                                          } */
                              onClick={() =>
                                handleUserRedirection(image, "LIST_VIEW")
                              }
                            />
                          </div>
                        </div>
                        <div className={Style.filter_result_content}>
                          <h4>{image?.name}</h4>
                          <p>
                            <Moment format="hh:mm A DD/MM/YYYY">
                              {image.created_at}
                            </Moment>
                          </p>
                          <a href="">
                            <span className="icon-map">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                              <span className="path4"></span>
                            </span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
              </InfiniteScroll>
            </div>
          </div>

          <div className={Style.read_more_wrapper}>
            {/*  {imageList.length >= 1 && pageNumber <= totalPages && isScrollDown && (
              <button

                onClick={() => handlePagination(pageNumber + 1, 1, -133)}
              >
                <span className="icon-arrow-bottom"></span>
              </button>
            )}
            {imageList.length >= 1 && isScrollUp && (
              <button
                onClick={() =>
                  handlePagination(pageNumber - 1, 2, 133)
                }
                className={Style.uparrow}
              >
                <span className="icon-arrow-bottom"></span>
              </button>
            )} */}
          </div>
        </div>
      </div>
      <SubscriptionModel
        show={showModal}
        handleClose={hidemodal}
        image={modelImage}
      />
    </>
  );
}

export default ListView;

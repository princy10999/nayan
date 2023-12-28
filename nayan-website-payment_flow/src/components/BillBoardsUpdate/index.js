import React, { useRef, useEffect, useState, useContext } from "react";
import Style from "./BillBoardsUpdate.module.scss";
import PaymentSlider from "../PaymentSlider";
//import SearchInput from "../SearchInput";
import { useLocation, useHistory } from "react-router-dom";
//import Assets from "../Layout/CommonLayout/Asset";
import BillBoards from "../BillBoards";
import Button from "@restart/ui/esm/Button";
// import setting1value from "../../../src/App"
import Skeleton from "@mui/material/Skeleton";
import { loadBillBoardById } from "../../api/userApi";
import { Context } from "../../context";
import Moment from "react-moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { TitleCaseConverter } from "../../utils/string-helper";

function BillBoardsUpdate() {
  // context state
  const {
    state: { user },
  } = useContext(Context);

  // Get the search Keyword from the Url
  const location = useLocation();

  const searchQuery = useLocation().search;
  const boardID = new URLSearchParams(searchQuery).get("id");
  const [boardName, setBoardName] = useState("Search");

  const [isScrollUp, setIsScrollUp] = useState(false);

  const [events, setEvents] = useState(60);
  const [downloads, setDownloads] = useState(20);
  const [perday, setPerday] = useState(40);
  const history = useHistory();
  const [boardsList, setBoardsList] = useState([]);
  const [viewBoardsList, setViewBoardsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flowType, setFlowType] = useState("");

  //pagination state
  const [pageNumber, setPageNumber] = useState(1);
  const [dataPerPage] = useState(10);
  const [isMoreData, setIsMoreData] = useState(true);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    setFlowType(localStorage.getItem("flow"));
  }, []);

  useEffect(() => {
    if (boardID && user !== null) {
      loadBillBoardById(
        setBoardsList,
        setLoading,
        boardID,
        user?.email,
        user?.token,
        user?.tokenType,
        user?.client,
        user?.exp
      );
    }
  }, [boardID, user]);

  useEffect(() => {
    if (history?.location?.state?.event_name) {
      setBoardName(history?.location?.state?.event_name);
    }
  }, [history]);

  const scrollRef = useRef();

  useEffect(() => {
    if (boardsList) {
      if (boardsList?.length) {
        setViewBoardsList(boardsList.slice(0, dataPerPage));
        setLoading(false);
      } else {
        setPageNumber(1);
        setLoading(false);
      }
    }
  }, [boardsList, dataPerPage]);

  const handlePaginate = () => {
    if (!boardsList || !viewBoardsList) {
      setIsMoreData(false);
      return;
    }
    setIsScroll(true);
    let startData;
    let endData;
    let value = pageNumber + 1;
    endData = value * dataPerPage;
    startData = endData - dataPerPage;
    let results = boardsList?.slice(startData, endData);
    if (!results) {
      setIsScroll(false);
      setIsMoreData(false);
      return;
    }
    setPageNumber(value);
    setIsScroll(false);
    setViewBoardsList((previous) => [...previous, ...results]);
  };

  const openEventDescription = (event) => {
    //localStorage.setItem("previous","/billboards");
    // sessionStorage.setItem(
    //     "backBillMap",
    //     JSON.stringify(`/billboards?id=${boardID}`)
    // );
    history.push(
      {
        pathname: "/innerDetails",
        search: `?id=${event?.id || ""}`,
      },
      {
        image_url: event?.image_url,
        // type: boardName || "",
      }
    );
  };

  const showLoading = () => {
    let limit = [1, 2, 3, 4, 5];
    return (
      <>
        {limit.map((i) => {
          return (
            <>
              <div className={Style.board_result_item} key={i}>
                <div className={Style.board_result_item_inner}>
                  <div className={Style.image_wrapper}>
                    <div>
                      <Skeleton variant="rectangular" width={210} height={68} />
                    </div>
                  </div>
                  <div className={Style.content_wrapper}>
                    <h5>
                      <Skeleton variant="text" />
                    </h5>
                    <p>
                      <Skeleton variant="text" />
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  /*  const onScrollBoard = (e) => {
         if (e.target.scrollTop) {
             setIsScrollUp(true);
         } else {
             setIsScrollUp(false);
         }
     }; */

  return (
    <BillBoards>
      <div
        className={Style.billboard_inner}
        id="search__bill__scroll"
        /* onScroll={onScrollBoard} */
        ref={scrollRef}
      >
        <div className={Style.billboard_main}>
          <div className={Style.billboard_head}>
            <div className={Style.back_btn}>
              <Button
                bsPrefix="custom"
                onClick={() => history.push("/billboardssearch")}
              ></Button>
            </div>
            <h4>
              {TitleCaseConverter(location?.state?.event_name || "Billboards")}
            </h4>
          </div>

          {/* TODO::to uncomment later on */}
          {/* <PaymentSlider /> */}

          <div className={Style.result_wrapper_billboard}>
            {/* <div className={Style.result_inner}>
              <div className={Style.result_item}>
                <div className={Style.result_item_inner}>
                  <span className={Style.result_count}>{events}</span>
                  <p className={Style.result_text}>Number of Events</p>
                </div>
              </div>

              <div className={Style.result_item}>
                <div className={Style.result_item_inner}>
                  <span className={Style.result_count}>{downloads}</span>
                  <p className={Style.result_text}>Number of Downloads</p>
                </div>
              </div>

              <div className={Style.result_item}>
                <div className={Style.result_item_inner}>
                  <span className={Style.result_count}>{perday}</span>
                  <p className={Style.result_text}>Events Per Day</p>
                </div>
              </div>
            </div> */}
          </div>
          {/* TODO::to uncomment later on */}

          <div className={Style.board_billboard}>
            {!loading && boardsList.length <= 0 && (
              <div className={Style.no__results}>
                <h3>No Results Found!</h3>
              </div>
            )}

            <InfiniteScroll
              dataLength={viewBoardsList?.length} //This is important field to render the next data
              next={() => handlePaginate()}
              hasMore={isMoreData}
              /* loader={!loading && viewBoardsList?.length >= 1 &&
                                "Loading..."
                            } */
              style={{ overflow: "visible" }}
              scrollableTarget="search__bill__scroll"
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              // below props only if you need pull down functionality
            >
              <div className={Style.board_result_inner}>
                {loading && showLoading()}

                {!loading &&
                  viewBoardsList?.length >= 1 &&
                  viewBoardsList.map((billBoard) => {
                    return (
                      <div
                        key={billBoard.id}
                        className={Style.board_result_item}
                      >
                        <div
                          onClick={() => openEventDescription(billBoard)}
                          className={Style.board_result_item_inner}
                        >
                          <div className={Style.image_wrapper}>
                            <div className={Style.image_container}>
                              <img
                                className={
                                  billBoard.event_type &&
                                  billBoard.event_type?.toLowerCase() ===
                                  "commercial vehicle violation"|| billBoard.event_type &&
                                  billBoard.event_type?.toLowerCase() === "violation"
                                    ? "blur-layer"
                                    : ""
                                }
                                src={billBoard.image_url}
                                alt="Violation Image"
                                onClick={() => openEventDescription(billBoard)}
                              />
                            </div>
                          </div>
                          <div className={Style.content_wrapper}>
                            {/*  <h5>{billBoard.name}</h5> */}
                            <h5>{billBoard.id}</h5>
                            <p>
                              <Moment format="DD/MM/YYYY hh:mm A">
                                {billBoard.created_at}
                              </Moment>
                            </p>
                          </div>
                          {flowType === "searchdesktop" ? (
                            <div className={Style.map_wrapper}>
                              {/* <span className="icon-map"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span></span> */}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                {isScroll && showLoading()}
              </div>
            </InfiniteScroll>
          </div>

          <div className={Style.read_more_wrapper}>
            {/*  {boardsList.length >= 1 && (
                            <>
                                <button
                                    className={Style.read_more_btn}
                                    onClick={() => scroll(-133)}
                                ></button>
                                {isScrollUp && (
                                    <button
                                        className="icon__rotate"
                                        onClick={() => scroll(133)}
                                    ></button>
                                )}
                            </>
                        )} */}
          </div>
        </div>
      </div>
    </BillBoards>
  );
}

export default BillBoardsUpdate;

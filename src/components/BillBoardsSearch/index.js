import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import Style from "./BillBoardsSearch.module.scss";
//import PaymentSlider from "../PaymentSlider";
import SearchInput from "../SearchInput";
import { useHistory } from "react-router-dom";
//import Assets from "../Layout/CommonLayout/Asset";
import BillBoards from "../BillBoards";
import { loadBillBoards } from "../../api/userApi";
import Skeleton from "@mui/material/Skeleton";
import { Context } from "../../context";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PaymentSlider from "../PaymentSlider";

function BillBoardsSearch() {
  // context state
  const {
    state: { user },
  } = useContext(Context);

  const [clientIp, setClientIp] = useState("");

  const history = useHistory();

  const [boardsList, setBoardsList] = useState([]);
  const [viewBoardsList, setViewBoardsList] = useState([]);
  const [loading, setLoading] = useState(true);

  //pagination state
  const [pageNumber, setPageNumber] = useState(1);
  const [dataPerPage] = useState(10);
  const [isMoreData, setIsMoreData] = useState(true);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    if (user !== null) {
      loadBillBoards(
        setBoardsList,
        setLoading,
        user?.email,
        user?.token,
        user?.tokenType,
        user?.client,
        user?.exp
      );
    }
  }, [user]);

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

  const fetchUserIP = useCallback(async () => {
    const { data } = await axios.get("https://geolocation-db.com/json/");
    const clientIP = data["IPv4"];
    setClientIp(clientIP);
  }, []);

  useEffect(() => {
    fetchUserIP();
  }, [fetchUserIP]);

  const scrollRef = useRef();

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

  const showLoading = () => {
    let limit = [1, 2, 3, 4, 5];
    return (
      <>
        {limit.map((i) => {
          return (
            <>
              <div className={Style.result_item_wrapper} key={i}>
                <div className={Style.result_item_inner}>
                  <div className={Style.collage_wrapper}>
                    <div className={Style.imgsec}>
                      <Skeleton variant="rectangular" width={210} height={68} />
                    </div>
                  </div>
                  <h3>
                    <Skeleton variant="text" />
                  </h3>
                  <p>
                    <Skeleton variant="text" />
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  /* 
    const onScrollBoard = (e) => {
      if (e.target.scrollTop) {
        setIsScrollUp(true);
      } else {
        setIsScrollUp(false);
      }
    }; */

  return (
    <BillBoards>
      <div
        className={
          boardsList.length <= 5
            ? Style.search_billboard_wrapper
            : Style.search_billboard_wrapperTWo
        }
        id="srch_billboard_wrapper"
      >
        <div className={Style.search_billboard_inner}>
          <SearchInput />

          <div  
            /*  onScroll={onScrollBoard} */
            id="search__bill__scroll"
            className={
              !loading && boardsList.length <= 0
                ? Style.searchBillboardNoResult
                : Style.search_billboard_result
            }
            ref={scrollRef}
          >
            {!loading && boardsList.length <= 0 && (
              <div className={Style.no__results}>
                <h3>You have made no search, Try your first one..!</h3>
              </div>
            )}
            <div className="text-center pb-3">
              <h3>50 Credits</h3>
            </div>
            <PaymentSlider/>

            <InfiniteScroll
              dataLength={viewBoardsList?.length} //This is important field to render the next data
              next={() => handlePaginate()}
              style={{ overflow: "visible" }}
              hasMore={isMoreData}
              /* loader={!loading && viewBoardsList?.length >= 1 &&
                  "Loading..."
              } */
              scrollableTarget="search__bill__scroll"
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              // below props only if you need pull down functionality
            >
              <div className={Style.search_billboard_result_inner}>
                {/* show Loading */}
                {loading && showLoading()}

                {!loading &&
                  boardsList.length >= 1 &&
                  boardsList.map((board) => {
                    return (
                      <div
                        key={`${board.event_type}_${
                          board.event_type_id || new Date().getUTCMilliseconds()
                        }`}
                        className={Style.result_item_wrapper}
                      >
                        <div className={Style.result_item_inner}>
                          <div className={Style.collage_wrapper}>
                            <div className={Style.imgsec}>
                              <div className={Style.big_image}>
                                <div className={Style.image_wrapper}>
                                  <div className={Style.image_container}>
                                    <img
                                      className={
                                        board?.event_type?.toLowerCase() ===
                                        "commercial vehicle violation"|| board?.event_type?.toLowerCase() === "violation"
                                          ? "blur-layer"
                                          : ""
                                      }
                                      onClick={() =>
                                        history.push(
                                          {
                                            pathname: "/billboards",
                                            search: `?id=${board?.event_type_id}`,
                                          },
                                          {
                                            event_name: board?.event_type,
                                          }
                                        )
                                      }
                                      src={board?.image_urls[0]}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className={Style.small_image}>
                                <div className={Style.image_wrapper}>
                                  <div className={Style.image_container}>
                                    <img
                                      className={
                                        board?.event_type?.toLowerCase() ===
                                        "commercial vehicle violation"||board?.event_type?.toLowerCase() === "violation"
                                          ? "blur-layer"
                                          : ""
                                      }
                                      onClick={() =>
                                        history.push(
                                          {
                                            pathname: "/billboards",
                                            search: `?id=${board?.event_type_id}`,
                                          },
                                          {
                                            event_name: board?.event_type,
                                          }
                                        )
                                      }
                                      src={board?.image_urls[1]}
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className={Style.image_wrapper}>
                                  <div className={Style.image_container}>
                                    <img
                                      className={
                                        board?.event_type?.toLowerCase() ===
                                        "commercial vehicle violation"||board?.event_type?.toLowerCase() === "violation"
                                          ? "blur-layer"
                                          : ""
                                      }
                                      onClick={() =>
                                        history.push(
                                          {
                                            pathname: "/billboards",
                                            search: `?id=${board?.event_type_id}`,
                                          },
                                          {
                                            event_name: board?.event_type,
                                          }
                                        )
                                      }
                                      src={board?.image_urls[2]}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*  <span className={Style.tag_red}>Cold</span> */}
                          {/* {board.tag == "cold" ? (
                        <span className={Style.tag_red}>Cold</span>
                    ) : (
                        <span className={Style.tag_green}>Hot</span>
                    )} */}
                          <h3
                            onClick={() =>
                              history.push(
                                {
                                  pathname: "/billboards",
                                  search: `?id=${board?.event_type_id}`,
                                },
                                {
                                  event_name: board?.event_type,
                                }
                              )
                            }
                          >
                            {board?.event_type}
                          </h3>
                          <p
                            onClick={() =>
                              history.push(
                                {
                                  pathname: "/billboards",
                                  search: `?id=${board?.event_type_id}`,
                                },
                                {
                                  event_name: board?.event_type,
                                }
                              )
                            }
                          >
                            {board?.event_count} Results
                          </p>
                        </div>
                      </div>
                    );
                  })}
                {isScroll && showLoading()}
              </div>
            </InfiniteScroll>
          </div>
        </div>
        {boardsList.length && (
          <div className={Style.read_more_wrapper_extra}>
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
        )}
      </div>
    </BillBoards>
  );
}

export default BillBoardsSearch;

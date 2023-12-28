import React, { useEffect, useState, useContext } from "react";
import Style from "./BillBoardDesktop.module.scss";
import CommonLayout from "../Layout/CommonLayout";
import Assets from "../Layout/CommonLayout/Asset";
import Actions from "../Actions";
import ShareDetails from "../ShareDetails";
import ChatInputs from "../ChatInputs";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import EditInputs from "../EditInputs";
import { saveAs } from "file-saver";
import { Context } from "../../context";
import Moment from "react-moment";
import { Skeleton } from "@mui/material";
import { fetchEventDetailsById } from "../../api/userApi";
import { TitleCaseConverter } from "../../utils/string-helper";

function BillBoardDesktop() {
    // context state
    const {
        state: { user },
    } = useContext(Context);

    // Get the search Keyword from the Url
    const searchQuery = useLocation().search;
    const boardName = new URLSearchParams(searchQuery).get("name");
    /* const boardImage = new URLSearchParams(searchQuery).get("url"); */
    //const boardDate = new URLSearchParams(searchQuery).get("date");

    const [showActions, setActions] = useState(false);
    const [eventData, setEventData] = useState({});
    const [loading, setLoading] = useState(true);
    const [violationImage, setViolationImage] = useState("");
    const [showSmiley, setSmiley] = useState(false);
    const [smileyList, setSmileyList] = useState([
        { image: Assets.smile },
        { image: Assets.love },
        { image: Assets.sad },
    ]);
    const [showMedias, setMedias] = useState(false);
    const [showChat, setChat] = useState(false);
    const [showEdit, setEdit] = useState(false);
    const [setInitial, setInitialScreen] = useState(true);
    const [boardsList, setBoardsList] = useState([
        {
            name: "Mac D BillBoards",
            image: Assets.slider01,
            time: "12:56 Pm, 12/07/2021",
        },
        {
            name: "Mac D BillBoards",
            image: Assets.slider02,
            time: "12:56 Pm, 12/07/2021",
        },
        {
            name: "Mac D BillBoards",
            image: Assets.slider03,
            time: "12:56 Pm, 12/07/2021",
        },
    ]);
    const history = useHistory();
    const [flowType, setFlowType] = useState("");

    useEffect(() => {
        setFlowType(localStorage.getItem("flow"));
        setViolationImage(history?.location?.state?.image_url);
    }, [history]);

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
        if (eventData?.images?.length) {
          const imagesArray = eventData.images.map(image => ({ image }));
          setBoardsList(imagesArray);    
        }
      }, [eventData?.images]);

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
            <div className={Style.image_wrapper}>
                <div className={Style.image_container}>
                    {/* <img src={violationImage || ""} alt="" /> */}
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width={250}
                        height={350}
                    />
                </div>
            </div>

            <div className={Style.content_wrapper}>
                <div className={Style.heading_icon_wrapper}>
                    <div className={Style.heading_wrapper_project}>
                        {/* <h3>{boardName || " "}</h3> */}
                        <h3>
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={80}
                            />
                        </h3>
                        <p>
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={150}
                            />
                        </p>
                    </div>
                </div>

                <div className={Style.action_project_wrapper}>
                    <ul>
                        <li>
                            <Skeleton
                                variant="circular"
                                width={25}
                                height={25}
                            />
                        </li>
                        <li>
                            <Skeleton
                                variant="circular"
                                width={25}
                                height={25}
                            />
                        </li>
                        <li>
                            <Skeleton
                                variant="circular"
                                width={25}
                                height={25}
                            />
                        </li>
                        <li>
                            <Skeleton
                                variant="circular"
                                width={25}
                                height={25}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );

    return (
        <>
            <CommonLayout>
                <div className={Style.billboard_wrapper}>
                    <div className={Style.dashboard_action_wrapper}>
                        <div
                            className={Style.filter_wrapper}
                            onClick={setShowActions}
                        >
                            <img src={Assets.billicon01} alt="" />
                        </div>
                        <div className={Style.action_wrapper}>
                            <img src={Assets.billicon02} alt="" />
                        </div>
                        {showActions === true ? <Actions /> : null}
                    </div>

                    <div className={Style.main_head}>{TitleCaseConverter(user?.name || "", " ")}</div>
                </div>

                <div className={Style.project_extra_wrapper}>
                    <div className={Style.back_btn}>
                        <Button
                            bsPrefix="custom"
                            onClick={() => goToPreviousPath()}
                        ></Button>
                    </div>

                    <div className={Style.project_extra_inner}>
                        <div className={Style.project_extra_main}>
                            {loading && showLoading()}
                            {!loading && (
                                <>
                                    <div className={Style.image_wrapper}>
                                        <div className={Style.image_container}>
                                            <img
                                                src={violationImage || ""}
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                    <div className={Style.content_wrapper}>
                                        <div
                                            className={
                                                Style.heading_icon_wrapper
                                            }
                                        >
                                            <div
                                                className={
                                                    Style.heading_wrapper_project
                                                }
                                            >
                                                <h3>
                                                    {eventData.eventType || " "}
                                                </h3>
                                                {/*  <h5>{eventData.id || ""}</h5> */}
                                                <p>
                                                    <Moment format="hh:mm A DD/MM/YYYY">
                                                        {eventData?.createdAt}
                                                    </Moment>
                                                </p>
                                            </div>
                                            {flowType === "searchdesktop" ? (
                                                <div
                                                    className={
                                                        Style.icon_wrapper
                                                    }
                                                >
                                                    {/* <Button bsPrefix="custom">
                                                <img
                                                    src={Assets.map_icon}
                                                    alt=""
                                                    onClick={() =>
                                                        history.push(
                                                            "/directionMap"
                                                        )
                                                    }
                                                />
                                            </Button> */}
                                                </div>
                                            ) : null}
                                        </div>

                                        {/*  <div>
                                    <div className="row">
                                        <h6 className="col-6">
                                            <b>Location</b>
                                            <br />{" "}
                                            <small className="">
                                                {eventData?.location}
                                            </small>
                                        </h6>
                                        {eventData?.data &&
                                            Object.keys(eventData.data).map(
                                                (key, i) => (
                                                    <h6
                                                        key={i}
                                                        className="col-6"
                                                    >
                                                        <b>{formatKey(key)}</b>
                                                        <br />{" "}
                                                        <small>
                                                            {
                                                                eventData.data[
                                                                    key
                                                                ]
                                                            }
                                                        </small>
                                                    </h6>
                                                )
                                            )}
                                    </div>
                                </div> */}

                                        {showMedias ? (
                                            <ShareDetails
                                                hideMediaDetails={
                                                    hideMediaDetails
                                                }
                                            />
                                        ) : null}

                                        {showChat ? (
                                            <ChatInputs
                                                cancelChat={cancelChat}
                                            />
                                        ) : null}
                                        {showEdit ? <EditInputs /> : null}
                                        {showSmiley ? (
                                            <div
                                                className={
                                                    Style.reaction_wrapper
                                                }
                                            >
                                                <ul>
                                                    {smileyList.map(
                                                        (smiley, i) => {
                                                            return (
                                                                <li key={i}>
                                                                    <Button bsPrefix="custom">
                                                                        <img
                                                                            src={
                                                                                smiley.image
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    </Button>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        ) : null}

                                        {setInitial ? (
                                            <>
                                                <div
                                                    className={
                                                        Style.action_project_wrapper
                                                    }
                                                >
                                                    <ul>
                                                        <li>
                                                            <Button
                                                                bsPrefix="custom"
                                                                onClick={
                                                                    setShowSmiley
                                                                }
                                                            >
                                                                <img
                                                                    src={
                                                                        Assets.happy
                                                                    }
                                                                    alt=""
                                                                />
                                                            </Button>
                                                        </li>
                                                        <li>
                                                            <Button
                                                                bsPrefix="custom"
                                                                onClick={
                                                                    downloadImage
                                                                }
                                                            >
                                                                <img
                                                                    src={
                                                                        Assets.download
                                                                    }
                                                                    alt=""
                                                                />
                                                            </Button>
                                                        </li>
                                                        <li>
                                                            <Button
                                                                bsPrefix="custom"
                                                                onClick={
                                                                    setShowMedias
                                                                }
                                                            >
                                                                <img
                                                                    src={
                                                                        Assets.share
                                                                    }
                                                                    alt=""
                                                                />
                                                            </Button>
                                                        </li>
                                                        <li>
                                                            <Button bsPrefix="custom">
                                                                {/* {flowType=="searchvideo"? */}
                                                                <img
                                                                    src={
                                                                        Assets.chatnew
                                                                    }
                                                                    alt=""
                                                                    onClick={
                                                                        setShowChat
                                                                    }
                                                                />
                                                                {/* :<img src={Assets.edit} alt="" onClick={setShowEdit}/>} */}
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div
                                                    className={
                                                        Style.project_result_wrapper
                                                    }
                                                >
                                                    {boardsList.map(
                                                        (boards, i) => {
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    className={
                                                                        Style.project_result_item
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            Style.project_result_image
                                                                        }
                                                                    >
                                                                        <div
                                                                            className={
                                                                                Style.project_result_image_container
                                                                            }
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    boards.image
                                                                                }
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            Style.project_result_content
                                                                        }
                                                                    >
                                                                        <h4>
                                                                            {
                                                                                boards.name
                                                                            }
                                                                        </h4>
                                                                        <p>
                                                                            {
                                                                                boards.time
                                                                            }
                                                                        </p>
                                                                        <a href="">
                                                                            <span className="icon-map">
                                                                                <span clas="path1"></span>
                                                                                <span className="path2"></span>
                                                                                <span className="path3"></span>
                                                                                <span className="path4"></span>
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </CommonLayout>
        </>
    );
}

export default BillBoardDesktop;

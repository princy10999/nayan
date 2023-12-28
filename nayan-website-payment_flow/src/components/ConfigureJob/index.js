import React, { useState } from "react";
import Style from "./ConfigureJob.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import MapLayout from "../Layout/MapLayout";
import { Accordion, Button } from "react-bootstrap";
import SubscriptionModel from "../SubscriptionModel";
import { useHistory } from "react-router";

function ConfigureJob() {
    const [dropdownList, setDropdown] = useState([
        {
            image: Assets.icon01,
            iconText: "QUADRILATERAL",
            buttonPreview: "Preview Mode",
        },
        {
            image: Assets.icon02,
            iconText: "PAINT",
            buttonPreview: "Preview Mode",
        },
        {
            image: Assets.icon03,
            iconText: "MULTIPLE CROP",
            buttonPreview: "Preview Mode",
        },
    ]);
    const [imageList, setImageList] = useState([
        { image: Assets.config01 },
        { image: Assets.config01 },
        { image: Assets.config01 },
    ]);
    const [nameList, setNameList] = useState([{ jobName: "" }]);
    const history = useHistory();

    const addName = () => {
        setNameList([...nameList, { jobName: "" }]);
    };

    const setModelImage = () => {
        history.push("/loadingScreen", { previousUrl: "/configureJob" });
    };

    const deleteName = (index) => {
        // setNameList( nameList.filter((s, sindex) => index !== sindex) );
        const list = [...nameList];
        list.splice(index, 1);
        setNameList(list);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...nameList];
        list[index][name] = value;
        setNameList(list);
    };

    const changeImage = (e, index) => {
        let imgFile = URL.createObjectURL(e.target.files[0]);

        const imgList = [...imageList];
        imgList[index].image = imgFile;
        setImageList(imgList);
    };

    return (
        <>
            <MapLayout>
                <div className={Style.config_wrapper}>
                    <div className={Style.heading_wrapper}>
                        <h3>Configuring your Job</h3>
                    </div>

                    <div className={Style.config_name}>
                        <div className={Style.input_list}>
                            {nameList.map((name, index) => {
                                return (
                                    <div className={Style.config_input} key={name + index}>
                                        <label htmlFor="">
                                            Name the job<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="jobName"
                                            id={index}
                                            value={name.jobName}
                                            onChange={(e) =>
                                                handleInputChange(e, index)
                                            }
                                        />
                                        {index != 0 ? (
                                            <button
                                                className={Style.config_btn_del}
                                                onClick={() =>
                                                    deleteName(index)
                                                }
                                            >
                                                <span></span>
                                            </button>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            className={Style.config_btn}
                            onClick={() => addName()}
                        >
                            <span></span>
                        </button>
                    </div>

                    <div className={Style.config_job}>
                        <div className={Style.config_input}>
                            <label htmlFor="">
                                Instructions for job<span>*</span>
                            </label>
                            <textarea name=""></textarea>
                        </div>
                    </div>

                    <Accordion defaultActiveKey="0" className={Style.search_us}>
                        <Accordion.Item
                            eventKey="0"
                            className={Style.search_inner}
                        >
                            <Accordion.Header>
                                <div className={Style.search_heading}>
                                    <h3>What do you want us to search?</h3>
                                    <button
                                        className={Style.collapse_icon}
                                    ></button>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className={Style.collapse_wrapper}>
                                    <div className={Style.image_wrapper}>
                                        {imageList.map((res, index) => {
                                            return (
                                                <div
                                                    className={Style.image_item}
                                                    key={index}
                                                >
                                                    <div
                                                        className={
                                                            Style.image_inner
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                Style.image_container
                                                            }
                                                        >
                                                            {res.imageUploaded ? (
                                                                <img
                                                                    src={
                                                                        res.imageUploaded
                                                                    }
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={
                                                                        res.image
                                                                    }
                                                                    alt=""
                                                                />
                                                            )}
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) =>
                                                                    changeImage(
                                                                        e,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <Accordion
                        defaultActiveKey="0"
                        className={Style.annotation_us}
                    >
                        <Accordion.Item
                            eventKey="0"
                            className={Style.annotation_inner}
                        >
                            <Accordion.Header>
                                <div className={Style.annotation_heading}>
                                    <h3>Annotation tools?</h3>
                                    <button
                                        className={Style.collapse_icon}
                                    ></button>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className={Style.collapse_wrapper}>
                                    <div className={Style.icons_wrapper}>
                                        {dropdownList.map((res, index) => {
                                            return (
                                                <div
                                                    className={Style.icons_item}
                                                    key={index}
                                                >
                                                    <div
                                                        className={
                                                            Style.icons_inner
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                Style.svg_icon
                                                            }
                                                        >
                                                            <img
                                                                src={res.image}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <h3
                                                            className={
                                                                Style.icons_text
                                                            }
                                                        >
                                                            {res.iconText}
                                                        </h3>
                                                        <button
                                                            className={
                                                                Style.btn_preview
                                                            }
                                                        >
                                                            {res.buttonPreview}
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <div className={Style.action_wrapper_config}>
                        <Button
                            bsPrefix="custom"
                            className={Style.cancel_btn}
                            onClick={() => history.push("/")}
                        >
                            Cancel
                        </Button>
                        <Button
                            bsPrefix="custom"
                            className={Style.submit_btn}
                            onClick={setModelImage}
                        >
                            Submit Project
                        </Button>
                    </div>
                </div>
            </MapLayout>
        </>
    );
}

export default ConfigureJob;

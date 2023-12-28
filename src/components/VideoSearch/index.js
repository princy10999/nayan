import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Style from "./VideoSearch.module.scss";
import { useHistory } from "react-router-dom";

function VideoSearch({ handleClose }) {
    const history = useHistory();

    const [isFilePicked, setIsFilePicked] = useState(false);
    const [lessonImage, setLessonImage] = useState([]);

    const handleLessonImage = (event) => {
        const data = [];
        for (let i = 0; i < event.target.files.length; i++) {
            data.push(event.target.files[i]);
        }
        setLessonImage((old) => [...old, data]);
        setIsFilePicked(true);
    };

    const submit = () => {
        localStorage.setItem("flow", "searchvideo");
        history.push("/configureJob");
    };

    return (
        <div className={Style.video_image_wrapper}>
            <div className={Style.video_image_inner}>
                <div className={Style.close_icon_wrapper} onClick={handleClose}>
                    <button>X</button>
                </div>

                <div className={Style.heading_wrapper}>
                    <h2>Nayan can search in your content</h2>
                    <p>
                        Search Nayan with an image or video instead of text. Try
                        dragging an image or video here.
                    </p>
                </div>

                <div className={Style.tab_heading}>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                        className={Style.tab_heading_inner}
                    >
                        <Tab eventKey="home" title="Paste URL">
                            <div className={Style.tab_item}>
                                <div className={Style.tab_item_inner}>
                                    <div className={Style.form_wrapper}>
                                        <input type="text" />
                                        <button onClick={submit}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title="Upload image and video">
                            <div className={Style.tab_item}>
                                <div className={Style.tab_item_inner}>
                                    <div className={Style.input_wrapper}>
                                        <div className={Style.input_file_main}>
                                            <div className={Style.input_file}>
                                                <input
                                                    type="file"
                                                    multiple="multiple"
                                                    onChange={handleLessonImage}
                                                    accept="image/*,video/*"
                                                />

                                                <div
                                                    className={Style.input_box}
                                                >
                                                    Choose File
                                                </div>

                                                {!isFilePicked ? (
                                                    <span>
                                                        No file chosen
                                                        Ctrl-click to select
                                                        multiple files
                                                    </span>
                                                ) : null}
                                            </div>
                                            {/* <button className={Style.add_more}>+</button> */}
                                        </div>
                                        {lessonImage.map((item, index) => {
                                            return (
                                                <div
                                                    className={Style.video_thmb}
                                                >
                                                    <div
                                                        className={
                                                            Style.video_thmb_inner
                                                        }
                                                    >
                                                        {item.map((file) => {
                                                            let imgFile =
                                                                URL.createObjectURL(
                                                                    file
                                                                );
                                                            return (
                                                                <div
                                                                    className={
                                                                        Style.image_wrapper
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            Style.container
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={
                                                                                imgFile
                                                                            }
                                                                            title={
                                                                                file.name
                                                                            }
                                                                            alt="img"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <button
                                            className={Style.submit_btn}
                                            onClick={submit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default VideoSearch;

import React, { useEffect, useState } from "react";
import Style from "./Recommendations.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import MapLayout from "../Layout/MapLayout";
import LoadingScreen from "../LoadingScreen";
import SubscriptionModel from "../SubscriptionModel";

function Recommendations() {
    const [imageList, setImageList] = useState([
        {
            name: "Mac D BillBoards",
            image: Assets.one,
            time: "12:56 Pm, 12/07/2021",
        },
        {
            name: "Mac D BillBoards",
            image: Assets.two,
            time: "12:56 Pm, 12/07/2021",
        },
        {
            name: "Mac D BillBoards",
            image: Assets.three,
            time: "12:56 Pm, 12/07/2021",
        },
    ]);
    const [modelImage, setImage] = useState(Assets.one);
    const [loadingAnimation, setLoadingAnimation] = useState(false);
    const [showModal, setModal] = useState(false);

    let setModelImageTimer = null;

    useEffect(() => {
        return () => {
            setModelImageTimer && clearTimeout(setModelImageTimer)
        }
    }, [])

    const setModelImage = (image) => {
        setImage(image.image);
        setLoadingAnimation(true);

        setModelImageTimer = setTimeout(() => {
            setLoadingAnimation(false);
            setModal(true);
        }, 5000);
    };

    const hidemodal = () => {
        setModal(false);
    };

    return (
        <>
            {loadingAnimation && <LoadingScreen />}

            <MapLayout>
                <div className={Style.find_wrapper}>
                    <div className={Style.find_heading_wrapper}>
                        <h3>Let Nayan find for you</h3>
                    </div>
                    <div className={Style.action_wrapper_find}>
                        <button className={Style.help_btn}>Help Me</button>
                        <button className={Style.start_btn}>Start</button>
                    </div>

                    <div className={Style.result_header_wrapper}>
                        <h3>Recommendations</h3>
                        <p>Recommendations for you from our data base</p>
                    </div>
                </div>

                <div className={Style.result_wrapper}>
                    {imageList.map((image) => {
                        return (
                            <div className={Style.result_item}>
                                <div className={Style.result_image}>
                                    <div
                                        className={Style.result_image_container}
                                    >
                                        <img
                                            src={image.image}
                                            alt=""
                                            onClick={() => setModelImage(image)}
                                        />
                                    </div>
                                </div>
                                <div className={Style.result_content}>
                                    <h4>{image.name}</h4>
                                    <p>{image.time}</p>
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
                </div>

                <SubscriptionModel
                    show={showModal}
                    handleClose={hidemodal}
                    image={modelImage}
                />
            </MapLayout>
        </>
    );
}

export default Recommendations;

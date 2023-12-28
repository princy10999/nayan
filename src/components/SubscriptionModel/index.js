import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import Style from "./SubscriptionModel.module.scss";
import { useHistory } from "react-router-dom";
import VideoPlayer from "../VideoPlayer";
import { Context } from "../../context";
import { LoginSignupContext } from "../../context/loginSignupModal";

function SubscriptionModel({ show, handleClose, image }) {
    // User State
    const {
        state: { user },
    } = useContext(Context);

    // State for Login/Signup Modal
    const { dispatchLoginSignup } = useContext(LoginSignupContext);

    const [setVideo, showVideo] = useState(false);

    const history = useHistory();
    const hideVideo = () => {
        showVideo(false);
        handleClose();
    };

    const handleBack = () => {
        showVideo(false);
    };

    const goToUrl = () => {
        if (user !== null) {
            sessionStorage.setItem(
                "backBillMap",
                JSON.stringify(
                    history?.location?.pathname + history?.location?.search
                )
            );
            return history.push("/billboardssearch");
        } else {
            //localStorage.setItem("loginModal", true);
            /* sessionStorage.setItem(
                "backMap",
                JSON.stringify(
                    history?.location?.pathname + history?.location?.search
                )
            ); */
            dispatchLoginSignup({ type: "LOGIN" });
            hideVideo();
            //return history.push("/userLogin");
        }
    };

    return (
        <>
            <Modal
                show={show}
                // onHide={hideVideo}
                dialogClassName="custom_styling"
                centered
            >
                <Modal.Header onClick={hideVideo}>
                    <div className={Style.modal_header}>x</div>
                </Modal.Header>
                <Modal.Body>
                    {setVideo ? (
                        <VideoPlayer handleBack={handleBack} />
                    ) : (
                        <div className={Style.popup_wrapper}>
                            <div className={Style.popup_inner}>
                                <div className={Style.popup_main}>
                                    <div className={Style.image_wrapper}>
                                        <div className={Style.image_container}>
                                            {/* <img src={image} alt=""/> */}
                                            <img src={image} alt="" />
                                        </div>
                                    </div>
                                    <div className={Style.content_wrapper}>
                                        <div className={Style.heading}>
                                            Your Project is Ready
                                        </div>
                                        <div
                                            className={
                                                Style.content_main_wrapper
                                            }
                                        >
                                            {/* <h3>1$ Subscription</h3> */}
                                            <ul>
                                                <li>Starter pack</li>
                                                <li>05 Events a Day</li>
                                                <li>2 Downloads a Day</li>
                                            </ul>
                                            <div
                                                className={Style.action_wrapper}
                                            >
                                                <Button
                                                    bsPrefix="custom"
                                                    className={
                                                        Style.subscribe_btn
                                                    }
                                                    onClick={() => goToUrl()}
                                                >
                                                    Login
                                                </Button>
                                                <Button
                                                    bsPrefix="custom"
                                                    className={
                                                        Style.know_more_btn
                                                    }
                                                    onClick={showVideo}
                                                >
                                                    Know More
                                                </Button>
                                            </div>
                                        </div>
                                        <div className={Style.warning}>
                                            Payment is held by PayPal, Master
                                            Card and Visa, professional money
                                            transfer solutions.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}
export default SubscriptionModel;

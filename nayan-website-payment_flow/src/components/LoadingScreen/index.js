import React, { useEffect, useState } from "react";
import Assets from "../Layout/CommonLayout/Asset";
import Style from "./LoadingScreen.module.scss";
import GoogleMap from "../Map/googlemap";
import { useHistory, useLocation } from "react-router";
import SubscriptionModel from "../SubscriptionModel";

function LoadingScreen() {

    const [showModal, setModal] = useState(false);
    
    const location = useLocation();
    const modalImage = location.state?location.state.image:null;
    const previousUrl = location.state?location.state.previousUrl:'/';
    const hidemodal = () => {
      setModal(false);
      history.push(previousUrl);
      localStorage.setItem("modalClosed",true)
    };

    const history = useHistory();
    
    useEffect(()=>{
        setModal(true);
    },[])
    
  return (
    <>
    <main className={Style.main_wrapper}>
            <div className={Style.main_wrapper_inner}>


                <div className={Style.map_wrapper}>
                    <div className={Style.map_wrapper_inner}>
                        <div className={Style.map_main}>
                        <GoogleMap />
                        </div>
                    </div>

                    <div className={Style.loading_wrapper}>
                            <div className={Style.loading_inner}>

                                <div className={Style.loading_image_wrapper}>
                                    <div className={Style.image_container}>
                                        <img src={Assets.nayanzloadgif} alt=""/>
                                        {/* <video autoplay='' loop>
                                            <source src={Assets.loadingvideo}></source>
                                        </video> */}
                                    </div>
                                </div>
                                <div className={Style.content_wrapper}>
                                    <h2>Great</h2>
                                    <h6>Things are coming your way</h6>
                                </div>

                            </div>
                        </div>

                </div>
            </div>
            <SubscriptionModel
                show={showModal}
                handleClose={hidemodal}
                image={modalImage}
            />
        </main>
    </>
  );
}

export default LoadingScreen;



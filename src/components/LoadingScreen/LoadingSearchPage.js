import React from "react";
import Assets from "../Layout/CommonLayout/Asset";
import Style from "./LoadingScreen.module.scss";
import GoogleMap from "../Map/googlemap";

function LoadingSearchPage() {

    
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
        </main>
    </>
  );
}

export default LoadingSearchPage;



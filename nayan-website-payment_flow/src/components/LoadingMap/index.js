import React from "react";
import Style from "./LoadingMap.module.scss";

function LoadingMap() {

  return (
        <div className={Style.loading_text}>
            <div className={Style.loading_inner_text}>
                <div className={Style.content_wrapper_text}>
                    <h2>
                        <span>Great</span> 
                        <br/>
                        Your Search has 
                        <br/>
                        been Found
                    </h2>
                </div>
            </div>
        </div>
  );
}

export default LoadingMap;
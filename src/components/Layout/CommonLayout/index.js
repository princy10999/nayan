import GoogleMap from "../../Map/googlemap";
import React, { useEffect, useState } from "react";
import Style from "./CommonLayout.module.scss";

function CommonLayout({ children }) {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 50);
    return () => {
     clearInterval(timer)
    };
  }, []);

  return (
    <main className={`${Style.main_wrapper} ${pageLoaded ? "" : Style.active}`}>
      <div className={Style.main_wrapper_inner}>
        <div className={Style.map_wrapper}>
          <div className={Style.map_wrapper_inner}>
            <div className={Style.map_main}>
              <GoogleMap />
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

export default CommonLayout;

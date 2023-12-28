import React, { memo, useContext } from "react";
import { InfoWindow } from "@react-google-maps/api";
import Styles from "./Map.module.scss";
import { MapStateContext } from "../../context/mapStateControl";

const ShowInfoWindow = () => {
    // State for Info Window
    const {
        mapState: { mapDetails },
        dispatchMapState,
    } = useContext(MapStateContext);

    return (
        <>
            <InfoWindow
                position={mapDetails?.location}
                clickable={true}
                onCloseClick={() =>
                    dispatchMapState({ type: "CLOSE_INFO_MAP" })
                }
            >
                <>


                 <p>{mapDetails?.id}</p> 

                     <center>
                        <button
                            onClick={() =>
                                dispatchMapState({ type: "CLOSE_INFO_MAP" })
                            }
                            className={
                                Styles.map__info__btn +
                                " " +
                                Styles.map__info__danger__btn
                            }
                        >
                            Close
                        </button>
                    </center> 
                </>
            </InfoWindow>
        </>
    );
};

export default memo(ShowInfoWindow);

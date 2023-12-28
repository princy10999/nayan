import React, { useContext, memo } from "react";
import { Marker } from "@react-google-maps/api";
import { MapStateContext } from "../../context/mapStateControl";
import { Context } from "../../context";
//import MapIcon from "../../assets/images/icons/map_icon.png";
import MapMarker from "../../assets/images/icons/spotlight-map.png";
import MapMarkerBlack from "../../assets/images/icons/spotlight-map-black.png";
//import ShowInfoWindow from "./showInfoWindow";
import { useHistory, useLocation } from "react-router-dom";

const CustomMarker = ({ item, clusterer, checkUsertoRedirect, isMap,map }) => {
    // State for User
    const {
      state: { user },
    } = useContext(Context);
  // State for Info Window
  const {
    mapState: { showInfo, mapDetails },
  } = useContext(MapStateContext);
  const currentPage = useLocation();
  const history = useHistory();
  const handleRedirection = (item) => {
    if (isMap) {
      if(map&& user===null ){
        sessionStorage.setItem(
          "mapCurrentZoom",
          JSON.stringify({
            zoom:map.getZoom()|| 13,
          })
        );
      }
      
      checkUsertoRedirect(item, "GOOGLE_MAP",true);
    } else if (currentPage.pathname == "/innerDetails") {
      return history.push({
        pathname: "/innerDetails",
        search: `?id=${item?.id}`,
      });
    }
  };  

  return (
      
        <Marker
          key={item?.id}
          position={{
            lat: item?.latitude,
            lng: item?.longitude,
          }}
          clusterer={clusterer}
          onClick={() => handleRedirection(item)}
          /*  label={{ text: `${item?.id}`, color: "white" }} */
          icon={{
            url: mapDetails?.id == item?.id ? MapMarkerBlack : MapMarker,
            /* anchor: new window.google.maps.Point(32, 32), */
            scaledSize: /* showInfo && mapDetails?.id === item?.id
            ? new window.google.maps.Size(31, 47)
            : */ new window.google.maps.Size(27, 43),
          }}
          animation={showInfo && mapDetails?.id == item?.id && 1}
          {...(mapDetails?.id == item?.id)&&
            {zIndex:9999}
          }
         
        >
          {/* {showInfo && <ShowInfoWindow key={Math.random().toString()} />} */}
        </Marker>
  );
};

export default memo(CustomMarker);

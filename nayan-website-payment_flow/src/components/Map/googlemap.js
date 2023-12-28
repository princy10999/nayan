import React, { useState, useContext, useEffect, memo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerClusterer,
  HeatmapLayer,
} from "@react-google-maps/api";
//import { MapStateContext } from "../../context/mapStateControl";
import CustomMarker from "./customMarker";
import { useDimensions } from "../../logic/Dimensions";
import { useHistory, useLocation } from "react-router-dom";
import { MapStateContext } from "../../context/mapStateControl";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const libs = ["visualization"];

function MyComponent({
  checkUsertoRedirect,
  mapDatas,
  isMap,
  isLoading,
  currentMapCenter,
  fetchDataByFilter,
  setNewCurrentMapCenter,
  setSelectRange,
  selectRange,
  descriptionCenter,
  markerCluster = null,
  setMarkerCluster = null,
  heatmaps,
}) {
  const { dispatchMapState } = useContext(MapStateContext);
  //if id is present
  const searchQuery = useLocation().search;
  const boardID = new URLSearchParams(searchQuery).get("id");
  const shouldZoom =new URLSearchParams(searchQuery).get("shouldZoom");
  const eventLat =new URLSearchParams(searchQuery).get("lat");
  const eventLng=new URLSearchParams(searchQuery).get("lng");
  const zoomLevel = new URLSearchParams(searchQuery).get("zoom")
  const currentPage = useLocation();
  // By default Delhi
  const [mapCenters, setMapCenters] = useState([
    {
      latitude: 28.613939,
      longitude: 77.209023,
    },
  ]);

  const [zoom, setZoom] = useState(zoomLevel?parseInt(zoomLevel):13); //zooming by default to 18 will set clustered data
  // Bound value
  const [Bound, setBound] = useState();
  // By default Delhi
  const [center, setCenter] = useState({
    lat: eventLat!==""||eventLat!==undefined ||eventLat!==null?parseFloat(eventLat): 28.613939,
    lng: eventLng!==""||eventLng!==undefined ||eventLng!==null?parseFloat(eventLng):77.209023,
  });
  // const [heatMapPositions, setHeatMapPositions] = useState([]);
  const [map, setMap] = React.useState(null);
  useEffect(() => {
    
    if (currentMapCenter && eventLat ===null && eventLng===null ){
      setCenter(currentMapCenter);
    } 
  }, [currentMapCenter]);

  useEffect(() => {
    // will not affect in Inner Details page
    if (currentPage.pathname != "/innerDetails") {
      if (mapDatas?.length) {
        // console.log("map center updateddd");
        if (mapDatas[0]?.latitude && mapDatas[0]?.longitude) {
          // if it is a filter view change the center point to result data
          let filterView = sessionStorage.getItem("filterView");

          if (filterView) {
            // set center of first data from filter
            setCenter({
              ...center,
              lat: mapDatas[0].latitude,
              lng: mapDatas[0].longitude,
            });

            sessionStorage.removeItem("filterView");
          }
          setMapCenters(mapDatas);
        }
      }
    }
  }, [mapDatas, map]);

  // useeffect call for InnerDetail page
  useEffect(() => {
    // const positions =
    //   mapDatas &&
    //   mapDatas.length > 0 &&
    //   mapDatas.map(
    //     (item) => new window.google.maps.LatLng(item.latitude, item.longitude)
    //   );
    // const positions = mapDatas&&mapDatas.length>0&&mapDatas.map(item => ({ [key]: value })  { "lat": item.latitude, "lng": item.longitude};
    // setHeatMapPositions(positions);
    if (descriptionCenter && boardID) {
      if (descriptionCenter[0]?.latitude && descriptionCenter[0]?.longitude) {
        setCenter({
          lat: descriptionCenter[0].latitude,
          lng: descriptionCenter[0].longitude,
        });
        const data = {
          id: descriptionCenter[0]?.id,
        };
        if (data?.id) {
          dispatchMapState({
            type: "SHOW_INFO_MAP",
            payload: data,
          });
        }
        setMapCenters(mapDatas);
        setZoom(11);
      }
    }
  }, [mapDatas]);

  // useEffect(() => {
  //   if (mapDatas?.length && descriptionCenter?.length) {
  //     // console.log("map center changed")
  //     if (mapDatas[0]?.latitude && mapDatas[0]?.longitude) {
  //       if (boardID) {
  //         if (
  //           descriptionCenter[0]?.latitude &&
  //           descriptionCenter[0]?.longitude
  //         ) {
  //           setCenter({
  //             lat: descriptionCenter[0].latitude,
  //             lng: descriptionCenter[0].longitude,
  //           });
  //         }
  //       }

  //       setMapCenters(mapDatas);
  //     }
  //   } else if (descriptionCenter?.length) {
  //     console.log("this is fire")
  //     setCenter({
  //       lat: descriptionCenter[0].latitude,
  //       lng: descriptionCenter[0].longitude,
  //     });
  //   }
  // }, [descriptionCenter]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY, //please add your google map API key here
    libraries: libs,
  });

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  //const options = { closeBoxURL: "", enableEventPropagation: true };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  // const fetchDataOnchange = (data) => {
  //   if (!boardID) {
  //     if (isMap !== undefined && isMap && data) {
  //       if (isLoading == false && isLoading !== undefined) {
  //         // only for pointers
  //         // console.log("BOUND LEVEL", data?.getBounds().toJSON());
  //         let bounds = data?.getBounds();
  //         // Then the points
  //         var swPoint = bounds.getSouthWest();
  //         var nePoint = bounds.getNorthEast();
  //         // console.log("swpoint", swPoint);

  //         // Now, each individual coordinate
  //         var swLat = swPoint?.lat();
  //         var swLng = swPoint?.lng();
  //         var neLat = nePoint?.lat();
  //         var neLng = nePoint?.lng();
  //         let NewZoom = data?.zoom;
  //         // console.log("Center new", data?.getCenter().toJSON());
  //         var newcenter = data?.getCenter().toJSON();

  //         // distance calculating
  //         var distance = calcCrow(swLat, swLng, newcenter.lat, newcenter.lng);
  //         // console.log("Distance between is", distance);

  //         // distance minus 2 km for range adjusting
  //         if (distance >= 3) {
  //           distance = distance - 2;

  //           setSelectRange(distance);
  //         } else {
  //           setSelectRange(distance);
  //         }

  //         function calcCrow(lat1, lon1, lat2, lon2) {
  //           var R = 6371; // km
  //           var dLat = toRad(lat2 - lat1);
  //           var dLon = toRad(lon2 - lon1);
  //           var lat1 = toRad(lat1);
  //           var lat2 = toRad(lat2);

  //           var a =
  //             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //             Math.sin(dLon / 2) *
  //               Math.sin(dLon / 2) *
  //               Math.cos(lat1) *
  //               Math.cos(lat2);
  //           var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //           var d = R * c;
  //           return d;
  //         }

  //         // Converts numeric degrees to radians
  //         function toRad(Value) {
  //           return (Value * Math.PI) / 180;
  //         }
  //         setNewCurrentMapCenter(newcenter);
  //       }
  //     }
  //   }
  // };

  // fetch result if map center is changed only
  useEffect(() => {
    if (fetchDataByFilter && selectRange) {
      fetchDataByFilter();
    }
  }, [selectRange]);
  useEffect(() => {
    if(map){
      if (shouldZoom==="true"&&boardID) {
         map.setZoom(22)
      }if(boardID===null){
        map.setZoom(13)
      }
    }
  }, [boardID,shouldZoom, map]);

  const showCustomMarker = (clusterer) => {
    if (markerCluster === null && setMarkerCluster) {
      setMarkerCluster(clusterer);
    }

    return (
      mapCenters&&mapCenters.length >= 1 &&
      isLoading == false &&
      mapDatas?.length >= 1 &&
      mapCenters.map((item) => (
        <CustomMarker
          key={item?.id}
          clusterer={clusterer}
          item={item}
          checkUsertoRedirect={checkUsertoRedirect}
          isMap={isMap}
          map={map}
        />
      ))
    );
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onUnmount={onUnmount}
      onLoad={onLoad}
      className="mapsec"
      options={options}
      // onDragEnd={() => fetchDataOnchange(map)}
      // onZoomChanged={() => fetchDataOnchange(map)}
      // onBoundsChanged={() => fetchDataOnchange(map)}
    >
      <MarkerClusterer
        averageCenter
        enableRetinaIcons
        // gridSize={120}
        minimumClusterSize={5}
        maxZoom={21}
        averageCenter={true}
        batchSizeIE={100}
      >
        {(clusterer) => showCustomMarker(clusterer)}
      </MarkerClusterer>
      {mapDatas && mapDatas.length > 0 && heatmaps && heatmaps.length > 0 && (
        <>
          <HeatmapLayer options={{ maxIntensity: 1 }} data={heatmaps} />
        </>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(MyComponent);

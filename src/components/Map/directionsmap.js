/* eslint-disable no-undef */
/*global google*/

import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";
import Assets from "../Layout/CommonLayout/Asset";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 9.931233,
  lng: 76.267303,
};

const center1 = {
  lat: 9.598721,
  lng: 76.528897,
};

const center2 = {
  lat: 9.488345,
  lng: 76.351518,
};

const center3 = {
  lat: 9.683337,
  lng: 76.340571,
};

const center4 = {
  lat: 9.24987,
  lng: 76.514995,
};

function Directions() {
  const [directions,setDirections] = useState(
    {}
    );
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "", //please add your google map API key here
  });

  const [map, setMap] = React.useState(null);

  const onUnmount = React.useCallback(function callback(map) {
    console.log("@onUnmount");
    setMap(null);
  }, []);
  
  useEffect(() => {
    const DirectionsService =  new google.maps.DirectionsService();
    DirectionsService.route({

      origin: new google.maps.LatLng(10.075844310444731, 76.26015439604804),
      destination: new google.maps.LatLng(9.995516820200164, 76.3138299547056),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      console.log("#########result",result,status);
      // setDirections(result)
      console.log("##directions",directions);
      if (status === google.maps.DirectionsStatus.OK) {
        // this.setState({
        //   directions: {...result},
        //   markers: true
        // })
        setDirections(result)
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });

  },[]);

 


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onUnmount={onUnmount}
    >
      <>
      <DirectionsRenderer directions={directions}/>

      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Directions);

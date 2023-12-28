/* eslint-disable no-undef */

import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

/*global google*/
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

function RouteMap() {
  const [directions,setDirections] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "", //please add your google map API key here
  });
useEffect(() => {
  const DirectionsService = new google.maps.DirectionsService();

  DirectionsService.route({
    origin: new google.maps.LatLng(10.075844310444731, 76.26015439604804),
    destination: new google.maps.LatLng(9.995516820200164, 76.3138299547056),
    travelMode: google.maps.TravelMode.DRIVING,
  }, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      setDirections(result)
    } else {
      console.error(`error fetching directions ${result}`);
    }
  });
},[]);
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={new google.maps.LatLng(9.931233, 76.267303)}
  >
    {props.directions && <DirectionsRenderer directions={directions} />}
  </GoogleMap>
);

return isLoaded ? (
  <>
<MapWithADirectionsRenderer />
</>
  ): (
    <></>
  );
}

export default RouteMap;
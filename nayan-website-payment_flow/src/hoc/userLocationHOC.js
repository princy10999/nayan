import React from "react";

const userLocationHOC = (Component) => {

  class HOC extends React.Component {

    componentDidMount() {
      this.fetchCurrentLocation();
    }

    // to fetch current location
    fetchCurrentLocation = () => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, options);

        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
          sessionStorage.setItem("currentLocation", "");
        }

        function success(pos) {
          sessionStorage.setItem(
            "currentLocation",
            JSON.stringify({
              lat: pos?.coords?.latitude,
              lng: pos?.coords?.longitude,
            })
          );
        }
        

        // TODO:: not working for IOS device
        // navigator.permissions.query({ name: "geolocation" }).then((result) => {
        //   // in case user denied the location access
        //   if (result.state === "denied") {
        //     sessionStorage.setItem("currentLocation", false);
        //   }
        // });
      } else {
        alert("Geo location not enabled on your device");
      }
    };

    render() {
      return <Component />
    }
  }

  return HOC
}

export default userLocationHOC;

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "./context";
import { LoginSignupProvider } from "./context/loginSignupModal";
import { MapStateProvider } from "./context/mapStateControl";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-rangeslider/lib/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TawkMessengerIcon from "./components/TawkChat";
import ReactGA from 'react-ga4'

// initialize google analytics
// ReactGA.initialize('UA-118900506-1')

ReactDOM.render(
    <>
        <Provider>
            <LoginSignupProvider>
                <MapStateProvider>
                    <ToastContainer position="top-center" />
                    <App />
                    <TawkMessengerIcon />
                </MapStateProvider>
            </LoginSignupProvider>
        </Provider>
    </>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

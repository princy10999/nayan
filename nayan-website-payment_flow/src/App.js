import "./App.css";
import "./styles/scss/main.scss";
import "./config";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  lazy,
  useState,
} from "react";
import axios from "axios";
import { Context } from "./context";
import { saveClientIp } from "./api/userApi";
import ReactGA from "react-ga";
import RouteChangeTracker from "./RouteChangeTracker";
import userLocationHOC from "./hoc/userLocationHOC";
// import ReactGA from "react-ga4";


const ListView = lazy(() => import("./components/ListView"));
const FiltersView = lazy(() => import("./components/FiltersView"));
const PrivateRoute = lazy(() => import("./auth/PrivateRoute"));
const MainPageView = lazy(() => import("./pages/MainPageView"));
const MapPage = lazy(() => import("./pages/MapPage"));
const UserLoginPage = lazy(() => import("./pages/UserLoginPage"));
const UserSignupPage = lazy(() => import("./pages/UserSignupPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const BillBoardsPage = lazy(() => import("./pages/BillBoardsPage"));
const ConfigureJobPage = lazy(() => import("./pages/ConfigureJobPage"));
const RecommendationsPage = lazy(() => import("./pages/RecommendationsPage"));
const BillBoardDescriptionPage = lazy(() =>
  import("./pages/BillBoardDescriptionPage")
);

const BillBoardSearchPage = lazy(() => import("./pages/BillBoardSearchPage"));
const LoadingPage = lazy(() => import("./pages/LoadingPage"));
const DirectionMapPage = lazy(() => import("./pages/DirectionMapPage"));
const LoadingMapPage = lazy(() => import("./pages/LoadingMapPage"));
const MarketPlacePage = lazy(() => import("./pages/MarketPlacePage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const UseCasesPage = lazy(() => import("./pages/UseCasesPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const UseCaseDetail = lazy(() => import("./pages/UseCaseDetail"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const ConfirmPassword = lazy(() => import("./components/ConfirmPassword"));
const LandingHomePage = lazy(() => import("./pages/LandingHomePage"));

const TRACKING_ID = "UA-118900506-1"; // YOUR_OWN_TRACKING_ID


ReactGA.initialize(TRACKING_ID);
const InnerDetailPage = lazy(() => import("./pages/InnerDetailPage"));
const MyCollection = lazy(() => import("./pages/MyCollectionPage"));
const ProductViewPage = lazy(() => import("./pages/ProductViewPage"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const MyDownloads = lazy(() => import("./pages/MyDownloadsPage"));
const AllCollection = lazy(() => import("./pages/AllCollectionPage"));



function App() {
  useEffect(() => {
    const currentPath = window.location.pathname + window.location.search;
    ReactGA.send({ hitType: "pageview", page: currentPath });
  });
// useEffect(()=>{
//   ReactGA.event({
//     category: "your category",
//     action: "your action",
//     label: "your label", // optional
//     value: 99, // optional, must be a number
//     nonInteraction: true, // optional, true/false
//     transport: "xhr", // optional, beacon/xhr/image
//   });
// })

 
  const [clientIp, setClientIp] = useState("");
  const {
    state: { user },
  } = useContext(Context);

  const geoLocationUrl = "https://geolocation-db.com/json/";

  const fetchUserIP = useCallback(async () => {
    const { data } = await axios.get(geoLocationUrl);
    const ip = data["IPv4"];
    if (ip) {
      setClientIp(ip);
      await saveClientIp({
        ...user,
        ip: ip,
      });
    }
  }, [user, geoLocationUrl]);

  document.addEventListener("contextmenu", (event) => {
    event?.target?.tagName === "IMG" && event.preventDefault();
  });

  useEffect(() => {
    if (user) {
      fetchUserIP();
    }
  }, [fetchUserIP, user]);

  return (
    <>
    
     <Router>
      <RouteChangeTracker />
      <Suspense fallback={<></>}>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={userLocationHOC(MainPageView)} />
            <Route exact path="/map" component={userLocationHOC(MapPage)} />
            <Route exact path="/userLogin" component={UserLoginPage} />
            <Route exact path="/userSignup" component={UserSignupPage} />
            <PrivateRoute exact path="/billboards" component={BillBoardsPage} />
            <Route exact path="/configureJob" component={ConfigureJobPage} />
            <Route
              exact
              path="/Recommendations"
              component={RecommendationsPage}
            />
            {/*  <PrivateRoute
                        exact
                        path="/billBoardDescription"
                        component={BillBoardDescriptionPage}
                    /> */}
            <Route exact path="/loadingScreen" component={LoadingPage} />
            <PrivateRoute
              exact
              path="/billBoardDescription"
              component={DirectionMapPage}
            />
            <Route exact path="/payment" component={PaymentPage} />
            <PrivateRoute
              exact
              path="/billboardssearch"
              component={BillBoardSearchPage}
            />
            <Route exact path="/loadingmap" component={LoadingMapPage} />
            <Route exact path="/marketplace" component={MarketPlacePage} />
            <Route exact path="/aboutus" component={AboutUsPage} />
            <Route exact path="/usecases" component={UseCasesPage} />
            <Route exact path="/contact-us" component={ContactUsPage} />
            <Route exact path="/usecasedetail" component={UseCaseDetail} />

            <Route exact path="/learn-more" component={LandingHomePage} />

            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/confirm-password" component={ConfirmPassword} />

            <Route exact path="/listView" component={ListView} />
            <Route exact path="/filtersView" component={FiltersView} />
            <Route exact path="/innerDetails" component={InnerDetailPage} />
            <Route exact path="/mycollection" component={MyCollection} />
            <Route exact path="/productview" component={ProductViewPage} />

            <Route exact path="/MyDownloads" component={MyDownloads} />
            <Route exact path="/AllCollection" component={AllCollection} />
          </Switch>
        </ScrollToTop>
      </Suspense>
    </Router>
    </>
   
  );
}

export default App;

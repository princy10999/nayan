import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { Context } from "../../context";
import { LoginSignupContext } from "../../context/loginSignupModal";
import { MapStateContext } from "../../context/mapStateControl";
import Assets from "../Layout/CommonLayout/Asset";
import GoogleMap from "./googlemap";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Style from "./Map.module.scss";
import { useHistory, useLocation } from "react-router-dom";
import LoadingMap from "../LoadingMap";
import LoadingScreen from "../LoadingScreen";
import SubscriptionModel from "../SubscriptionModel";
import LoadingSearchPage from "../LoadingScreen/LoadingSearchPage";
import Lottie from "react-lottie";
import animationData from "../Animation/loading.json";
import "./index.css";
import {
  loadCity,
  loadRange,
  loadSearchData,
  loadAutoSearch,
  loadSearchImages,
  loadHeatMaps,
} from "../../api/commonApi";
import Moment from "react-moment";
import { Button } from "react-bootstrap";
import FiltersView from "../FiltersView";
import ListView from "../ListView";
// import Header from "../Header";
import { useDimensions } from "../../logic/Dimensions";
import Skeleton from "@mui/material/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import BoardDescription from "../BoardDescription";
import { TailSpin } from "react-loader-spinner";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import FormDetail from "../Modals/formDetail"
import RazorPay  from "../RazorPay";

function Map() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    // rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice"
    // }
  };
  // State for User
  const {
    state: { user },
  } = useContext(Context);


  // State for Login/Signup Modal
  const { dispatchLoginSignup } = useContext(LoginSignupContext);

  // State for Info Window
  const { dispatchMapState } = useContext(MapStateContext);

  // Get device width
  const { width } = useDimensions();
  const history = useHistory();

  const currentLocation = useLocation();

  // Get the search Keyword from the Url
  const searchQuery = useLocation().search;
  const searchName = new URLSearchParams(searchQuery).get("search");
  const boardID = new URLSearchParams(searchQuery).get("id");
  const urlLat = new URLSearchParams(searchQuery).get("lat");
  const urlLong = new URLSearchParams(searchQuery).get("long");

  const ref = useRef();
  const smallScreenRef = useRef();

  const [search, setSearch] = useState("");
  const [dropdownList, setDropdown] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [modelImage, setImage] = useState(Assets.one);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [loadingSearchAnimation, setLoadingSearchAnimation] = useState(true);
  const [showModal, setModal] = useState(false);

  // Filter State Start
  // const [startDate, setStartDate] = useState(moment().subtract(365, "days"));
  const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState(moment());
  const [endDate, setEndDate] = useState("");
  const [cityList, setCityDropdown] = useState([]);
  const [rangeList, setRangeDropdown] = useState([]);
  const [selectCity, setSelectCity] = useState("");
  // Default 2km range
  const [selectRange, setSelectRange] = useState("");
  // Filter End

  // Pagination Start
  const [allImageList, setAllImageList] = useState([]);
  const [totalEventsCount, setTotalEventsCount] = useState(""); // state to hold total events count
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataPerPage] = useState(10);
  const [scrollableId, setScrollableId] = useState("scrollableDesktopDiv");
  const [isMoreData, setIsMoreData] = useState(true);
  const [isMobileLoading, setIsMobileLoading] = useState(false);
  const [heatmaps, setHeatMaps] = useState([]);
  // Pagination End

  const [isLogin, setIsLogin] = useState(false);
  // For Description Page
  const [isDescription, setIsDescription] = useState(false);
  // set current map center to user's current location if exists else to default location which is New Delhi
  let locationExists = sessionStorage.getItem("currentLocation")
    ? JSON.parse(sessionStorage.getItem("currentLocation"))
    : null;

  // for holding default location (New Delhi)
  const [defaultLocation, setDefaultLocation] = useState({
    lat: urlLat !== null ? urlLat : 28.613939,
    lng: urlLong !== null ? urlLong : 77.209023,
  });

  // const [currentMapCenter, setCurrentMapCenter] = useState({
  //   lat: locationExists?.lat || defaultLocation?.lat,
  //   lng: locationExists?.lng || defaultLocation?.lng,
  // });

  const [currentMapCenter, setCurrentMapCenter] = useState(defaultLocation);

  // for diff infinite scrolling id
  useEffect(() => {
    if (width <= 576) {
      setScrollableId("mobileScrollableDiv");
    } else if (width <= 1200) {
      setScrollableId("smallScreenDiv");
    } else {
      setScrollableId("scrollableDesktopDiv");
    }
  }, [width]);

  const [itemSelected, setItemSelected] = useState(false);
  const [filterSelected, setFilter] = useState(true);

  const [list, setList] = useState(false);
  const [mapView, setMapView] = useState(true);
  const [filterView, setFilterView] = useState(false);

  const [isMobileList, setIsMobileList] = useState(false);

  let checkDescriptionPageTimer = null;

  let eventsRef = useRef([]);

  useEffect(() => {
    getResults();
  }, [searchName, user]);

  useEffect(() => {
    let timer = null;

    const disableAnimation = sessionStorage.getItem("dis_anim");
    if (disableAnimation === "true") {
      setLoadingScreen(false);
      setPageLoaded(true);
      setLoadingSearchAnimation(false);
    } else {
      // fetchResults();
      timer = setTimeout(() => {
        setLoadingScreen(false);
        setPageLoaded(true);
        setLoadingSearchAnimation(false);
      }, 5000);
      sessionStorage.setItem("dis_anim", true);
    }

    return () => {
      timer && clearTimeout(timer);
      checkDescriptionPageTimer && clearTimeout(checkDescriptionPageTimer);
    };
  }, []);




const loadScript=(src)=> {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}




const __DEV__ = document.domain === 'localhost'

	const displayRazorpay=async()=> {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    debugger
		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		// const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
		// 	t.json()
		// )

		// console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_1RREwvtSre0ov2' : 'PRODUCTION_KEY',
			currency: "USD",
			amount: "500",
			order_id: "12345",
			name: 'Donation',
			description: 'Test',
			image: 'http://localhost:1337/logo.svg',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name:"test",
				email: 'sdfdsjfh2@ndsfdf.com',
				phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

  useEffect(() => {
    // loadHeatMaps()
    //   .then((responseData) => {
    //     if (responseData && responseData?.length > 0) {
    //       const positions = responseData&&responseData.length>0&&responseData?.map(
    //         (item) =>{
    //         return  new window.google.maps.LatLng(item.latitude, item.longitude)
    //         }
    //       );
    //       setHeatMaps(positions);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    loadCity(setCityDropdown);
    loadRange(setRangeDropdown);
  }, []);

  useEffect(() => {
    const checkListView = sessionStorage.getItem("isListView");
    // check the prev url is from listView
    if (checkListView) {
      sessionStorage.removeItem("isListView");
      // only for mobile
      if (width <= 576) {
        showListView();
      }
    }
  }, [width]);

  // for checking id in url
  useEffect(() => {
    // if Id, new URLSearchParams(searchQuery).get("search");then show description box
    if (boardID) {
      if (width < 576) {
        hideList();
      }
      setIsDescription(true);
      const data = {
        id: boardID,
      };
      if (urlLat !== null && urlLong !== null) {
        setCurrentMapCenter({
          lat: Number(urlLat),
          lng: Number(urlLong),
        });
      }
      dispatchMapState({ type: "SHOW_INFO_MAP", payload: data });
    } else {
      dispatchMapState({ type: "CLOSE_INFO_MAP" });
    }
  }, [boardID]);

  const getResults = () => {
    // if(sessionStorage.getItem("dis_anim") === "true") {
    setLoading(true);
    fetchResults();
    // }
    clearClusterMarkers();
  };

  const fetchResults = () => {
    setLoading(true);
    // if(eventsRef){
    //   eventsRef.current = []
    // }
    setIsMoreData(true);
    setImageList([]);
    setAllImageList([]);
    setTotalEventsCount("");
    setSearch("");
    //setTotalPages(1);
    setPageNumber(1);
    //Check the SearchName is present or not
    if (searchName) {
      // For Auth User
      if (user !== null) {
        // for checking filter values from session
        const checkFilter = JSON.parse(sessionStorage.getItem("filterData"));

        // updating filter values to their state
        if (checkFilter) {
          setSelectCity(checkFilter?.city);
          setSelectRange(checkFilter?.range);
          setStartDate(checkFilter?.startDate);
          setEndDate(checkFilter?.endDate);
          sessionStorage.removeItem("filterData");
        }
        // fetch search data with auth headers
        loadSearchData({
          input: searchName,
          selectCity: checkFilter?.city || "",
          selectRange: checkFilter?.range,
          startDate,
          endDate,
          setAllImageList,
          setTotalPages,
          setImageList,
          setLoading,
          dataPerPage,
          setPageNumber,
          email: user?.email,
          token: user?.token,
          client: user?.client,
          expiry: user?.exp,
          currentMapCenter,
          setTotalEventsCount,
          setNearestLocationMetadata,
          setImageLoading,
        });
        // For UnAuthenticated user
      } else {
        // condition to avoid re-rendering
        if (!JSON.parse(localStorage.getItem("token"))) {
          // fetch search data without auth headers
          loadSearchData({
            input: searchName,
            selectCity,
            selectRange,
            startDate,
            endDate,
            setAllImageList,
            setTotalPages,
            setImageList,
            setLoading,
            dataPerPage,
            setPageNumber,
            currentMapCenter,
            setTotalEventsCount,
            setNearestLocationMetadata,
            setImageLoading,
          });
        }
      }
    } else {
      setLoading(false);
      setImageLoading(false);
    }
  };

  const fetchDataByFilter = () => {
    // For maintaining stateS Start
    setIsMoreData(true);
    clearClusterMarkers();
    setLoading(true);
    setImageList([]);
    setAllImageList([]);
    setTotalEventsCount("");
    //setTotalPages(1);
    setPageNumber(1);

    /* To remove this comment to redirect to map page  */
    if (isDescription && !boardID) {
      setIsDescription(false);
      //history.push(`/map?search=${searchName}`)
    }
    // For maintaining stateS End

    // Fetch Search filter data
    loadSearchData({
      input: searchName,
      selectCity,
      selectRange,
      startDate,
      endDate,
      setAllImageList,
      setTotalPages,
      setImageList,
      setLoading,
      dataPerPage,
      setPageNumber,
      email: user?.email,
      token: user?.token,
      client: user?.client,
      expiry: user?.exp,
      currentMapCenter,
      setTotalEventsCount,
      setNearestLocationMetadata,
      setImageLoading,
    });
  };

  const hidemodal = () => {
    setModal(false);
  };

  // Search Functionality Start

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    // For Passing empty value
    if (value.length === 0) {
      setItemSelected(true);
      return;
    }
    //trim will remove white spaces.
    if (value.trim().length === 0) {
      setItemSelected(true);
      return;
    }
    setItemSelected(false);
    // Else Load Auto Search
    loadAutoSearch(value, setDropdown, setListLoading);
  };

  const sendSearch = () => {
    setIsMoreData(true);
    clearClusterMarkers();

    localStorage.setItem("flow", "searchdesktop");
    localStorage.setItem("modalClosed", false);
    sessionStorage.setItem("dis_anim", true);
    // return window.location.replace(`/map?search=${search}`);
    let tempSearch = search;
    // for mobile view
    if (document.body.classList.contains("foldSearch")) {
      document.getElementById("mapFilterSec").classList.add("foldthis");
      document.body.classList.remove("foldSearch");
    }
    if (tempSearch === searchName) {
      getResults();
    }
    unfoldThis();
    history.push(`/map?search=${tempSearch}`);
  };

  const sendSearchViaDropDown = (searchData) => {
    setIsMoreData(true);
    clearClusterMarkers();
    setItemSelected(true);
    localStorage.setItem("flow", "searchdesktop");
    localStorage.setItem("modalClosed", false);
    sessionStorage.setItem("dis_anim", true);

    // for mobile view
    if (document.body.classList.contains("foldSearch")) {
      document.getElementById("mapFilterSec").classList.add("foldthis");
      document.body.classList.remove("foldSearch");
    }
    if (searchData === searchName) {
      getResults();
    }
    removeSearhBox();
    history.push(`/map?search=${searchData}`);
  };

  // For handling enter button for Search
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter" || e.charCode === 13) {
      sendSearch();
    }
  };

  // Search Functionality End

  const showFilters = () => {
    filterSelected ? setFilter(false) : setFilter(true);
  };

  // custom infinte scrolling
  const onScrollBoard = (e) => {
    //for mobile screen
    if (width <= 576) {
      // Scroll from Left to right
      if (
        Math.round(e.target.scrollLeft + 0.6 + e.target.offsetWidth) >=
        e.target.scrollWidth
      ) {
        setIsMobileLoading(true);
        handlePaginate();
      }
    }
  };

  // useEffect(() => {
  //   if(allImageList.length === imageList.length) {
  //     setIsMoreData(false);
  //   }
  // }, [allImageList.length, imageList.length])

  const showNotFound = () => (
    <div className={Style.not__found}>
      <h3>Sorry, no results</h3>
      <h5 style={{ color: "black" }}>Try the following to get results:</h5>
      <ul style={{ color: "black", textAlign: "left" }}>
        <li style={{ listStyle: "square" }}>Search for a different location</li>
        <li style={{ listStyle: "square" }}>Zoom out on the map</li>
      </ul>
    </div>
  );

  // handle redirecting page
  const checkUsertoRedirect = (image, compType) => {
    dispatchMapState({ type: "CLOSE_INFO_MAP" });
    // store filter's data
    if (selectCity || selectRange) {
      sessionStorage.setItem(
        "filterData",
        JSON.stringify({
          city: selectCity,
          range: selectRange,
          startDate,
          endDate,
        })
      );
    }

    if (compType === "LIST_VIEW") {
      hideFilters();
      sessionStorage.setItem("isListView", true);
    } else {
      if (sessionStorage.getItem("isListView")) {
        sessionStorage.removeItem("isListView");
      }
    }

    if (user !== null) {
      sessionStorage.setItem(
        "backBillMap",
        JSON.stringify(history?.location?.pathname + history?.location?.search)
      );

      return history.push(
        {
          pathname: "/billBoardDescription",
          search: `?id=${image?.id}`,
        },
        {
          type: searchName || "",
        }
      );
    } else {
      //setImage(image.display_image_url);
      //setModal(true);
      sessionStorage.setItem("isMapPage", true);
      sessionStorage.setItem(
        "mapInfo",
        JSON.stringify({
          type: searchName || "",
          id: image?.id || "",
        })
      );

      dispatchLoginSignup({ type: "LOGIN" });
    }
  };

  // handle map details for highlighting
  const showMapDetails = (item) => {
    dispatchMapState({ type: "CLOSE_INFO_MAP" });
    const data = {
      id: item?.id,
    };
    dispatchMapState({ type: "SHOW_INFO_MAP", payload: data });
  };

  const hideList = () => {
    // setMapView(true);
    setList(false);
    setFilterView(false);
  };

  const hideOnlyFilter = () => {
    setFilterView(false);
    setList(true);
    setIsMobileList(false);
  };

  const hideFilters = () => {
    // setMapView(true);
    // setFilters(false);
    setFilterView(false);
    document.body.classList.remove("filterOpen");
  };

  const showFilterPage = () => {
    // setFilters(true);
    setList(false);
    // setMapView(false);
    setFilterView(true);
    document.body.classList.add("filterOpen");
  };

  const showListView = () => {
    // setFilters(false);
    setList(true);
    // setMapView(false);
    document.body.classList.add("filterOpen");
  };

  const showFilterView = () => {
    setFilterView(true);
    document.body.classList.add("filterOpen");
  };

  const focusInput = (e) => {
    let search_field = document.getElementById("searchfield");
    search_field.classList.add("active");
    search_field.focus();
  };

  const foldThis = (e) => {
    document.getElementById("mapFilterSec").classList.add("foldthis");
    document.body.classList.add("foldSearch");
    e.target.placeholder = "";
    document.getElementById("searchfield").placeholder = "";
    focusInput();
  };

  const removeSearhBox = () => {
    document.getElementById("mapFilterSec").classList.remove("foldthis");
    document.body.classList.remove("foldSearch");
  };

  const [currentEventId, setCurrentEventId] = useState(null);

  // to handle escape button

  const escFunction = useCallback(
    (event) => {
      // event.preventDefault()
      const isLogin = sessionStorage.getItem("islogin_modal");
      const signUpModal = sessionStorage.getItem("isSignUp_modal")
      if (event.keyCode === 27) {
        if (isLogin || signUpModal) {
          dispatchLoginSignup({ type: "CLOSE_LOGIN_SIGNUP" });
          sessionStorage.removeItem("islogin_modal");
          sessionStorage.removeItem("isSignUp_modal");
        } else {
          checkDescriptionPage();
        }
      }
    },
    [isDescription]
  );
  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  // goto previous page for via search back arrow
  const checkDescriptionPage = () => {
    if (isDescription) {
      setIsDescription(false);
      history.push(`/map?search=${searchName}`);

      checkDescriptionPageTimer = setTimeout(() => {
        if (
          eventsRef?.current?.length &&
          currentEventId &&
          eventsRef?.current?.[currentEventId]
        ) {
          eventsRef.current[currentEventId].scrollIntoView({
            behavior: "smooth",
          });
        }
        setCurrentEventId(null);
      }, 500);
    } else {
      history.push("/");
    }
  };

  // for handling the search box Window
  const unfoldThis = (e) => {
    const input = document.getElementById("searchfield");
    input.classList.remove("active");
    input.blur();
    if (search.trim().length === 0) {
      // only for desktop
      if (width >= 576) {
        checkDescriptionPage();
      } else {
        // For mobile version, check the search box is open or not. If not open then redirect to prev page
        if (
          !document
            .getElementById("mapFilterSec")
            .classList.contains("foldthis")
        ) {
          removeSearhBox();
          checkDescriptionPage();
        }
      }
      removeSearhBox();
    } else {
      removeSearhBox();
      setSearch("");
    }
  };

  // handling pagination for infinit scrolling
  const handlePaginate = () => {
    setImageLoading(true);
    if (!allImageList || !imageList) {
      setIsMoreData(false);
      setImageLoading(false);
      return;
    }
    let startData;
    let endData;
    let value = pageNumber + 1;
    endData = value * dataPerPage;
    startData = endData - dataPerPage;
    let results = allImageList?.slice(startData, endData);
    if (results.length < dataPerPage) {
      setIsMoreData(false);
      setImageLoading(false);
    }
    const loadImageData = [];
    results.map((data) => {
      return loadImageData.push(data?.id);
    });
    if (loadImageData && loadImageData.length > 0) {
      loadSearchImages(loadImageData, setImageLoading)
        .then((responseData) => {
          if (responseData && responseData.length > 0) {
            const finalData = results.map((image, index) => {
              var URL = responseData.filter((x) => {
                return x?.event_of_interest_id === image?.id;
              })[0];
              return { ...image, display_image_url: URL?.image };
            });
            setImageList((previous) => [...previous, ...finalData]);
            setImageLoading(false);
          } else {
            setImageList((previous) => [...previous, ...results]);
            setImageLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setImageLoading(false);
    }
    setPageNumber(value);
    setIsMobileLoading(false);
  };

  // show skeleton loading screen
  const showLoading = () => {
    // let limit = [1, 2, 3, 4];
    // return limit.map((i) => {
    //   return (
    //     <div className={Style.filter_result_item} key={i}>
    //       <div className={Style.filter_result_image}>
    //         {width > 576 ? (
    //           <>
    //             <Skeleton variant="rectangular" width={155} height={57} />
    //           </>
    //         ) : (
    //           <>
    //             <Skeleton variant="rectangular" width={130} height={130} />
    //           </>
    //         )}
    //       </div>
    //       <div className={Style.filter_result_content}>
    //         <h4>
    //           {" "}
    //           <Skeleton />
    //         </h4>

    //         <p>
    //           <Skeleton />
    //         </p>
    //       </div>
    //     </div>
    //   );
    // });
    return (
      <div>
        {/* <div className={Style.filter_result_image}> */}
        <Lottie options={defaultOptions} height={300} width={300} />
        {/* </div> */}
      </div>
    );
  };

  // For Open description Page
  const redirectDescriptionPage = (image, maptype, isPointerClick) => {
    // coconsole.log(maptype,'maptypemaptype')
    dispatchLoginSignup({ type: "SHOW_PAYMENT_FORM" });
    dispatchMapState({ type: "CLOSE_INFO_MAP" });
    /*  showMapDetails(image); */
    // if (user !== null) {
    //   setIsDescription(true);
    //   setCurrentEventId(image?.id);
    //   if (isPointerClick !== true) {
    //     setCurrentMapCenter({
    //       lat: image.latitude,
    //       lng: image.longitude,
    //     });
    //   }
    //   history.push(
    //     `/map?search=${searchName}&id=${image?.id}&shouldZoom=${
    //       isPointerClick ? false : true
    //     }`
    //   );
    // } else {
    //   // if(isPointerClick!==true){
    //   //   console.log('herer-------')
    //   //   setCurrentMapCenter({
    //   //     lat: image.latitude,
    //   //     lng: image.longitude,
    //   //   });
    //   // }
    //   sessionStorage.setItem("islogin_modal", true);
      
    //   sessionStorage.setItem("isMapPage", true);
    //   sessionStorage.setItem(
    //     "mapInfo",
    //     JSON.stringify({
    //       currentEventPos: {
    //         lat: image?.latitude,
    //         lng: image?.longitude,
    //       },
    //       isPointerClick:
    //         isPointerClick === undefined || isPointerClick === null
    //           ? true
    //           : false,
    //       type: searchName || "",
    //       id: image?.id || "",
    //     })
    //   );
      // dispatchLoginSignup({ type: "LOGIN" });
    // }
  };

  useEffect(() => {
    if (boardID) {
      setIsDescription(true);
    } else {
      setIsDescription(false);
    }
  }, [currentLocation]);

  const [nearestLocationMetadata, setNearestLocationMetadata] = useState(null);

  useEffect(() => {
    if (nearestLocationMetadata && !loading) {
      setOpenDialog(true);
    }
  }, [nearestLocationMetadata, loading]);

  // display confirmation pop up to search events by nearest location
  const [openDialog, setOpenDialog] = useState(false);

  const handleAgree = () => {
    setNearestLocationMetadata(null);

    setOpenDialog(false);

    const { events, metadata, total_events } = nearestLocationMetadata;

    setCurrentMapCenter({
      lat: metadata?.new_map_center_details?.latitude,
      lng: metadata?.new_map_center_details?.longitude,
    });

    setAllImageList(events);
    setImageList(events.slice(0, dataPerPage));
    setTotalEventsCount(total_events);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  // clear cluster markers
  const [markerCluster, setMarkerCluster] = useState(null);

  const clearClusterMarkers = () => {
    if (markerCluster) {
      markerCluster.clearMarkers();
      setMarkerCluster(null);
    }
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
            "There are few events available nearby your location, do you want to redirect there?"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              "This will redirect you to nearby location where events are available."
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{"No"}</Button>
          <Button onClick={handleAgree} autoFocus>
            {"Yes"}
          </Button>
        </DialogActions>
      </Dialog>

      {loadingAnimation && <LoadingScreen />}

      {loadingScreen && <LoadingMap />}

      {loadingSearchAnimation && <LoadingSearchPage />}

      {mapView ? (
        <>
          {/* <Header /> */}
          <main
            className={`${Style.main_wrapper} ${
              pageLoaded ? "" : Style.active
            }`}
          >
            <div
              className={`${Style.main_wrapper_inner} ${
                isDescription && `bill_descrip_wrapper_inner`
              }`}
            >
              <div className={Style.map_wrapper}>
                <div className={Style.map_wrapper_inner}>
                  <div className={Style.map_main}>
                    <GoogleMap
                      mapDatas={allImageList}
                      checkUsertoRedirect={redirectDescriptionPage}
                      isMap={true}
                      isLoading={loading}
                      currentMapCenter={currentMapCenter}
                      fetchDataByFilter={fetchDataByFilter}
                      setNewCurrentMapCenter={setCurrentMapCenter}
                      setSelectRange={setSelectRange}
                      selectRange={selectRange}
                      markerCluster={markerCluster}
                      setMarkerCluster={setMarkerCluster}
                      heatmaps={heatmaps}
                    />
                  </div>
                </div>

                {list ? (
                  <ListView
                    handleBackArrow={hideList}
                    showFilters={showFilterPage}
                    allImageList={allImageList}
                    searchName={searchName}
                    showNotFound={showNotFound}
                    handleUserRedirection={checkUsertoRedirect}
                    setIsMobileList={setIsMobileList}
                  />
                ) : (
                  <div
                    className={
                      isActive
                        ? `${Style.filter_close} ${Style.map_filter}`
                        : Style.map_filter
                    }
                    id="mapFilterSec"
                  >
                    {/* <div className={Style.map_filter} id="mapFilterSec" > */}
                    {!isDescription && (
                      <div className="filterbtns">
                        <Button bsPrefix="custom" onClick={showListView}>
                          <span className="icon-list"></span> List
                        </Button>
                        <Button bsPrefix="custom" onClick={showFilterPage}>
                          <span className="icon-filter"></span> Filters
                        </Button>
                      </div>
                    )}

                    <div className={Style.map_filter_toggle}>
                      <button className={Style.toggleBtn} onClick={toggleClass}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                          width={10}
                        >
                          <path
                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                            fill="#888"
                          />
                        </svg>
                        {/* <span className="icon-filter"></span> */}
                      </button>
                    </div>
                    <div className={Style.map_filter_header}>
                      <div className={Style.map_search_icon}>
                        <span className="icon-search"></span>
                        <span
                          id="BackBtn"
                          // className="icon-back-arw"
                          onClick={unfoldThis}
                          style={{ cursor: "pointer" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="18"
                            viewBox="0 0 18 14.828"
                          >
                            <g
                              id="_2561330_arrow_left_icon"
                              data-name="2561330_arrow_left_icon"
                              transform="translate(-3 -4.586)"
                            >
                              <line
                                id="Line_16"
                                data-name="Line 16"
                                x1="16"
                                transform="translate(4 12)"
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Path_2807"
                                data-name="Path 2807"
                                d="M10,18,4,12l6-6"
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                        </span>
                      </div>

                      <div
                        className={Style.map_input_wrapper}
                        onClick={foldThis}
                      >
                        <input
                          type="text"
                          placeholder={searchName}
                          onChange={handleSearchChange}
                          value={search}
                          onBlur={(e) => (e.target.placeholder = searchName)}
                          onKeyPress={handleKeypress}
                          id="searchfield"
                          autoComplete="off"
                        />
                      </div>

                      <div className={Style.map_action_wrapper}>
                        <button
                          onClick={() => sendSearch()}
                          className={`${Style.map_message_icon} ${
                            search !== "" && Style.active
                          }`}
                        >
                          <span className="icon-send"></span>
                        </button>
                        {/* <button
                                        className={`${Style.map_camera_icon} ${
                                            search == "" && Style.active
                                        }`}
                                    >
                                        <span className="icon-photo-camera"></span>
                                    </button> */}
                      </div>
                      <div className={Style.filterbtn_wrapper}>
                        <button
                          className={Style.filterbtn}
                          onClick={showFilterView}
                        >
                          <span
                          // className="icon-filter"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 18 18"
                            >
                              <g id="Filter" transform="translate(0 -3.335)">
                                <circle
                                  id="Ellipse_492"
                                  dataname="Ellipse 492"
                                  cx="2"
                                  cy="2"
                                  r="2"
                                  transform="translate(2 4.335)"
                                  fill="none"
                                  stroke="#fff"
                                  strokeLinejoin="round"
                                  strokmmiterlimit="10"
                                  strokeWidth="2"
                                />
                                <line
                                  id="Line_9"
                                  dataname="Line 9"
                                  x2="12"
                                  transform="translate(6 6.335)"
                                  fill="none"
                                  stroke="#fff"
                                  strokeLinejoin="round"
                                  strokmmiterlimit="10"
                                  strokeWidth="2"
                                />
                                <circle
                                  id="Ellipse_493"
                                  dataname="Ellipse 493"
                                  cx="2"
                                  cy="2"
                                  r="2"
                                  transform="translate(2 16.335)"
                                  fill="none"
                                  stroke="#fff"
                                  strokeLinejoin="round"
                                  strokmmiterlimit="10"
                                  strokeWidth="2"
                                />
                                <line
                                  id="Line_10"
                                  dataname="Line 10"
                                  x2="13"
                                  transform="translate(5 18.335)"
                                  fill="none"
                                  stroke="#fff"
                                  strokeLinejoin="round"
                                  strokmmiterlimit="10"
                                  strokeWidth="2"
                                />
                                <circle
                                  id="Ellipse_494"
                                  dataname="Ellipse 494"
                                  cx="2"
                                  cy="2"
                                  r="2"
                                  transform="translate(12 10.335)"
                                  fill="none"
                                  stroke="#fff"
                                  strokeLinejoin="round"
                                  strokmmiterlimit="10"
                                  strokeWidth="2"
                                />
                                <line
                                  id="Line_11"
                                  dataname="Line 11"
                                  x1="13"
                                  transform="translate(0 12.335)"
                                  fill="none"
                                  stroke="#fff"
                                  strokeLinejoin="round"
                                  strokmmiterlimit="10"
                                  strokeWidth="2"
                                />
                                <line
                                  id="Line_12"
                                  dataname="Line 12"
                                  x1="2"
                                  transform="translate(0 6.335)"
                                  fill="none"
                                  stroke="#fff"
                                  strokeLinejoin="round"
                                  strokmmiterlimit="10"
                                  strokeWidth="2"
                                />
                                <line
                                  id="Line_13"
                                  dataname="Line 13"
                                  x2="2"
                                  transform="translate(16 12.335)"
                                  fill="none"
                                  stroke="#fff"
                                  strokeLinejoin="round"
                                  strokmmiterlimit="10"
                                  strokeWidth="2"
                                />
                                <line
                                  id="Line_14"
                                  dataname="Line 14"
                                  x1="2"
                                  transform="translate(0 18.335)"
                                  fill="none"
                                  stroke="#fff"
                                  strokeLinejoin="round"
                                  strokmmiterlimit="10"
                                  strokeWidth="2"
                                />
                              </g>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>

                    {search !== "" && !itemSelected && !listLoading && (
                      <div
                        className={Style.landing_search_result}
                        id="suggestionList"
                      >
                        <div className={Style.landing_search_result_inner}>
                          {dropdownList.length >= 1 &&
                            dropdownList.map((res, i) => {
                              return (
                                <button
                                  key={i}
                                  className={Style.lading_search_result_item}
                                  onClick={() =>
                                    sendSearchViaDropDown(
                                      res.placeHolder
                                        ? res.placeHolder
                                        : res?.name
                                    )
                                  }
                                >
                                  <div
                                    className={Style.landing_search_item_inner}
                                  >
                                    <div
                                      className={Style.landing_image_wrapper}
                                    >
                                      <div
                                        className={
                                          Style.landing_search_icon_container
                                        }
                                      >
                                        <img src={res?.image} alt="" />
                                      </div>
                                    </div>
                                    <h3>{res?.name}</h3>
                                  </div>
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    <div className={Style.map_info_container}>
                      <div
                        /*   onScroll={onScrollBoardSmallScreen} */
                        ref={smallScreenRef}
                        className={Style.map_info_inner_scroll}
                        id={width >= 576 ? "smallScreenDiv" : ""}
                      >
                        {isDescription && !filterView ? (
                          <BoardDescription
                            mapDatas={allImageList}
                            checkUsertoRedirect={redirectDescriptionPage}
                            isMap={true}
                            isLoading={loading}
                            currentMapCenter={currentMapCenter}
                            fetchDataByFilter={fetchDataByFilter}
                            setNewCurrentMapCenter={setCurrentMapCenter}
                            setSelectRange={setSelectRange}
                            selectRange={selectRange}
                            markerCluster={markerCluster}
                            setMarkerCluster={setMarkerCluster}
                          />
                        ) : !filterView ? (
                          <>
                            <div className={Style.map_info_head}>
                              <h3>{searchName || ""}</h3>
                              <div className="contentDiv">
                                {!loading && (
                                  <>
                                    <p>{totalEventsCount || 0} search found</p>
                                    {/* <span className="labelForSwitch">
                                      Is cluster
                                      <label className="switch__maps">
                                        <input
                                          type="checkbox"
                                          checked={checked}
                                          onChange={handleChangeSwitch}
                                        />
                                        <span className="slider__maps round"></span>
                                      </label>
                                    </span> */}
                                  </>
                                )}
                              </div>
                            </div>

                            {!loading &&
                              imageList.length <= 0 &&
                              showNotFound()}

                            <div
                              onScroll={onScrollBoard}
                              ref={ref}
                              id={width >= 576 ? "scrollableDesktopDiv" : ""}
                              className={Style.filter_result_wrapper}
                            >
                              {loading && showLoading()}
                              {imageList.length > 0 && (
                                <InfiniteScroll
                                  dataLength={imageList?.length}
                                  next={() => {
                                    if (width >= 576) {
                                      handlePaginate();
                                    }
                                  }}
                                  style={{ overflow: "visible" }}
                                  hasMore={isMoreData}
                                  loader={
                                    !loading &&
                                    allImageList?.length >= 1 && (
                                      <div className={Style.filter_result_item}>
                                        <div
                                          className={Style.filter_result_image}
                                        >
                                          {width > 576 ? (
                                            <>
                                              <Skeleton
                                                variant="rectangular"
                                                width={155}
                                                height={57}
                                              />
                                            </>
                                          ) : (
                                            <>
                                              <Skeleton
                                                variant="rectangular"
                                                width={130}
                                                height={130}
                                              />
                                            </>
                                          )}
                                        </div>
                                        <div
                                          className={
                                            Style.filter_result_content
                                          }
                                        >
                                          <h4>
                                            {" "}
                                            <Skeleton />
                                          </h4>

                                          <p>
                                            <Skeleton />
                                          </p>
                                        </div>
                                      </div>
                                    )
                                  }
                                  scrollableTarget={scrollableId}
                                  endMessage={
                                    <p style={{ textAlign: "center" }}>
                                      <b>Yay! You have seen it all</b>
                                    </p>
                                  }
                                  // below props only if you need pull down functionality
                                >
                                  {imageList.map((image) => {
                                    return (
                                      <div
                                        key={image?.id}
                                        className={Style.filter_result_item}
                                        id={`divId-${image?.id}`}
                                        ref={(element) => {
                                          eventsRef.current[image.id] = element;
                                        }}
                                      >
                                        <div
                                          className={Style.filter_result_image}
                                        >
                                          {imageLoading ? (
                                            <TailSpin
                                              height="60"
                                              width="60"
                                              color="#808080"
                                              ariaLabel="loading"
                                            />
                                          ) : (
                                            <div
                                              className={
                                                Style.filter_result_image_container
                                              }
                                            >
                                              <img
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                                src={image.display_image_url}
                                                alt="event_image"
                                                className={
                                                  image?.event_type?.toLowerCase() ===
                                                    "commercial vehicle violation" ||
                                                  image?.event_type?.toLowerCase() ===
                                                    "violation"
                                                    ? "blur-layer"
                                                    : ""
                                                }
                                                onMouseEnter={() =>
                                                  showMapDetails(image)
                                                }
                                                // onTouchStart={()=>{showMapDetails(image)}}
                                                onMouseLeave={() =>
                                                  dispatchMapState({
                                                    type: "CLOSE_INFO_MAP",
                                                  })
                                                }
                                                onClick={() =>
                                                  redirectDescriptionPage(image)
                                                }
                                              />
                                            </div>
                                          )}
                                        </div>
                                        <div
                                          className={
                                            Style.filter_result_content
                                          }
                                        >
                                          <h4>{image?.name}</h4>
                                          <p
                                            onClick={() =>
                                              redirectDescriptionPage(image)
                                            }
                                          >
                                            <Moment format="hh:mm A DD/MM/YYYY">
                                              {image.created_at}
                                            </Moment>
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  })}

                                  {isMobileLoading && showLoading()}
                                </InfiniteScroll>
                              )}
                            </div>
                          </>
                        ) : (
                          <FiltersView
                            handleBackArrow={hideFilters}
                            handleBackArrowMble={hideOnlyFilter}
                            selectCity={selectCity}
                            selectRange={selectRange}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            cityList={cityList}
                            rangeList={rangeList}
                            setSelectCity={setSelectCity}
                            setSelectRange={setSelectRange}
                            fetchDataByFilter={fetchDataByFilter}
                            isMap={true}
                            boardName={searchName}
                            isMobileList={isMobileList}
                          />
                        )}
                      </div>
                      {!filterView ? (
                        <div className={Style.read_more_wrapper}>
                          {/* {imageList.length >= 1 &&
                            pageNumber <= totalPages &&
                            isScrollDown && (
                              <button
                                onClick={() =>
                                  nextPage(pageNumber + 1, 1, -133)
                                }
                              >
                                <span className="icon-arrow-bottom"></span>
                              </button>
                            )}
                          {imageList.length >= 1 && isScrollUp && (
                            <button
                              onClick={() => nextPage(pageNumber - 1, 2, 133)}
                              className="icon__rotate"
                            >
                              <span className="icon-arrow-bottom"></span>
                            </button>
                          )} */}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
                {/* <div className={Style.floating_right_icon}>
                  <div className={Style.floating_right_icon_inner}>
                    <div className={Style.layer_wrapper}>
                      <button>
                        <span className="icon-map-01"></span>
                      </button>
                    </div>

                    <div className={Style.message_wrapper}>
                      <button>
                        <span className="icon-message"></span>
                      </button>
                    </div>

                    <div className={Style.direction_wrapper}>
                      <button>
                        <span className="icon-direction"></span>
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <SubscriptionModel
              show={showModal}
              handleClose={hidemodal}
              image={modelImage}
            />
          </main>
        </>
      ) : null}
      <FormDetail  displayRazorpay={displayRazorpay}/>

    </>
  );
}

export default Map;

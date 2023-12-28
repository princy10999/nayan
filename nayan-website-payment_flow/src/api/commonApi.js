import { axiosInstance } from "../axios";
import { toast } from "react-toastify";
import {
  isSuggestionListTimeExpired,
  setSuggestionListExpireTime,
} from "../utils/string-helper";
import Search from "../assets/images/icons/searchBlack.svg";

// For fetching auto search data
export const loadAutoSearch = async (search, setDropdown, setListLoading) => {
  const suggestions = localStorage.getItem("suggestions")
    ? JSON.parse(localStorage.getItem("suggestions"))
    : [];
  let suggestionList = [];
  if (search.length > 0) {
    suggestionList.push({
      placeHolder: search,
      name: `Search for "${search}"`,
      image: Search,
    });
  }
  if (suggestions.length && !isSuggestionListTimeExpired()) {
    const filteredSuggestions = suggestions.filter(({ name }) => {
      return name.toLowerCase().includes(search.trim().toLowerCase());
    });
    suggestionList =
      suggestionList.length > 0
        ? [suggestionList[0], ...filteredSuggestions]
        : [...filteredSuggestions];
    // if (search.length > 0 && filteredSuggestions.length === 0) {
    //   suggestionList.push({
    //     placeHolder: search,
    //     name: `Search for "${search}"`,
    //     image: Search,
    //   });
    // }

    setDropdown(suggestionList);

    // console.log(suggestions,'suggestonsss--');
  } else {
    setListLoading(true);
    setDropdown([]);
    try {
      const response = await axiosInstance.get(
        `/api/nayan/searches/suggestions?input=`
      );
      setListLoading(false);
      const { data } = response;
      if (Array.isArray(data)) {
        setDropdown(data);
        localStorage.setItem("suggestions", JSON.stringify(data));
        setSuggestionListExpireTime();
      } else {
        setDropdown([]);
      }
    } catch (error) {
      setListLoading(false);
      toast.error(
        /* error?.response?.data || */ "Something went wrong, Please try again."
      );
    }
  }
};

// fetch City data for Dropdown
export const loadCity = async (setCityDropdown) => {
  try {
    const response = await axiosInstance.get("/api/nayan/searches/cities");
    const { data } = response;
    if (Array.isArray(data)) {
      setCityDropdown(data);
    } else {
      setCityDropdown([]);
    }
  } catch (error) {
    toast.error("Something went wrong, Please try again.");
  }
};

// fetch Range Data for Dropdown
export const loadRange = async (setRangeDropdown) => {
  try {
    const response = await axiosInstance.get(
      "/api/nayan/searches/distance_ranges"
    );
    const { data } = response;
    if (Array.isArray(data)) {
      setRangeDropdown(data);
    } else {
      setRangeDropdown([]);
    }
  } catch (error) {
    toast.error("Something went wrong, Please try again.");
  }
};

// fetch Search Data
export const loadSearchData = async (props) => {
  const {
    input,
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
    email,
    token,
    client,
    expiry,
    currentMapCenter,
    setTotalEventsCount,
    setNearestLocationMetadata,
    setImageLoading,
  } = props;
  setImageLoading(true)
  try {
    let headers = {};
    let isHeader = false;
    if (email && token && client && expiry) {
      isHeader = true;
      headers = {
        headers: {
          "access-token": token,
          "token-type": "Bearer",
          uid: email,
          client,
          expiry,
        },
      };
    }
    const response = await axiosInstance.post(
      "/api/nayan/searches/search",
      {
        nayan_search: {
          city: selectCity || "",
          latitude: currentMapCenter?.lat || "",
          longitude: currentMapCenter?.lng || "",
          range: selectRange || "",
          input: input,
          start_date: startDate || "",
          end_date: endDate || "",
        },
      },
      isHeader && headers
    );

    const data = response?.data?.events;
    const metadata = response?.data?.metadata;
    let eventCount = response?.data?.total_events;
    setTotalEventsCount(eventCount);

    if (Array.isArray(data)) {
      setAllImageList(data);
      // For Pagination
      if (data.length >= 1) {
        //let tempPages = Math.ceil(data.length / 10);
        //setTotalPages(tempPages);

        if (metadata?.update_map_center) {
          // setNearestLocationMetadata(response?.data);
          setImageList([]);
          setAllImageList([]);
          setTotalEventsCount("");
        } else {
          const imageData = data.slice(0, dataPerPage);
          setImageList(imageData);

          if (imageData && imageData.length > 0) {
            const loadImageData = [];
            imageData.map((data) => {
              return loadImageData.push(data?.id);
            });

            if (loadImageData && loadImageData.length > 0) {
              axiosInstance
                .post(
                  "/api/nayan/searches/search_image",
                  {
                    events_of_interest_ids: loadImageData,
                  },
                  isHeader && headers
                )
                .then((responseData) => {
                  if (responseData && responseData.status === 200) {
                    const finalData = imageData.map((image, index) => {
                      var URL = responseData?.data?.events_of_interest.filter(
                        (x) => {
                          return x?.event_of_interest_id === image?.id;
                        }
                      )[0];
                      return {
                        ...image,
                        display_image_url: URL?.image,
                      };
                    });
                    setImageList(finalData);
                    setImageLoading(false);
                  } else {
                    setImageList(imageData);
                    setImageLoading(false);
                  }
                })
                .catch((error) => {
                  console.log(error, "error-");
                  setImageLoading(false);
                  setImageList(imageData);
                  setImageLoading(false);
                });
            } else {
              setImageList(imageData);
              setImageLoading(false);
            }
          } else {
            setImageList([]);
            setImageLoading(false);
          }
        }

        setLoading(false);
      } else {
        setImageList([]);
        //setTotalPages(1);
        setPageNumber(1);
        setLoading(false);
        setImageLoading(false);
      }
    } else {
      setAllImageList([]);
      setImageList([]);
      setLoading(false);
      setImageLoading(false);
    }
  } catch (error) {
    setLoading(false);
    setImageLoading(false);
    setAllImageList([]);
    setImageList([]);
    setTotalEventsCount("");
  }
};

// check isLogin
export const isLogin = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else {
    return false;
  }
};

// register
export const register = async (
  setBtnloading,
  errorValues,
  setErrorValues,
  setRedirectToUser,
  dispatchLoginSignup,
  password,
  password_confirmation,
  email,
  name,
  company_name,
  designation
) => {
  setBtnloading(true);
  try {
    const { data } = await axiosInstance.post(`/api/nayan/registrations`, {
      password,
      password_confirmation,
      email,
      name,
      company_name,
      designation,
    });

    toast.success(
      "Your account has been successfully registered. Please login to use."
    );
    setRedirectToUser(true);
    dispatchLoginSignup({ type: "CLOSE_LOGIN_SIGNUP" });
  } catch (error) {
    setBtnloading(false);
    setErrorValues({
      ...errorValues,
      showError: true,
      error:
        error.response?.data?.message ||
        "Something went wrong, Please try again.",
    });
    //toast.error(error.response?.data?.message ||"Something went wrong, Please try again.");
  }
};

export const forgotPasswordApi = async (email) => {
  try {
    const response = await axiosInstance.post("/api/passwords/forgot", {
      email,
    });

    if (response.status === 200 && response.data.success) {
      toast.success(
        "We've successfully sent an email link to reset your password."
      );
      return {
        success: true,
      };
    } else {
      toast.error(
        response?.data?.message || "Something went wrong, Please try again."
      );
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Something went wrong, Please try again."
    );
  }
};

export const resetPasswordApi = async (values) => {
  try {
    const response = await axiosInstance.post("/api/passwords/reset", values);

    if (response.status === 200 && response.data.success) {
      toast.success("Your password has been reset successfully.");
      return {
        success: true,
      };
    } else {
      toast.error(
        response?.data?.message || "Something went wrong, Please try again."
      );
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Something went wrong, Please try again."
    );
  }
};

export const loadSearchImages = async (eventIds) => {
  try {
    const { data } = await axiosInstance.post(
      `/api/nayan/searches/search_image`,
      {
        events_of_interest_ids: eventIds,
      }
    );
    return data?.events_of_interest;
  } catch (error) {
    console.log(error, "--");
    //toast.error(error.response?.data?.message ||"Something went wrong, Please try again.");
  }
};

// fetch Heatmap data for all records
export const loadHeatMaps = async () => {
  try {
    const response = await axiosInstance.get("api/nayan/searches/heatmap");
    const { data } = response;
    const fixedString = data.replaceAll(/\]\[/gm, ',')
    return JSON.parse(fixedString);
  } catch (error) {
    toast.error("Something went wrong, Please try again.");
  }
};

import { axiosInstance } from "../axios";
import { toast } from "react-toastify";
import moment from "moment";

// fetch data for BillBoards Page
export const loadBillBoards1 = async (
  setBoardsList,
  setLoading,
  email,
  token,
  tokenType,
  client,
  expiry
) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/nayan/searches/event_types",
      {
        headers: {
          "access-token": token,
          "token-type": tokenType,
          uid: email,
          client: client,
          expiry: expiry,
        },
      }
    );
    if (data?.data?.event_types) {
      setBoardsList(data.data.event_types);
    } else {
      setBoardsList([]);
    }
    setLoading(false);
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong, Please try again");
  }
};

export const loadBillBoards = async (
  setBoardsList,
  setLoading,
  email,
  token,
  tokenType,
  client,
  expiry
) => {
  try {
    const { data } = await axiosInstance.get(
      "/api/nayan/users/profiles/search_history",
      {
        headers: {
          "access-token": token,
          "token-type": tokenType,
          client: client,
          expiry: expiry,
          uid: email,
        },
      }
    );
    if (data?.data) {
      const sortedData = data.data.length
        ? data.data.sort((a, b) => +b.event_count - +a.event_count)
        : [];
      setBoardsList(sortedData);
    } else {
      setBoardsList([]);
    }
    setLoading(false);
  } catch (error) {
    setLoading(false);
    toast.error(
      error?.response?.data?.errors[0] ||
        "Something went wrong, Please try again"
    );
  }
};

// fetch datas based on Billboards Id
export const loadBillBoardById = async (
  setBillBoardsList,
  setLoading,
  boardID,
  email,
  token,
  tokenType,
  client,
  expiry
) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/nayan/events/events_of_type?event_type_id=${boardID}`,
      {
        headers: {
          "access-token": token,
          "token-type": tokenType,
          uid: email,
          client: client,
          expiry: expiry,
        },
      }
    );
    if (data?.data) {
      setBillBoardsList(data?.data);
    } else {
      setBillBoardsList([]);
    }

    setLoading(false);
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong, Please try again");
  }
};

// fetch data of event by their ID
export const fetchEventDetailsById = async (
  setEventData,
  setLoading,
  eventId,
  token,
  tokenType,
  email,
  client,
  expiry,
  setError = null
) => {
  if (eventId)
    try {
      setLoading(true)
      const { data } = await axiosInstance.get(
        `/api/nayan/events?event_id=${eventId}`,
        {
          headers: {
            "access-token": token,
            "token-type": tokenType,
            uid: email,
            client: client,
            expiry: expiry,
          },
        }
      );
      if (data?.data) {
        const event = await data.data[0];
        setEventData({
          ...event.metadata,
          id: event.id,
          createdAt: moment(event.created_at),
          eventType: event.event_type,
          location: event.location || "",
          latitude: Number(event?.latitude) || "",
          longitude: Number(event?.longitude) || "",
          display_image_url:event.display_image_url,
          recorded_on:moment(event.recorded_on)
        });
      } else {
        setEventData({});
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMessage = error?.response?.data?.errors[0] || "Something went wrong, Please try again"
      toast.error(errorMessage);
      if(setError) {
        setError(errorMessage);
      }
    }
};

// Send client IP to backend
export const saveClientIp = async ({
  ip,
  token,
  tokenType,
  email,
  client,
  expiry,
}) => {
  try {
    await axiosInstance.post(
      `/api/nayan/users/profiles/internet_protocol`,
      {
        internet_protocol: ip,
      },
      {
        headers: {
          "access-token": token,
          "token-type": tokenType,
          uid: email,
          client: client,
          expiry: expiry,
        },
      }
    );
    //console.log(`User(${email}) IP has been saved.`);
  } catch (error) {
    //console.log(`User(${email}) IP wasn't saved.`);
    console.log(error?.message);
  }
};

// fetch details of nearby pointers from innerdetail page

export const loadSearchData = async (props) => {

  const {
    input,
    selectCity,
    selectRange,
    startDate,
    endDate,
    email,
    token,
    client,
    expiry,
    currentMapCenter,
    setNearbyLocations
  } = props;

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
          latitude: currentMapCenter?.lat,
          longitude: currentMapCenter?.lng,
          range: selectRange || "",
          input: input,
          start_date: startDate || "",
          end_date: endDate || "",
          setNearbyLocations
        },
      },
      isHeader && headers
    );

    const data = response?.data?.events;
    if (Array.isArray(data)) {
    
      setNearbyLocations(data);
    }

  } catch (err) {

    console.log(err)


  }
};

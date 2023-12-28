import React, { useRef, useState, memo, useEffect } from "react";
import Style from "./EditInputs.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import DatetimeRangePicker from "react-datetime-range-picker";
import Select, { components } from "react-select";
import { useHistory } from "react-router-dom";

function EditInputs({
  hideFilter,
  selectCity,
  selectRange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  cityList,
  rangeList,
  setSelectCity,
  setSelectRange,
  fetchDataByFilter,
  isMap,
  boardName,
}) {
  const history = useHistory();
  const selectInputRef = useRef();
  const rangeInputRef = useRef();
  //var initialDate = new Date();
  const [cityData, setCityData] = useState([]);
  const [rangeData, setRangeData] = useState([]);
  // const [loading,setLoading]=useState(false)

  const [filter, setFilter] = useState({
    filter1: false,
    filter2: false,
    filter3: false,
  });
  /*  const [startDate, setStartDate] = useState(initialDate.setHours(0, 0, 0));
    const [endDate, setEndDate] = useState(new Date()); */

  const resetValues = () => {
    selectInputRef.current.select.clearValue();
    rangeInputRef.current.select.clearValue();

    document.body
      .querySelectorAll(".dateBtns")
      .forEach((i) => i.classList.remove("active"));

    // setStartDate(new Date().setHours(0, 0, 0));
    // setEndDate(new Date());
    setStartDate("")
    setEndDate("")
    // range set to current user location range
    setSelectRange(selectRange);
  };

  const setDateRange = (rangeVariable, e) => {
    var date = new Date();

    if (rangeVariable == "today") {
      setStartDate(moment(date.setHours(0, 0, 0)));
      setEndDate(new Date());
    } else if (rangeVariable == "yesterday") {
      date.setDate(date.getDate() - 1);

      setStartDate(moment(date.setHours(0, 0, 0)));
      setEndDate(moment(date.setHours(23, 59, 0)));
    } else if (rangeVariable == "lastWeek") {
      // var first = new Date(date.getFullYear(),date.getMonth(),date.getDate() - 7); // First day of the last week
      // var last = new Date(date.getFullYear(),date.getMonth(),date.getDate() - 1); // last day of the last week

      // var firstday = new Date(date.setDate(first));
      // var lastday = new Date(date.setDate(last));
      var last = new Date(
        date.setTime(
          date.getTime() -
            (date.getDay() ? date.getDay() : 7) * 24 * 60 * 60 * 1000
        )
      );
      var first = new Date(
        date.setTime(date.getTime() - 6 * 24 * 60 * 60 * 1000)
      );
      setStartDate(moment(first.setHours(0, 0, 0)));
      setEndDate(moment(last.setHours(23, 59, 0)));
    } else if (rangeVariable == "lastMonth") {
      var lastDay = new Date(date.getFullYear(), date.getMonth(), 0); // last day of the last month
      var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); // First day of the last month
      // var first = date.getDate() - 30;
      // var last = moment().subtract(1, "days");
      // var firstday = new Date(date.setDate(first));
      // var lastday = new Date(last);

      setStartDate(moment(firstDay.setHours(0, 0, 0)));
      setEndDate(moment(lastDay.setHours(23, 59, 0)));
    } else if (rangeVariable == "lastYear") {
      // var first = date.getDate() - 365; // First day of the last year
      // var last = moment().subtract(1, "days"); // last day of the last year
      var firstday = new Date(date.getFullYear() - 1, 0, 1);
      var lastday = new Date(date.getFullYear() - 1, 11, 31);

      setStartDate(moment(firstday.setHours(0, 0, 0)));
      setEndDate(moment(lastday.setHours(23, 59, 0)));
    }
    const rmClass = document.querySelectorAll(".dateBtns");
    rmClass.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
  };
  const CaretDownIcon = () => {
    return <span className="icon-carret-arw"></span>;
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };

  useEffect(() => {
    if (cityList.length >= 1) {
      const tempCity = cityList.map((city) => ({
        value: city,
        label: city,
      }));

      setCityData(tempCity);
    }
  }, [cityList]);

  useEffect(() => {
    if (rangeList.length >= 1) {
      const tempRange = rangeList.map((city) => ({
        value: city,
        label: city,
      }));

      setRangeData(tempRange);
    }
  }, [rangeList]);

  let handleFilterRedirectionTimer = null;

  useEffect(() => {
    return () => {
      handleFilterRedirectionTimer &&
        clearTimeout(handleFilterRedirectionTimer);
    };
  }, []);

  // handle change for City
  const onchangeCitySelect = (item) => {
    setSelectCity(item?.value);
  };

  // handle change for Range
  const onchangeRangeSelect = (item) => {
    setSelectRange(item?.value);
  };

  // handle change for Date
  const dateRangeUpdateHandler = ({ start, end }) => {
    const updatedStartDate = moment(start);
    const updatedEndDate = moment(end);
    setStartDate(updatedStartDate);
    setEndDate(updatedEndDate);
  };

  const [filterLoading, setFilterLoading] = useState(false);
  // handle component Redirection
  const handleFilterRedirection = () => {
    setFilterLoading(true);
    sessionStorage.setItem("filterView", true);

    handleFilterRedirectionTimer = setTimeout(() => {
      if (isMap) {
        // setLoading(true)
        hideFilter();
        fetchDataByFilter();
      } else {
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
        return history.push(`/map?search=${boardName}`);
      }
      setFilterLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className={Style.filterwrap}>
        <div className={Style.map_filter_items}>
          <div className={Style.cityrange}>
            <div className={Style.mapinfo_select}>
              <Select
                className={Style.customfield}
                ref={selectInputRef}
                components={{
                  DropdownIndicator,
                  IndicatorSeparator: () => null,
                }}
                placeholder="City"
                options={cityData}
                onChange={onchangeCitySelect}
                value={cityData.find((obj) => String(obj.value) === selectCity)} // set selected value
              />
            </div>
            <div className={Style.mapinfo_select}>
              <Select
                className={Style.customfield}
                ref={rangeInputRef}
                components={{
                  DropdownIndicator,
                  IndicatorSeparator: () => null,
                }}
                placeholder="Range(km)"
                options={rangeData}
                onChange={onchangeRangeSelect}
                value={rangeData.find(
                  (obj) => Number(obj.value) === Number(selectRange)
                )} // set selected value
              />
            </div>
          </div>

          <div
            className={`${Style.mapinfo_select} ${
              filter.filter3 && Style.active
            }`}
            onClick={() => setFilter({ ...filter, filter3: !filter.filter3 })}
          >
            <label htmlFor="">From Date - To Date</label>
            <div className={Style.dtrangepick}>
              <DatetimeRangePicker
                startDate={startDate}
                endDate={endDate}
                onChange={dateRangeUpdateHandler}
              />
            </div>
          </div>
          <div className={Style.filterbtnwraps}>
            <div className={Style.btnwraps}>
              <button
                className="dateBtns"
                onClick={(e) => setDateRange("today", e)}
                id="today"
              >
                Today
              </button>
            </div>
            <div className={Style.btnwraps}>
              <button
                className="dateBtns"
                onClick={(e) => setDateRange("yesterday", e)}
                id="today"
              >
                Yesterday
              </button>
            </div>
            <div className={Style.btnwraps}>
              <button
                className="dateBtns"
                onClick={(e) => setDateRange("lastWeek", e)}
              >
                Last Week
              </button>
            </div>
          </div>
          <div className={Style.filterbtnwraps}>
            <div className={Style.btnwraps}>
              <button
                className="dateBtns"
                onClick={(e) => setDateRange("lastMonth", e)}
              >
                Last Month
              </button>
            </div>
            <div className={Style.btnwraps}>
              <button
                className="dateBtns"
                onClick={(e) => setDateRange("lastYear", e)}
              >
                Last Year
              </button>
            </div>
          </div>
        </div>
        <div className={Style.action_wrapper}>
          <button className={Style.cancel_btn} onClick={resetValues}>
            Cancel
          </button>
          {!filterLoading ? (
            <>
              <button
                className={Style.apply_filter_btn}
                onClick={handleFilterRedirection}
              >
                Apply Filter
              </button>
            </>
          ) : (
            <>
              {" "}
              <button className={Style.apply_filter_btn}>Loading...</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default memo(EditInputs);

import React, { useRef, useState, memo, useEffect } from "react";
import Style from "./EditInputsDesktop.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import DatetimeRangePicker from "react-datetime-range-picker";
import Select from "react-select";

function EditInputsDesktop({
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
}) {
    const selectInputRef = useRef();
    const rangeInputRef = useRef();

    const [filter, setFilter] = useState({
        filter1: false,
        filter2: false,
        filter3: false,
    });

    const [cityData, setCityData] = useState([]);
    const [rangeData, setRangeData] = useState([]);

    const resetValues = () => {
        selectInputRef.current.select.clearValue();
        rangeInputRef.current.select.clearValue();

        setStartDate("");
        setEndDate("");
        sessionStorage.removeItem("filterData");
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

    return (
        <>
            <div className={Style.filterwrap}>
                <div className={Style.map_filter_items}>
                    <div className={Style.cityrange}>
                        <div className={Style.mapinfo_select}>
                            <Select
                                className={Style.customfield}
                                ref={selectInputRef}
                                placeholder="City"
                                options={cityData}
                                onChange={onchangeCitySelect}
                                value={cityData.find(
                                    (obj) => String(obj.value) === selectCity
                                )} // set selected value
                            />
                        </div>
                        <div className={Style.mapinfo_select}>
                            <Select
                                className={Style.customfield}
                                ref={rangeInputRef}
                                placeholder="Range(km)"
                                options={rangeData}
                                onChange={onchangeRangeSelect}
                                value={rangeData.find(
                                    (obj) =>
                                        Number(obj.value) ===
                                        Number(selectRange)
                                )} // set selected value
                            />
                        </div>
                    </div>

                    <div
                        className={`${Style.mapinfo_select} ${
                            filter.filter3 && Style.active
                        }`}
                        onClick={() =>
                            setFilter({ ...filter, filter3: !filter.filter3 })
                        }
                    >
                        <div className={Style.dtrangepick}>
                            <DatetimeRangePicker
                                startDate={startDate}
                                endDate={endDate}
                                onChange={dateRangeUpdateHandler}
                            />
                        </div>
                    </div>
                </div>
                <div className={Style.action_wrapper}>
                    <button className={Style.cancel_btn} onClick={resetValues}>
                        Cancel
                    </button>
                    <button
                        onClick={() => fetchDataByFilter()}
                        className={Style.apply_filter_btn}
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </>
    );
}
export default memo(EditInputsDesktop);

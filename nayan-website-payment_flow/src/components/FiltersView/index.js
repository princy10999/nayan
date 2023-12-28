import React, { memo } from "react";
import Style from "./FiltersView.module.scss";
//import { useHistory } from "react-router";
import EditInputs from "../EditInputs";
import { Button } from "react-bootstrap";

function FiltersView({
    handleBackArrow,
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
    isMobileList,
    handleBackArrowMble,
}) {
    const backtoPrev = () => {
        document.body.classList.remove("filterOpen");
    };
    const handleBackButton = () => {
        // backtoPrev(),
        if (isMobileList) {
            handleBackArrowMble();
        } else {
            handleBackArrow();
            backtoPrev();
        }
    };
    return (
        <>
            <div className={Style.filterpagewrapper}>
                <div className={Style.filterhead}>
                    <Button
                        onClick={handleBackButton}
                        className={Style.backbtn}
                    >
                        <span className="icon-back-arw"></span>
                    </Button>
                    <header className="h4">Filters</header>
                </div>
                <EditInputs
                    hideFilter={handleBackArrow}
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
                    isMap={isMap}
                    boardName={boardName}
                />
            </div>
        </>
    );
}

export default memo(FiltersView);

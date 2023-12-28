import React, { useEffect, useState } from "react";
//import Assets from "../Layout/CommonLayout/Asset";
import VideoSearch from "../VideoSearch";
import Style from "./SearchInput.module.scss";
import { loadAutoSearch } from "../../api/commonApi";

function SearchInput() {
    const [search, setSearch] = useState("");
    const [dropdownList, setDropdown] = useState([]);
    const [showCard, setCard] = useState(false);
    const [itemSelected, setItemSelected] = useState(false);
    const [listLoading, setListLoading] = useState(false);

    const hideCard = () => {
        setCard(false);
    };

    const handleSearchChange = (value) => {
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
        localStorage.setItem("flow", "searchdesktop");
        localStorage.setItem("modalClosed", false);
        return window.location.replace(`/map?search=${search}`);
    };

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.key === "Enter" || e.charCode === 13) {
            sendSearch();
        }
    };

    const sendSearchViaDropDown = (searchData) => {
        setSearch(searchData);
        setItemSelected(true);
        localStorage.setItem("flow", "searchdesktop");
        localStorage.setItem("modalClosed", false);
        return window.location.replace(`/map?search=${searchData}`);
    };

    const focusInput = (e) => {
        let search_field = document.getElementById("searchfield");
        search_field.classList.add("active");
        search_field.focus();
    };

    let foldThisTimer = null;

    useEffect(() => {
        return () => {
            foldThisTimer && clearTimeout(foldThisTimer)
        }
    }, [])

    const foldThis = (e) => {
        document
            .getElementById("srch_billboard_wrapper")
            .classList.add("foldthis");
        document.body.classList.add("foldSearch");
        document.getElementById('searchfield').placeholder=""
        e.target.placeholder = "";
    document.getElementById("searchfield").focus()
    foldThisTimer = setTimeout(focusInput, 200);
    };

    const unfoldThis = (e) => {
        document.getElementById("searchfield").classList.remove("active");
        if (search.trim().length === 0) {
            document
                .getElementById("srch_billboard_wrapper")
                .classList.remove("foldthis");
            document.body.classList.remove("foldSearch");
        } else {
            setSearch("");
        }
    };

    return (
        <>
            <div className={Style.search_result_wrapper}>
                <div className={Style.map_filter_header}>
                    <div className={Style.map_search_icon}>
                        <span class="icon-search"></span>
                        <span class="icon-back-arw" onClick={unfoldThis}></span>
                    </div>

                    <div className={Style.map_input_wrapper} onClick={foldThis}>
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => handleSearchChange(e.target.value)}
                            value={search}
                            onBlur={(e) => (e.target.placeholder = "Search")}
                            onKeyPress={handleKeypress}
                            id="searchfield"
                        />
                    </div>

                    <div className={Style.map_action_wrapper}>
                        <button
                            type="submit"
                            className={`${Style.map_message_icon} ${
                                search !== "" && Style.active
                            }`}
                            onClick={sendSearch}
                        >
                            <span className="icon-send"></span>
                        </button>
                        {/* <button
                            className={`${Style.map_camera_icon} ${
                                search == "" && Style.active
                            }`}
                            onClick={setCard}
                        >
                            <span className="icon-photo-camera"></span>
                        </button> */}
                    </div>
                </div>
                {search !== "" && !itemSelected && !listLoading && (
                    <div className={Style.landing_search_result} id="suggestionList">
                        <div className={Style.landing_search_result_inner}>
                            {dropdownList.length >= 1 &&
                                dropdownList.map((res, i) => {
                                    return (
                                        <button
                                            key={i}
                                            className={
                                                Style.lading_search_result_item
                                            }
                                            onClick={() => {
                                                sendSearchViaDropDown(
                                                    res.placeHolder?res.placeHolder :res?.name
                                                );
                                            }}
                                        >
                                            <div
                                                className={
                                                    Style.landing_search_item_inner
                                                }
                                            >
                                                <div
                                                    className={
                                                        Style.landing_image_wrapper
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            Style.landing_search_icon_container
                                                        }
                                                    >
                                                        <img
                                                            src={res?.image}
                                                            alt=""
                                                        />
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
                {showCard ? <VideoSearch handleClose={hideCard} /> : null}
            </div>
        </>
    );
}

export default SearchInput;

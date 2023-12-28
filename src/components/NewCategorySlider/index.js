import React, { useEffect } from "react";
import { useState } from "react";
import Assets from "../Layout/CommonLayout/Asset";
import Style from "./NewCategorySlider.module.scss";
import Slider from "react-slick";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function NewCategorySlider() {
  const [newcategoryList, setNewList] = useState([
    {
      image: Assets.category_08,
      itemTitle: "Orci varius natoque penatibus",
      price: 2,
    },
    {
      image: Assets.category_09,
      itemTitle: "Orci varius natoque penatibus",
      price: 2,
    },
    {
      image: Assets.category_10,
      itemTitle: "Orci varius natoque penatibus",
      price: 2,
    },
    {
      image: Assets.category_11,
      itemTitle: "Orci varius natoque penatibus",
      price: 2,
    },
  ]);
  const settings = {
    infinite: false,
    arrows: true,
    speed: 800,
    slidesToShow: 4,
    /* prevArrow: $('.cprev'),
        nextArrow: $('.cnext'), */
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          rows: 1,
        },
      },
    ],
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  let handleClickTimer = null;

  useEffect(() => {
    return () => {
        handleClickTimer && clearTimeout(handleClickTimer)
    }
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    handleClickTimer = setTimeout(() => {
      document.body.style.overflow = "visible";
    }, [200]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Slider {...settings} className={Style.category_slider}>
        {newcategoryList.map((items) => {
          return (
            <div className={Style.slidecols}>
              <div className={Style.slide_item}>
                <a href="/productview">
                  <figure className={Style.imgsec}>
                    <img src={items.image} alt="" />
                  </figure>
                </a>
                <div className={Style.detail_sec}>
                  <a href="/productview">
                    <header className={Style.itemtitle}>
                      {items.itemTitle}
                    </header>
                  </a>
                  <div className={Style.price} onClick={handleClick}>
                    <span className="icon-collection"></span>
                  </div>
                  <div className={Style.dwnld_icon}>
                    <a href="#">
                      <span className="icon-download"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {newcategoryList.map((items) => {
          return (
            <div className={Style.slidecols}>
              <div className={Style.slide_item}>
                <a href="/productview">
                  <figure className={Style.imgsec}>
                    <img src={items.image} alt="" />
                  </figure>
                </a>
                <div className={Style.detail_sec}>
                  <a href="/productview">
                    <header className={Style.itemtitle}>
                      {items.itemTitle}
                    </header>
                  </a>
                  <div className={Style.price} onClick={handleClick}>
                    <span className="icon-collection"></span>
                  </div>
                  <div className={Style.dwnld_icon}>
                    <a href="#">
                      <span className="icon-download"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>

      <Popover
        className={Style.popover_wrap}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "top",
        }}
      >
        <Box
          className={Style.triangle}
          sx={{
            position: "relative",
            mt: "18px",
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: -14,
              left: "calc(50% - 6px)",
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "0 9px 16px 9px",
              borderColor: "transparent transparent #f73759 transparent",
            },
          }}
        />
        <div className={Style.collect_tool}>
          <div>
            <header className={Style.titlesec}>My Collection</header>
          </div>
          <div className={Style.add_wrapper}>
            <label className={Style.add_btn}>
              <span class="icon-plus"></span>
            </label>
            <div className={Style.input_holder}>
              <input
                type="text"
                name="name"
                className={Style.form_control}
                placeholder="Collection name"
              />
              <button type="submit" className={Style.create_btn}>
                Create
              </button>
            </div>
          </div>
          <div className={Style.results}>
            <span>No results</span>
          </div>
          <div className={Style.new_colect_btn}>
            <label>
              <Link to="/mycollection" style={{ color: "#a8a8a8" }}>
                <span class="icon-plus"></span> View my collection
              </Link>
            </label>
          </div>{" "}
        </div>
      </Popover>
    </>
  );
}

export default NewCategorySlider;

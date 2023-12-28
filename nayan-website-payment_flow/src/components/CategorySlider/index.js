import React, { useEffect } from "react";
import { useState } from "react";
import Assets from "../Layout/CommonLayout/Asset";
import Style from "./CategorySlider.module.scss";
import Slider from "react-slick";
// import { Overlay, Popover } from "react-bootstrap";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function CategorySlider() {

  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [categoryList, setCategoryList] = useState([
    {
      image: Assets.category_01,
      itemTitle: "Orci varius natoque penatibus",
      price: 2,
    },
    {
      image: Assets.category_02,
      itemTitle: "Orci varius natoque penatibus",
      price: 2,
    },
    {
      image: Assets.category_03,
      itemTitle: "Orci varius natoque penatibus",
      price: 2,
    },
    {
      image: Assets.category_04,
      itemTitle: "Orci varius natoque penatibus",
      price: 2,
    },
    {
      image: Assets.category_05,
      itemTitle: "Orci varius natoque penatibus",
      price: 2,
    },
    {
      image: Assets.category_06,
      itemTitle: "Orci varius natoque penatibus",
      price: 2,
    },
    {
      image: Assets.category_07,
      itemTitle: "Orci varius natoque penatibus",
      price: 2,
    },
    {
      image: Assets.category_01,
      itemTitle: "Orci varius natoque penatibus",
      price: 2,
    },
  ]);
  const settings = {
    infinite: false,
    arrows: true,
    speed: 800,
    slidesToShow: 4,
    rows: 2,
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

  return (
    <React.Fragment>
      <Slider {...settings} className={Style.category_slider}>
        {categoryList.map((category) => {
          return (
            <div className={Style.slidecols} style={{ cursor: "pointer" }}>
              <div className={Style.slide_item}>
                <a href="/productview">
                  <figure className={Style.imgsec}>
                    <img src={category.image} alt="" />
                  </figure>
                </a>

                <div className={Style.detail_sec}>
                  <a href="/productview">
                    <header className={Style.itemtitle}>
                      {category.itemTitle}{" "}
                    </header>
                  </a>
                  <div className={Style.price}>
                    <span class="icon-collection" onClick={handleClick}></span>
                  </div>

                  <div className={Style.dwnld_icon}>
                    <a href="#">
                      <span class="icon-download"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {categoryList.map((category) => {
          return (
            <div className={Style.slidecols} style={{ cursor: "pointer" }}>
              <div className={Style.slide_item}>
                <a href="/productview">
                  <figure className={Style.imgsec}>
                    <img src={category.image} alt="" />
                  </figure>
                </a>
                <div className={Style.detail_sec}>
                  <a href="/productview">
                    <header className={Style.itemtitle}>
                      {category.itemTitle}{" "}
                    </header>
                  </a>
                  <div className={Style.price} onClick={handleClick}>
                    <span class="icon-collection"></span>
                  </div>
                  <div className={Style.dwnld_icon}>
                    <a href="#">
                      <span class="icon-download"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      {/* <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
      >
        <Popover
          id="popover-contained" 
          className={Style.collect_tool}
        >
          <div>
            <header className={Style.titlesec}>My Collection</header>
          </div>
          <Popover.Body>
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
          <div className={Style.results}><span>No results</span></div>
          <div className={Style.new_colect_btn}>
            <label>
              <span class="icon-plus"></span> Create New Collection
            </label>
          </div>
          </Popover.Body>
        </Popover>
      </Overlay> */}
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
    </React.Fragment>
  );
}

export default CategorySlider;

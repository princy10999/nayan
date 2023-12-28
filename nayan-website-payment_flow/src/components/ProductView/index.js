import React, { useEffect, useState } from "react";
import Style from "./ProductView.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import { Button } from "react-bootstrap";
import Slider from "react-slick";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function ProductView() {

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

  const tags = [
    { name: "Damage Road" },
    { name: "Injured Animals" },
    { name: "Damage Buildings" },
    { name: "Traffic Light Violation" },
    { name: "Mango Tree" },
    { name: "Damage Road" },
    { name: "Injured Animals" },
    { name: "Damage Buildings" },
    { name: "Traffic Light Violation" },

    { name: "Damage Road" },
    { name: "Injured Animals" },
    { name: "Damage Buildings" },
    { name: "Traffic Light Violation" },
    { name: "Mango Tree" },
    { name: "Damage Road" },
    { name: "Injured Animals" },
  ];
  const similarPhotos = [
    {
      image: Assets.category_01,
      itemTitle: "Orci varius natoque penatibus",
    },
    {
      image: Assets.category_02,
      itemTitle: "Orci varius natoque penatibus",
    },
    {
      image: Assets.category_03,
      itemTitle: "Orci varius natoque penatibus",
    },
    {
      image: Assets.category_04,
      itemTitle: "Orci varius natoque penatibus",
    },
  ];

  const [tagsShow, setTagsShow] = useState(false);
  const numberOfTags = tagsShow ? tags.length : 9;

  const book_mark = document.querySelectorAll(".icon-collection");
  book_mark.forEach((book_mark_el, index) => {
    book_mark_el.addEventListener("click", () => {
      book_mark[index].classList.add("active");
    });
  });

  return (
    <>
    <div className={Style.whiteBg}>
      <section className={Style.productview}>
        <div class="container">
          <div class="row">
            <div class="col-md-7 col-lg-7 col-xl-8">
              <div className={Style.imgsec}>
                <figure className={Style.imgwrap}>
                  <img src={Assets.productimg01} alt="main_image" />
                </figure>
                <div className={Style.note}>
                  This stock photo is 6212px by 4144px. Ideal for any project
                  that requires Hands, Wheel, Steering Wheel.
                </div>
              </div>
            </div>

            <div class="col-md-5 col-lg-5 col-xl-4">
              <div className={Style.cntsec}>
                <div className={Style.titlewrap}>
                  <h2 className={Style.sectitle}>Mango Tree in city</h2>
                  <h3>
                    All items <span>/</span> Photos
                  </h3>
                </div>
                <div className={Style.bookmark}onClick={handleClick}>
                  <span class="icon-collection"></span>
                </div>
                <Button bsPrefix="custom" className={Style.download_btn}>
                  <span class="icon-download1"></span> <div>Download</div>
                </Button>
                <div className={Style.detailwrap}>
                  <div className={Style.cols}>
                    <ul>
                      <li>
                        <span>Orientation</span>Landscape
                      </li>
                      <li>
                        <span>Dimensions</span>6216(w) x 4144 (h) px
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Style.taggeditems}>
        <div class="container">
          <div>
            <h2 className={Style.sectitle}>Item Tags</h2>
          </div>
          <div className={Style.tags}>
            <div className={Style.tagswrap}>
              {tags
                .filter((tag) => tag.name)
                .slice(0, numberOfTags)
                .map((service) => {
                  return (
                    <div className={Style.cols}>
                      <div className={Style.tagitems}>
                        <header className={Style.itemlabel}>
                          {service.name}
                        </header>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className={Style.btnwrap}>
              <div
                className={Style.view_all}
                onClick={() => setTagsShow(!tagsShow)}
              >
                View {tagsShow ? "Less" : "All"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Style.similaritem}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <header className={Style.sec_title}>Similar Photos</header>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end">
              <div className={Style.slide_detail}>
              <Link to="/allcollection"> <span className={Style.showall} >Show All</span></Link>
              </div>
            </div>
          </div>
          <div className={Style.similaritem_slider}>
            {similarPhotos.map((category) => {
              return (
                <div className={Style.slidecols}>
                  <div className={Style.slide_item}>
                    <figure className={Style.imgsec}>
                      <img src={category.image} alt="" />
                    </figure>
                    <div className={Style.detail_sec}>
                      <header className={Style.itemtitle}>
                        {category.itemTitle}{" "}
                      </header>
                      <div className={Style.price} >
                        {" "}
                        <span class="icon-collection" onClick={handleClick}> </span>
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
          </div>
        </div>
      </section>
    </div>


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
export default ProductView;

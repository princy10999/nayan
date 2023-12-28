import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Style from "./MarketPlace.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import FilterSliders from "../FilterSliders";
import CategorySlider from "../CategorySlider";
import NewCategorySlider from "../NewCategorySlider";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function MarketPlace() {

    
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


    const [relatedList, setRelatedList] = useState([
        {
            image: Assets.related_01,
            itemTitle: "Orci varius natoque penatibus",
            price: 2,
        },
        {
            image: Assets.related_02,
            itemTitle: "Orci varius natoque penatibus",
            price: 2,
        },
        {
            image: Assets.related_01,
            itemTitle: "Orci varius natoque penatibus",
            price: 2,
        },
        {
            image: Assets.related_02,
            itemTitle: "Orci varius natoque penatibus",
            price: 2,
        },
    ]);
    const realted_settings = {
        infinite: false,
        arrows: true,
        speed: 800,
        slidesToShow: 2,
        /* prevArrow: $('.cprev'),
            nextArrow: $('.cnext'), */
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <>
            <div className={Style.bg}>
                <section
                    className={Style.bnrsec}
                // style="background-image: url('assets/images/marketplace/banner/bnr-img.png');"
                >
                    <div className={Style.container}>
                        <div className={Style.bnrwrapper}>
                            <div className={Style.row}>
                                <div className="col-lg-5">
                                    <div className={Style.bnrtext}>
                                        <h1>Online Marketplace</h1>
                                        <p>
                                            Excepteur sint occaecat cupidatat non proident, sunt
                                            iculpa qui officia deserunt mollit anim est. laborum sed
                                            perspciatis unde...
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className={Style.bnrimgs}>
                                        <div className={Style.bimgcol}>
                                            <figure className={Style.bimg}>
                                                <img src={Assets.img_01} alt="" />
                                            </figure>
                                        </div>
                                        <div className={Style.bimgcol}>
                                            <figure className={Style.bimg}>
                                                <img src={Assets.img_02} alt="" />
                                            </figure>
                                            <figure className={Style.bimg}>
                                                <img src={Assets.img_03} alt="" />
                                            </figure>
                                        </div>
                                        <div className={Style.bimgcol}>
                                            <figure className={Style.bimg}>
                                                <img src={Assets.img_04} alt="" />
                                            </figure>
                                            <figure className={Style.bimg}>
                                                <img src={Assets.img_05} alt="" />
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={Style.filter_fold}>
                    <div className={Style.container}>
                        <div className={Style.row}>
                            <div className="col-12 col-lg-3 d-flex align-items-center">
                                <div className={Style.filtersec}>
                                    <div className={Style.filters}>
                                        <button className={`${Style.filterbtn} ${Style.filter}`}>
                                            <img src={Assets.filter} alt="" /> Filters
                                        </button>
                                        <button className={`${Style.filterbtn} ${Style.price}`}>
                                            Price
                                        </button>
                                        <button className={`${Style.filterbtn} ${Style.category}`}>
                                            Categories{" "}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-9">
                                <div>
                                    <FilterSliders />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={Style.categories}>
                    <div className={Style.container}>
                        <div className={Style.row}>
                            <div className="col-6">
                                <header className={Style.sec_title}>Categories One</header>
                            </div>
                            <div className="col-6">
                                <div className={Style.slide_detail}>
                                    <span className={Style.counts}>Show 48</span>{" "}
                                    <button className="slick-prev slick-arrow cprev">
                                        {" "}
                                        <span></span>
                                    </button>{" "}
                                    <button className="slick-next slick-arrow cnext">
                                        {" "}
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <CategorySlider />
                    </div>
                </section>

                <section className={Style.categories}>
                    <div className={Style.container}>
                        <div className={Style.row}>
                            <div className="col-6">
                                <header className={Style.sec_title}>Categories Two</header>
                            </div>
                            <div className="col-6">
                                <div className={Style.slide_detail}>
                                    <span className={Style.counts}>Show 48</span>{" "}
                                    <button className="slick-prev slick-arrow c2prev">
                                        {" "}
                                        <span></span>
                                    </button>{" "}
                                    <button className="slick-next slick-arrow c2next">
                                        {" "}
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <NewCategorySlider />
                    </div>
                </section>

                <section className={Style.related_items}>
                    <div className={Style.container}>
                        <Slider {...realted_settings} className={Style.realted_slider}>
                            {relatedList.map((items) => {
                                return (
                                    <div className={Style.slide_item}>
                                        <div className={Style.single_item}>
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
                                                <div className={Style.price}>
                                                    <span class="icon-collection" onClick={handleClick}></span>
                                                </div>
                                                <div className={Style.dwnld_icon}>
                                                    <a href="">
                                                        <span class="icon-download"></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
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

export default MarketPlace;

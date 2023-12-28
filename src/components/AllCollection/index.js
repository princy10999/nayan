import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Style from "./AllCollection.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import FilterSliders from "../FilterSliders";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from 'react-bootstrap/Pagination'

function AllCollection() {
  
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

  return (
    <>
      <div className={Style.bg}>
        <section className={Style.filter_fold}>
          <div className={Style.container}>
            <div className={Style.page_title}>Category One </div>
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
            
            <div className={Style.category_slider}>
              {categoryList.map((category) => {
                return (
                    <div className={Style.slidecols}>
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
                  <div className={Style.slidecols}>
                    <div className={Style.slide_item}>
                      <figure className={Style.imgsec}>
                        <img src={category.image} alt="" />
                      </figure>
                      <div className={Style.detail_sec}>
                        <header className={Style.itemtitle}>
                          {category.itemTitle}{" "}
                        </header>
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
            </div>

            <div className={Style.paginationsec}>  
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                {/* <Pagination.Ellipsis /> */}
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Item>{6}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
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
                      autoComplete="off"
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
                    <span class="icon-plus"></span> View my Collection
                  </label>
                </div>{" "}
              </div>
            </Popover>
          </div>
        </section>
      </div>
    </>
  );
}

export default AllCollection;

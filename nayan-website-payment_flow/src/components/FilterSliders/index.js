import React from "react";
import { useState } from "react";
import Assets from "../Layout/CommonLayout/Asset";
import Style from "./FilterSliders.module.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";

/* function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={Style.f_r_arw}
        onClick={onClick}
      />
    );
  }
  
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={Style.f_l_arw} 
        onClick={onClick}
      />
    );
  } */

function FilterSliders() {
  const [slideImageList, setSlideImageList] = useState([
    { image: Assets.damage_road, heading: "Damage Road" },
    { image: Assets.injured_animals, heading: "Injured Animals" },
    { image: Assets.damage_buildings, heading: "Damage Buildings" },
    { image: Assets.traffic_light, heading: "Traffic Light Violation" },
    { image: Assets.mango_tree, heading: "Mango Tree" },
    ,
    { image: Assets.damage_buildings, heading: "Damage Road" },
  ]);
  const settings = {
    /* prevArrow: <PrevArrow/>,
        nextArrow: <NextArrow/>, */
    infinite: false,
    arrows: true,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className={Style.category_slide}>
      {slideImageList.map((res) => {
        return (
          <div className={Style.slide_items}>
            <Link to="/usecases" className={Style.item}>
              <figure className={Style.iconsec}>
                <img src={res.image} alt="" className={Style.aboutUsSliderImage}/>
              </figure>
              <header className={Style.itemtitle}>{res.heading}</header>
            </Link>
          </div>
        );
      })}
    </Slider>
  );
}

export default FilterSliders;

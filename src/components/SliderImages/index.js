import React from "react";
import { useState } from "react";
import Assets from "../Layout/CommonLayout/Asset";
import Style from "./SliderImages.module.scss";
import Slider from "react-slick";

function SliderImages() {
  const [cardList,setCardList] = useState([{card:Assets.card},{card:Assets.card},{card:Assets.card},{card:Assets.card},{card:Assets.card}]);
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // centerMode: true,
    variableWidth: true,
    //autoplay: true,
    arrows: false,
    dots: true,
  };

  return (

         <div className={Style.image_wrapper}>
                          
          <div className={Style.slider_wrapper}>
             <div className={Style.slider_wrapper_inner}>

                 <Slider {...settings} className={Style.slider_image}>

                 {cardList.map((card, index)=>{
                     return(
                     <div className={Style.slider_item} key={index}>
                         <div className={Style.image_wrapper}>
                             <div className={Style.image_container}>
                                 <img src={card.card} alt=""/>
                             </div>
                         </div>
                     </div>
                     )
                 })}

                 </Slider>

             </div>
         </div>
        </div>

);
}

export default SliderImages;
import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Assets from "../Layout/CommonLayout/Asset";
import SliderImages from "../SliderImages";
import Style from "./CardDetails.module.scss";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

function CardDetails() {
  const history = useHistory();
  const [amount,setAmount] = useState(1);  

  const location = useLocation();
  const myparam = location.state?location.state.amount:amount;

  return (

     <>
        <div className={Style.payment_info_wrapper}>

            <div className={Style.payment_info_main}>

                <div className={Style.back_to_page}>
                    <Button   bsPrefix="custom" onClick={()=>history.push('/userlogin')}>
                    </Button>
                </div>
                <div className={Style.payment_info}>


                    <div className={Style.price_wrapper}>
                        <h3 className={Style.head}>
                            Payment
                        </h3>


                        <div className={Style.price_wrapper_main}>
                            <span className={Style.dollar}>$</span>
                            <span>{myparam}</span>
                        </div>
                    </div>


                    <div className={Style.payment_main_info}>

                    <SliderImages/>

                    </div>



                    <div className={Style.card_details_wrapper}>
                        <div className={Style.card_detail_head}>
                            <h3>Card Detail :</h3>
                        </div>


                        <div className={Style.form_wrapper}>
                            <div className={Style.form_wrapper_inner}>

                                <div className={Style.card_number}>
                                    <div className={Style.config_input}>
                                        <label htmlFor="">
                                            Card Number
                                        </label>
                                        <input type="text" name="" id=""/>
                                    </div>
                                </div>



                                <div className={Style.card_cvc}>
                                    <div className={Style.config_input}>
                                        <label htmlFor="">
                                            CVC
                                        </label>
                                        <input type="text" name="" id=""/>
                                    </div>
                                </div>


                                <div className={Style.card_name}>
                                    <div className={Style.config_input}>
                                        <label htmlFor="">
                                            Holder Name
                                        </label>
                                        <input type="text" name="" id=""/>
                                    </div>
                                </div>


                                <div className={Style.card_expire}>
                                    <div className={Style.config_input}>
                                        <label htmlFor="">
                                            Expiration Date
                                        </label>
                                        <input type="text" name="" id=""/>
                                    </div>
                                </div>


                                <div className={Style.card_submit}>
                                   <Button   bsPrefix="custom" className={Style.submit_button}  onClick={() => history.push("/billboardssearch")}>
                                        Make Payment
                                   </Button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        </>

  );
}

export default CardDetails;



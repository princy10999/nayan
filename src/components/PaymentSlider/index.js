import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Slider from 'react-rangeslider';
import { useHistory } from "react-router-dom";
import Style from "./PaymentSlider.module.scss";

function PaymentSlider() {
  const history = useHistory();
  const [amount,setAmount] = useState(1);
  const [priceStart,setStart] = useState(1);
  const [priceEnd,setEnd] = useState(100);

        const handleChangeStart = () => {
            // console.log('Change event started')
        };
    
        const handleChangeComplete = () => {
            // console.log('Change event completed')
        };
    
    return(
        <div className={Style.billboard_progressive_bar}>

            <div className={Style.progressive_bar_head}>
                <div className={Style.price_start}>
                    ${priceStart}
                </div>
                <div className={Style.price_update}>
                    ${amount}
                </div>
                <div className={Style.price_end}>
                    ${priceEnd}
                </div>
            </div>

            <div className={Style.progressivebar_with_btn}>
                <div className={Style.progressivebar_main}>
                    <div className='slider'>
                        <Slider
                        min={0}
                        max={100}
                        value={amount}
                        onChangeStart={handleChangeStart}
                        onChange={setAmount}
                        onChangeComplete={handleChangeComplete}
                        />
                    </div>
                </div>

                <div className={Style.btn_wrapper}>
                    <Button bsPrefix="custom"
                    /* onClick={()=>history.push("/payment" , {amount : amount})} */
                    >Update</Button>
                     <Button className={Style.unsubscribe_button} bsPrefix="custom"
                    /* onClick={()=>history.push("/payment" , {amount : amount})} */
                    >UnSubscribe</Button>
                </div>

            </div>
    </div>



     
    ) 
}

export default PaymentSlider;
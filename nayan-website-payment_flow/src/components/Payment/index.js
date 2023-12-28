import React from "react";
import { Button, Modal } from "react-bootstrap";
import Assets from "../Layout/CommonLayout/Asset";
import SliderImages from "../SliderImages";
import Style from "./Payment.module.scss";

function Payment({ show, handleClose }) {

  const hideModal = () => {
    handleClose();
  };

  return (
     <>
      <Modal
        show={show}
        dialogClassName="custom_styling_01"
        centered
      >
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
         
        <div className={Style.payment_wrapper}>
            <div className={Style.payment_inner}>

                <div className={Style.payment_close} onClick={hideModal}>x</div>
                <div className={Style.payment_main}>

                    <SliderImages/>
                    <div className={Style.content_wrapper}>

                        <div className={Style.card_wrapper}>
                            <div className={Style.card_icon_wrapper}>
                                <img src={Assets.card_icon} alt=""/>
                            </div>
                            <div className={Style.card_details_wrapper}>
                                <span className={Style.card_number}>**** 6676 (USD)</span>
                                <span className={Style.card_name}>Master Card</span>
                            </div>
                            
                            <Button bsPrefix="custom" className={Style.learn_more}>
                                >
                            </Button>
                        </div>

                        <div className={Style.price_wrapper}>
                           {/*  <span>$1.00</span> */}
                        </div>

                        <div className={Style.action_wrapper}>
                            <Button bsPrefix="custom" className={Style.payment_btn}>Make Payment</Button>
                        </div>
                        
                    </div>

                </div>

            </div>
        </div>

        </Modal.Body>
      </Modal>

    </>
  );
}

export default Payment;



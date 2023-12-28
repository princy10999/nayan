import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import Style from "./BillBoardPopup.module.scss";
import { Context } from "../../context";

function BillBoardPopup({
  show,
  handleClose,
  backUrl,
  violationImage,
  subImages,
  imageSwitch,
  isBlur,
  eventType,
  display_image_url
}) {
  const [mainImage, setMainImage] = useState("");
  const [imageList, setPopUpImage] = useState([
    /* { image: Assets.billboard01 },
        { image: Assets.billboard02 }, */
  ]);

  // context state
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    setMainImage(violationImage);
  }, [violationImage]);

  useEffect(() => {
    setPopUpImage(subImages);
  }, [subImages]);

  return (
    <>
      <Modal
        show={show}
        dialogClassName={`${"custom_styling"} ${"extra_class"}`}
        centered
        onHide={handleClose}
      >
        <Modal.Header onClick={handleClose}>
          <div className={Style.modal_header}>x</div>
        </Modal.Header>
        <Modal.Body>
          <div className={Style.popup_wrapper}>
            <div className={Style.popup_inner}>
              <div className={Style.popup_main}>
                <div className={Style.sliderswrap}>
                  <div className="big_image">
                    <figure className={Style.main_img} id="mainImg">
                      <img
                        src={mainImage!==""?mainImage:display_image_url}
                        className={
                          (eventType?.toLowerCase() ===
                            "commercial vehicle violation" || eventType?.toLowerCase() === "violation" )&&
                          !user?.isSuperAdmin
                            ? "blur-layer"
                            : ""
                        }
                        alt="event_image"
                      />
                    </figure>
                  </div>
                  <div className="thumb_slides">
                    <div>
                      {imageList?.length >= 1 &&
                        imageList.map((image, i) => {
                          return (
                            <figure key={i} className={Style.thumb_img}>
                              <img
                                onClick={() => setMainImage(image.image)}
                                src={image.image}
                                className={
                                  (eventType?.toLowerCase() ===
                                  "commercial vehicle violation"||   eventType?.toLowerCase() ==="violation") &&
                                  !user?.isSuperAdmin
                                    ? "blur-layer"
                                    : ""
                                }
                                alt=""
                              />
                            </figure>
                          );
                        })}
                    </div>
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
export default BillBoardPopup;

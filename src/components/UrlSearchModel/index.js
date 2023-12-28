import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Style from "./UrlSearchModel.module.scss";
import { useHistory } from "react-router-dom";

function UrlSearchModel({ show, handleClose }) {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 3,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };
  const history = useHistory();

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p responsive={responsive}>Model Body</p>
            <Button   bsPrefix="custom" onClick={()=>history.push("/configureJob")}>Subscribe</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UrlSearchModel;



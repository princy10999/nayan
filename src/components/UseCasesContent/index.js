import React, { useEffect, useState } from "react";
import Style from "./UseCasesContent.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import { useDimensions } from "../../logic/Dimensions";
import { useHistory } from "react-router-dom";

function UseCasesContent({ mobHead, deskHead,data }) {
  const history = useHistory();
  const { width } = useDimensions();
 
  const [mobileContent, setMobileContent] = useState(true);
  const hideContent = () => {
    mobileContent ? setMobileContent(false) : setMobileContent(true);
  };
  useEffect(() => {
    width > 767 ? setMobileContent(true) : setMobileContent(mobileContent);
  },[]);

  return (
    <>
      <div
        id={deskHead}
        className="card tab-pane fade show active"
        role="tabpanel"
        aria-labelledby={deskHead}
      >
        <div className="card-header" role="tab" id="all_head">
          <header className="mb-0">
            <a
              data-bs-toggle="collapse"
              onClick={hideContent}
              aria-expanded="true"
              aria-controls={mobHead}
            >
              {mobHead}
            </a>
          </header>
        </div>

        {mobileContent ? (
          <div
            id={mobHead}
            className="collapse show"
            data-bs-parent="#content"
            role="tabpanel"
            aria-labelledby="all_head"
          >
            <div className={Style.card_body}>
              <div className={Style.itemsList}>
                <div className={Style.row}>
                  {data.map((usecase) => {
                    return (
                      <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 cols">
                        <div
                          className={Style.itemwrap}
                          onClick={() => history.push(`/usecasedetail?usecase=${usecase.heading}`)}
                        >
                          <figure className={Style.imgsec}>
                            <img src={usecase.image} alt="image" width={350} height={250} />
                          </figure>
                          <div className={Style.itemcnt}>
                            <header className={Style.titlesec}>
                              {usecase.heading}
                            </header>
                            <p>{usecase.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default UseCasesContent;

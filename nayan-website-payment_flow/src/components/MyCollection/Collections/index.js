import React, { useState } from "react";
import Style from "../MyCollection.module.scss";
import Assets from "../../Layout/CommonLayout/Asset";
import { Button } from "react-bootstrap";

const Collections = (props) => {
  const [button, setButton] = useState(false);

  const [clickedIndex, setClickedIndex] = useState({});

  const openButton = () => {
    setButton(!button);
  };

  const handleClick = (index) => () => {
    setClickedIndex((state) => ({
      ...openButton,
      [index]: !state[index],
    }));
  };

  return (
    <div>
      {props.collections.length > 0
        ? props.collections.map((data, index) => (
            <section className={Style.collection_result}>
              <div className="container">
                <div className={Style.collection_list}>
                  <div className={Style.list_item}>
                    <Button
                      className={Style.profile__dots}
                      onClick={handleClick(index)}
                    >
                      {clickedIndex[index] ? (
                        <ul className="edits show">
                          <li
                            onClick={() => {
                              props.editRow(data);
                              setButton(false);
                            }}
                          >
                            Edit Name
                          </li>
                          <hr />
                          <li onClick={() => props.deleteUser(data.id)}>
                            Delete
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </Button>

                    <div className={Style.catgory}>
                      <header className={Style.cat_name}>{data.name}</header>
                      <span className={Style.item_count}>1 items</span>
                    </div>
                    <div className={Style.related_img}>
                      <figure className={Style.imgs}>
                        <img src={Assets.productimg01} />
                      </figure>
                      <figure className={Style.imgs}>
                        <span></span>
                      </figure>
                      <figure className={Style.imgs}>
                        <span></span>
                      </figure>
                    </div>
                    <div className={Style.btn_wrap}>
                      <Button bsPrefix="custom" className={Style.view_btn}>
                        View Collection
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
        : ""}
    </div>
  );
};

export default Collections;

import React, { useState, useContext, useEffect, useRef } from "react";
import Style from "../MyDownload.module.scss";
import Assets from "../../Layout/CommonLayout/Asset";
import { Button } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination'

const Downloads = (props) => {

  const menuRef = useRef();

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

  const handleClickBody=()=>{
   
  }


      // For closing menu, whenver we click outside
      const useOutsideAlerter = (ref) => {
        useEffect(() => {
          const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
              //setActions(false);
              if (event.target.id !== "hamb___btn") {
                setClickedIndex("");
  
              }
            }
          };
    
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      };
    
      useOutsideAlerter(menuRef);
  

  return (
    <div onClick={handleClickBody}>
      
          <section className={Style.mydownloads}>
            <div className="container">
              <div className={Style.displaynote}>
                Displaying 1 to 6 of 235 items
              </div>
              <div className={Style.list_titles}>
                <div className={Style.name_item}>Item Downloaded</div>
                <div className={Style.date_item}>Date of Download</div>
              </div>
              <div className={Style.dwnld_list}>
              {props.collections.length > 0
                ? props.collections.map((data, index) => (
                    <div className={Style.list_item} key={index}>
                      <Button
                        className={Style.profile_dots}
                        onClick={handleClick(index)}
                      >
                      {clickedIndex[index] ? (
                          <ul className="edits show" ref={menuRef}>
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
                      <div className={Style.lists_wrap}>
                        <div className={Style.imgcol}>
                          <figure className={Style.img_sec}>
                            <img src={data.itemImage} alt="" />
                          </figure>
                        </div>
                        <div className={Style.namecol}>
                          <header className={Style.item_name}>
                            {data.name}
                          </header>
                        </div>
                        <div className={Style.datecol}>
                          <header className={Style.date}>
                            {data.datevalue}
                          </header>
                        </div>
                        <div className={Style.btncol}>
                          <Button bsPrefix="custom" className={Style.download_btn} >
                            <span class="icon-download1"></span> <div>Download</div>
                          </Button>
                        </div>
                      </div>
                    </div>
                ))
              : ""}
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
            </div>
          </section>
    </div>
  );
};

export default Downloads;

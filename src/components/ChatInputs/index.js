import React, { useState, useContext } from "react";
import Assets from "../Layout/CommonLayout/Asset";
import Payment from "../Payment";
import Style from "./ChatInputs.module.scss";
import { Context } from "../../context";
import { useEffect } from "react";

function ChatInputs({ cancelChat }) {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const [showModal, setModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [profile, setProfile] = useState("");
  const [commentReady, setCommentReady] = useState(false);
  const setModel = () => {
    setModal(true);
  };

  const hidemodal = () => {
    setModal(false);
  };
  const submitChat = () => {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();

    let commentObj = {
      comment: text,
      hour: h,
      min: m,
    };
    setComments((oldArray) => [...oldArray, commentObj]);

    setText("");
  };
  const handleChange = (e) => {
    if (e.target.name == "commentText") {
      setText(e.target.value);
    }
  };

  useEffect(() => {
    if (text) {
      setCommentReady(true);
    } else {
      setCommentReady(false);
    }
  }, [text]);
  useEffect(() => {
    if (user) {
      let text = user.name.slice(0, 1);
      setProfile(text);
    }
  }, [user]);

  return (
    <div className={Style.chat_wrapper}>
      <div className={Style.chat_input_wrapper}>
        <div className={Style.chat_input}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            value={text}
            name="commentText"
          />
        </div>
        <button bsPrefix="custom" className={Style.attachment_btn}>
          <input type="file" />
          <img src={Assets.attachment} alt="" />
        </button>
      </div>
      <div className={Style.chat_action}>
        <button
          bsPrefix="custom"
          className={Style.btn_cancel}
          onClick={cancelChat}
        >
          Cancel
        </button>
        {commentReady ? (
          <>
            <button
              bsPrefix="custom"
              className={Style.btn_submitReady}
              onClick={() => {
                submitChat();
              }}
              // onClick={()=>setModel()}
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <button bsPrefix="custom" className={Style.btn_submit}>
              Submit
            </button>
          </>
        )}
      </div>

      <div className={Style.chat_section}>
        <ul>
          {comments ? (
            comments.map((comment) => {
              return (
                <li className={Style.user}>
                  <div className={Style.user_chat}>
                    <div className={Style.user_image}>{profile}</div>
                    <div className={Style.user_text}>
                      <span className={Style.time}>
                        {comment.hour + ":" + comment.min}
                      </span>
                      <span className={Style.text}>{comment.comment}</span>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>

      <Payment show={showModal} handleClose={hidemodal} />
    </div>
  );
}

export default ChatInputs;

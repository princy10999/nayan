import React, { useState, useEffect } from "react";
import Assets from "../Layout/CommonLayout/Asset";
import Style from "./ShareDetails.module.scss";
import Button from "@restart/ui/esm/Button";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  RedditShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
} from "react-share";

function ShareDetails({ hideMediaDetails, eventData, violationImage }) {
  const [shareMedias, setShareMedias] = useState([
    { image: Assets.share01 },
    { image: Assets.share02 },
    { image: Assets.share03 },
    { image: Assets.share04 },
    { image: Assets.share05 },
    { image: Assets.share06 },
    { image: Assets.copyIcon },
  ]);
  const hideMedias = () => {
    hideMediaDetails();
  };
  console.log('eventData',eventData)
  const [shareLink, setshareLink] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (window) {
      let url = window?.location?.href;
      setshareLink(url);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
  };

  return (
    <div className={Style.share_wrapper}>
      <div className={Style.share_wrapper_inner}>
        <div className={Style.social_media_wrapper}>
          <ul>
            <li>
              <FacebookShareButton url={shareLink} hashtag={"#nayan"}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </li>

            <li>
              <TwitterShareButton
                title={"NAYAN search"}
                url={shareLink}
                // hashtags={["hashtag1", "hashtag2"]}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </li>

            <li>
              <LinkedinShareButton
                url={shareLink}
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </li>

            <li>
              <WhatsappShareButton
                url={shareLink}
                title={"NAYAN search site"}
                hashtag={"#nayan"}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </li>
            <li>
              <PinterestShareButton
                url={shareLink}
                media={Assets.share01}
                hashtag={"#nayan"}
                description="NAYAN search site"
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
            </li>
            <li>
              <RedditShareButton
                url={shareLink}
                title={"NAYAN search site"}
                hashtag={"#nayan"}
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </li>
            <li>
              <div>
                {copied ? (
                  <div className={Style.copied}>Copied!</div>
                ) : (
                  <img
                    style={{ cursor: "pointer" }}
                    src={Assets.copyIcon}
                    height={31}
                    width={31}
                    onClick={copyToClipboard}
                    alt=""
                  />
                )}
              </div>
            </li>
            {/* {shareMedias.map((medias,index)=>{
                    return(
                    <li key={index}>
                        <a href="">
                            <img src={medias.image} alt=""/>
                        </a>
                    </li>
                    )
                })} */}
          </ul>
        </div>

        {/* <div className={Style.copy_wrapper}>
          <h3>Or Copy Link</h3>
          <div className={Style.copy_input}>
            <input type="text" value={shareLink} />

            <Button
              bsprefix="custom"
              className={Style.copy}
              onClick={copyToClipboard}
            >
              {copied ? <>copied</> : <>copy</>}
            </Button>
          </div>
        </div> */}

        <div className={Style.action_wrapper}>
          <Button
            bsprefix="custom"
            className={Style.cancel_btn}
            onClick={hideMedias}
          >
            Cancel
          </Button>
          {/* <Button bsprefix="custom" className={Style.share_btn}>
            Share
          </Button> */}
        </div>
      </div>
    </div>
  );
  
}

export default ShareDetails;

import React, { useState } from "react";
import Style from "./VideoPlayer.module.scss";
import ReactPlayer from 'react-player';
import { Button } from "react-bootstrap";

function VideoPlayer({handleBack}) {
    const [volume,setVolume] = useState(100)
    const [play,setPlay] = useState(false)

    return (
        <>
        <Button bsPrefix="custom modalback" onClick={handleBack} className={Style.modalback}>back</Button>
        <div className={Style.video_popup_wrapper}>
            <div className={Style.video_popup_inner}>
                <div className={Style.video_popup_main}>
                    <div className={Style.video_wrapper}>
                        <div className={Style.video_container}>
                              <ReactPlayer
                                url="https://www.youtube.com/embed/tgbNymZ7vqY"
                                volume={volume}
                                width={"100%"}
                                playing={play}
                                height={"100%"}
                                controls={false}
                                pip={true}
                                /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default VideoPlayer;

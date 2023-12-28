import React, { useState } from "react";
import Style from "./DirectionMapDesktop.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import MapLayout from "../Layout/MapLayout";
import { useHistory } from "react-router-dom";

function DirectionMapDesktop() {
    const history = useHistory();
    const [imageList,setImageList] = useState([
        [{name:'Society BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard02},{name:'Mac D BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard01},{name:'Manyavar BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard03},{name:'Realestate BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard04},{name:'Coca Cola BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard05},{name:'Coca Cola BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard06},{name:'BBC BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard07},{name:'Discount BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard08},{name:'University BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard09},{name:'Mac D BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard10}],
        [{name:'Mac D BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard10},{name:'Mac D BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard01},{name:'Society BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard02},{name:'Manyavar BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard03},{name:'Realestate BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard04},{name:'Coca Cola BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard05},{name:'Coca Cola BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard06},{name:'BBC BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard07},{name:'Discount BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard08},{name:'University BillBoards',time:'12:56 Pm, 12/07/2021',image:Assets.billboard09}],
        [{name:'Mac A BillBoards',image:Assets.two,time:'12:56 Pm, 12/07/2021'},{name:'Mac A BillBoards',image:Assets.one,time:'12:56 Pm, 12/07/2021'},{name:'Mac A BillBoards',image:Assets.three,time:'12:56 Pm, 12/07/2021'},{name:'Mac A BillBoards',image:Assets.one,time:'12:56 Pm, 12/07/2021'},{name:'Mac A BillBoards',image:Assets.two,time:'12:56 Pm, 12/07/2021'},{name:'Mac A BillBoards',image:Assets.three,time:'12:56 Pm, 12/07/2021'},{name:'Mac A BillBoards',image:Assets.one,time:'12:56 Pm, 12/07/2021'},{name:'Mac A BillBoards',image:Assets.two,time:'12:56 Pm, 12/07/2021'},{name:'Mac A BillBoards',image:Assets.three,time:'12:56 Pm, 12/07/2021'},{name:'Mac D BillBoards',image:Assets.three,time:'12:56 Pm, 12/07/2021'}]
        ]);
    const [pageList,setPageList] = useState(imageList[0]);
    const [pageIndex,setPageIndex] = useState(0);
    
    const nextPage = () =>{
        let lenPages = imageList.length;
        if(pageIndex<lenPages-1){
        let nxtIndex = pageIndex + 1;
        setPageIndex(nxtIndex);
        setPageList(imageList[nxtIndex]);
        }
    }
    
    const previousPage = () =>{
        if(pageIndex!=0){
        let nxtIndex = pageIndex - 1;
        setPageIndex(nxtIndex);
        setPageList(imageList[nxtIndex]);
        }
    }


  return (
  
    <MapLayout>
                  <div className={Style.direction_wrapper}>

                            <div className={Style.close}><button onClick={()=>history.push("/billBoardDescription")}>X</button></div>

                        <div className={Style.direction_heading_wrapper}>
                            <h3>
                                Mac D BillBoards
                            </h3>
                            <span>12:56 Pm, 12/07/2021</span>
                            <p>126-b, street No-4, South Ex, South Delhi</p>
                        </div>

                        <div className={Style.direction_action_wrapper}>
                            <button className={Style.direction_camera_icon}>
                                <span class="icon-direction"></span>
                                Direction
                            </button>
                            <button className={Style.direction_message_icon}>
                                <span class="icon-message"></span>
                                Start
                            </button>
                        </div>

                    </div>

                    <div className={Style.result_direction_wrapper}>
                    {pageList.map((image)=>{
                        return(
                            <div className={Style.result_direction_item}>
                                <div className={Style.result_direction_image}>
                                    <div className={Style.result_direction_image_container}>
                                        <img src={image.image} alt=""
                                        onClick={() => history.push("/billBoardDescription")}
                                        />
                                    </div>
                                </div>
                                <div className={Style.result_direction_content}>
                                    <h4>{image.name}</h4>
                                    <p>{image.time}</p>
                                    <a href="">
                                        <span class="icon-map"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
                                    </a>
                                </div>
                            </div>
                        )})}
                    </div>
                    <div className={Style.read_more_wrapper}>
                        <button onClick={previousPage} className={Style.uparrow}>
                            <span class="icon-arrow-bottom"></span>
                        </button>
                        <button onClick={nextPage}>
                        <span class="icon-arrow-bottom"></span>
                        </button>
                    </div>
    </MapLayout>
    );
}

export default DirectionMapDesktop;
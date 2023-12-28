import * as React from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@mui/material";
// import ReactGA from "react-ga4";
import btn1 from "../assets/images/btn-1.png";
import btn2 from "../assets/images/btn-2.png";

import "./welcomeBannerModal.scss";

export const WelcomeBannerModal = () => {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleEvent=(category,action,label)=>{
  //     return ReactGA.event({
  //         category: category,
  //         action: action,
  //         label: label // optional
  // })
  // }

  React.useEffect(() => {
    localStorage.removeItem("welcomeBanner");

    handleClickOpen();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleNayanSearcgLearnMore = () => {
    // handleEvent("Landing Page Pop-Up","Nayan Search Learn More","Nayan Search")
    history.push("/learn-more");
  };

  const handleNayanSearchGetStarted = () => {
    // handleEvent("Landing Page Pop-Up","Nayan Search Get Started","Nayan Search")
    // handleClose()
    window.open("https://traffic.nayan.co/");
  };

  const handleComputerGetStarted = () => {
    // handleEvent("Landing Page Pop-Up","Computer Vision Get Started","Computer Vision and Artificial Intelligence")
    history.push("/contact-us");
  };

  const handleComputerLearnMore = () => {
    // handleEvent("Landing Page Pop-Up","Computer Vision Learn More","Computer Vision and Artificial Intelligence")
    // window.open("https://traffic.nayan.co/");
    history.push("/usecasedetail?usecase=Fleet+Management");
  };

  const handleClass = () => {
    console.log("herre=");
    const test = document.getElementById("myDIV");
    // console.log(test,'test')
    if (test) {
      test.classList.add("myStyle");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={"welcome-banner-modal-container"}
    >
      <DialogContent dividers className="modal-content border-0 p-0" onClick={handleClose}>
        <div className="row mx-0">
          <div className="col-md-6 px-0">
            <div className="model_left_img">
              <div className="model_leftt_text">
                <h2 className="title">Fleet Management</h2>
                {/* <p className="text1">Complex Vision & Analytics - On Demand</p>
                                <p className="text2">Machine leaning, reinforcement learning</p>
                                <p className="text3">100+ Patents Globally</p> */}
                <p className="text2">
                  Use NAYAN to track your drivers on road behaviour, conduct
                  quality assurance on branding, violation analysis and many
                  more functions.
                </p>
              </div>
              <div className="lernmore_btn d-flex">
                <div
                  className="ai_Banner_Btn Learn_more"
                  onClick={() => handleComputerLearnMore()}
                >
                  <Button
                    variant="outlined"
                    className="button Computer_Vision_LearnMore"
                  >
                    {"LEARN MORE"}
                  </Button>
                </div>

                <div
                  className="ai_Banner_Btn Get_started"
                  onClick={() => handleComputerGetStarted()}
                >
                  <Button
                    variant="outlined"
                    className="button Computer_Vision_Get_Started"
                  >
                    {"Contact Us"}
                  </Button>
                </div>
              </div>

              {/* <div className='learn-more-button'>
                                    <Button variant="outlined" onClick={() => handleComputerLearnMore()} className='button get_started'>
                                        {'LEARN MORE'}
                                    </Button>
                                    <Button variant="outlined" onClick={()=>handleComputerGetStarted()} className='button get_started'>
                                        {'Get started'}
                                    </Button>
                                </div> */}
            </div>
          </div>
          <div className="col-md-6 px-0">
            <div className="model_right_img">
              <div className="model_leftt_text">
                <h2 className="title">NAYAN SEARCH</h2>
                {/* <p className="text1">Search within your City</p> */}
                <p className="text2">
                  NAYAN's Computer Vision enables smart urban solutions to
                  brings multiple benefits, including more efficient
                  infrastructure, waste management, reduced traffic congestions
                  and violations, and more improved safety of all citizens.
                </p>
                {/* <p className="text3">Realtime Search of anything in the Public Domain</p>
                                <p className="text4">Search for Billboards, Potholes, Fire Hazards, and many more </p> */}
              </div>
              <div className="modal-section video-section">
                <div className="react-player" id="myDIV">
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=RCIbH-UK79A&feature=youtu.be"
                    height={200}
                    width={250}
                    controls
                    onStart={handleClass}
                    // controls={false}
                    modestbranding="1"
                    config={{
                      youtube: {
                        playerVars: { modestbranding: 0 },
                      },
                    }}
                  />
                </div>

                <div className="learn-more-button">
                  <Button
                    variant="outlined"
                    onClick={() => handleNayanSearcgLearnMore()}
                    className="button learn_more"
                  >
                    {"LEARN MORE"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleNayanSearchGetStarted()}
                    className="button get_started"
                  >
                    {"Traffic Management"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row"></div>
      </DialogContent>
    </Dialog>
  );

  // return (
  //     <Dialog
  //         open={open}
  //         onClose={handleClose}
  //         aria-labelledby="alert-dialog-title"
  //         aria-describedby="alert-dialog-description"
  //         className='welcome-banner-modal-container'
  //         fullWidth
  //         maxWidth={'lg'}
  //     >
  //         <DialogTitle id="alert-dialog-title" className='modal-header'>
  //             {`NAYAN SEARCH - Empowering people with Award Winning AI to reshape the world`}
  //             <div className='cross-icon' onClick={handleClose}>
  //                 X
  //             </div>
  //         </DialogTitle>
  //         <DialogContent dividers className='modal-content'>
  //             <div className='d-flex'>

  //                 <div className='modal-section text-section'>

  //                     <div className='text mt-3'>
  //                         <span className='primary'>{`Who We are.`}</span>

  //                         {` - We are an Award winning Computer Vision Company, offering Deep Tech solutions for Monitoring, Supervision and Visual Data Collection for Governments and Fortune 500 companies across the globe. `}

  //                         <Link className='link' to='/aboutus'>{'Learn More'}</Link>
  //                     </div>

  //                     <div className='text mt-3'>
  //                         <span className='primary'>{`What you can find on NAYAN SEARCH`}</span>

  //                         {`- With NAYAN Search, everyday citizens can access our advanced technology to find visuals of incidents, events, and objects that are in the Public Space. Search for visuals of Billboards, find the closest Petrol Pumps and the utilities they offer, supervise waste management in your neighborhood. Check out everything you can search for `}

  //                         <Link className='link' to='/usecases'>{'here'}</Link>
  //                     </div>

  //                     <div className='text mt-3'>
  //                         <span className='primary'>{`How to use NAYAN SEARCH`}</span>

  //                         {`- NAYAN search is easy to use for everyone. Just type what you want in our Search bar -  Billboards, Potholes, Traffic Lights etc and the results will show on the map. Click the pin point on the map or the image of the result you like to view more detail. You can share images directly from NAYAN.Watch our Tutorial given here for more information or `}

  //                         <Link to="/#" className='link' onClick={handleClose}>{'Start Searching now'}</Link>
  //                     </div>

  //                     <div className='text mt-3'>
  //                         <span className='primary'>
  //                             {`Please note -  All images shown in search results will come are Trademarked by NAYAN, email us at `}
  //                             <span>
  //                                 <a href='mailto:info@nayantech.com'>{'info@nayantech.com'}</a>
  //                             </span>
  //                             {` to gain access to raw images.`}
  //                         </span>
  //                     </div>

  //                     <div className='mt-5'>
  //                         <Button variant="contained" onClick={handleClose}>
  //                             {'Continue'}
  //                         </Button>
  //                     </div>

  //                 </div>

  //                 <div className='modal-section video-section'>
  //                     <div>
  //                         <ReactPlayer
  //                             url="https://www.youtube.com/watch?v=B_c2vWgYVr4&feature=youtu.be"
  //                             height={400}
  //                             width={500}
  //                             controls
  //                         // light
  //                         // pip
  //                         />
  //                     </div>

  //                     {/* <div className='button get_started'>
  //                         <Button variant="outlined">
  //                             {'View More'}
  //                         </Button>
  //                     </div> */}
  //                 </div>

  //             </div>
  //         </DialogContent>
  //     </Dialog>
  // )
};

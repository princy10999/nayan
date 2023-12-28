import React from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import SocialMedia from "../SocialMedia";

import './contactus.scss'

function ContactUs() {

    return (
        <>
            <section className="slimbnr mb-5">
                <div className="container">
                    <header className="pagetitle">
                        <h1>Contact Us</h1>
                    </header>

                    <div className="contact-us-container mt-5">
                        <div className="content">
                            <div className="d-flex flex-column w-75">
                                <h3 className="font-weight-bold">Let's connect</h3>

                                <span className="mt-2 text-break">Connect with us via email or our social media handles. Let us know if there is any specific data point or product you are looking for, or if you want to learn more about our B2B offerings. We look forward to hearing from you.</span>
                            </div>

                            <div className="d-flex flex-column mt-5 w-75">
                                <div className="d-flex mt-1">
                                    <MailOutlineIcon className="mail-icon" />

                                    <span className="cursor-pointer">
                                        <a href='mailto:info@nayantech.com'>info@nayantech.com</a>
                                    </span>
                                </div>

                                <span className="smedia mt-3 mb-5">
                                    <SocialMedia />
                                </span>
                            </div>
                        </div>

                        <div className="content">
                            <span className="mt-1 fw-bold text-decoration-underline"><LocationOnIcon className="location-icon"/> Dubai office:</span>
                            <span className="text-wrap" style={{ width: "13rem" }}>NAYAN FZ LLC, HD49B, 1st Floor, ln5 Tech, Dubai, UAE</span>
                            <span className="mt-1"><PhoneInTalkIcon className="phone-icon" /> +971-507320852</span>

                            <span className="mt-4 fw-bold text-decoration-underline"><LocationOnIcon className="location-icon"/>India office:</span>
                            <span className="text-wrap" style={{ width: "13rem" }}>E-5, 3rd Floor, South Extension-2, New Delhi-110049</span>
                            <span className="mt-1"><PhoneInTalkIcon className="phone-icon" /> +91-9958083303</span>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactUs;

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import Style from "./ForgotPassword.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import { forgotPasswordApi } from "../../api/commonApi";


function ForgotPassword() {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleChange = event => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Email field should not be empty.");
            return
        }

        setIsLoading(true);
        await forgotPasswordApi(email);
        setIsLoading(false);
        setEmail("")
    }

    return (

        <div className={Style.login_wrapper}>
            <div className={Style.login_inner}>

                <div className={Style.back_to_page}>
                    <Button bsPrefix="custom" onClick={() => history.push("/userLogin")}>
                    </Button>
                </div>
                <div className={Style.logo_wrapper_inner}>
                    <div className={Style.container}>
                        <img src={Assets.logoMain} alt="" onClick={() => history.push("/")} />
                    </div>
                </div>


                <div className={Style.form_wrapper}>
                    <form onSubmit={handleSubmit} className={Style.form_wrapper_inner}>

                        <div className={Style.display__message}>
                            <h3>Forgot Your Password?</h3>
                            <p>No worries! Enter your email, we will send you a reset link</p>
                        </div>

                        <div className={`${Style.from_group} mb-3`}>
                            <label htmlFor="">Email ID</label>
                            <input type="email" onChange={handleChange} value={email} required placeholder="xyz@gmail.com" />
                        </div>

                        <div className={Style.from_group}>
                            <Button disabled={isLoading} bsPrefix="custom" type="submit" className={Style.login_btn} >
                                {isLoading ? "Loading..." : "Submit"}
                            </Button>
                        </div>

                        <div className={Style.action_wrapper}>
                            <p>New member? <Link to="/userSignup">Sign Up</Link></p>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;



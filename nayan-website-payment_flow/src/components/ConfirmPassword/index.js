import React, { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import Style from "./confirm-password.module.scss";
import Assets from "../Layout/CommonLayout/Asset";
import { resetPasswordApi } from "../../api/commonApi";

function ConfirmPassword() {
    const history = useHistory();

    const { search } = useLocation();
    const token = new URLSearchParams(search).get("token");

    const [values, setValues] = useState({
        password: '',
        confirm_password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("Token not provided or missing.");
            return
        }
        if (!values.password) {
            toast.error("Password field should not be empty.");
            return
        }
        if (!values.confirm_password) {
            toast.error("Confirm Password field should not be empty.");
            return
        }
        if (values.password !== values.confirm_password) {
            toast.error("Password & Confirm Password should match.");
            return
        }

        setIsLoading(true);
        const response = await resetPasswordApi({
            ...values,
            token,
        });
        setIsLoading(false);
        setValues({
            password: '',
            confirm_password: ''
        })

        if (response?.success) {
            history.push('/userLogin');
        }
    }

    const { password, confirm_password } = values;

    return (
        <>
            <div className={Style.forgot_wrapper}>
                <div className={Style.forgot_inner}>

                    <div className={Style.back_to_page}>
                        <Button bsPrefix="custom" onClick={() => history.push('/userLogin')}>
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
                                <h3>Change your password</h3>
                            </div>

                            <div className={Style.from_group}>
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    required
                                    autoComplete="new-password"
                                    onChange={handleChange('password')}
                                />
                            </div>

                            <div className={Style.from_group}>
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    value={confirm_password}
                                    required
                                    autoComplete="new-password"
                                    onChange={handleChange('confirm_password')}
                                />
                            </div>

                            <div className={Style.from_group}>
                                <Button disabled={isLoading} bsPrefix="custom" type="submit" className={Style.forgot_btn}>
                                    {isLoading ? "Loading..." : "Submit"}
                                </Button>
                            </div>

                            <div className={Style.action_wrapper}>
                                <p>
                                    <Link to="/userLogin">Try Login?</Link>
                                </p>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ConfirmPassword;



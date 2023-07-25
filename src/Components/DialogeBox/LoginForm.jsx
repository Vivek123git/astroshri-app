import React, { useState } from "react";
import Cookies from "js-cookie";
import authapi, { user_status_api } from "../api/authapi";
import Timer from "../timer/Timer";
import { blankValidator } from "../utils/Validation";
import { useNavigate } from "react-router-dom";
import { notificationHandler } from "../utils/Notification";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

const LoginForm = ({ open, close, countryCode, phone, onsubmit }) => {
  const [loginotpError, setloginotpError] = useState(false);
  const navigate = useNavigate();
  const [timerShow, settimerShow] = useState(false);
  const [loginotp, setloginotp] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);

  /////api integration user Login
  const userLogin = async () => {
    if (!blankValidator(loginotp)) {
      setloginotpError(true);
      return;
    }
    if (!blankValidator(countryCode)) {
      return;
    }
    try {
      setisloading(true);
      let temp = {
        otp: loginotp,
        number: phone,
        country: Cookies.get("country"),
        country_code: countryCode,
      };

      const res = await user_status_api(temp);
      if (res.data.type === "block") {
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
        return console.log("block res", res.data.type);
      }
      if (res.data.status) {
        Cookies.set(
          "auth",
          "true",
          { secure: true },
          { sameSite: "strict" },
          { expires: 365 }
        );
        Cookies.set(
          "token",
          res.data.token,
          { secure: true },
          { sameSite: "strict" },
          { expires: 365 }
        );
        localStorage.setItem("userphoto", res.data.results[0].profile_img);
        notificationHandler({ type: "success", msg: res.data.message });
        statusUpdate();
        setisUpdated(!isUpdated);
        setisloading(false);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        console.log("data response error:::", res);
        setisloading(false);
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const resendOtpLogin = async () => {
    try {
      let temp = {
        number: phone,
        otp: "",
        country_code: countryCode,
      };
      const res = await authapi(temp);
      if (res.data.status) {
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
    }
  };

  // callbackfun
  const statusUpdate = (data) => {
    onsubmit(data);
  };
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={100}
        // onClose={close}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            Continue with Phone
          </span>
          <span className="float-right icon_color" onClick={() => close()}>
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <h3>Login</h3>
              <div className="pt-3">
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  placeholder="Mobile number"
                />
              </div>
              <div className="pt-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={loginotp}
                  onChange={(e) => {
                    setloginotpError(false);
                    if (e.target.value.length <= 4) {
                      setloginotp(e.target.value);
                    }
                  }}
                />
              </div>
              {loginotpError && <span className="text-danger">Enter OTP</span>}
              {timerShow == true ? (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    resendOtpLogin();
                    settimerShow(false);
                  }}
                >
                  Resend OTP
                </span>
              ) : (
                <div className="d-flex">
                  <span className="pr-1"> Resend OTP available in</span>
                  <Timer time={59} onEnd={() => settimerShow(true)} />
                </div>
              )}
              <button
                type="submit"
                className="get_otp_btn mt-4"
                onClick={userLogin}
              >
                Verify
              </button>
              <div>
                <p
                  className="text-center mt-2"
                  style={{ width: "70%", margin: "auto", fontSize: "10px" }}
                >
                  By Procedding ,I Agree to{" "}
                  <span
                    className="terms_condition"
                    onClick={() => navigate("/terms")}
                  >
                    Terms and Conditions
                  </span>{" "}
                  &{" "}
                  <span
                    className="terms_condition"
                    onClick={() => navigate("/privacypolicy")}
                  >
                    Privacy Policy
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginForm;

import React, { useState } from "react";
import Cookies from "js-cookie";
import authapi, { otp_register_process, user_status_api } from "../api/authapi";
import Timer from "../timer/Timer";
import { blankValidator } from "../utils/Validation";
import { notificationHandler } from "../utils/Notification";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const RegisterForm1 = ({ open, close, phone, countryCode, onsubmit }) => {
  const [regesterotp, setregesterotp] = useState("");
  const [timerShow, settimerShow] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  const navigate = useNavigate();
  //error
  const [regesterotpError, setregesterotpError] = useState(false);

  const resendOtpRegister = async () => {
    try {
      let temp = {
        number: phone,
        otp: "",
        country_code: countryCode.phone,
      };
      const res = await otp_register_process(temp);
      if (res.data.status) {
      }
      notificationHandler({ type: "danger", msg: res.data.message });
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
    }
  };

  /////with OTP and number verify  api integration user OTP
  const finallotpverify = async () => {
    if (!blankValidator(regesterotp)) {
      setregesterotpError(true);
      return;
    }
    try {
      setisloading(true);
      let temp = {
        number: phone,
        otp: regesterotp,
        country_code: countryCode,
      };
      const res = await otp_register_process(temp);
      if (res.data.status) {
        notificationHandler({ type: "success", msg: res.data.message });
        statusUpdate();
        setisUpdated(!isUpdated);
        setisloading(false);
      } else {
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  // callbackfun
  const statusUpdate = (data) => {
    onsubmit(data);
  };

  return (
    <>
      {/* ////Register OTP Verify*/}
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={100}
        // onClose={loginfunction}
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
              <h3>Verification Code</h3>
              <div className="pt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={regesterotp}
                  onChange={(e) => {
                    setregesterotpError(false);
                    if (e.target.value.length <= 4) {
                      setregesterotp(e.target.value);
                    }
                  }}
                />
              </div>
              {regesterotpError && (
                <span className="text-danger pr-5">Enter OTP</span>
              )}
              {timerShow == true ? (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    resendOtpRegister();
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
                onClick={finallotpverify}
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

export default RegisterForm1;

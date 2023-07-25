import React, { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
const Signup = () => {
  const [phone, setPhone] = useState("");
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  return (
    <>
      <div className="signupbox">
        <div className="container">
          <div className="signup_form">
            <div className="sign_up_free ">
              Sign UP for Free & consult <br /> your favroute Astrologer
            </div>
            <div className="sign_up_freee">
              <label className="">Enter your phone number</label>
              <PhoneInput
                style={{ width: "100%" }}
                country={"in"}
                //  enableSearch={true}
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </div>

            {/* <div className="recapta_form mt-2">
              {" "}
              <ReCAPTCHA
                sitekey="6LfcYLUgAAAAAHtLwdOkxuOcXnuu9QvTIRIsyhoi"
                onChange={onChange}
              />
            </div> */}

            <div>
              {" "}
              <button type="submit" className="get_otp_btn_chat mt-3">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

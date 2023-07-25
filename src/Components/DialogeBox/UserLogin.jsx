import React, { useState, useContext } from "react";
import "./Login.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loder from "../Loder/Loder";
import { notificationHandler } from "../utils/Notification";
import { blankValidator } from "../utils/Validation";
import { UserContext } from "../../App";
import authapi, { get_profile_api, user_register_api } from "../api/authapi";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import RegisterForm1 from "./RegisterForm1";

const UserLogin = ({ open, close }) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isUpdated, setisUpdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [userType, setuserType] = useState("");
  const [RegisterDialogbox, setRegisterDialogbox] = useState(false);
  const [LoginDialogbox, setLoginDialogbox] = useState(false);

  const [userLoginalredydialogbox, setuserLoginalredydialogbox] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [dob, setdob] = useState("");
  const [pob, setpob] = useState("");
  const [tob, settob] = useState("");
  const [regesterotp, setregesterotp] = useState("");
  const [loginotp, setloginotp] = useState("");
  const [countryCode, setcountryCode] = useState("");
  /////Error
  const [PhoneError, setPhoneError] = useState("");
  const [countryCodeError, setcountryCodeError] = useState(false);

  function addHours(numOfHours, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
  }

  const registerfunction = () => {
    setRegisterDialogbox(!RegisterDialogbox);
  };
  const loginfunction = () => {
    setLoginDialogbox(!LoginDialogbox);
  };
  const userLoginalredy = () => {
    setuserLoginalredydialogbox(!userLoginalredydialogbox);
  };

  /////api integration user Type with number_verify_api
  const userlogin = async () => {
    if (!blankValidator(phone)) {
      setPhoneError(true);
      return;
    }
    if (!blankValidator(countryCode)) {
      setcountryCodeError(true);
      return;
    }

    try {
      setisloading(true);
      let temp = {
        number: phone,
        country_code: countryCode,
        country: Cookies.get("country"),
      };
      const res = await authapi(temp);
      if (res.data.status) {
        setuserType(res.data.type);
        const type = res.data.type;
        if (type === "register") {
          registerfunction();

          close();
        } else {
          userLoginalredy();
          close();
        }
        setisloading(false);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error });
      console.log(error);
    }
  };

  /////api integration user Register
  const userRegister = async () => {
    try {
      setisloading(true);
      let temp = {
        name,
        number: phone,
        email,
        date_of_birth: dob,
        country_code: countryCode,
        country: Cookies.get("country"),
        time_of_birth: tob,
        place_of_birth: pob,
        deviceType: "Web",
        deviceID: "1",
        deviceToken: "1",
        refer_code_user: "",
      };
      let res = await user_register_api(temp);
      if (res.data.status) {
        notificationHandler({ type: "success", msg: res.data.message });
        Cookies.set("auth", "true", { secure: true }, { sameSite: "Lax" }, { expires: 365 });
        Cookies.set("token", res.data.token, { secure: true }, { sameSite: "Lax" }, { expires: 365 });
        userDetail(res.data.token);
        loginfunction();
        setisloading(false);
        setPhone("");
        setemail("");
        setname("");
        setregesterotp("");
        setcountryCode("91");
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  ////getprofile
  const userDetail = async () => {
    try {
      setisloading(true);
      const res = await get_profile_api();
      if (res.data.status) {
        dispatch({
          type: "USER",
          payload: {
            ...state,
            results_web: res.data.results_web,
            wallet: res.data.results_web.wallet,
            notification: res.data.notifications,
            cartItemsLength: res.data.item_total,
          },
        });
        Cookies.set("userID", res.data.results_web._id, { secure: true }, { sameSite: "strict" }, { expires: 365 });
        Cookies.set("country", res.data.results_web.currency, { secure: true }, { sameSite: "strict" }, { expires: 365 });
        // notificationHandler({ type: "success", msg: res.data.message });
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const loginsubmit = () => {
    userDetail();
    setuserLoginalredydialogbox(false);
    setPhone("");
    setloginotp("");
    setcountryCode({ phone: "91" });
  };

  const registerformStatus = ({ name, email, dob, pob, tob }) => {
    setname(name);
    setemail(email);
    setdob(dob);
    setpob(pob);
    settob(tob);
    registerfunction();
    loginfunction();
  };

  const finalregister = () => {
    userRegister();
  };
  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={100} onClose={() => close()}>
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">Continue with Phone</span>
          <span className="float-right icon_color" onClick={() => close()}>
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <h3 style={{ fontSize: "1rem" }}>LOGIN/SIGN UP</h3>
              <div>
                <label className="">Enter your phone number</label>
                <div className="d-flex">
                  <PhoneInput
                    country={"in"}
                    enableSearch={true}
                    onChange={(value, country) => {
                      setcountryCodeError(false);
                      setPhoneError(false);
                      setcountryCode(country.dialCode);
                      let num = value.split("");
                      num.splice(0, country.dialCode.length);
                      setPhone(num.join(""));
                    }}
                  />
                </div>
                {PhoneError && <span className="text-danger pr-5">Enter Phone no. </span>}
                {countryCodeError && <span className="text-danger pr-5">Select Country code </span>}
              </div>

              <button
                type="submit"
                className="get_otp_btn mt-4"
                //  onClick={userlogin}
              >
                CONTINUE
              </button>
              <div>
                <p className="text-center mt-2" style={{ width: "70%", margin: "auto", fontSize: "10px" }}>
                  By Procedding ,I Agree to{" "}
                  <span
                    className="terms_condition"
                    //  onClick={() => navigate("/terms")}
                  >
                    Terms and Conditions
                  </span>{" "}
                  &{" "}
                  <span
                    className="terms_condition"
                    //  onClick={() => navigate("/privacypolicy")}
                  >
                    Privacy Policy
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login OTP Verify */}
      <LoginForm
        phone={phone}
        countryCode={countryCode}
        open={userLoginalredydialogbox}
        close={() => setuserLoginalredydialogbox(!userLoginalredydialogbox)}
        onsubmit={() => loginsubmit()}
      />
      {/* Register Form */}
      <RegisterForm phone={phone} countryCode={countryCode} open={RegisterDialogbox} close={() => registerfunction()} onsubmit={registerformStatus} />
      {/* Register OTP Verify */}
      <RegisterForm1 phone={phone} countryCode={countryCode} open={LoginDialogbox} close={() => loginfunction()} onsubmit={finalregister} />
      <Loder loading={isloading} />
    </>
  );
};

export default UserLogin;

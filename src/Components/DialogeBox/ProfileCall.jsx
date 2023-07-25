import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import Cookies from "js-cookie";
import { getBaseUrl } from "../utils";
import { notificationHandler } from "../utils/Notification";
import CallStatus from "../DialogeBox/CallStatus";
import RechargePopup from "../DialogeBox/RechargePopup";
import { call_initiate_api, call_initiate_status_api } from "../api/astrochat";
import axios from "axios";
import Astrologercallstatus from "./Astrologercallstatus";
const ProfileChat = (props) => {
  const [rechargenow, setrechargenow] = useState(false);
  const [callconnect, setcallconnect] = useState(false);
  const userID = Cookies.get("userID");
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");
  const [isloading, setisloading] = useState(false);
  const [usernumber, setusernumber] = useState("");
  const [walletBalance, setwalletBalance] = useState("");
  const data = props?.data[0];
  const price = data?.per_min_voice_call;
  useEffect(() => {
    if (auth === "true") {
      uerDetail();
    }
  }, []);

  const uerDetail = () => {
    let url = getBaseUrl() + "user_api/get_profile";
    setisloading(true);
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(url, config)
      .then(
        (res) => {
          setwalletBalance(res.data.results.wallet);
          setusernumber(res.data.results.number);
          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          notificationHandler({ type: "danger", msg: error });
        }
      )
      .catch((e) => {
        notificationHandler({ type: "danger", msg: e });
        setisloading(false);
      });
  };

  console.log(props.astro.id);

  const audiocallfun = async () => {
    setisloading(true);
    let url = getBaseUrl() + "/user_api/call_initiate";
    let temp = {
      astrologer_id: props.astro.id,
      call_type: "audio",
    };
    try {
      const res = await call_initiate_api(temp);
      if (res.data.type === "recharge") {
        return setrechargenow(true);
      }
      if (res.data.status === true) {
        setcallconnect(true);
        notificationHandler({ type: "success", msg: res.data.message });
        props.close();
        setTimeout(() => {
          // setcallconnect(false)
        }, 5000);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        console.log("data response error:::", res.data.message);
        props.close();
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        onClose={props.close}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            Status
          </span>
          <span className="float-right icon_color" onClick={props.close}>
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <div>Do you want to call?</div>
              <button
                type="submit"
                className="get_otp_btn mt-4"
                onClick={() => audiocallfun()}
              >
                Yes
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>

      {/* <CallStatus
        open={callconnect}
        close={() => setcallconnect(!callconnect)}
      /> */}
      <Astrologercallstatus
        open={callconnect}
        close={() => setcallconnect(!callconnect)}
        walletBalance={walletBalance}
        price={price}
        number={usernumber}
      />
      <RechargePopup
        walletBalance={walletBalance}
        price={price}
        open={rechargenow}
        close={() => setrechargenow(!rechargenow)}
      />
    </div>
  );
};

export default ProfileChat;

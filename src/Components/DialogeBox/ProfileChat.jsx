import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getBaseUrl } from "../utils";
import { UserContext } from "../../App";
import AstroStatus from "../DialogeBox/AstroStatus";
import RechargePopup from "../DialogeBox/RechargePopup";
import { notificationHandler } from "../utils/Notification";
import Cookies from "js-cookie";
const ProfileChat = (props) => {
  const userID = Cookies.get("userID");
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");
  const [callendedId, setcallendedId] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [rechargenow, setrechargenow] = useState(false);
  const [walletBalance, setwalletBalance] = useState("");
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const [Astrores, setAstrores] = useState(false);
  const [astrostatus, setastrostatus] = useState("initiate");
  const data = props?.data[0];
  const price = data?.per_min_chat;

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
          console.log("data user detaail:::", res);
          setwalletBalance(res.data.results.wallet);
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

  const callInitiateStatus = (id) => {
    let url = getBaseUrl() + "/user_api/call_initiate_status";
    let temp = {
      channel_id: id,
    };
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(url, temp, config)
      .then((res) => {
        console.log("call initaite res kkkkkkkkkkkkkkkkkkk:::", res);
        setastrostatus(res.data.results.status);
        if (res.data.results.status === "initiate") {
          setTimeout(() => {
            callInitiateStatus(id);
          }, 2000);
        } else if (res.data.results.status === "accept_astro") {
          setAstrores(false);
          navigate("/chat", {
            state: {
              channel_id: id,
            },
          });
        } else if (res.data.results.status === "reject_astro") {
          setTimeout(() => {
            setAstrores(false);
          }, 5000);
        } else {
        }
      })
      .catch((e) => {
        console.log("data response error:::", e);
        // notificationHandler({ type: "danger", msg: e });
        // setisloading(false);
      });
  };

  const callInitiate = () => {
    props.close();
    const channel_id = `${userID}_${data.id}_${Date.now()}`;
    setcallendedId(channel_id);
    let url = getBaseUrl() + "/user_api/call_initiate";
    let temp = {
      astrologer_id: data.id,
      call_type: "chat",
      channel_id: channel_id,
    };
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(url, temp, config)
      .then((res) => {
        console.log("call initaite res  jjjjjjjjjjjjjj:::", res);
        if (res.data.type === "recharge") {
          return setrechargenow(true);
        }

        if (res.data.status) {
          dispatch({ type: "USER", payload: { ...state, astroData: data } });
          setAstrores(true);
          callInitiateStatus(channel_id);
        } else {
          notificationHandler({ type: "danger", msg: res.data.message });
        }
      })
      .catch((e) => {
        console.log("data response error:::", e);
        // notificationHandler({ type: "danger", msg: e });
        // setisloading(false);
      });
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
              <div>Do you want to chat?</div>
              <button
                type="submit"
                className="get_otp_btn mt-4"
                onClick={() => callInitiate()}
              >
                Yes
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>

      <AstroStatus
        open={Astrores}
        status={astrostatus}
        channal={callendedId}
        close={() => setAstrores(!Astrores)}
      />
      <RechargePopup
        open={rechargenow}
        close={() => setrechargenow(!rechargenow)}
        walletBalance={walletBalance}
        price={price}
      />
    </div>
  );
};

export default ProfileChat;

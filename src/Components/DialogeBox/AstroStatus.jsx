import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import a from "../../images/waiting.gif";
import b from "../../images/ended.gif";
import c from "../../images/soft-wrong.gif";
import { getBaseUrl } from "../utils";
import axios from "axios";
import Cookies from "js-cookie";
import Timer from "../timer/Timer";
import Chatfunction from "../function/Chatfunction";

const AstroStatus = (props) => {
  const token = Cookies.get("token");
  const [astrodisconeted, setastrodisconeted] = useState(false);

  const chatended = () => {
    let url = getBaseUrl() + "/user_api/call_status_update";
    let temp = {
      channel_id: props.channal,
      status: "end_user",
    };
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(url, temp, config)
      .then(
        (res) => {
          console.log("call ended by user :::", res);
          props.close();
        },

        (error) => {
          console.log("data response error:::", error);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
      });
  };

  const disconnect_user_api = () => {
    let url = getBaseUrl() + "user_api/call_status_update";
    let temp = {
      channel_id: props.channal,
      status: "disconnect_user",
    };
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(url, temp, config)
      .then(
        (res) => {
          console.log("call disconnect_user :::", res);
          props.close();
          if (res.data.status) {
            setastrodisconeted(true);
          }
        },

        (error) => {
          console.log("data response error:::", error);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
      });
  };

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={100}
        onClick={() => chatended()}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            Status
          </span>
          <span className="float-right icon_color" onClick={() => chatended()}>
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <div>
                <div className="">
                  {props.status === "reject_astro" ? (
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        style={{ width: "150px", height: "150px" }}
                        src={b}
                        alt="reject_astro"
                      />
                    </div>
                  ) : (
                    <div className="" style={{ textAlign: "center" }}>
                      <img
                        style={{ width: "150px", height: "150px" }}
                        src={a}
                        alt="waiting..."
                      />
                      {/* ===== */}
                      <Timer
                        time={120}
                        onEnd={() => {
                          disconnect_user_api();
                          console.log("onend call may be my timer is up..");
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <button type="submit" className="get_otp_btn mt-4">
                Connecting....
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>

      <Dialog
        open={astrodisconeted}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={100}
        onClick={() => setastrodisconeted(!astrodisconeted)}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            Status
          </span>
          <span
            className="float-right icon_color"
            onClick={() => setastrodisconeted(!astrodisconeted)}
          >
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <div>
                <div className="">
                  <div className="" style={{ textAlign: "center" }}>
                    <img
                      style={{ width: "150px", height: "150px" }}
                      src={c}
                      alt="disconeted..."
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="get_otp_btn mt-4">
                Other Astrologer
              </button>
              {/* <Chatfunction astoId="639ffec0b248d375be72e6e9" /> */}
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default AstroStatus;

import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import a from "../../images/waiting.gif";
import { getBaseUrl } from "../utils";
import axios from "axios";
import Cookies from "js-cookie";
import Timer from "../timer/Timer";
import ChatDisconnected from "./ChatDisconnected";

const Chatform1 = ({ open, close, channal, onsubmit }) => {
  const token = Cookies.get("token");

  const chatended = () => {
    close();
    let url = getBaseUrl() + "/user_api/call_status_update";
    let temp = {
      channel_id: channal,
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
          close();
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
      channel_id: channal,
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
          close();
          if (res.data.status) {
            statusUpdate("disconnect_user");
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

  const statusUpdate = (data) => {
    onsubmit(data);
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={100}
        // onClick={() => chatended()}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            Status
          </span>
          <span
            className="float-right icon_color"
            // onClick={() => close()}
            // onClick={() => chatended()}
            onClick={() => disconnect_user_api()}
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
    </div>
  );
};

export default Chatform1;

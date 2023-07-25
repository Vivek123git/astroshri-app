import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import c from "../../images/soft-wrong.gif";
import Cookies from "js-cookie";

const ChatDisconnected = ({ open, close, onsubmit }) => {
  const token = Cookies.get("token");
  const reconnect = () => {
    onsubmit("Reconnect");
  };
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={100}
        onClick={() => close()}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            Status
          </span>
          <span className="float-right icon_color" onClick={() => close()}>
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
                Connect to Other Astrologer
              </button>
              <button
                type="submit"
                className="get_otp_btn mt-4"
                onClick={() => reconnect()}
              >
                Reconnect
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default ChatDisconnected;

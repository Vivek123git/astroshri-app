import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
const Astrologercallstatus = (props) => {
  // console.log("props::", props);
  const { walletBalance, price, number } = props;
  const dd = Math.trunc(walletBalance / price);
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={100}
        onClick={() => props.close()}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            Status
          </span>
          <span
            className="float-right icon_color"
            onClick={() => props.close()}
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
                    <h5>Call initiated!</h5>
                    <p>You will receive a call from </p>
                    <p>+91*********2</p>

                    <button type="submit" className="get_otp_btn mt-4 mb-3">
                      Available Talk Time: {dd} min
                    </button>
                    <p>
                      Note:Based on the amount in your wallet,your call will be
                      disconnected after {dd} min
                    </p>
                    <p>
                      Please ensure your {number} is switched on and is in
                      network coverage area.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default Astrologercallstatus;

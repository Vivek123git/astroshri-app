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
import Cookies from "js-cookie";

const Chatform2 = ({ open, close }) => {
  const token = Cookies.get("token");
  const [astrodisconeted, setastrodisconeted] = useState(false);

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
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      style={{ width: "150px", height: "150px" }}
                      src={b}
                      alt="reject_astro"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="get_otp_btn mt-4">
                Disconnect Call by Astro
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default Chatform2;

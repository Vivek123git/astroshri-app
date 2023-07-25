import React from "react";
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
const CallStatus = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={100}
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
                        alt="waiting..."
                      />
                    </div>
                  ) : (
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        style={{ width: "150px", height: "150px" }}
                        src={a}
                        alt="waiting..."
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
    </div>
  );
};

export default CallStatus;

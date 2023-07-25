import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Reconnect = (props) => {
  console.log(props);
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");

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
            Reconnect
          </span>
          <span className="float-right icon_color" onClick={props.close}>
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <h1>Reconnect....</h1>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default Reconnect;

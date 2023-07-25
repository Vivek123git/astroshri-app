import React from "react";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const RechargePopup2 = (props) => {
  const navigate = useNavigate();
  const currency = Cookies.get("country");
  const { walletBalance, price } = props;

  const dd = Math.trunc(walletBalance / price);
  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title" maxWidth="sm" onClose={props.close}>
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">Recharge</span>
          <span className="float-right icon_color" onClick={props.close}>
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <div>
                <div className="">
                  <h6>
                    Wallet Balance{" "}
                    <span>
                      {" "}
                      {currency === "INR" ? "₹" : "$"} {walletBalance}
                    </span>
                  </h6>
                </div>
                <h6>
                  Please ensure that your balance is above for {currency === "INR" ? "₹" : "$"} {props?.price} .
                </h6>
              </div>
              <button type="submit" className="get_otp_btn mt-4" onClick={() => navigate("/add_wallet")}>
                RECHARGE
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default RechargePopup2;

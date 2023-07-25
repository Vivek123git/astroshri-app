import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { notificationHandler } from "../utils/Notification";
import { getBaseUrl } from "../utils";
import axios from "axios";
import Cookies from "js-cookie";

const AskQuestion = (props) => {
  const navigate = useNavigate();
  console.log(props);
  const [isloading, setisloading] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  const [question, setquestion] = useState("");
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");

  const userask = () => {
    /////api integration get filter data by categories
    let url = getBaseUrl() + "user_api/user_question_add";
    setisloading(true);
    let temp = {
      astrologer_id: props.astro,
      question: question,
    };

    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(url, temp, config)
      .then(
        (res) => {
          console.log("filter:::", res);
          notificationHandler({ type: "success", msg: res.data.message });
          props.close();
          setisUpdated(false);
          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          notificationHandler({ type: "danger", msg: error });
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        notificationHandler({ type: "danger", msg: e });
        setisloading(false);
      });
  };

  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={100} onClose={props.close}>
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">Ask to Astrologer</span>
          <span className="float-right icon_color" onClick={props.close}>
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <div style={{ width: "100%" }}>
                <textarea
                  rows={5}
                  style={{
                    minWidth: "100%",
                    minHeight: "200px",
                    maxHeight: "200px",
                    border: "1px solid lightgray",
                  }}
                  placeholder="Your Message"
                  value={question}
                  onChange={(e) => setquestion(e.target.value)}
                />
              </div>
              <button type="submit" className="get_otp_btn mt-4" onClick={() => userask()}>
                Send
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default AskQuestion;

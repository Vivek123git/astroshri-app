import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { AiFillStar } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import userrating_api from "../api/userrating";
import { blankValidator } from "../utils/Validation";
import { notificationHandler } from "../utils/Notification";
const UserRating = ({ open, close, channelId, type }) => {
  const [Rating, setRating] = useState("");
  const [review, setreview] = useState("");
  const navigate = useNavigate();
  const ratingChanged = (newRating) => {
    setRating(newRating);
    console.log(newRating);
  };
  const SubmitRating = async () => {
    try {
      let temp = {
        channel_id: channelId,
        rating: Rating,
        review: review,
      };
      const res = await userrating_api(temp);
      console.log(res.data.status);
      if (res.data.status) {
        if (type === "chat") {
          navigate(-1);
        }
        if (type === "call") {
          close();
        }
      }
      notificationHandler({ type: "success", msg: res.data.message });
    } catch (error) {
      console.log(error);
      notificationHandler({ type: "danger", msg: error });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={100}
        // onClose={close}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            How well were your needs met?
          </span>
          <span className="float-right icon_color">
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view d-flex justify-content-center">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={40}
              color2={"#ffd700"}
            />
          </div>
          <textarea
            style={{
              width: "100%",
            }}
            placeholder="Share more about your experience"
            rows={5}
            // value={review}
            onChange={(e) => setreview(e.target.value)}
          />

          <button
            type="submit"
            className="get_otp_btn mt-4"
            onClick={() => SubmitRating()}
          >
            Submit
          </button>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default UserRating;

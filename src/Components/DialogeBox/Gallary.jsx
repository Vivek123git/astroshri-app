import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const Gallary = (props) => {
  console.log(props);
  const file = props.file.file;
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
            Profile
          </span>
          <span
            className="float-right icon_color"
            onClick={props.close}
            style={{ cursor: "pointer" }}
          >
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <div>
                <div className="">
                  {props?.file?.file?.split(".")?.splice(-1)[0] == "jpg" && (
                    <img
                      className="gallery-imagee"
                      src={props.file.file}
                      alt=""
                      style={{ height: "350px", objectFit: "contain" }}
                      // onClick={() => gallaryshow(data)}
                    />
                  )}
                  {props?.file?.file?.split(".")?.splice(-1)[0] == "mp4" && (
                    <video
                      className="gallery-imagee"
                      style={{ height: "350px" }}
                      loop
                      autoplay
                      muted
                      controls
                      src={props.file.file}
                    ></video>
                  )}
                </div>
              </div>
              {/* <button type="submit" className="get_otp_btn mt-4">
                                Connecting....
                            </button> */}
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default Gallary;

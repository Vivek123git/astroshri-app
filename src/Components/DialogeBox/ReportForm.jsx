import React, { useState } from "react";
import { blankValidator } from "../utils/Validation";
import { notificationHandler } from "../utils/Notification";
import { Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import { otp_register_process } from "../api/authapi";
import { get_palces } from "../api/location";
import { IoLocationSharp } from "react-icons/io5";
import { report_form_add_api } from "../api/notifyapi";

const ReportForm = ({ open, close, onsubmit }) => {
  const [email, setemail] = useState("");

  const [name, setname] = useState("");
  const [gender, setgender] = useState("");
  const [occupation, setoccupation] = useState("");
  const [maritalstatus, setmaritalstatus] = useState("");
  const [comments, setcomments] = useState("");
  const [dob, setdob] = useState("");
  const [pob, setpob] = useState("");
  const [tob, settob] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  //error
  const [nameError, setnameError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [genderError, setgenderError] = useState(false);
  const [maritalstatusError, setmaritalstatusError] = useState(false);

  const [dobError, setdobError] = useState(false);
  const [pobError, setpobError] = useState(false);
  const [tobError, settobError] = useState(false);
  const [occupationError, setoccupationError] = useState(false);

  // otp_register_process
  const report_form_add = async () => {
    if (!blankValidator(name)) {
      setnameError(true);
      return;
    }
    if (!blankValidator(gender)) {
      setgenderError(true);
      return;
    }
    if (!blankValidator(maritalstatus)) {
      setmaritalstatusError(true);
      return;
    }
    if (!blankValidator(occupation)) {
      setoccupationError(true);
      return;
    }

    if (!blankValidator(dob)) {
      setdobError(true);
      return;
    }

    if (!blankValidator(tob)) {
      settobError(true);
      return;
    }
    if (!blankValidator(pob)) {
      setpobError(true);
      return;
    }

    console.log(name, gender, occupation, maritalstatus, comments, dob, pob, tob);

    statusUpdate();
  };

  // callbackfun
  const statusUpdate = () => {
    onsubmit(name, gender, occupation, maritalstatus, comments, dob, pob, tob);
  };

  const [places, setplaces] = useState([]);
  const getPlacesAPIFunc = async (e, type) => {
    console.log(type);
    setpob(e.target.value);
    try {
      setplaces([]);
      let res = await get_palces(e.target.value);
      if (res.data.status === "OK") {
        res.data.predictions.map((item) => {
          setplaces((places) => [...places, item.description]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={100}>
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">Report Details</span>
          <span className="float-right icon_color" onClick={() => close()} style={{ cursor: "pointer" }}>
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <div className="pt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setnameError(false);
                    if (!e.target.value.match(/[0-9]/g)) {
                      setname(e.target.value);
                    }
                  }}
                />
              </div>
              {nameError && <span className="text-danger pr-5">Enter name</span>}

              <div className="pt-2">
                <div class="form-group">
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    onChange={(e) => {
                      setgenderError(false);
                      setgender(e.target.value);
                    }}
                  >
                    <option value="">-Select Gender Status-</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">other</option>
                  </select>
                  {genderError && <span className="text-danger pr-5">Select Gender</span>}
                </div>
              </div>

              <div className="">
                <div class="form-group">
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    onChange={(e) => {
                      setmaritalstatusError(false);
                      setmaritalstatus(e.target.value);
                    }}
                  >
                    <option value="">-Select Marital Status-</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                  {maritalstatusError && <span className="text-danger pr-5">Select Marital Status</span>}
                </div>
              </div>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Occupation"
                  value={occupation}
                  onChange={(e) => {
                    setoccupationError(false);
                    setoccupation(e.target.value);
                  }}
                />
              </div>

              {occupationError && <span className="text-danger pr-5">Enter Occupation</span>}

              <div className="pt-3">
                <input
                  type="text"
                  name="dob"
                  value={dob}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setdob(e.target.value)}
                  onClick={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    setdobError(false)((e.target.type = "text"));
                  }}
                  className="form-control"
                  placeholder="Date of Birth"
                />
              </div>
              {dobError && <span className="text-danger pr-5">Enter Date of Birth</span>}

              <div className="pt-3">
                <input
                  type="text"
                  name="tob"
                  onClick={(e) => (e.target.type = "time")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={tob}
                  onChange={(e) => {
                    settobError(false);
                    settob(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Time of Birth"
                />
              </div>
              {tobError && <span className="text-danger pr-5">Enter Time of Birth</span>}
              <div className="input_for_cross pt-3">
                <input
                  type="text"
                  name="Place of Birth"
                  value={pob}
                  // onChange={(e) => {
                  //   setpobError(false);
                  //   setpob(e.target.value);
                  // }}
                  onChange={getPlacesAPIFunc}
                  className="form-control"
                  placeholder="Place of Birth"
                />
                {places.length !== 0 && (
                  <div className="getplace_input_registerform" style={{ width: "100%" }}>
                    {places?.map((place) => (
                      <div
                        onClick={() => {
                          setpobError(false);
                          setpob(place);
                          setplaces("");
                        }}
                        className="getplace_input_div chatform_div"
                      >
                        <IoLocationSharp /> {place}
                      </div>
                    ))}
                  </div>
                )}
                <span onClick={() => setpob("")} className="cross_register ">
                  &times;
                </span>
              </div>
              {pobError && <span className="text-danger pr-5">Enter Place of Birth</span>}

              <div className="pt-3">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Any Comments"
                  value={comments}
                  onChange={(e) => {
                    // setemailError(false);
                    setcomments(e.target.value);
                  }}
                />
              </div>
              {/* {emailError && <span className="text-danger pr-5">Enter email</span>} */}
              <button type="submit" className="get_otp_btn mt-4" onClick={() => report_form_add()}>
                Submit
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </>
  );
};

export default ReportForm;

import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Grid } from "@material-ui/core";
import { IoLocationSharp } from "react-icons/io5";
import { get_latLong, get_palces } from "../api/location";
import { blankValidator } from "../utils/Validation";
import { get_profile_api } from "../api/authapi";
import Cookies from "js-cookie";

const Chatform = ({ open, close, onSubmit, getProfile }) => {
  const [active, setactive] = useState("my");
  const auth = Cookies.get("auth");
  const [error, setError] = useState({
    name_m: {
      status: false,
    },
    m_birthplace: {
      status: false,
    },
  });
  const [places, setplaces] = useState([]);

  const [userInfo, setuserInfo] = useState({
    name_m: getProfile?.name || "",
    gender_m: getProfile?.gender || "",
    time_m: getProfile?.tob || "",
    date_m: getProfile?.dob || "",
    m_birthplace: "",
    latitude: "",
    longitude: "",
  });

  const [lat, setlat] = useState();
  const [lng, setlng] = useState();

  const getPlacesAPIFunc = async (e, type) => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
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

  const get_profile = async () => {
    try {
      const res = await get_profile_api();
      if (res.data.status) {
        console.log(res?.data?.results_web.dob);
        setuserInfo({
          ...userInfo,
          name_m: res?.data?.results_web.name,
          m_birthplace: res?.data?.results_web.pob,
          time_m: res?.data?.tob,
          date_m: res?.data?.results_web.dob,
          gender_m: res?.data?.results_web.gender,
        });
        // selectedPlace(res?.data?.results_web.pob);
        let res1 = await get_latLong(res?.data?.results_web.pob);
        if (res1.status == 200) {
          let { lat, lng } = res1.data;
          setlat(lat);
          setlng(lng);
        }
      } else {
        console.log("data response error:::", res);
      }
    } catch (error) {
      console.log("data response error:::", error);
    }
  };
  useEffect(() => {
    if (auth === "true") {
      get_profile();
    }
  }, []);

  const selectedPlace = async (value) => {
    try {
      setuserInfo({ ...userInfo, m_birthplace: value });
      setplaces([]);
      let res = await get_latLong(value);
      if (res.status == 200) {
        let { lat, lng } = res.data;
        setuserInfo({
          ...userInfo,
          m_birthplace: value,
          latitude: lat,
          longitude: lng,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userdetails = (e) => {
    setError({
      name_m: {
        status: false,
      },
    });
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const formDetails = () => {
    if (!blankValidator(userInfo.name_m)) {
      return setError({
        ...error,
        name_m: {
          status: true,
        },
      });
    }
    if (!blankValidator(userInfo.m_birthplace)) {
      return setError({
        ...error,
        m_birthplace: {
          status: true,
        },
      });
    }

    if (userInfo.date_m > new Date().toISOString().slice(0, 10)) {
      alert("Invalid date");
      return;
    }

    //send data back
    onSubmit({ ...userInfo, latitude: lat, longitude: lng });
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={100} onClose={close}>
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">Share Details</span>
          <span className="float-right icon_color" onClick={close} style={{ cursor: "pointer" }}>
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent>
          <div className="padding_desktop_view">
            <div className="text-center">
              <p>Enter your details here, with the help of which our expert astrologers will be able to prepare a chart for you.</p>
              <div className="chat_info_btn">
                <span className={`chat_info_my_details ${active === "my" ? "chat_info_my_details_active" : ""}`} onClick={() => setactive("my")}>
                  My Details
                </span>
              </div>
              <Grid className="Component_main_grid">
                <Grid item md={12} xs={12} sm={12}>
                  <div className="p-2">
                    <input
                      type="text"
                      name="name_m"
                      value={userInfo.name_m}
                      onChange={(e) => userdetails(e)}
                      className="form-control"
                      placeholder="Name"
                      spellCheck="false"
                    />
                    {error?.name_m?.status && (
                      <p
                        style={{
                          width: "72%",
                          color: "red",
                          textAlign: "left",
                        }}
                      >
                        Enter name
                      </p>
                    )}
                  </div>
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <div className="chat_form_field d-flex  p-2">
                    <div className="chat_info_form_field">
                      <input
                        type="radio"
                        id="Male"
                        name="gender_m"
                        value="Male"
                        checked={userInfo.gender_m == "Male"}
                        onChange={(e) => userdetails(e)}
                        className="m-1"
                      />
                      <label for="html">Male</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="Female"
                        name="gender_m"
                        value="Female"
                        onChange={(e) => userdetails(e)}
                        checked={userInfo.gender_m == "Female"}
                        className="m-1"
                      />
                      <label for="css">Female</label>
                    </div>
                  </div>
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <lable className="chat_form_field">Date of Birth</lable>

                  <div className="p-2">
                    <input
                      type="date"
                      name="date_m"
                      value={userInfo.date_m}
                      onChange={(e) => userdetails(e)}
                      className="form-control "
                      max={new Date().toISOString().slice(0, 10)}
                    />
                  </div>
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <lable className="chat_form_field">Time of Birth</lable>

                  <div className="p-2">
                    <input name="time_m" type="time" value={userInfo.time_m} onChange={(e) => userdetails(e)} className="form-control " />
                  </div>
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <lable className="chat_form_field"> Birth Place</lable>
                  <div className="p-2">
                    <div className="input_for_cross">
                      <input
                        type="text"
                        className="form-control getplace_input "
                        placeholder="Enter your place"
                        autoComplete="off"
                        name="m_birthplace"
                        value={userInfo.m_birthplace}
                        onChange={getPlacesAPIFunc}
                      />
                      {places?.length !== 0 && (
                        <div className="getplace_input_freekundli" style={{ width: "100%" }}>
                          {places?.map((place) => (
                            <div onClick={() => selectedPlace(place)} className="getplace_input_div chatform_div">
                              <IoLocationSharp /> {place}
                            </div>
                          ))}
                        </div>
                      )}
                      {error.m_birthplace?.status && (
                        <p
                          style={{
                            width: "72%",
                            color: "red",
                            textAlign: "left",
                          }}
                        >
                          Select Place
                        </p>
                      )}
                      <span onClick={() => setuserInfo({ ...userInfo, m_birthplace: "" })} className="cross">
                        &times;
                      </span>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <button type="submit" className="get_otp_btn mt-4" onClick={() => formDetails()}>
                Submit
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default Chatform;

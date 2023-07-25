import React, { useState, useEffect, useContext } from "react";
import withHOC from "../../Common/HOC";
import "./UserProfile.css";
import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import Loder from "../Loder/Loder";
import { notificationHandler } from "../utils/Notification";
import { UserContext } from "../../App";
import Cookies from "js-cookie";
import Avatar from "@material-ui/core/avatar";
import { get_profile_api } from "../api/authapi";
import profile_update_api, { profile_update_img_api } from "../api/profileapi";
import { get_latLong, get_palces } from "../api/location";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [isUpdated, setisUpdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [imagedata, setimagedata] = useState(null);
  const data = localStorage.getItem("userphoto");
  const navigate = useNavigate();
  const [userdataArry, setuserdataArry] = useState({
    name: "",
    email: "",
    number: "",
    gender: "",
    dob: "",
    image: "",
    tob: "",
    pob: "",
  });

  const [tob1, settob1] = useState();

  const token = Cookies.get("token");
  const { name, email, number, gender, dob, image, tob, pob } = userdataArry;

  useEffect(() => {
    get_profile();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [isUpdated]);

  /////api integration get user
  const get_profile = async () => {
    setisloading(true);
    try {
      const res = await get_profile_api();
      if (res.data.status) {
        settob1(res.data.tob);
        setuserdataArry({
          name: res?.data?.results_web?.name,
          email: res?.data?.results_web?.email,
          number: res?.data?.results_web?.number,
          gender: res?.data?.results_web?.gender,
          dob: res?.data?.results_web?.dob,
          image: res?.data?.results_web?.profile_img,
          pob: res?.data?.results_web?.pob,
          tob: res?.data?.results_web?.tob,
        });
        dispatch({
          type: "USER",
          payload: { ...state, results_web: res.data.results_web },
        });
        localStorage.setItem("userphoto", res.data.results_web.profile_img);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      setisloading(false);
      notificationHandler({ type: "danger", msg: error });
    }
  };

  ////user update
  const userupdate = (e) => {
    setuserdataArry({
      ...userdataArry,
      [e.target.name]: e.target.value,
    });
  };

  /////api integration update user
  const profileupdate = async () => {
    if (dob > new Date().toISOString().slice(0, 10)) {
      alert("Invalid date");
      return;
    }
    setisloading(true);
    let temp = {
      name: name,
      gender: gender,
      dob: dob,
      tob: tob,
      pob: pob,
    };
    try {
      const res = await profile_update_api(temp);
      if (res.data.status) {
        notificationHandler({ type: "success", msg: res.data.message });
        setisUpdated(!isUpdated);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const profile_update_img = async (e) => {
    setisloading(true);
    setimagedata(e.target.files);
    const fd = new FormData();
    fd.append("profile_img", e.target.files[0]);

    try {
      const res = await profile_update_img_api(fd);
      if (res.data.status) {
        notificationHandler({ type: "success", msg: res.data.message });
        setisUpdated(!isUpdated);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  // Manish's changes
  const [places, setplaces] = useState([]);

  const getPlacesAPIFunc = async (e, type) => {
    // console.log(type);
    setuserdataArry({
      ...userdataArry,
      [e.target.name]: e.target.value,
    });
    try {
      // setTimeout(async () => {
      setplaces([]);
      let res = await get_palces(e.target.value);
      // console.log(res.data)
      if (res.data.status === "OK") {
        res.data.predictions.map((item) => {
          setplaces((places) => [...places, item.description]);
        });
      }
      // }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const selectedPlace = async (value) => {
    try {
      setuserdataArry({ ...userdataArry, pob: value });
      setplaces([]);
      let res = await get_latLong(value);
      if (res.status == 200) {
        let { lat, lng } = res.data;
        setuserdataArry({
          ...userdataArry,
          pob: value,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const timeformate = (e) => {
    let time = e.target.value;
    settob1(time);

    let hour = time.split(":")[0];
    let minute = time.split(":")[1];
    let formatedTime;
    if (hour > 12) {
      hour = (hour == "00" ? 12 : hour > 12 ? hour % 12 : hour).toString().padStart(2, "0");
      formatedTime = `${hour}:${minute} PM`;
    } else {
      formatedTime = `${hour == "00" ? 12 : hour}:${minute} AM`;
    }

    setuserdataArry({
      ...userdataArry,
      tob: formatedTime,
    });
  };

  return (
    <>
      <div className="Contact_Page_padding">
        <div className="container">
          <div className="card_section pb-5">
            <Card className="Card_shadow p-3 mt-5">
              <div className="text-center mt-5 mb-3">
                <h4> Edit Your Profile</h4>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    margin: "auto",

                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  <div style={{ width: "100%", float: "left" }}></div>
                  <input type="file" accept="image/*" style={{ display: "none" }} id="contained-button-file" onChange={(e) => profile_update_img(e)} />
                  {data === "" ? (
                    <label htmlFor="contained-button-file">
                      <Avatar
                        alt="img"
                        src=""
                        style={{
                          height: "90px",
                          width: "90px",
                          cursor: "pointer",
                        }}
                      />
                    </label>
                  ) : (
                    <label htmlFor="contained-button-file">
                      <img src={image} className="user_profile_img" />
                    </label>
                  )}
                </div>
              </div>
              <div className="card_admissiondetails_height">
                <div className="textfiled_margin">
                  <Grid className="Component_main_grid">
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Name" value={name} onChange={(e) => userupdate(e)} />
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="text" className="form-control" name="email" placeholder="Email" value={email} />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="Component_main_grid">
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Mobile Number</label>
                        <input type="nember" className="form-control" name="number" placeholder="Number" value={number} />
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Gender</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <select className="form-control" id="exampleFormControlSelect1" name="gender" value={gender} onChange={(e) => userupdate(e)}>
                              <option value="Male">Male </option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="Component_main_grid">
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          value={dob}
                          max={new Date().toISOString().slice(0, 10)}
                          onChange={(e) => userupdate(e)}
                          className="form-control"
                          placeholder="Enter DOB"
                        />
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Place of Birth </label>
                        <div className="input_for_cross">
                          <input type="text" name="pob" value={pob} onChange={(e) => getPlacesAPIFunc(e)} className="form-control" placeholder="Enter Place" />
                          <span onClick={() => setuserdataArry({ ...userdataArry, pob: "" })} className="cross">
                            &times;
                          </span>
                        </div>
                        {places.length !== 0 && (
                          <div className="getplace_input_freekundli">
                            {places?.map((place) => (
                              <div onClick={() => selectedPlace(place)} className="getplace_input_div">
                                <IoLocationSharp /> {place}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="Component_main_grid">
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Time of Birth</label>
                        <input type="time" name="tob" onChange={(e) => timeformate(e)} value={tob1 || tob} className="form-control" placeholder="Enter Time" />
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1"></label>
                        <p className="note-text">
                          ⚠️Note: Please{" "}
                          <span style={{ cursor: "pointer", color: "#0b16ed" }} onClick={() => navigate("/contact")}>
                            contact the Rakshaa support team
                          </span>{" "}
                          to update your Mobile Number & Email ID.
                        </p>
                        {/* <input
                          type="time"
                          name="tob"
                          onChange={(e) => userupdate(e)}
                          value={tob}
                          className="form-control"
                          placeholder="Enter Time"
                        /> */}
                      </div>
                    </Grid>
                  </Grid>
                  <div className="text-center-button mt-1 ">
                    <button type="button" className="btn get_otp_btn_userprofile_btn" onClick={profileupdate}>
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Loder loading={isloading} />
    </>
  );
};

export default withHOC(UserProfile);

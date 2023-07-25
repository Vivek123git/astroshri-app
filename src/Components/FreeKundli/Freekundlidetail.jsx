import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import a from "../../images/sign.png";
//tab pannel
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, Step } from "react-form-stepper";
import { Card } from "react-bootstrap";
import { notificationHandler } from "../utils/Notification";
import { blankValidator } from "../utils/Validation";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { Skeleton } from "@mui/material";
// import Avatar from "@material-ui/core/avatar";

const Freekundlidetail = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [goSteps, setGoSteps] = useState(0);
  const [planets, setplanets] = useState([]);
  const [sub_vdashaArry, setsub_vdashaArry] = useState([]);
  const [numerology_data, setnumerology_data] = useState("");
  const [ad, setad] = useState("");
  const [userId, setuserId] = useState("");
  const [advanced_panchang_data, setadvanced_panchang_data] = useState("");
  const [md, setmd] = useState("");
  const [vdashaArry, setvdashaArry] = useState([]);
  const [sub_sub_vdashaArry, setsub_sub_vdashaArry] = useState([]);
  const [sub_sub_sub_vdashaArry, setsub_sub_sub_vdashaArry] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [imagepath, setimagepath] = useState({
    sun: null,
    moon: null,
    chalit: null,
  });
  const [tabIndex, settabIndex] = useState(1);
  const general = () => {
    settabIndex(1);
  };
  const remedies = () => {
    settabIndex(2);
  };
  const dosa = () => {
    settabIndex(3);
  };

  const [basicdetail, setbasicdetail] = useState({
    Name: "",
    ayanamsha: "",
    day: "",
    hour: "",
    latitude: "",
    longitude: "",
    minute: "",
    month: "",
    seconds: "",
    sunrise: "",
    sunset: "",
    timezone: "",
    year: "",
  });

  const [basicpanchang, setbasicpanchang] = useState({
    day: "",
    karan: "",
    nakshatra: "",
    sunrise: "",
    sunset: "",
    tithi: "",
    vedic_sunrise: "",
    vedic_sunset: "",
    yog: "",
  });

  const [avakhada, setavakhada] = useState({
    Charan: "",
    Gan: "",
    Karan: "",
    Nadi: "",
    Naksahtra: "",
    NaksahtraLord: "",
    SignLord: "",
    Tithi: "",
    Varna: "",
    Vashya: "",
    Yog: "",
    Yoni: "",
    ascendant: "",
    ascendant_lord: "",
    name_alphabet: "",
    paya: "",
    sign: "",
    tatva: "",
    yunja: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
    if (location.state) {
      console.log(location.state.data);
      const data = location.state.data.birth_data[0];
      setbasicdetail({
        Name: location.state.data.name,
        ayanamsha: data.ayanamsha,
        day: data.day,
        hour: data.hour,
        latitude: data.latitude,
        longitude: data.longitude,
        minute: data.minute,
        month: data.month,
        seconds: data.seconds,
        sunrise: data.sunrise,
        sunset: data.sunset,
        timezone: data.timezone,
        year: data.year,
      });
      const panchang = location.state.data.basic_panchang[0];
      setbasicpanchang({
        day: panchang.day,
        karan: panchang.karan,
        nakshatra: panchang.nakshatra,
        sunrise: panchang.sunrise,
        sunset: panchang.sunset,
        tithi: panchang.tithi,
        vedic_sunrise: panchang.vedic_sunrise,
        vedic_sunset: panchang.vedic_sunset,
        yog: panchang.yog,
      });
      const astrodetail = location.state.data.astro_details[0];
      setavakhada({
        Charan: astrodetail.Charan,
        Gan: astrodetail.Gan,
        Karan: astrodetail.Karan,
        Nadi: astrodetail.Nadi,
        Naksahtra: astrodetail.Naksahtra,
        NaksahtraLord: astrodetail.NaksahtraLord,
        SignLord: astrodetail.SignLord,
        Tithi: astrodetail.Tithi,
        Varna: astrodetail.Varna,
        Vashya: astrodetail.Vashya,
        Yog: astrodetail.Yog,
        Yoni: astrodetail.Yoni,
        ascendant: astrodetail.ascendant,
        ascendant_lord: astrodetail.ascendant_lord,
        name_alphabet: astrodetail.name_alphabet,
        paya: astrodetail.paya,
        sign: astrodetail.sign,
        tatva: astrodetail.tatva,
        yunja: astrodetail.yunja,
      });
      const MOON = location.state.data.MOON;
      const SUN = location.state.data.SUN;
      const chalit = location.state.data.chalit;
      setimagepath({
        sun: SUN,
        moon: MOON,
        chalit: chalit,
      });

      setplanets(location.state.data.planets);
      const userid = location.state.data.id;
      setuserId(userid);
      Dashaapi(location.state.data.id);
      basic_numerology(location.state.data.id);
      advanced_panchang(location.state.data.id);
    } else {
      navigate("/freekundli");
    }
  }, [location]);

  ///Dasha
  const Dashaapi = (data) => {
    const ID = data;
    try {
      let url = getBaseUrl() + "user_api/major_vdasha";
      setisloading(true);
      let temp = {
        id: ID,
      };
      //   let config = {
      //     headers: { Authorization: `Bearer ${token}` },
      //   };

      axios.post(url, temp).then(
        (res) => {
          setvdashaArry(res.data.vdasha);
          setisloading(false);
          // notificationHandler({ type: "success", msg: res.data.message });
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          notificationHandler({ type: "danger", msg: error });
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const mahadashaid = (data) => {
    console.log(data.planet);
    const md = data.planet;
    setmd(data.planet);

    try {
      let url = getBaseUrl() + "user_api/sub_vdasha";
      setisloading(true);
      let temp = {
        id: userId,
        md: md,
      };
      //   let config = {
      //     headers: { Authorization: `Bearer ${token}` },
      //   };

      axios.post(url, temp).then(
        (res) => {
          console.log("sub_vdasha response:::::", res.data);
          setisloading(false);
          setsub_vdashaArry(res.data.vdasha);
          setGoSteps(1);
          // notificationHandler({ type: "success", msg: res.data.message });
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          notificationHandler({ type: "danger", msg: error });
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const pratyantardashaid = (data) => {
    console.log(data.planet);
    const ad = data.planet;
    setad(data.planet);
    try {
      let url = getBaseUrl() + "user_api/sub_sub_vdasha";
      setisloading(true);
      let temp = {
        id: userId,
        md: md,
        ad: ad,
      };
      //   let config = {
      //     headers: { Authorization: `Bearer ${token}` },
      //   };

      axios.post(url, temp).then(
        (res) => {
          // console.log("sub_sub_vdasha response:::::", res.data);
          setisloading(false);
          setsub_sub_vdashaArry(res.data.vdasha);
          setGoSteps(2);
          // notificationHandler({ type: "success", msg: res.data.message });
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          notificationHandler({ type: "danger", msg: error });
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const sookshmadashaid = (data) => {
    console.log(data);
    const pd = data.planet;

    try {
      let url = getBaseUrl() + "user_api/sub_sub_sub_vdasha";
      setisloading(true);
      let temp = {
        id: userId,
        md: md,
        ad: ad,
        pd: pd,
      };
      //   let config = {
      //     headers: { Authorization: `Bearer ${token}` },
      //   };

      axios.post(url, temp).then(
        (res) => {
          console.log("sub_sub_sub_vdasha response:::::", res.data);
          setisloading(false);
          setsub_sub_sub_vdashaArry(res.data.vdasha);
          setGoSteps(3);
          // notificationHandler({ type: "success", msg: res.data.message });
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          notificationHandler({ type: "danger", msg: error });
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };
  const basic_numerology = (data) => {
    try {
      let url = getBaseUrl() + "user_api/basic_numerology";
      setisloading(true);
      let temp = {
        year: "1998",
        month: "11",
        day: "22",
        name: "pk",
      };

      axios.post(url, temp).then(
        (res) => {
          console.log("basic_numerology:::::", res.data);
          setnumerology_data(res.data);
          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          notificationHandler({ type: "danger", msg: error });
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const advanced_panchang = (data) => {
    try {
      let url = getBaseUrl() + "user_api/advanced_panchang";
      setisloading(true);
      let temp = {
        year: "1998",
        month: "11",
        day: "22",
        hour: "11",
        min: "12",
        lat: "28.542294867618875",
        lon: "77.42449198114385",
        tzone: "5.5",
      };

      axios.post(url, temp).then(
        (res) => {
          console.log("advanced_panchang:::::", res.data);
          setadvanced_panchang_data(res.data);
          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          notificationHandler({ type: "danger", msg: error });
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };
  console.log(basicdetail.hour !== 0 ? basicdetail.hour : "12AM");
  return (
    <>
      <div className="homepage_padding">
        <div className="free_kundli_banner p-5">
          <div className="container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h2 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  Kundli Details
                </h2>
                <span className="header_banner pt-5">Get instant & accurate, Janam Kundli</span>
                {/* <div
                  className="home_banner_content mt-4"
                  style={{ color: "#FFF" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Ornare sed egestas iaculis rhoncus, velit.
                </div> */}
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <section className="mt-3 mb-3">
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "block",
              }}
              className="text-center"
              style={{ justifyContent: "center" }}
            >
              <Tabs
                orientation="horizontal"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
                style={{ justifyContent: "center" }}
                indicatorColor="secondary"
              >
                <Tab label="Basic" {...a11yProps(0)} />
                <Tab label="Kundli" {...a11yProps(1)} />
                {/* <Tab label="Numerology" {...a11yProps(2)} />
                <Tab label="Panchang" {...a11yProps(3)} /> */}
              </Tabs>
              <TabPanel value={value} index={0}>
                <section className="userdetail mt-4">
                  <div className="birthdetail">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <h5 className="birthdetail_heading">Birth Details</h5>
                        <table className="table table-striped">
                          <thead></thead>
                          <tbody>
                            <tr>
                              <th scope="row">Name</th>
                              <td>{basicdetail.Name}</td>
                            </tr>
                            <tr>
                              <th scope="row">Ayanamsha</th>
                              <td>{basicdetail.ayanamsha}</td>
                            </tr>
                            <tr>
                              <th scope="row">Day</th>
                              <td>{basicdetail.day}</td>
                            </tr>
                            <tr>
                              <th scope="row">Month</th>
                              <td>{basicdetail.month}</td>
                            </tr>
                            <tr>
                              <th scope="row">Year</th>
                              <td>{basicdetail.year}</td>
                            </tr>
                            <tr>
                              <th scope="row">Hour</th>
                              <td>{basicdetail.hour !== 0 ? basicdetail.hour : "12AM"}</td>
                            </tr>

                            <tr>
                              <th scope="row">Minute</th>
                              <td>{basicdetail.minute}</td>
                            </tr>

                            <tr>
                              <th scope="row">Seconds</th>
                              <td>{basicdetail.seconds}</td>
                            </tr>
                            <tr>
                              <th scope="row">Latitude</th>
                              <td>{basicdetail.latitude}</td>
                            </tr>
                            <tr>
                              <th scope="row">Longitude</th>
                              <td>{basicdetail.longitude}</td>
                            </tr>
                            <tr>
                              <th scope="row">Sunrise</th>
                              <td>{basicdetail.sunrise}</td>
                            </tr>
                            <tr>
                              <th scope="row">Sunset</th>
                              <td>{basicdetail.sunset}</td>
                            </tr>
                            <tr>
                              <th scope="row">Timezone</th>
                              <td>{basicdetail.timezone}</td>
                            </tr>
                          </tbody>
                        </table>

                        <section className="mt-3 pt-5">
                          <h5 className="birthdetail_heading">Basic Panchang Details</h5>
                          <table className="table table-striped">
                            <thead></thead>
                            <tbody>
                              <tr>
                                <th scope="row">Day</th>
                                <td>{basicpanchang.day}</td>
                              </tr>
                              <tr>
                                <th scope="row">Karan</th>
                                <td>{basicpanchang.karan}</td>
                              </tr>
                              <tr>
                                <th scope="row">Nakshatra</th>
                                <td>{basicpanchang.nakshatra}</td>
                              </tr>
                              <tr>
                                <th scope="row">Sunrise</th>
                                <td>{basicpanchang.sunrise}</td>
                              </tr>
                              <tr>
                                <th scope="row">Sunset</th>
                                <td>{basicpanchang.sunset}</td>
                              </tr>
                              <tr>
                                <th scope="row">Tithi</th>
                                <td>{basicpanchang.tithi}</td>
                              </tr>
                              <tr>
                                <th scope="row">Vedic Sunrise</th>
                                <td>{basicpanchang.vedic_sunrise}</td>
                              </tr>
                              <tr>
                                <th scope="row">Vedic Sunset</th>
                                <td>{basicpanchang.vedic_sunset}</td>
                              </tr>
                              <tr>
                                <th scope="row">Yog</th>
                                <td>{basicpanchang.yog}</td>
                              </tr>
                            </tbody>
                          </table>
                        </section>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <section className="">
                          <h5 className="birthdetail_heading">Avakhada Details</h5>
                          <table className="table table-striped">
                            <thead></thead>
                            <tbody>
                              <tr>
                                <th scope="row">Gan</th>
                                <td>{avakhada.Gan}</td>
                              </tr>
                              <tr>
                                <th scope="row">Karan</th>
                                <td>{avakhada.Karan}</td>
                              </tr>
                              <tr>
                                <th scope="row">Nadi</th>
                                <td>{avakhada.Nadi}</td>
                              </tr>
                              <tr>
                                <th scope="row">Naksahtra</th>
                                <td>{avakhada.Naksahtra}</td>
                              </tr>
                              <tr>
                                <th scope="row">NaksahtraLord</th>
                                <td>{avakhada.NaksahtraLord}</td>
                              </tr>
                              <tr>
                                <th scope="row">SignLord</th>
                                <td>{avakhada.SignLord}</td>
                              </tr>
                              <tr>
                                <th scope="row">Tithi</th>
                                <td>{avakhada.Tithi}</td>
                              </tr>
                              <tr>
                                <th scope="row">Varna</th>
                                <td>{avakhada.Varna}</td>
                              </tr>
                              <tr>
                                <th scope="row">Vashya</th>
                                <td>{avakhada.Vashya}</td>
                              </tr>
                              <tr>
                                <th scope="row">Yog</th>
                                <td>{avakhada.Yog}</td>
                              </tr>
                              <tr>
                                <th scope="row">Yoni</th>
                                <td>{avakhada.Yoni}</td>
                              </tr>
                              <tr>
                                <th scope="row">ascendant</th>
                                <td>{avakhada.ascendant}</td>
                              </tr>

                              <tr>
                                <th scope="row">Ascendant Lord</th>
                                <td>{avakhada.ascendant_lord}</td>
                              </tr>

                              <tr>
                                <th scope="row">Name Alphabet</th>
                                <td>{avakhada.name_alphabet}</td>
                              </tr>
                              <tr>
                                <th scope="row">Paya</th>
                                <td>{avakhada.paya}</td>
                              </tr>
                              <tr>
                                <th scope="row">Sign</th>
                                <td>{avakhada.sign}</td>
                              </tr>
                              <tr>
                                <th scope="row">Tatva</th>
                                <td>{avakhada.tatva}</td>
                              </tr>
                              <tr>
                                <th scope="row">Yunja</th>
                                <td>{avakhada.yunja}</td>
                              </tr>
                            </tbody>
                          </table>
                        </section>
                      </div>
                    </div>
                  </div>
                </section>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <section className="kundli">
                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">
                      <div>
                        <h6>Sun</h6>
                        <img style={{ backgroundColor: "#FF6F00" }} src={imagepath.sun} alt="" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                      <div>
                        <h6>Moon</h6>
                        <img style={{ backgroundColor: "#FF6F00" }} src={imagepath.moon} alt="" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                      <div>
                        <h6>Chalit</h6>
                        <img style={{ backgroundColor: "#FF6F00" }} src={imagepath.chalit} alt="" />
                      </div>
                    </div>
                  </div>
                  <section className="planets mt-4">
                    <h5 className="birthdetail_heading mt-3 mb-3">Planets</h5>
                    <div className="" style={{ overflowX: "auto" }}>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Full Degree</th>
                            <th scope="col">House</th>
                            {/* <th scope="col">isRetro</th>
                        <th scope="col">Planet Set</th> */}
                            <th scope="col">Nakshatra</th>
                            <th scope="col">Nakshatra Lord</th>
                            {/* <th scope="col">Nakshatra Pad</th> */}
                            <th scope="col">Norm Degree</th>
                            <th scope="col">Planet Awastha</th>
                            <th scope="col">Sign</th>
                            <th scope="col">SignLord</th>
                            <th scope="col">Speed</th>
                          </tr>
                        </thead>
                        <tbody>
                          {planets.map((data, index) => (
                            <tr>
                              <td>{data.name}</td>
                              <td>{data.fullDegree}</td>
                              <td>{data.house}</td>

                              <td>{data.nakshatra}</td>
                              <td>{data.nakshatraLord}</td>

                              <td>{data.normDegree}</td>
                              <td>{data.planet_awastha}</td>
                              <td>{data.sign}</td>
                              <td>{data.signLord}</td>
                              <td>{data.speed}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                  <section className="mt-4">
                    <div>
                      <h5 className="birthdetail_heading">Vimshottari Dasha</h5>
                    </div>
                    <div>
                      <div className="striper_div">
                        <Stepper
                          style={{
                            width: "80%",
                            margin: "auto",
                            overflowX: "auto",
                          }}
                          activeStep={goSteps}
                          alternativeLabel
                          styleConfig={{
                            activeBgColor: "#FF6F00",
                            activeTextColor: "#FFFFFF",
                            inactiveBgColor: "#FFFFFF",
                            inactiveTextColor: "#000",
                            completedBgColor: "#FF6F00",
                            completedTextColor: "#FFF",
                            size: "2.5em",
                          }}
                        >
                          <Step onClick={() => setGoSteps(0)} label="Mahadasha" />
                          <Step onClick={() => setGoSteps(1)} label="Antardasha" />
                          <Step onClick={() => setGoSteps(2)} label="Pratyantardasha" />
                          <Step onClick={() => setGoSteps(3)} label="Sookshmadasha" />
                        </Stepper>
                        {goSteps === 0 && (
                          <div>
                            <section className="planets mt-4" style={{ overflowX: "auto" }}>
                              <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">Planet</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {vdashaArry.map((data, index) => (
                                    <tr>
                                      <td>{data.planet}</td>
                                      <td>{data.start}</td>
                                      <td>{data.end}</td>
                                      <td>
                                        <i
                                          className="fa fa-chevron-circle-right"
                                          aria-hidden="true"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => mahadashaid(data)}
                                        ></i>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </section>
                          </div>
                        )}
                        {goSteps === 1 && (
                          <div>
                            <section className="planets mt-4" style={{ overflowX: "auto" }}>
                              <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">Planet</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {sub_vdashaArry.map((data, index) => (
                                    <tr>
                                      <td>{data.planet}</td>
                                      <td>{data.start}</td>
                                      <td>{data.end}</td>
                                      <td>
                                        <i
                                          className="fa fa-chevron-circle-right"
                                          aria-hidden="true"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => pratyantardashaid(data)}
                                        ></i>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </section>
                          </div>
                        )}
                        {goSteps === 2 && (
                          <div>
                            <section className="planets mt-4" style={{ overflowX: "auto" }}>
                              <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">Planet</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {sub_sub_vdashaArry.map((data, index) => (
                                    <tr>
                                      <td>{data.planet}</td>
                                      <td>{data.start}</td>
                                      <td>{data.end}</td>
                                      <td>
                                        <i
                                          className="fa fa-chevron-circle-right"
                                          aria-hidden="true"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => sookshmadashaid(data)}
                                        ></i>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </section>
                          </div>
                        )}
                        {goSteps === 3 && (
                          <div>
                            <div>
                              <section className="planets mt-4" style={{ overflowX: "auto" }}>
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th scope="col">Planet</th>
                                      <th scope="col">Start Date</th>
                                      <th scope="col">End Date</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {sub_sub_sub_vdashaArry.map((data, index) => (
                                      <tr>
                                        <td>{data.planet}</td>
                                        <td>{data.start}</td>
                                        <td>{data.end}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </section>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                </section>
              </TabPanel>
              {/* <TabPanel value={value} index={2}>
                <div className="numerology_detail">
                  <h3>{numerology_data?.numero_report?.title}</h3>
                  <p>{numerology_data?.numero_report?.description}</p>
                </div>
                <div className="numerology_detail">
                  <h3>{numerology_data?.numero_fav_time?.title}</h3>
                  <p>{numerology_data?.numero_fav_time?.description}</p>
                </div>
                <div className="numerology_detail">
                  <h3>{numerology_data?.numero_place_vastu?.title}</h3>
                  <p>{numerology_data?.numero_place_vastu?.description}</p>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <section className="">
                      <h5 className="birthdetail_heading">Numero Details</h5>
                      <table className="table table-striped">
                        <thead></thead>
                        <tbody>
                          <tr>
                            <th scope="row">Name</th>
                            <td>{numerology_data?.numero_table?.name}</td>
                          </tr>
                          <tr>
                            <th scope="row">Data</th>
                            <td>{numerology_data?.numero_table?.date}</td>
                          </tr>
                          <tr>
                            <th scope="row">Destiny number</th>
                            <td>
                              {numerology_data?.numero_table?.destiny_number}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Radical number</th>
                            <td>
                              {numerology_data?.numero_table?.radical_number}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Name number</th>
                            <td>
                              {numerology_data?.numero_table?.name_number}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Evil num</th>
                            <td>{numerology_data?.numero_table?.evil_num}</td>
                          </tr>
                          <tr>
                            <th scope="row">Fav color</th>
                            <td>{numerology_data?.numero_table?.fav_color}</td>
                          </tr>
                          <tr>
                            <th scope="row">Fav day</th>
                            <td>{numerology_data?.numero_table?.fav_day}</td>
                          </tr>
                          <tr>
                            <th scope="row">Fav God</th>
                            <td>{numerology_data?.numero_table?.fav_god}</td>
                          </tr>
                          <tr>
                            <th scope="row">Fav mantra</th>
                            <td>{numerology_data?.numero_table?.fav_mantra}</td>
                          </tr>

                          <tr>
                            <th scope="row">Fav metal</th>
                            <td>{numerology_data?.numero_table?.fav_metal}</td>
                          </tr>
                          <tr>
                            <th scope="row">Fav stone</th>
                            <td>{numerology_data?.numero_table?.fav_stone}</td>
                          </tr>
                          <tr>
                            <th scope="row">Fav substone</th>
                            <td>
                              {numerology_data?.numero_table?.fav_substone}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Friendly num</th>
                            <td>
                              {numerology_data?.numero_table?.friendly_num}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Neutral num</th>
                            <td>
                              {numerology_data?.numero_table?.neutral_num}
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">Radical num</th>
                            <td>
                              {numerology_data?.numero_table?.radical_num}
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">Radical Ruler</th>
                            <td>
                              {numerology_data?.numero_table?.radical_ruler}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                  </div>
                </div>
              </TabPanel> */}

              {/* <TabPanel value={value} index={3}>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <section className="">
                      <table className="table table-striped">
                        <thead></thead>
                        <tbody>
                          <tr>
                            <th scope="row">Tithi</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang?.tithi
                                  ?.details?.tithi_name
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Nakshatra</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.nakshatra?.details?.nak_name
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Yog</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang?.yog
                                  ?.details?.yog_name
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">karan</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang?.karan
                                  ?.details?.karan_name
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Sun Rise</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.sunrise
                              }{" "}
                              AM
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Sun Set</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.sunset
                              }
                              PM
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">Moon Rise</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.moonrise
                              }
                              PM
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Moon Set</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.moonset
                              }
                              AM
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Sun sign</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.sun_sign
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Moon sign</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.moon_sign
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <section className="">
                      <h2 className="mt-3 mb-4" style={{ textAlign: "center" }}>
                        Inauspicious Timings (Ashubha Muhurat)
                      </h2>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Timings </th>
                            <th scope="col">Start </th>
                            <th scope="col">End </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Rahu Kaal</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.rahukaal?.start
                              }{" "}
                              {advanced_panchang_data?.advanced_panchang?.rahukaal?.start?.slice(
                                0,
                                2
                              ) >= 12
                                ? "PM"
                                : "AM"}
                            </td>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.rahukaal?.end
                              }{" "}
                              {advanced_panchang_data?.advanced_panchang?.rahukaal?.end.slice(
                                0,
                                2
                              ) >= 12
                                ? "PM"
                                : "AM"}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Yamghant Kaal</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.yamghant_kaal?.start
                              }{" "}
                              {advanced_panchang_data?.advanced_panchang?.yamghant_kaal?.start.slice(
                                0,
                                2
                              ) >= 12
                                ? "PM"
                                : "AM"}
                            </td>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.yamghant_kaal?.end
                              }{" "}
                              {advanced_panchang_data?.advanced_panchang?.yamghant_kaal?.end.slice(
                                0,
                                2
                              ) >= 12
                                ? "PM"
                                : "AM"}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Gulika Kaal</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.guliKaal?.start
                              }{" "}
                              {advanced_panchang_data?.advanced_panchang?.guliKaal?.start.slice(
                                0,
                                2
                              ) >= 12
                                ? "PM"
                                : "AM"}
                            </td>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.guliKaal?.end
                              }{" "}
                              {advanced_panchang_data?.advanced_panchang?.guliKaal?.end.slice(
                                0,
                                2
                              ) >= 12
                                ? "PM"
                                : "AM"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <section className="">
                      <h2 className="mt-3 mb-4" style={{ textAlign: "center" }}>
                        Auspicious Timings (Shubha Muhurat)
                      </h2>

                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Timings </th>
                            <th scope="col">Start </th>
                            <th scope="col">End </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Abhijit</th>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.abhijit_muhurta?.start
                              }{" "}
                              {advanced_panchang_data?.advanced_panchang?.abhijit_muhurta?.start.slice(
                                0,
                                2
                              ) >= 12
                                ? "PM"
                                : "AM"}
                            </td>
                            <td>
                              {
                                advanced_panchang_data?.advanced_panchang
                                  ?.abhijit_muhurta?.end
                              }{" "}
                              {advanced_panchang_data?.advanced_panchang?.abhijit_muhurta?.end.slice(
                                0,
                                2
                              ) >= 12
                                ? "PM"
                                : "AM"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                  </div>
                </div>
              </TabPanel> */}
            </Box>
          </section>
        </div>
      </div>
    </>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default HOC(Freekundlidetail);

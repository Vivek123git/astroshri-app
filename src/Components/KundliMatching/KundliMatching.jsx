import "./KundliMatching.css";
import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import a from "../../images/sign.png";
import "../FreeKundli/FreeKundli.css";
import { Card, Grid } from "@material-ui/core";
import Crousal from "../Crousal/Crousal";
import { notificationHandler } from "../utils/Notification";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import bride from "../../images/bride.png";
import groom from "../../images/groom.png";
import homeapi from "../api/homeapi";
import { blankValidator } from "../utils/Validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { get_latLong, get_palces } from "../api/location";
import SEO from "../Seo/seo";
import { IoLocationSharp } from "react-icons/io5";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
import { getBaseUrl } from "../utils";

const KundliMatching = () => {
  const [AstrologerList, setAstrologerList] = useState("");
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const [kundlidetail, setkundlidetail] = useState({
    m_name: "",
    f_name: "",
    m_gender: "Male",
    f_gender: "Female",
    m_day: "",
    m_second: "",
    m_birthplace: "",
    m_month: "",
    m_year: "",
    m_hour: "",
    m_min: "",
    m_lat: "25.967992351671246",
    m_lon: "83.87115904429926",
    m_tzone: "5.5",
    f_day: "",
    f_month: "",
    f_year: "",
    f_second: "",
    f_hour: "",
    f_birthpalace: "",
    f_min: "",
    f_lat: "27.492415901010713",
    f_lon: "77.67145907906152",
    f_tzone: "5.5",
  });

  const [error, setError] = useState({
    m_name: {
      status: false,
    },
    f_name: {
      status: false,
    },
    m_gender: {
      status: false,
    },
    f_gender: {
      status: false,
    },
    m_day: {
      status: false,
    },
    m_second: {
      status: false,
    },
    m_birthplace: {
      status: false,
    },
    m_month: {
      status: false,
    },
    m_year: {
      status: false,
    },
    m_hour: {
      status: false,
    },
    m_min: {
      status: false,
    },

    f_day: {
      status: false,
    },
    f_month: {
      status: false,
    },
    f_year: {
      status: false,
    },
    f_second: {
      status: false,
    },
    f_hour: {
      status: false,
    },
    f_birthpalace: {
      status: false,
    },
    f_min: {
      status: false,
    },
  });

  const onchange = (e) => {
    Object.values(error).map((item) => (item.status = false));
    setkundlidetail({ ...kundlidetail, [e.target.name]: e.target.value });
  };
  // console.log(kundlidetail);

  const kundlimatching = () => {
    if (!blankValidator(kundlidetail.m_name)) {
      return setError({
        ...error,
        m_name: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.m_gender)) {
      return setError({
        ...error,
        m_gender: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.m_day)) {
      return setError({
        ...error,
        m_day: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.m_month)) {
      return setError({
        ...error,
        m_month: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.m_year)) {
      return setError({
        ...error,
        m_year: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.m_hour)) {
      return setError({
        ...error,
        m_hour: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.m_min)) {
      return setError({
        ...error,
        m_min: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.m_birthplace)) {
      return setError({
        ...error,
        m_birthplace: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.f_name)) {
      return setError({
        ...error,
        f_name: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.f_gender)) {
      return setError({
        ...error,
        f_gender: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.f_day)) {
      return setError({
        ...error,
        f_day: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.f_month)) {
      return setError({
        ...error,
        f_month: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.f_year)) {
      return setError({
        ...error,
        f_year: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.f_hour)) {
      return setError({
        ...error,
        f_hour: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.f_min)) {
      return setError({
        ...error,
        f_min: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.f_birthpalace)) {
      return setError({
        ...error,
        f_birthpalace: {
          status: true,
        },
      });
    }
    match_details();
  };

  const match_details = () => {
    try {
      let url = getBaseUrl() + "user_api/match_details";
      setisloading(true);
      let temp = {
        // name: kundlidetail.name,
        m_day: parseInt(kundlidetail.m_day),
        m_month: parseInt(kundlidetail.m_month),
        m_year: parseInt(kundlidetail.m_year),
        m_hour: parseInt(kundlidetail.m_hour) != 0 ? parseInt(kundlidetail.m_hour) : "0",
        m_min: parseInt(kundlidetail.m_min) != 0 ? parseInt(kundlidetail.m_min) : "0",
        m_lat: kundlidetail.m_lat,
        m_lon: kundlidetail.m_lon,
        m_tzone: "5.5",
        f_day: parseInt(kundlidetail.f_day),
        f_month: parseInt(kundlidetail.f_month),
        f_year: parseInt(kundlidetail.f_year),
        f_hour: parseInt(kundlidetail.f_hour) != 0 ? parseInt(kundlidetail.f_hour) : "0",
        f_min: parseInt(kundlidetail.f_min) != 0 ? parseInt(kundlidetail.f_min) : "0",
        f_lat: kundlidetail.f_lat,
        f_lon: kundlidetail.f_lon,
        f_tzone: "5.5",
      };

      axios.post(url, temp).then(
        (res) => {
          if (res.status !== 200) {
            return notificationHandler({
              type: "danger",
              msg: "Something went wrong",
            });
          }

          navigate("/match-making-details", {
            state: {
              data: res.data,
              m_name: kundlidetail.m_name,
              f_name: kundlidetail.f_name,
            },
          });
          setisloading(false);
        },
        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          notificationHandler({ type: "danger", msg: error.message });
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error.message });
      return setisloading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 1000);

    LiveAstroData();
  }, []);

  const LiveAstroData = async () => {
    setisloading(true);
    try {
      const res = await homeapi();
      if (res.data.status) {
        setAstrologerList(res?.data?.astrologer);
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

  const yeardata = [];
  let date = new Date().getFullYear();
  for (let year = 1928; year <= date; year++) {
    yeardata.push(year);
  }

  const alldays = [];
  for (let day = 1; day <= 31; day++) {
    alldays.push(day);
  }

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const allhours = [];
  for (let hour = 0; hour <= 23; hour++) {
    allhours.push(hour);
  }

  const allminutes = [];
  for (let min = 0; min <= 59; min++) {
    allminutes.push(min);
  }

  // Manish's changes
  const [places, setplaces] = useState([]);
  const [fplaces, setfplaces] = useState([]);

  const getPlacesAPIFunc = async (e, type) => {
    // console.log(type);

    Object.values(error).map((item) => (item.status = false));
    setkundlidetail({ ...kundlidetail, [e.target.name]: e.target.value });
    try {
      // setTimeout(async () => {
      if (type === "male") {
        setplaces([]);
        let res = await get_palces(e.target.value);
        // console.log(res.data)
        if (res.data.status === "OK") {
          res.data.predictions.map((item) => {
            setplaces((places) => [...places, item.description]);
          });
        }
      } else {
        setfplaces([]);
        let res = await get_palces(e.target.value);
        // console.log(res.data)
        if (res.data.status === "OK") {
          res.data.predictions.map((item) => {
            setfplaces((fplaces) => [...fplaces, item.description]);
          });
        }
      }
      // }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const selectedPlace = async (value, type) => {
    // console.log(type);

    try {
      if (type === "male") {
        setkundlidetail({ ...kundlidetail, m_birthplace: value });
        setplaces([]);
        let res = await get_latLong(value);
        if (res.status == 200) {
          let { lat, lng } = res.data;
          setkundlidetail({
            ...kundlidetail,
            m_birthplace: value,
            m_lat: lat,
            m_lon: lng,
          });
        }
      } else {
        setkundlidetail({ ...kundlidetail, f_birthpalace: value });
        setfplaces([]);
        let res = await get_latLong(value);
        if (res.status == 200) {
          let { lat, lng } = res.data;
          setkundlidetail({
            ...kundlidetail,
            f_birthpalace: value,
            f_lat: lat,
            f_lon: lng,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SEO
        title="Kundli Matching - Free Online Astrology Predictions by Best Astrologer"
        description="Rakshaa is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me"
        url="https://Rakshaa.com/static/media/Rakshaalogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding">
        {/* <div className="free_kundli_banner p-5">
          <div className="container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h1 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  Kundli Matching
                </h1>
                <span className="header_banner pt-5">Get instant & accurate, Janam Kundli</span>
               
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} />
              </div>
            </div>
          </div>
        </div> */}
        <section className="container content_section  mb-4">
          <BreadcrumbSection tittle="Kundli Matching" />
          <div className="get_detail">
            <div>
              <h3 className="mt-5 mb-3">Kundli Matching Online - Understanding the Different Components of Kundli Matching</h3>
            </div>
            <div>
              <p className="">
                Kundli matching is an ancient practice in Hindu culture that helps to determine the compatibility between two individuals for marriage. It
                involves analyzing the birth charts of both partners and looking at various aspects such as nadi dosh, mangal dosha, gana milap score, and
                bhakoot dosha. Each of these components has a different significance when it comes to understanding the relationship between two people. In this
                article, we will discuss each of these components in detail and how they can help us understand the compatibility between two partners.
              </p>
            </div>
          </div>
        </section>
        <section className="new_kundli_section mt-4 mb-4">
          <div className="mt-5 mb-2">
            <div className="container">
              {/* <h3 className="text-center pb-5 " style={{ color: "#FFF" }}>
                Get Your Kundli Matching
              </h3> */}
              <Card className="Card_shadow m-2 p-3">
                <div className="row row_container">
                  <div className="col-6">
                    <div className="">
                      <div className="name_heading">
                        <img src={groom} alt="groom" style={{ borderRadius: "1rem" }} />
                        <h3 className="match_details">
                          Enter <span style={{ color: "#3661bb" }}>Boy's</span> Details
                        </h3>
                      </div>

                      <Grid className="Component_main_grid">
                        <Grid item md={12} xs={12} sm={12}>
                          <div className="p-2">
                            <label className="requiredLabel" for="exampleInputEmail1">
                              Name
                            </label>
                            <input type="text" className="form-control" name="m_name" placeholder="Name" onChange={(e) => onchange(e)} />
                            {error.m_name.status && <p style={{ width: "72%", color: "red" }}>Enter name</p>}
                          </div>
                        </Grid>
                        <Grid item md={12} xs={12} sm={12}>
                          <div className="p-2">
                            <label className="requiredLabel" for="exampleInputEmail1">
                              Gender
                            </label>
                            <select className="form-control" name="m_gender" value={kundlidetail.m_gender || "Male"} onChange={(e) => onchange(e)}>
                              <option selected>Male</option>
                              <option>Female</option>
                            </select>
                            {error.m_gender.status && <p style={{ width: "72%", color: "red" }}>select Gender</p>}
                          </div>
                        </Grid>
                        <Grid item md={12} xs={12} sm={12}>
                          <Grid className="Component_main_grid">
                            <Grid md={4} xs={12} sm={12}>
                              <div className="p-2">
                                <label className="requiredLabel" for="exampleInputEmail1">
                                  Birth Day
                                </label>
                                <select className="form-control" name="m_day" value={kundlidetail.m_day} onChange={(e) => onchange(e)}>
                                  <option value="">Day</option>
                                  {alldays.map((row, index) => (
                                    <option key={index} value={row}>
                                      {row}
                                    </option>
                                  ))}
                                </select>
                                {error.m_day.status && <p style={{ width: "72%", color: "red" }}>select Day</p>}
                              </div>
                            </Grid>
                            <Grid md={4} xs={12} sm={12}>
                              <div className="p-2">
                                <label className="requiredLabel" for="exampleInputEmail1">
                                  Birth Month
                                </label>
                                <select className="form-control" name="m_month" value={kundlidetail.m_month} onChange={(e) => onchange(e)}>
                                  <option value="">Select Month</option>
                                  {months.map((row, index) => (
                                    <option value={index + 1} key={index}>
                                      {row}
                                    </option>
                                  ))}
                                </select>
                                {error.m_month.status && <p style={{ width: "72%", color: "red" }}>select month</p>}
                              </div>
                            </Grid>
                            <Grid md={4} xs={12} sm={12}>
                              <div className="p-2">
                                <label className="requiredLabel">Birth Year</label>
                                <select className="form-control" name="m_year" value={kundlidetail.m_year} onChange={(e) => onchange(e)}>
                                  <option value="">Year</option>
                                  {yeardata.map((row, index) => (
                                    <option key={index} value={row}>
                                      {row}
                                    </option>
                                  ))}
                                </select>
                                {error.m_year.status && <p style={{ width: "72%", color: "red" }}>select year</p>}
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid className="Component_main_grid mt-2">
                        <Grid item md={12} xs={12} sm={12}>
                          <Grid className="Component_main_grid">
                            <Grid md={4} xs={12} sm={12}>
                              <div className="p-2">
                                <label className="requiredLabel" for="exampleInputEmail1">
                                  Birth Hour
                                </label>
                                <select className="form-control" name="m_hour" value={kundlidetail.m_hour} onChange={(e) => onchange(e)}>
                                  <option value="">Hour</option>
                                  {allhours.map((row, index) => (
                                    <option key={index} value={row}>
                                      {row}
                                    </option>
                                  ))}
                                </select>
                                {error.m_hour.status && <p style={{ width: "72%", color: "red" }}>select hour</p>}
                              </div>
                            </Grid>
                            <Grid md={4} xs={12} sm={12}>
                              <div className="p-2">
                                <label className="requiredLabel" for="exampleInputEmail1">
                                  Birth Minute
                                </label>
                                <select className="form-control" name="m_min" value={kundlidetail.m_min} onChange={(e) => onchange(e)}>
                                  <option value="">Minute</option>
                                  {allminutes.map((row, index) => (
                                    <option key={index} value={row}>
                                      {row}
                                    </option>
                                  ))}
                                </select>
                                {error.m_min.status && <p style={{ width: "72%", color: "red" }}>select Minute</p>}
                              </div>
                            </Grid>
                            <Grid md={4} xs={12} sm={12}>
                              <div className="p-2">
                                <label>Birth Second</label>
                                <select className="form-control" name="m_second" value={kundlidetail.m_second} onChange={(e) => onchange(e)}>
                                  <option value="">Second</option>
                                  {allminutes.map((row, index) => (
                                    <option key={index} value={row}>
                                      {row}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={12} xs={12} sm={12}>
                          <div className="p-2">
                            <label className="requiredLabel">Birth Place</label>
                            <div className="input_for_cross">
                              <input
                                type="text"
                                className="form-control getplace_input"
                                placeholder="Enter your birth place"
                                name="m_birthplace"
                                value={kundlidetail.m_birthplace}
                                // onChange={(e) => onchange(e)}
                                onChange={(e) => getPlacesAPIFunc(e, "male")}
                              />
                              <span
                                onClick={() =>
                                  setkundlidetail({
                                    ...kundlidetail,
                                    m_birthplace: "",
                                  })
                                }
                                className="cross"
                              >
                                &times;
                              </span>
                            </div>
                            {places.length !== 0 && (
                              <div className="getplace_input_container">
                                {places?.map((place) => (
                                  <div onClick={() => selectedPlace(place, "male")} className="getplace_input_div">
                                    <IoLocationSharp />
                                    {place}
                                  </div>
                                ))}
                              </div>
                            )}
                            {error.m_birthplace.status && <p style={{ width: "72%", color: "red" }}>Enter Birth Place</p>}
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="">
                      <div className="name_heading">
                        <img src={bride} alt="groom" />
                        <h3 className="match_details">
                          Enter <span style={{ color: "#3661bb" }}>Girl's</span> Details
                        </h3>
                      </div>

                      <Grid className="Component_main_grid">
                        <Grid item md={12} xs={12} sm={12}>
                          <div className="p-2">
                            <label className="requiredLabel" for="exampleInputEmail1">
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              name="f_name"
                              value={kundlidetail.f_name}
                              onChange={(e) => onchange(e)}
                            />
                            {error.f_name.status && <p style={{ width: "72%", color: "red" }}>Enter name</p>}
                          </div>
                        </Grid>
                        <Grid item md={12} xs={12} sm={12}>
                          <div className="p-2">
                            <label className="requiredLabel" for="exampleInputEmail1">
                              Gender
                            </label>
                            <select className="form-control" name="f_gender" value={kundlidetail.f_gender} onChange={(e) => onchange(e)}>
                              <option selected>Male</option>
                              <option>Female</option>
                            </select>
                            {error.f_gender.status && <p style={{ width: "72%", color: "red" }}>Select your gender</p>}
                          </div>
                        </Grid>
                        <Grid item md={12} xs={12} sm={12}>
                          <Grid className="Component_main_grid">
                            <Grid md={4} xs={12} sm={12}>
                              <div className="p-2">
                                <label className="requiredLabel" for="exampleInputEmail1">
                                  Birth Day
                                </label>
                                <select className="form-control" name="f_day" value={kundlidetail.f_day} onChange={(e) => onchange(e)}>
                                  <option value="">Day</option>
                                  {alldays.map((row, index) => (
                                    <option key={index} value={row}>
                                      {row}
                                    </option>
                                  ))}
                                </select>
                                {error.f_day.status && <p style={{ width: "72%", color: "red" }}>Select day</p>}
                              </div>
                            </Grid>
                            <Grid md={4} xs={12} sm={12}>
                              <div className="p-2">
                                <label className="requiredLabel" for="exampleInputEmail1">
                                  Birth Month
                                </label>
                                <select className="form-control" name="f_month" value={kundlidetail.f_month} onChange={(e) => onchange(e)}>
                                  <option value="">Select Month</option>
                                  {months.map((row, index) => (
                                    <option value={index + 1} key={index}>
                                      {row}
                                    </option>
                                  ))}
                                </select>
                                {error.f_month.status && <p style={{ width: "72%", color: "red" }}>Select month</p>}
                              </div>
                            </Grid>
                            <Grid md={4} xs={12} sm={12}>
                              <div className="p-2">
                                <label className="requiredLabel">Birth Year</label>
                                <select className="form-control" name="f_year" value={kundlidetail.f_year} onChange={(e) => onchange(e)}>
                                  <option value="">Year</option>
                                  {yeardata.map((row, index) => (
                                    <option key={index}>{row}</option>
                                  ))}
                                </select>
                                {error.f_year.status && <p style={{ width: "72%", color: "red" }}>Select year</p>}
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid className="Component_main_grid mt-2">
                        <Grid item md={12} xs={12} sm={12}>
                          <Grid className="Component_main_grid">
                            <Grid md={4} xs={12} sm={12}>
                              <div className="p-2">
                                <label className="requiredLabel" for="exampleInputEmail1">
                                  Birth Hour
                                </label>
                                <select className="form-control" name="f_hour" value={kundlidetail.f_hour} onChange={(e) => onchange(e)}>
                                  <option value="">Hour</option>
                                  {allhours.map((row, index) => (
                                    <option key={index} value={row}>
                                      {row}
                                    </option>
                                  ))}
                                </select>
                                {error.f_hour.status && <p style={{ width: "72%", color: "red" }}>Select hour</p>}
                              </div>
                            </Grid>
                            <Grid md={4} xs={12} sm={12}>
                              <div className="p-2">
                                <label className="requiredLabel" for="exampleInputEmail1">
                                  Birth Minute
                                </label>
                                <select className="form-control" name="f_min" value={kundlidetail.f_min} onChange={(e) => onchange(e)}>
                                  <option value="">Minute</option>
                                  {allminutes.map((row, index) => (
                                    <option key={index} value={row}>
                                      {row}
                                    </option>
                                  ))}
                                </select>
                                {error.f_min.status && <p style={{ width: "72%", color: "red" }}>Select minute</p>}
                              </div>
                            </Grid>
                            <Grid md={4} xs={12} sm={12}>
                              <div className="p-2">
                                <label>Birth Second</label>
                                <select className="form-control" name="f_second" value={kundlidetail.f_second} onChange={(e) => onchange(e)}>
                                  <option value="">Second</option>
                                  {allminutes.map((row, index) => (
                                    <option key={index} value={row}>
                                      {row}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={12} xs={12} sm={12}>
                          <div className="p-2">
                            <label className="requiredLabel">Birth Place</label>
                            <div className="input_for_cross">
                              <input
                                type="text"
                                className="form-control getplace_input"
                                placeholder="Enter your birth place"
                                name="f_birthpalace"
                                value={kundlidetail.f_birthpalace}
                                onChange={(e) => getPlacesAPIFunc(e, "female")}
                              />
                              <span
                                onClick={() =>
                                  setkundlidetail({
                                    ...kundlidetail,
                                    f_birthpalace: "",
                                  })
                                }
                                className="cross"
                              >
                                &times;
                              </span>
                            </div>
                            {fplaces.length !== 0 && (
                              <div className="getplace_input_container">
                                {fplaces?.map((place) => (
                                  <div onClick={() => selectedPlace(place, "female")} className="getplace_input_div">
                                    <IoLocationSharp /> {place}
                                  </div>
                                ))}
                              </div>
                            )}
                            {error.f_birthpalace.status && <p style={{ width: "72%", color: "red" }}>Enter Birth Place</p>}
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <div className="match_btn mt-3" onClick={kundlimatching}>
                    Match Your Kundli
                  </div>
                </div>
              </Card>
            </div>

            <div></div>
          </div>
        </section>
        <section className="container">
          <Crousal />
        </section>
        <section className="container ourastrologer mt-1 mb-4">
          <OurAstrologerCrousal astro={AstrologerList} />
        </section>
      </div>
    </>
  );
};

export default HOC(KundliMatching);

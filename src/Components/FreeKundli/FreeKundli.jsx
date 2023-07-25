import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import a from "../../images/sign.png";
import "./FreeKundli.css";
import { Grid, Card } from "@material-ui/core";
import Crousal from "../Crousal/Crousal";
import { notificationHandler } from "../utils/Notification";
import { blankValidator } from "../utils/Validation";
import { getBaseUrl } from "../utils";
import axios from "axios";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import { useNavigate } from "react-router-dom";
import SEO from "../Seo/seo";
import homeapi from "../api/homeapi";
import { get_latLong, get_palces } from "../api/location";

import { IoLocationSharp } from "react-icons/io5";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";

const FreeKundli = () => {
  const [AstrologerList, setAstrologerList] = useState("");
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [kundlidetail, setkundlidetail] = useState({
    name: "",
    gender: "Male",
    day: "",
    month: "",
    year: "",
    birthhour: "",
    birthmin: "",
    birthsec: "",
    birthplace: "",
    lat: "28.542294867618875",
    lon: "77.42449198114385",
  });

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
        console.log("data response error:::", error.response);
      } else {
        notificationHandler({ type: "danger", msg: error });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const [error, setError] = useState({
    name: {
      status: false,
    },
    gender: {
      status: false,
    },
    day: {
      status: false,
    },
    month: {
      status: false,
    },
    year: {
      status: false,
    },
    birthhour: {
      status: false,
    },
    birthmin: {
      status: false,
    },
    birthsec: {
      status: false,
    },
    birthplace: {
      status: false,
    },
  });

  const yeardata = [];
  let date = new Date().getFullYear();
  for (let year = 1928; year <= date; year++) {
    yeardata.push(year);
  }

  const alldays = [];
  for (let day = 1; day <= 31; day++) {
    alldays.push(day);
  }

  const allhours = [];
  for (let hour = 0; hour <= 23; hour++) {
    allhours.push(hour);
  }

  const allminutes = [];
  for (let min = 0; min <= 59; min++) {
    allminutes.push(min);
  }

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  console.log(months);

  const onchange = (e) => {
    setError({
      name: {
        status: false,
      },
      gender: {
        status: false,
      },
      day: {
        status: false,
      },
      month: {
        status: false,
      },
      year: {
        status: false,
      },
      birthhour: {
        status: false,
      },
      birthmin: {
        status: false,
      },
      birthsec: {
        status: false,
      },
      birthplace: {
        status: false,
      },
    });
    setkundlidetail({ ...kundlidetail, [e.target.name]: e.target.value });
  };

  const generatekundli = () => {
    if (!blankValidator(kundlidetail.name)) {
      return setError({
        ...error,
        name: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.day)) {
      return setError({
        ...error,
        day: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.month)) {
      return setError({
        ...error,
        month: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.year)) {
      return setError({
        ...error,
        year: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.birthhour)) {
      return setError({
        ...error,
        birthhour: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.birthmin)) {
      return setError({
        ...error,
        birthmin: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.birthplace)) {
      return setError({
        ...error,
        birthplace: {
          status: true,
        },
      });
    }
    try {
      let url = getBaseUrl() + "user_api/kunddli";
      setisloading(true);
      let temp = {
        name: kundlidetail.name,
        year: parseInt(kundlidetail.year),
        month: parseInt(kundlidetail.month),
        day: parseInt(kundlidetail.day),
        hour: parseInt(kundlidetail.birthhour) != 0 ? parseInt(kundlidetail.birthhour) : "0",
        min: parseInt(kundlidetail.birthmin) != 0 ? parseInt(kundlidetail.birthmin) : "0",
        lat: kundlidetail.lat,
        lon: kundlidetail.lon,
        tzone: "5.5",
        planetColor: "black",
        signColor: "black",
        ineColor: "black",
        chartType: "black",
      };

      axios.post(url, temp).then(
        (res) => {
          console.log(res);
          if (res.status !== 200) {
            return notificationHandler({
              type: "danger",
              msg: "Something went wrong",
            });
          }
          navigate("/kundlidetail", {
            state: {
              data: res.data,
            },
          });
          setisloading(false);
          // notificationHandler({ type: "success", msg: res.data.message });
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

  // Manish's changes
  const [places, setplaces] = useState([]);

  const getPlacesAPIFunc = async (e, type) => {
    // console.log(type);

    Object.values(error).map((item) => (item.status = false));
    setkundlidetail({ ...kundlidetail, [e.target.name]: e.target.value });
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
      setkundlidetail({ ...kundlidetail, m_birthplace: value });
      setplaces([]);
      let res = await get_latLong(value);
      if (res.status == 200) {
        let { lat, lng } = res.data;
        setkundlidetail({
          ...kundlidetail,
          birthplace: value,
          lat: lat,
          lon: lng,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(kundlidetail);
  return (
    <>
      <SEO
        title="Free Kundli - Free Online Astrology Predictions by Best Astrologer"
        description="Rakshaa is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me,Free Kundli"
        url="https://Rakshaa.com/static/media/Rakshaalogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding">
        {/* <div className="free_kundli_banner p-5">
          <div className="container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h1 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  Free Kundli
                </h1>
                <span className="header_banner pt-5">Get instant & accurate, Janam Kundli</span>
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} />
              </div>
            </div>
          </div>
        </div> */}
        <section className="container content_section mb-4">
          <BreadcrumbSection tittle="Free Kundli" />
          <div className="get_detail">
            <div>
              <h3 className="mt-5 mb-3">Free Kundli Online - Get Your Detailed Birth Chart with Predictions</h3>
            </div>
            <div>
              {/* <p>
                Kundli is a chart prepared in astrology depending on the precise date, place, and time of birth of an individual. It figures out the placement
                of all the planets and signs, along with the Sun and Moon at the time of your birth. Twelve houses of Kundli show ascendant and planet position
                in various zodiac signs at the time of birth as seen from the place of birth.
              </p> */}
              <p>
                The Kundli chart is a detailed representation of the position of planets at the time of your birth. It is used to interpret the various aspects
                of your life, such as career, relationships, health, and finances. With a free Kundli online service you can get your detailed birth chart with
                predictions about your life path and future.
              </p>
              <p>
                The Kundli chart is divided into 12 houses which represent different aspects of life such as love, career, marriage etc. Each house has its own
                set of astrological symbols which signify different things. By understanding these symbols and their meanings you can gain insight into how
                these forces will affect your life path in the future. With a free Kundli online service you can get an interpretation of these symbols and
                understand what they mean for you in terms of your future prospects.
              </p>
            </div>
          </div>
        </section>
        <section className="new_kundli_section mt-4 mb-4">
          <div className=" mt-5 mb-2">
            <div className="container">
              {/* <h3 className="getyourfree_kundley">Get Your Free Kundli</h3> */}
              <Card className="Card_shadow m-2 p-3">
                <Grid className="Component_main_grid">
                  <Grid item md={12} xs={12} sm={12}>
                    <div className="p-2">
                      <label className="requiredLabel" htmlFor="exampleInputEmail1">
                        Name
                      </label>
                      <input type="text" name="name" className="form-control" placeholder="Name" onChange={(e) => onchange(e)} />
                      {error.name.status && <p style={{ width: "72%", color: "red" }}>Enter name</p>}
                    </div>
                  </Grid>
                  <Grid item md={12} xs={12} sm={12}>
                    <div className="p-2">
                      <label className="requiredLabel">Gender</label>
                      <select className="form-control" name="gender" value={kundlidetail.gender || "Male"} onChange={(e) => onchange(e)}>
                        <option selected value="Male">
                          Male
                        </option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </Grid>
                  <Grid item md={12} xs={12} sm={12}>
                    <Grid className="Component_main_grid">
                      <Grid item md={4} xs={12} sm={12}>
                        <div className="p-2">
                          <label className="requiredLabel" htmlFor="exampleInputEmail1">
                            Birth Day
                          </label>
                          <select className="form-control" name="day" value={kundlidetail.day} onChange={(e) => onchange(e)}>
                            <option value="">Day</option>
                            {alldays.map((row, index) => (
                              <option key={index} value={row}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.day.status && <p style={{ width: "72%", color: "red" }}>Select Day</p>}
                        </div>
                      </Grid>
                      <Grid item md={4} xs={12} sm={12}>
                        <div className="p-2">
                          <label className="requiredLabel" htmlFor="exampleInputEmail1">
                            Birth Month
                          </label>
                          <select className="form-control" name="month" value={kundlidetail.month} onChange={(e) => onchange(e)}>
                            <option value="">Month</option>
                            {months.map((row, index) => (
                              <option value={index + 1} key={index}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.month.status && <p style={{ width: "72%", color: "red" }}>Select Month</p>}
                        </div>
                      </Grid>
                      <Grid item md={4} xs={12} sm={12}>
                        <div className="p-2">
                          <label className="requiredLabel" htmlFor="exampleInputEmail1">
                            Birth Year
                          </label>

                          <select className="form-control" name="year" value={kundlidetail.year} onChange={(e) => onchange(e)}>
                            <option value="">Year</option>
                            {yeardata.map((row, index) => (
                              <option key={index} value={row}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.year.status && <p style={{ width: "72%", color: "red" }}>Select year</p>}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid className="Component_main_grid mt-2">
                  <Grid item md={12} xs={12} sm={12}>
                    <Grid className="Component_main_grid">
                      <Grid item md={4} xs={12} sm={12}>
                        <div className="p-2">
                          <label className="requiredLabel" htmlFor="exampleInputEmail1">
                            Birth Hour
                          </label>
                          <select className="form-control" name="birthhour" value={kundlidetail.birthhour} onChange={(e) => onchange(e)}>
                            <option value="">Hour</option>
                            {allhours.map((row, index) => (
                              <option key={index} value={row}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.birthhour.status && <p style={{ width: "72%", color: "red" }}>Select hour</p>}
                        </div>
                      </Grid>
                      <Grid item md={4} xs={12} sm={12}>
                        <div className="p-2">
                          <label className="requiredLabel" htmlFor="exampleInputEmail1">
                            Birth Minute
                          </label>
                          <select className="form-control" name="birthmin" value={kundlidetail.birthmin} onChange={(e) => onchange(e)}>
                            <option value="">Minute</option>
                            {allminutes.map((row, index) => (
                              <option key={index} value={row}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.birthmin.status && <p style={{ width: "72%", color: "red" }}>Select minute</p>}
                        </div>
                      </Grid>
                      <Grid item md={4} xs={12} sm={12}>
                        <div className="p-2">
                          <label htmlFor="exampleInputEmail1">Birth Second</label>

                          <select className="form-control" name="birthsec" value={kundlidetail.birthsec} onChange={(e) => onchange(e)}>
                            <option value="">Second </option>
                            {allminutes.map((row, index) => (
                              <option key={index} value={row}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.birthsec.status && <p style={{ width: "72%", color: "red" }}>Select seconds</p>}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={4} xs={12} sm={12}>
                    <div className="p-2">
                      <label className="requiredLabel" htmlFor="exampleInputEmail1">
                        Birth Place
                      </label>
                      <div className="input_for_cross">
                        <input
                          type="text"
                          className="form-control getplace_input"
                          placeholder="Enter your birth place"
                          name="birthplace"
                          value={kundlidetail.birthplace}
                          // onChange={(e) => onchange(e)}
                          onChange={getPlacesAPIFunc}
                        />
                        <span onClick={() => setkundlidetail({ ...kundlidetail, birthplace: "" })} className="cross">
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
                      {error.birthplace.status && <p style={{ width: "72%", color: "red" }}>Enter palace</p>}
                    </div>
                  </Grid>
                  <Grid item md={4} xs={12} sm={12}>
                    <div className="discussed_btn" style={{ cursor: "pointer" }} onClick={() => generatekundli()}>
                      Submit
                    </div>
                    {/* <div className="p-2">
                      <label htmlFor="exampleInputEmail1"></label>
                      <button
                        type="submit"
                        className="generate_horoscope_btn"
                        onClick={() => generatekundli()}
                      >
                        Generate Horoscope
                      </button>
                    </div> */}
                  </Grid>
                </Grid>
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

export default HOC(FreeKundli);

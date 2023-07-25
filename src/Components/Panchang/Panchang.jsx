import "./../KundliMatching/KundliMatching.css";
import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import a from "../../images/sign.png";
import { Grid } from "@material-ui/core";
import Crousal from "../Crousal/Crousal";
import { notificationHandler } from "../utils/Notification";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import homeapi from "../api/homeapi";
import { blankValidator } from "../utils/Validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../FreeKundli/FreeKundli.css";
import "./Panchang.css";
import Loder from "../Loder/Loder";
import { get_latLong, get_palces } from "../api/location";
import { IoLocationSharp } from "react-icons/io5";
import SEO from "../Seo/seo";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
const Panchang = () => {
  const [AstrologerList, setAstrologerList] = useState("");
  const [advanced_panchang_data, setadvanced_panchang_data] = useState("");
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const [kundlidetail, setkundlidetail] = useState({
    m_day: parseInt(new Date()?.toLocaleDateString()?.split("/")[1]),
    m_month: parseInt(new Date()?.toLocaleDateString()?.split("/")[0]),
    m_year: parseInt(new Date()?.toLocaleDateString()?.split("/")[2]),
    m_hour: new Date()?.toLocaleTimeString()?.split(":")[0],
    m_minute: new Date()?.toLocaleTimeString()?.split(":")[1],
    m_second: "",
    birthplace: "",
    m_lat: "25.967992351671246",
    m_lon: "83.87115904429926",
  });

  const [error, setError] = useState({
    m_day: {
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
    m_minute: {
      status: false,
    },
  });

  const onchange = (e) => {
    setError({
      m_day: {
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
      m_minute: {
        status: false,
      },
    });
    setkundlidetail({ ...kundlidetail, [e.target.name]: e.target.value });
  };

  const advanced_panchang = () => {
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
    window.scrollTo({
      top: 530,
      behavior: "smooth",
    });
    advanced_panchang_api();
  };

  const advanced_panchang_api = () => {
    try {
      let url = "https://admin.astropush.com/user_api/advanced_panchang";
      setisloading(true);

      let temp = {
        year: parseInt(kundlidetail.m_year),
        month: parseInt(kundlidetail.m_month),
        day: parseInt(kundlidetail.m_day),
        hour: parseInt(kundlidetail.m_hour),
        min: parseInt(kundlidetail.m_minute),
        lat: kundlidetail.m_lat,
        lon: kundlidetail.m_lon,
        tzone: "5.5",
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
          setadvanced_panchang_data(res.data);
          console.log("advanced_panchang", res);
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

    advanced_panchang_api();
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
        // notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const yeardata = [];
  let date = new Date().getFullYear() + 10;
  for (let year = 1928; year <= date; year++) {
    yeardata.push(year);
  }

  const alldays = [];
  for (let day = 1; day <= 31; day++) {
    alldays.push(day);
  }

  const months = [];
  function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }

  for (let index = 1; index <= 12; index++) {
    months.push(toMonthName(index));
  }

  const allhours = [];
  for (let hour = 1; hour <= 24; hour++) {
    allhours.push(hour);
  }

  const allminutes = [];
  for (let min = 1; min <= 60; min++) {
    allminutes.push(min);
  }

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
          m_lat: lat,
          m_lon: lng,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SEO
        title="Panchang  - Hindu Panchang Calendar, panchang, online panchang, hindu calendar"
        description="AstroPush is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me"
        url="https://astropush.com/static/media/astropushlogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding">
        {/* <div className="free_kundli_banner p-5"> */}
        {/* <div className="container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h1 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  Panchang
                </h1>
                <span className="header_banner pt-5">
                  Get instant & accurate, Panchang
                </span>
                
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} />
              </div>
            </div>
          </div> */}
        {/* </div> */}
        <div className="container ">
          <span className="pb-3">
            <BreadcrumbSection tittle="Panchang" />
          </span>
          <div className="get_detail">
            <div>
              <h3 className="mt-5 mb-3">An Overview of Daily Panchang and Its Benefits</h3>
            </div>
            <div>
              <p>
                Panchang is an ancient Hindu astrological system that helps to determine auspicious times for religious and social activities. It is based on
                the five elements of time, known as Tithi, Nakshatra, Yogini, Karana and Vara. With the help of these five elements, we can calculate the most
                auspicious times for various occasions and events.
              </p>
              <p>
                The Daily Panchang provides a comprehensive overview of all these elements in order to help you plan your activities accordingly. It contains a
                Tithi calculator, Nakshatra calculator, Yogini calculator, Karana calculator and Vara calculator which can be used to determine the most
                appropriate time for any activity or event. By using this system we can ensure that our activities are performed at an optimum time which will
                bring us maximum benefit.
              </p>
            </div>
          </div>
        </div>
        <section className="new_kundli_section mb-1">
          <div className="container">
            <div className="panchang_form_section mb-2" style={{ borderRadius: "5px" }}>
              <div className="">
                <div className="">
                  <div className="">
                    <div className="panchang_form_item">
                      <div className="p-2">
                        <label style={{ color: "#fff" }} for="exampleInputEmail1">
                          Day *
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

                      <div>
                        <div className="p-2">
                          <label style={{ color: "#fff" }} for="exampleInputEmail1">
                            Month *
                          </label>
                          <select className="form-control" name="m_month" value={kundlidetail.m_month} onChange={(e) => onchange(e)}>
                            <option value="">Months</option>
                            {months.map((row, index) => (
                              <option value={index + 1} key={index}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.m_month.status && <p style={{ width: "72%", color: "red" }}>select month</p>}
                        </div>
                      </div>
                      <div>
                        <div className="p-2">
                          <label style={{ color: "#fff" }}>Year</label>
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
                      </div>
                      <div>
                        <div className="p-2">
                          <label style={{ color: "#fff" }} htmlFor="exampleInputEmail1">
                            Place *
                          </label>
                          <div className="input_for_cross">
                            <input
                              type="text"
                              className="form-control getplace_input"
                              placeholder="Enter your place"
                              name="birthplace"
                              value={kundlidetail.birthplace}
                              // onChange={(e) => onchange(e)}
                              onChange={getPlacesAPIFunc}
                            />
                            <span
                              onClick={() =>
                                setkundlidetail({
                                  ...kundlidetail,
                                  birthplace: "",
                                })
                              }
                              className="cross"
                            >
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
                      </div>
                      <div>
                        <div className="discussed_btn" style={{ cursor: "pointer" }} onClick={() => advanced_panchang()}>
                          Submit
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </section>
        <section className="container content_section mt-4 mb-4">
          <div className="get_detail">
            <div>
              <h3 className="text-center mt-3 mb-3">Panchang</h3>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <section className="">
                  <table className="table table-striped">
                    <thead></thead>
                    <tbody>
                      <tr>
                        <th scope="row">Day</th>
                        <td>
                          {kundlidetail.m_day}- {kundlidetail.m_month}-{kundlidetail.m_year}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Tithi</th>
                        <td>{advanced_panchang_data?.advanced_panchang?.tithi?.details?.tithi_name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Nakshatra</th>
                        <td>{advanced_panchang_data?.advanced_panchang?.nakshatra?.details?.nak_name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Yog</th>
                        <td>{advanced_panchang_data?.advanced_panchang?.yog?.details?.yog_name}</td>
                      </tr>
                      <tr>
                        <th scope="row">karan</th>
                        <td>{advanced_panchang_data?.advanced_panchang?.karan?.details?.karan_name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Sun Rise</th>
                        <td>{advanced_panchang_data?.advanced_panchang?.sunrise} AM</td>
                      </tr>
                      <tr>
                        <th scope="row">Sun Set</th>
                        <td>
                          {advanced_panchang_data?.advanced_panchang?.sunset}
                          PM
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Moon Rise</th>
                        <td>
                          {advanced_panchang_data?.advanced_panchang?.moonrise}
                          PM
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Moon Set</th>
                        <td>
                          {advanced_panchang_data?.advanced_panchang?.moonset}
                          AM
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Sun sign</th>
                        <td>{advanced_panchang_data?.advanced_panchang?.sun_sign}</td>
                      </tr>
                      <tr>
                        <th scope="row">Moon sign</th>
                        <td>{advanced_panchang_data?.advanced_panchang?.moon_sign}</td>
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
                          {advanced_panchang_data?.advanced_panchang?.rahukaal?.start}{" "}
                          {advanced_panchang_data?.advanced_panchang?.rahukaal?.start?.slice(0, 2) >= 12 ? "PM" : "AM"}
                        </td>
                        <td>
                          {advanced_panchang_data?.advanced_panchang?.rahukaal?.end}{" "}
                          {advanced_panchang_data?.advanced_panchang?.rahukaal?.end.slice(0, 2) >= 12 ? "PM" : "AM"}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Yamghant Kaal</th>
                        <td>
                          {advanced_panchang_data?.advanced_panchang?.yamghant_kaal?.start}{" "}
                          {advanced_panchang_data?.advanced_panchang?.yamghant_kaal?.start.slice(0, 2) >= 12 ? "PM" : "AM"}
                        </td>
                        <td>
                          {advanced_panchang_data?.advanced_panchang?.yamghant_kaal?.end}{" "}
                          {advanced_panchang_data?.advanced_panchang?.yamghant_kaal?.end.slice(0, 2) >= 12 ? "PM" : "AM"}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Gulika Kaal</th>
                        <td>
                          {advanced_panchang_data?.advanced_panchang?.guliKaal?.start}{" "}
                          {advanced_panchang_data?.advanced_panchang?.guliKaal?.start.slice(0, 2) >= 12 ? "PM" : "AM"}
                        </td>
                        <td>
                          {advanced_panchang_data?.advanced_panchang?.guliKaal?.end}{" "}
                          {advanced_panchang_data?.advanced_panchang?.guliKaal?.end.slice(0, 2) >= 12 ? "PM" : "AM"}
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
                          {advanced_panchang_data?.advanced_panchang?.abhijit_muhurta?.start}{" "}
                          {advanced_panchang_data?.advanced_panchang?.abhijit_muhurta?.start.slice(0, 2) >= 12 ? "PM" : "AM"}
                        </td>
                        <td>
                          {advanced_panchang_data?.advanced_panchang?.abhijit_muhurta?.end}{" "}
                          {advanced_panchang_data?.advanced_panchang?.abhijit_muhurta?.end.slice(0, 2) >= 12 ? "PM" : "AM"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="new_kundli_section mt-1 mb-1">
          <div className="freeKundli_section mt-5 mb-2">
            <div className="container">
              <h3 className="text-center pb-5 " style={{ color: "#FFF" }}>
                Free Panchang Readings
              </h3>
              <div className="row row_container">
                <div className="col-12">
                  <div className="num_reading_section">
                    <Grid className="Component_main_grid">
                      <Grid item md={12} xs={12} sm={12}>
                        <Grid className="Component_main_grid">
                          <Grid md={4} xs={12} sm={12}>
                            <div className="p-2">
                              <label for="exampleInputEmail1">Day *</label>
                              <select
                                className="form-control"
                                name="m_day"
                                value={kundlidetail.m_day}
                                onChange={(e) => onchange(e)}
                              >
                                <option value="">Day</option>
                                {alldays.map((row, index) => (
                                  <option key={index} value={row}>
                                    {row}
                                  </option>
                                ))}
                              </select>
                              {error.m_day.status && (
                                <p style={{ width: "72%", color: "red" }}>
                                  select Day
                                </p>
                              )}
                            </div>
                          </Grid>
                          <Grid md={4} xs={12} sm={12}>
                            <div className="p-2">
                              <label for="exampleInputEmail1">Month *</label>
                              <select
                                className="form-control"
                                name="m_month"
                                value={kundlidetail.m_month}
                                onChange={(e) => onchange(e)}
                              >
                                <option value="">Months</option>
                                {months.map((row, index) => (
                                  <option value={index + 1} key={index}>
                                    {row}
                                  </option>
                                ))}
                              </select>
                              {error.m_month.status && (
                                <p style={{ width: "72%", color: "red" }}>
                                  select month
                                </p>
                              )}
                            </div>
                          </Grid>
                          <Grid md={4} xs={12} sm={12}>
                            <div className="p-2">
                              <label>Year</label>
                              <select
                                className="form-control"
                                name="m_year"
                                value={kundlidetail.m_year}
                                onChange={(e) => onchange(e)}
                              >
                                <option value="">Year</option>
                                {yeardata.map((row, index) => (
                                  <option key={index} value={row}>
                                    {row}
                                  </option>
                                ))}
                              </select>
                              {error.m_year.status && (
                                <p style={{ width: "72%", color: "red" }}>
                                  select year
                                </p>
                              )}
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={12} xs={12} sm={12}>
                        <Grid className="Component_main_grid">
                          <Grid item md={4} xs={12} sm={12}>
                            <div className="p-2">
                              <label htmlFor="exampleInputEmail1">
                                Birth Place *
                              </label>
                              <div className="input_for_cross">
                                <input
                                  type="text"
                                  className="form-control getplace_input"
                                  placeholder="Enter your birth place"
                                  name="birthplace"
                                  value={kundlidetail.birthplace}
                                  onChange={getPlacesAPIFunc}
                                />
                                <span
                                  onClick={() =>
                                    setkundlidetail({
                                      ...kundlidetail,
                                      birthplace: "",
                                    })
                                  }
                                  className="cross"
                                >
                                  &times;
                                </span>
                              </div>
                              {places.length !== 0 && (
                                <div className="getplace_input_freekundli">
                                  {places?.map((place) => (
                                    <div
                                      onClick={() => selectedPlace(place)}
                                      className="getplace_input_div"
                                    >
                                      <IoLocationSharp /> {place}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Grid>
                          <Grid md={4} xs={12} sm={12}>
                            <label htmlFor="exampleInputEmail1"></label>
                            <div
                              className="generate_horoscope_btn mb-3 mt-3"
                              style={{
                                cursor: "pointer",

                                margin: "auto",
                              }}
                              onClick={() => advanced_panchang()}
                            >
                              Submit
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </section> */}
        <section className="container">
          <Crousal />
        </section>
        <section className="container ourastrologer mt-1 mb-4">
          <OurAstrologerCrousal astro={AstrologerList} />
        </section>
      </div>
      <Loder loading={isloading} />
    </>
  );
};

export default HOC(Panchang);

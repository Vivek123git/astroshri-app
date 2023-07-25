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
import "./Numerology.css";
import Loder from "../Loder/Loder";
import SEO from "../Seo/seo";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
const Numerology = () => {
  const [AstrologerList, setAstrologerList] = useState("");
  const [isloading, setisloading] = useState(false);
  const [numerology_data, setnumerology_data] = useState("");
  const navigate = useNavigate();
  const [kundlidetail, setkundlidetail] = useState({
    m_day: "",
    m_month: "",
    m_year: "",
    // m_lat: "25.967992351671246",
    // m_lon: "83.87115904429926",
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
    });
    setkundlidetail({ ...kundlidetail, [e.target.name]: e.target.value });
  };
  console.log(kundlidetail);

  const basic_numerology = () => {
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

    basic_numerology_api();
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 1000);
  };

  const basic_numerology_api = () => {
    try {
      let url = "https://admin.astropush.com/user_api/basic_numerology";
      setisloading(true);

      let temp = {
        year: parseInt(kundlidetail.m_year) || parseInt(new Date().toLocaleDateString().split("/")[2]),
        month: parseInt(kundlidetail.m_month) || parseInt(new Date().toLocaleDateString().split("/")[0]),
        day: parseInt(kundlidetail.m_day) || parseInt(new Date().toLocaleDateString().split("/")[1]),
        name: "pk",
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
          setnumerology_data(res.data);
          console.log(res);
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

    LiveAstroData();
    basic_numerology_api();
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
  let date = new Date().getFullYear();
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

  console.log("numerology_data", new Date().toLocaleDateString().split("/")[1]);
  return (
    <>
      <SEO
        title="Numerology  -numerology,  free numerology,reading, numerology compatibility"
        description="AstroPush is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me"
        url="https://astropush.com/static/media/astropushlogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding">
        {/* <div className="free_kundli_banner p-5">
          <div className="container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h1 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  Numerology
                </h1>
                <span className="header_banner pt-5">Get instant & accurate, Numerology</span>
                
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} />
              </div>
            </div>
          </div>
        </div> */}
        <div className="container ">
          <span className="pb-3">
            {" "}
            <BreadcrumbSection tittle="Numerology" />
          </span>
          <div className="get_detail">
            <div>
              <h3 className="mt-5 mb-3">Understanding the Basics of Numerology: A Guide to Interpreting your Birthdate and Name</h3>
            </div>
            <div>
              <p>
                Numerology is the study of numbers and their meanings in our lives. It has been used for centuries to gain insight into one’s personality, life
                path and destiny. By understanding the energy of each number, we can gain a better understanding of ourselves and our life purpose.
              </p>
              <p>
                Numerology readings are based on a person’s birth date and name. The most important number in numerology is the life path number which gives us
                an indication of our destiny in this lifetime. Numerology calculators are available online to help you calculate your life path number and get
                an accurate numerology reading. With this information, you can gain a better understanding of yourself and your purpose in life.
              </p>
            </div>
          </div>
        </div>

        <section className="new_kundli_section mb-1">
          <div className="container">
            <div className="numerology_section mb-2" style={{ borderRadius: "5px" }}>
              {/* <h3 className="text-center pb-5 " style={{ color: "#FFF" }}>
                Free Numerology Readings
              </h3> */}
              <div className="">
                <div className="">
                  <div className="numerology_form_item">
                    <div className="">
                      <div className="p-2">
                        <label style={{ color: "#fff" }} for="exampleInputEmail1">
                          Birth Day *
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
                    </div>
                    <div>
                      <div className="p-2">
                        <label style={{ color: "#fff" }} for="exampleInputEmail1">
                          Birth Month *
                        </label>
                        <select className="form-control" name="m_month" value={kundlidetail.m_month} onChange={(e) => onchange(e)}>
                          <option value="">Month</option>
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
                        <label style={{ color: "#fff" }}>Birth Year</label>
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
                      <div className="discussed_btn" style={{ cursor: "pointer" }} onClick={basic_numerology}>
                        Submit
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
                  <h4 className="text-center mt-3 mb-3">Numero Details</h4>
                  <table className="table table-striped">
                    <thead></thead>
                    <tbody>
                      <tr>
                        <th scope="row">Data</th>
                        <td>{numerology_data?.numero_table?.date}</td>
                      </tr>
                      <tr>
                        <th scope="row">Destiny number</th>
                        <td>{numerology_data?.numero_table?.destiny_number}</td>
                      </tr>
                      <tr>
                        <th scope="row">Radical number</th>
                        <td>{numerology_data?.numero_table?.radical_number}</td>
                      </tr>
                      <tr>
                        <th scope="row">Name number</th>
                        <td>{numerology_data?.numero_table?.name_number}</td>
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
                        <td>{numerology_data?.numero_table?.fav_substone}</td>
                      </tr>
                      <tr>
                        <th scope="row">Friendly num</th>
                        <td>{numerology_data?.numero_table?.friendly_num}</td>
                      </tr>
                      <tr>
                        <th scope="row">Neutral num</th>
                        <td>{numerology_data?.numero_table?.neutral_num}</td>
                      </tr>

                      <tr>
                        <th scope="row">Radical num</th>
                        <td>{numerology_data?.numero_table?.radical_num}</td>
                      </tr>

                      <tr>
                        <th scope="row">Radical Ruler</th>
                        <td>{numerology_data?.numero_table?.radical_ruler}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </div>
            </div>
          </div>
        </section>

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

export default HOC(Numerology);

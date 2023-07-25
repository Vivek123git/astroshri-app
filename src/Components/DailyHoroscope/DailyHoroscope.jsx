import React, { useEffect, useState, useContext } from "react";
import HOC from "../../Common/HOC";
import banner from "../../images/sign.png";
import axios from "axios";
import "./DailyHoroscope.css";
// import a from "../../images/rashi/rashi1.png";
// import b from "../../images/rashi/rashi2.png";
// import c from "../../images/rashi/rashi3.png";
// import d from "../../images/rashi/rashi4.png";
// import e from "../../images/rashi/rashi5.png";
// import f from "../../images/rashi/rashi6.png";
// import g from "../../images/rashi/rashi7.png";
// import h from "../../images/rashi/rashi8.png";
// import i from "../../images/rashi/rashi9.png";
// import j from "../../images/rashi/rashi10.png";
// import k from "../../images/rashi/rashi11.png";
// import l from "../../images/rashi/rashi12.png";

import a from "../../images/rashi/Scorpio.svg";
import b from "../../images/rashi/Cancer.svg";
import c from "../../images/rashi/Aquarius.svg";
import d from "../../images/rashi/Libra.svg";
import e from "../../images/rashi/Aries.svg";
import f from "../../images/rashi/Leo.svg";
import g from "../../images/rashi/Pisces.svg";
import h from "../../images/rashi/Virgo.svg";
import i from "../../images/rashi/Taurus.svg";
import j from "../../images/rashi/Gemini.svg";
import k from "../../images/rashi/sagittarius.svg";
import l from "../../images/rashi/capricorn.svg";

import SEO from "../Seo/seo";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import homeapi from "../api/astromallapi";
import { notificationHandler } from "../utils/Notification";
import { useLocation, useNavigate } from "react-router-dom";
import Loder from "../Loder/Loder";
import { getBaseUrl } from "../utils";

const DailyHoroscope = () => {
  const [isloading, setisloading] = useState(false);
  const location = useLocation();
  console.log(location.state);
  const [currentEle, setcurrentEle] = useState("Today");
  const [currsign, setcurrsign] = useState(location.state || "Aries");
  const [isUpdate, setisUpdate] = useState(false);
  const [AstrologerList, setAstrologerList] = useState("");
  const [luchArry, setluchArry] = useState([]);
  const [horoscope_date, sethoroscope_date] = useState(new Date().toISOString().slice(0, 10));
  const [todayrashi, settodayrashi] = useState({
    emotions: "",
    health: "",
    luck: [],
    personal: "",
    profession: "",
    travel: "",
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
  useEffect(() => {
    daily_horoscope_api(currsign.toUpperCase());
  }, [currsign]);

  const [dailyhorescope, setdailyhorescope] = useState([
    {
      title: "Aries",
      image: e,
      status: true,
    },
    {
      title: "Taurus",
      image: i,
      status: false,
    },
    {
      title: "Gemini",
      image: j,
      status: false,
    },
    {
      title: "Cancer",
      image: b,
      status: false,
    },
    {
      title: "Leo",
      image: f,
      status: false,
    },
    {
      title: "Virgo",
      image: h,
      status: false,
    },
    {
      title: "Libra",
      image: d,
      status: false,
    },
    {
      title: "Scorpio",
      image: a,
      status: false,
    },
    {
      title: "Sagittarius",
      image: k,
      status: false,
    },
    {
      title: "Capricorn",
      image: l,
      status: false,
    },
    {
      title: "Aquarius",
      image: c,
      status: false,
    },

    {
      title: "Pisces",
      image: g,
      status: false,
    },
  ]);

  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const curday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const dd = (data) => {
    sethoroscope_date(data);
    console.log(data);
    setisUpdate(true);
  };

  //today
  var date = new Date();
  const curdate = date.getDate();
  const year = date.getFullYear();
  const day = curday[date.getDay()];
  let name = month[date.getMonth()];

  ///yesterday
  var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const ydate = yesterday.getDate();
  let ymonth = month[yesterday.getMonth()];
  const yyear = yesterday.getFullYear();
  const yday = curday[yesterday.getDay()];

  //tomorrow
  var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const tdate = tomorrow.getDate();
  let tmonth = month[tomorrow.getMonth()];
  const tyear = tomorrow.getFullYear();
  const tday = curday[tomorrow.getDay()];

  const toggleActive = (data, i) => {
    setcurrsign(data.title);
  };

  const daily_horoscope_api = (data) => {
    setisloading(true);

    let url = getBaseUrl()  + "user_api/get_daily_horoscope";
    let temp = {
      sign: data,
      date: horoscope_date,
    };

    axios
      .post(url, temp)
      .then((res) => {
        settodayrashi({
          emotions: res?.data?.data?.prediction?.emotions,
          health: res?.data?.data?.prediction?.health,
          personal: res?.data?.data?.prediction?.personal,
          profession: res?.data?.data?.prediction?.profession,
          travel: res?.data?.data?.prediction?.travel,
        });
        setluchArry(res?.data?.data?.prediction?.luck);
        setisUpdate(false);
        // settodayrashi(...todayrashi);
        setisloading(false);
      })
      .catch((e) => {
        console.log("data response error:::", e);
        setisloading(false);
        notificationHandler({ type: "danger", msg: e });
        setisloading(false);
      });
  };

  /// top astrologer list
  const LiveAstroData = async () => {
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
  return (
    <>
      <SEO
        title="Horoscopes - Free Online Astrology Predictions by Best Astrologer"
        description="AstroPush is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me,Live Events,Free Kundli"
        url="https://astropush.com/static/media/astropushlogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding">
        <div className="free_kundli_banner p-5">
          <div className="container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h2 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  Daily Horoscopes
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
                <img src={banner} />
              </div>
            </div>
          </div>
        </div>

        <section className="dailyhoroscope mt-2 mb-1 container background-galaxy-img">
          <div className="container_horoscope">
            <div className="date_select">
              <div
                className={`${currentEle === "Yesterday" ? "active" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setcurrentEle("Yesterday");
                  dd(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
                  daily_horoscope_api(currsign);
                }}
              >
                Yesterday
              </div>
              <div
                className={`${currentEle === "Today" ? "active" : ""}`}
                onClick={() => {
                  setcurrentEle("Today");
                  dd(new Date().toISOString().slice(0, 10));
                  daily_horoscope_api(currsign);
                }}
                style={{ cursor: "pointer" }}
              >
                Today
              </div>
              <div
                className={`${currentEle === "Tomorrow" ? "active" : ""}`}
                onClick={() => {
                  setcurrentEle("Tomorrow");
                  dd(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
                  daily_horoscope_api(currsign);
                }}
                style={{ cursor: "pointer" }}
              >
                Tomorrow
              </div>
            </div>
          </div>
          {currentEle === "Today" ? (
            <div className="current_date">
              Horoscopes Today: {curdate} {name} {year}, {day}
            </div>
          ) : currentEle === "Tomorrow" ? (
            <div className="current_date">
              Horoscopes Tomorrow: {tdate} {tmonth} {tyear}, {tday}
            </div>
          ) : (
            <div className="current_date">
              Horoscopes Yesterday: {ydate} {ymonth} {yyear}, {yday}
            </div>
          )}

          <div className="horescope_container">
            {dailyhorescope.map((data, i) => (
              <div
                key={i}
                className={`${data.title === currsign ? "horoscope_div active_image" : "horoscope_div"}`}
                onClick={() => toggleActive(data, i)}
                style={{ cursor: "pointer" }}
              >
                <div className="image">
                  <img src={data.image} alt="horoscope" />
                </div>
                <div>{data.title}</div>
              </div>
            ))}
          </div>

          <div className="response_container">
            <div className="list">
              <div className="dailyhoro_content_heading">
                Personal :<span className="dailyhoro_content"> {todayrashi.personal}</span>
              </div>
              <div className="dailyhoro_content_heading">
                Health :<span className="dailyhoro_content"> {todayrashi.health}</span>
              </div>
              <div className="dailyhoro_content_heading">
                Profession :<span className="dailyhoro_content"> {todayrashi.profession}</span>
              </div>
              <div className="dailyhoro_content_heading">
                Emotions :<span className="dailyhoro_content"> {todayrashi.emotions}</span>
              </div>

              <div className="dailyhoro_content_heading">
                Travel :<span className="dailyhoro_content"> {todayrashi.travel}</span>
              </div>
              <div className="dailyhoro_content_heading">
                Luck :
                <span className="dailyhoro_content">
                  {luchArry?.map((data, i) => (
                    <p key={i}>{data}</p>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="container ourastrologer mt-1 mb-4">
          <OurAstrologerCrousal astro={AstrologerList} />
        </section>
      </div>
      <Loder loading={isloading} />
    </>
  );
};

export default HOC(DailyHoroscope);

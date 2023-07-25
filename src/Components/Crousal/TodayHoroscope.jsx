import React from "react";
import { useNavigate } from "react-router-dom";
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

const TodayHoroscope = () => {
  const navigate = useNavigate();

  const dailyhoroscopeArry = [
    {
      name: "Aries",
      subname: "Aries",
      image: e,
    },
    {
      name: "Taurus",
      subname: "Taurus",
      image: i,
    },
    {
      name: "Gemini",
      subname: "Gemini",
      image: j,
    },
    {
      name: "Cancer",
      subname: "Cancer",
      image: b,
    },
    {
      name: "Leo",
      subname: "Leo",
      image: f,
    },

    {
      name: "Virgo",
      subname: "Virgo",
      image: h,
    },

    {
      name: "Libra",
      subname: "Libra",
      image: d,
    },
    {
      name: "Scorpio",
      subname: "Scorpius",
      image: a,
    },
    {
      name: "Sagittarius",
      subname: "Sagittarius",
      image: k,
    },
    {
      name: "Capricorn",
      subname: "Capricorn",
      image: l,
    },
    {
      name: " Cancer",
      subname: "Aquarius",
      image: c,
    },
    {
      name: "Pisces",
      subname: "Pisces ",
      image: g,
    },
  ];

  return (
    <>
      <div className="container pt-3">
        <div className="">
          <div className="ourastologer_content text-center">
            <h1 className="service_provide text-center">Today’s Horoscope </h1>
          </div>
        </div>
        <section>
          <div className="box_dailay_horo">
            {dailyhoroscopeArry.map((data, index) => (
              <div className="main_card_horobox" style={{ cursor: "pointer" }} key={index}>
                <div
                  onClick={() =>
                    navigate("/horoscope/daily-horoscope", {
                      state: data.name,
                    })
                  }
                >
                  <div className="daly_horo_img">
                    <img className="img" loading="lazy" alt="" src={data.image} />
                  </div>
                  <h6 className="dailyhoroscope_name mt-2">{data.subname}</h6>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default TodayHoroscope;

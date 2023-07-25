import React from "react";
import OwlCarousel from "react-owl-carousel";
import "./Crousal.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useNavigate } from "react-router-dom";
import card2 from "../../images/Icons/b1.png";
import MatchMaking from "../../images/Icons/b2.png";
import Numerology from "../../images/Icons/b3.png";
import Kundli from "../../images/Icons/Frame3.png";
import Horoscope from "../../images/Icons/Frame5.png";
import AskQuestion from "../../images/Icons/Frame6.png";
import Detailed from "../../images/Icons/Frame2.png";
import getastro from "../../images/Icons/getastro.png";

const Crousal = () => {
  const navigate = useNavigate();

  const options = {
    loop: true,
    nav: true,
    navText: ["<i className='fa fa-chevron-left arrow_right'></i>", "<i className='fa fa-chevron-right arrow_left '></i>"],
    autoplay: true,
    autoplayHoverPause: true,
    mouseDrag: true,
    // margin: 30,
    // center: false,
    dots: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  };
  return (
    <>
      <div className="mt-3 mb-5">
        <div className="">
          <div className="ourastologer_content text-center">
            <h1 className="service_provide text-center">Services We Provide</h1>
          </div>
        </div>

        <OwlCarousel className="owl-theme " {...options}>
          <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/talk-to-astrologer  ")}>
            <a className="ast_team_box">
              <div className="parent_image_our_Astrologer">
                <img loading="lazy" alt="Daily Panchang" src={getastro} />
              </div>
            </a>
          </div>
          <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/panchang")}>
            <a className="ast_team_box">
              <div className="parent_image_our_Astrologer">
                <img loading="lazy" alt="Daily Panchang" src={card2} />
              </div>
            </a>
          </div>
          <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/matchmaking")}>
            <a className="ast_team_box">
              <div className="parent_image_our_Astrologer">
                <img loading="lazy" alt="Free MatchMaking" src={MatchMaking} />
              </div>
            </a>
          </div>

          <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/numerology")}>
            <a className="ast_team_box">
              <div className="parent_image_our_Astrologer">
                <img loading="lazy" alt="Free Numerology" src={Numerology} />
              </div>
            </a>
          </div>

          <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/horoscope/daily-horoscope")}>
            <a className="ast_team_box">
              <div className="parent_image_our_Astrologer">
                <img loading="lazy" alt="Daily Horoscope" src={Horoscope} />
              </div>
            </a>
          </div>

          <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }}>
            <a className="ast_team_box">
              <div className="parent_image_our_Astrologer">
                <img loading="lazy" alt="Ask Questions" src={AskQuestion} />
              </div>
            </a>
          </div>

          <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/freekundli")}>
            <a className="ast_team_box">
              <div className="parent_image_our_Astrologer">
                <img loading="lazy" alt="Free Kundli" src={Kundli} />
              </div>
            </a>
          </div>

          <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/reportlist")}>
            <a className="ast_team_box">
              <div className="parent_image_our_Astrologer">
                <img src={Detailed} loading="lazy" alt="Detailed Report" />
              </div>
            </a>
          </div>
        </OwlCarousel>
      </div>
    </>
  );
};

export default Crousal;

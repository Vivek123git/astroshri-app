import React from "react";
import { Grid } from "@material-ui/core";
import logo from "../../images/logo.svg";
import playstore from "../../images/playstore.png";
import ios from "../../images/ios.png";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
function Footer(props) {
  const navigate = useNavigate();
  return (
    <>
      <section className="footer-top  pb-4">
        <div className="container-fluid footer-padding">
          <div className="mt-2 p-3">
            <div className="header_link_color_footer_logo mb-3">
              <div>
                <img src={logo} className="header_logo_footer" />
              </div>
            </div>
            <span className="footer_logo_description ">
              Rakshaa is the best astrology website for online Astrology predictions. Talk to Astrologer on call and get answers to all your worries by seeing
              the future life through Astrology Kundli Predictions from the best Astrologers from India.
            </span>
          </div>
          <Grid className="Component_main_grid mt-2 p-3" style={{ fontWeight: "normal" }}>
            <Grid item md={3} sm={6} xs={6}>
              <div className="Footer_heading">
                <h4> User App</h4>
              </div>
              <div className="">
                <a target="_blank">
                  <img src={playstore} className="footer_social_logo" />
                </a>
              </div>
              <div className="mt-2">
                <img src={ios} className="footer_social_logo" />
              </div>

              <div className="Footer_heading mt-4 ">
                <h4> Astrologer App</h4>
              </div>
              <div className="" style={{ cursor: "pointer" }}>
                <a h target="_blank">
                  <img src={playstore} className="footer_social_logo" />
                </a>
              </div>
              <div className="mt-2">
                <img src={ios} className="footer_social_logo" />
              </div>
            </Grid>
            <Grid item md={3} sm={6} xs={6}>
              <div className="Footer_heading">
                <h4> Services</h4>
              </div>
              <div className="Footer_heading_Links" onClick={() => navigate("/chat-with-astrologer")}>
                Chat With Astrologers
              </div>
              <div className="Footer_heading_Links" onClick={() => navigate("/talk-to-astrologer")}>
                Talk to Astrologer
              </div>
              <div className="Footer_heading_Links" onClick={() => navigate("/freekundli")}>
                Free Kundli
              </div>
              <div className="Footer_heading_Links" onClick={() => navigate("/live_astrologer")}>
                Live Events
              </div>

              <div className="Footer_heading_Links" onClick={() => navigate("/numerology")}>
                Numerology
              </div>
              <div className="Footer_heading_Links" onClick={() => navigate("/horoscope/daily-horoscope")}>
                Daily Horoscopes
              </div>
              <div className="Footer_heading_Links" onClick={() => navigate("/matchmaking")}>
                Kundli Matching
              </div>
              <div className="Footer_heading_Links" onClick={() => navigate("/panchang")}>
                Daily Panchang
              </div>

              <div className="Footer_heading_Links" onClick={() => navigate("/astroshop")}>
                Astroshop
              </div>
              <div className="Footer_heading_Links" onClick={() => navigate("/blog")}>
                Blog Section
              </div>
            </Grid>
            <Grid item md={3} sm={6} xs={6}>
              <div className="Footer_heading">
                <h4>Important Links</h4>
              </div>
              <div
                className="Footer_heading_Links"
                //  onClick={() => navigate("/about")}
              >
                About Us
              </div>

              <div
                className="Footer_heading_Links"
                //  onClick={() => navigate("/terms")}
              >
                Terms & Conditions
              </div>
              <div
                className="Footer_heading_Links"
                //  onClick={() => navigate("/privacypolicy")}
              >
                Privacy Policy
              </div>
              <div
                className="Footer_heading_Links"
                //  onClick={() => navigate("/contact")}
              >
                Contact Us
              </div>
              <div
               className="Footer_heading_Links" 
              // onClick={() => navigate("/refund-and-cancellation-policy")}
              >
                Refund & Cancellation Policy
              </div>
            </Grid>

            <Grid item md={3} sm={6} xs={6}>
              <div>
                <h4 className="Footer_heading ml-1" onClick={() => props.history.push("#")}>
                  Contact us
                </h4>
              </div>

              <a target="_blank">
                <div className="d-flex mt-1">
                  <div className="allicons_footer_image_social allicons_footer_image_size_facebook"></div>
                  <span className="Footer_heading_Links ml-1">Facebook</span>
                </div>
              </a>

              <a target="_blank">
                <div className="d-flex mt-1">
                  <div className="allicons_footer_image_social allicons_footer_image_size_twitter"></div>
                  <span className="Footer_heading_Links ml-1">Twitter</span>
                </div>
              </a>

              <a target="_blank">
                <div className="d-flex mt-1">
                  <div className="allicons_footer_image_social allicons_footer_image_size_youtube"></div>
                  <span className="Footer_heading_Links ml-1">Youtube</span>
                </div>
              </a>
              <a target="_blank">
                <div className="d-flex mt-1">
                  <div className="allicons_footer_image_social allicons_footer_image_size_whatapp"></div>
                  <span className="Footer_heading_Links ml-1">Whatapp</span>
                </div>
              </a>
              <a target="_blank">
                <div className="d-flex mt-1">
                  <div className="allicons_footer_image_social allicons_footer_image_size_instagram"></div>
                  <span className="Footer_heading_Links ml-1">Instagram</span>
                </div>
              </a>
              <a target="_blank">
                <div className="d-flex mt-1">
                  <div className="allicons_footer_image_social allicons_footer_image_size_quora"></div>
                  <span className="Footer_heading_Links ml-1">Quora</span>
                </div>
              </a>
            </Grid>
          </Grid>
        </div>
      </section>
      <div className="">
        <div className="Footer_heading_link_color text-center pt-3 pb-3">Copyright © {new Date().getFullYear()} All Rights Reserved.</div>
      </div>
    </>
  );
}

export default Footer;

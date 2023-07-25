import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import d from "../../images/owlcrousal/kundli.png";
import b from "../../images/owlcrousal/kundli2.png";
import c from "../../images/owlcrousal/match 1.png";
import a from "../../images/owlcrousal/match 2.png";
import e from "../../images/owlcrousal/match 3.png";
const options = {
  loop: true,
  nav: false,
  autoplay: true,
  // autoplayHoverPause: false,
  // mouseDrag: true,
  margin: 20,
  center: true,
  dots: false,
  slidetransition: "linear",
  autoplayTimeout: 1000,
  // autoplayHoverPause: false,
  autoplaySpeed: 500,
  nav: false,
  // dotsContainer: false,
  responsive: {
    0: {
      items: 2,
    },
    576: {
      items: 3,
    },
    768: {
      items: 4,
    },
    992: {
      items: 5,
    },
  },
};

class PartnerSlider extends Component {
  render() {
    return (
      <div className="brand-area-two ptb-70 pt-70">
        <div className="container">
          <OwlCarousel
            className="brand-wrap owl-carousel owl-theme"
            {...options}
          >
            <div className="single-brand">
              <a href="#" target="_blank">
                <img src={a} alt="Image" />
              </a>
            </div>

            <div className="single-brand">
              <a href="#" target="_blank">
                <img src={b} alt="Image" />
              </a>
            </div>

            <div className="single-brand">
              <a href="#" target="_blank">
                <img src={c} alt="Image" />
              </a>
            </div>

            <div className="single-brand">
              <a href="#" target="_blank">
                <img src={d} alt="Image" />
              </a>
            </div>

            <div className="single-brand">
              <a href="#" target="_blank">
                <img src={e} alt="Image" />
              </a>
            </div>

            <div className="single-brand">
              <a href="#" target="_blank">
                <img src={a} alt="Image" />
              </a>
            </div>

            <div className="single-brand">
              <a href="#" target="_blank">
                <img src={b} alt="Image" />
              </a>
            </div>

            <div className="single-brand">
              <a href="#" target="_blank">
                <img src={c} alt="Image" />
              </a>
            </div>
          </OwlCarousel>
        </div>
      </div>
    );
  }
}

export default PartnerSlider;

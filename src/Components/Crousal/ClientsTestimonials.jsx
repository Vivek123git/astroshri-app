import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import team1 from "../../images/team1.png";
import a from "../../images/t1.png";
import b from "../../images/t2.png";
import c from "../../images/t3.png";
import d from "../../images/t4.png";
import e from "../../images/t5.png";
import f from "../../images/t6.png";
import "./ClientTestimonial.css";
import { Skeleton } from "@mui/material";
const ClientsTestimonials = (props) => {
  const colorcardAll = [a, b, c, d, e, f];
  const options = {
    loop: true,
    nav: true,
    navText: ["<i className='fa fa-chevron-left arrow_right_testimonial'></i>", "<i className='fa fa-chevron-right arrow_left_testimonial '></i>"],
    autoplay: true,
    autoplayHoverPause: true,
    mouseDrag: true,
    margin: 20,
    center: true,
    dots: false,
    autoplayTimeout: 2500,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  };

  const ListSkeleton = ({ listsToRender }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, index) => (
            <div style={{ width: "100%", margin: "5px" }} key={index}>
              <Skeleton variant="rectangular" width="100%">
                <div style={{ paddingTop: "57%" }} />
              </Skeleton>
              <Skeleton />
              <Skeleton />
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <div className="container mt-5 mb-3">
        <div className="mb-4">
          <div className="ourastologer_content text-center">
            <h1 className="service_provide text-center">Clients Testimonials</h1>
          </div>

          <div className="">
            {props.client && props.client.length > 0 ? (
              <div className="row">
                <OwlCarousel className="owl-theme" {...options}>
                  {props.client.map((data, index) => (
                    <section className="client-testimonials-section">
                      <div className="">
                        <div className="testimonial-item ">
                          <div class="wt-thumb-box">
                            <div class="thumb">
                              <img src={data.img} style={{ width: "80px" }} alt="testimonial image" loading="lazy" />
                            </div>
                          </div>

                          <div class="wt-content">
                            <span
                              id="converthtml"
                              dangerouslySetInnerHTML={{
                                __html: data.description,
                              }}
                            ></span>

                            <div class="quote-title-box">
                              <div class="quote">
                                <i class="flaticon-quotation"></i>
                              </div>

                              <div class="author-title">
                                <h5>{data.title}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  ))}
                </OwlCarousel>
              </div>
            ) : (
              <div className="d-flex mb-5" style={{ width: "100%" }}>
                <ListSkeleton listsToRender={3} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientsTestimonials;

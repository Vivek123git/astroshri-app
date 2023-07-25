import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "./Crousal.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Avatar, Card } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
const LiveEvent = (props) => {
  const navigate = useNavigate();
  const options = {
    loop: true,
    nav: true,
    autoplay: true,
    navText: [
      "<i className='fa fa-chevron-left arrow_right_live'></i>",
      "<i className='fa fa-chevron-right arrow_left_live '></i>",
    ],
    autoplayHoverPause: true,
    mouseDrag: true,
    margin: 10,
    center: false,
    dots: false,
    smartSpeed: 1500,
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
        items: 5,
      },
    },
  };
  const ListSkeleton = ({ listsToRender }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, index) => (
            <div style={{ width: "40%", margin: "5px" }} key={index}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
                <Skeleton style={{ width: "100%", marginLeft: "2px" }} />
              </Box>
              <Skeleton />
              <Skeleton />
              <Skeleton variant="rectangular" width="100%">
                <div style={{ paddingTop: "37%" }} />
              </Skeleton>
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <div className="pt-">
        <div className="">
          <div className="ourastologer_content text-center">
            <h1 className="service_provide text-center">Live Events </h1>
          </div>
        </div>
        {props?.live && props.live.length > 0 ? (
          <OwlCarousel className="owl-theme" {...options}>
            {props.live.map((data, index) => (
              <Card
                className="m-1 p-1"
                key={index}
                onClick={() => navigate("/live_astrologer")}
              >
                <div className="" style={{ cursor: "pointer" }}>
                  <div className="text-right">
                    <span className="live_event_btn  mb-4">
                      <i className="fa fa-circle pr-2" aria-hidden="true"></i>
                      Live
                    </span>
                  </div>
                  <div className="live_astero">
                    <img className="" loading="lazy" src={data.profile_img} />
                  </div>
                  <div className="text-center mt-2 mb-3">
                    <div className="astro_name mt-2">
                      <h5>{data.name}</h5>
                    </div>
                    <span className="mt-2">British,English</span>
                  </div>
                </div>
              </Card>
            ))}
          </OwlCarousel>
        ) : (
          <div className="d-flex mb-5">
            <ListSkeleton listsToRender={3} />
          </div>
        )}
      </div>
      <div
        className="live_astro_btn text-center mt-3 "
        onClick={() => navigate("/live_astrologer")}
      >
        <span className="view_all_btn">View All</span>
      </div>
    </>
  );
};

export default LiveEvent;

import React, { useEffect, useState, useContext } from "react";
import HOC from "../../Common/HOC";
import "./HomePage.css";
import Crousal from "../Crousal/Crousal";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import TodayHoroscope from "../Crousal/TodayHoroscope";
import b from "../../images/tentionface.png";
import a from "../../images/home_sec_img.png";
import d1 from "../../images/01.png";
import d2 from "../../images/02.png";
import icons from "../../images/Icons/phone.png";
import icons2 from "../../images/Icons/chat.png";
import icons3 from "../../images/Icons/shop.png";
import icons5 from "../../images/Icons/live.png";
import { useNavigate } from "react-router-dom";
import { Card } from "@material-ui/core";
import LiveEvent from "../Crousal/LiveEvent";
import ClientsTestimonials from "../Crousal/ClientsTestimonials";
import Securety from "./Securety";
import { notificationHandler } from "../utils/Notification";
import { Skeleton } from "@mui/material";
import { UserContext } from "../../App";
import Carousel from "react-material-ui-carousel";
import homeapi from "../api/homeapi";
import SEO from "../Seo/seo";
import Loder from "../Loder/Loder";
import UserRating from "../DialogeBox/UserRating";
const HomePage = () => {
  const [isloading, setisloading] = useState(false);
  const [liveAstrologerArr, setliveAstrologerArr] = useState([]);
  const [AstrologerList, setAstrologerList] = useState("");
  const [BlogSectionArry, setBlogSectionArry] = useState([]);
  const [testimonialsArry, settestimonialsArry] = useState([]);
  const [channel_id, setchannel_id] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [rating, setrating] = useState(false);
  const [homepagebanner, sethomepagebanner] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    LiveAstroData();
  }, []);

  const ListSkeleton = ({ listsToRender }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, index) => (
            <div style={{ width: "40%", margin: "5px" }} key={index}>
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

  const LiveAstroData = async () => {
    setisloading(true);
    try {
      const res = await homeapi();
      console.log(res);
      setchannel_id(res.data.channel_id);
      if (res.data.status) {
        if (res.data.is_open_rating == "Yes") {
          setrating(true);
        }
        setliveAstrologerArr(res?.data?.live);
        setBlogSectionArry(res?.data?.blog);
        setAstrologerList(res?.data?.astrologer);
        settestimonialsArry(res?.data?.testimonials);
        sethomepagebanner(res?.data?.banner);
        dispatch({
          type: "USER",
          payload: {
            ...state,
            notification: res.data.notifications,
            cartItemsLength: res.data.item_total,
            wallet: res.data.wallet,
          },
        });
        setisloading(false);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
      }
    } catch (error) {
      console.log(error);
      notificationHandler({ type: "danger", msg: "Network Error!" });
    }
  };

  const allservics = [
    {
      title: "Talk to Astrologer",
      link: "/talk-to-astrologer",
      icon: icons,
    },
    {
      title: "Chat with Astrologer",
      link: "/chat-with-astrologer",
      icon: icons2,
    },
    {
      title: "Shop",
      link: "/astroshop",
      icon: icons3,
    },
    {
      title: "Live Astrologers",
      link: "/live_astrologer",
      icon: icons5,
    },
  ];

  const homebanner = [
    {
      img: b,
    },
    {
      img: a,
    },
    {
      img: b,
    },
  ];
  const homepagebannerdummy = [
    {
      img: d1,
      link: "",
    },
    {
      img: d2,
      link: "",
    },
  ];
  return (
    <>
      <SEO
        title="Rakshaa- Free Online Astrology Predictions by Best Astrologer"
        description="Rakshaa is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with astrologer,Talk to Astrologer online,online horoscope,Best astrologers near me"
        url="https://Rakshaa.com/static/media/Rakshaalogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding">
        <div className="">
          <Carousel indicators={false}>
            {homepagebannerdummy?.map((item, i) => (
              <a href={item?.nav} target="_blank">
                <div className="home_dynamic_banner" style={{ cursor: "pointer" }}>
                  <img src={item.img} loading="lazy" style={{ width: "100%" }} />
                </div>
              </a>
            ))}
          </Carousel>
        </div>
        <section>
          <div className="live_astrobg_banner">
            <div className="container">
              <div className="row live_connect">
                {allservics.map((data, index) => (
                  <div className="live_astrobg_banner_content col-3 col-sm-3 col-md-3">
                    <div className="live_astrobg_banner_content_card p-3" onClick={() => navigate(`${data.link}`)}>
                      <div className="best_astro d-flex justify-content-center">
                        <img src={data.icon} />
                      </div>
                      <div className="text-center mt-2">
                        <div>
                          <span className="chatastro_heading">{data.title}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="container" style={{ paddingTop: "1rem" }}>
          <Crousal />
        </section>
        <section className="container ourastrologer mt-3 mb-5">
          <OurAstrologerCrousal astro={AstrologerList} />
        </section>

        <section className="today_horoscope_banner">
          <TodayHoroscope />
        </section>

        <div className="container blogcard">
          <div className="ourastologer_content text-center">
            <h1 className="service_provide text-center">What's new on the blog</h1>
          </div>

          {BlogSectionArry && BlogSectionArry.length > 0 ? (
            <div className="row">
              {BlogSectionArry?.slice(0, 3).map((data, index) => (
                <div
                  className="col-md-6 col-lg-6 col-xl-4"
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/blogdetails/${data._id}`, {
                      state: data.category_id,
                    })
                  }
                >
                  <div className="blog_box_content m-2 ">
                    <div className="blog_section_image">
                      <img src={data.img} alt="blog" />
                    </div>
                    <div className="p-2">
                      <h5>{data?.title.substring(0, 28) + ""}</h5>
                      <span
                        id="converthtml"
                        className=""
                        dangerouslySetInnerHTML={{
                          __html: data?.description.slice(0, 100) + "...",
                        }}
                      ></span>
                    </div>
                    <div className="d-flex p-2" style={{ justifyContent: "space-between" }}>
                      <div className="" style={{ color: "#777" }}>
                        {/* {data?.auther} */}
                        Rakshaa
                      </div>
                      <div style={{ color: "#777" }}>{data?.Created_date.substring(0, 10)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="d-flex mb-5">
              <ListSkeleton listsToRender={3} />
            </div>
          )}
        </div>
        <div className="text-center mt-5 mb-5 " onClick={() => navigate("/blog")}>
          <span className="view_all_btn">View All</span>
        </div>
      </div>
      <Loder loading={isloading} />
      <UserRating open={rating} channelId={channel_id} close={() => setrating(!rating)} type="call" />
    </>
  );
};

export default HOC(HomePage);

import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import { useLocation, useParams } from "react-router-dom";
import { Card } from "@material-ui/core";
import a from "../../images/sign.png";
import "./AstrologerProfile.css";
import { notificationHandler } from "../utils/Notification";
import ReactStars from "react-rating-stars-component";
import { AiFillStar, AiOutlineMessage } from "react-icons/ai";
import { MdCall } from "react-icons/md";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import ProfileChat from "../../Components/DialogeBox/ProfileChat";
import ProfileCall from "../../Components/DialogeBox/ProfileCall";
import UserLogin from "../../Components/DialogeBox/UserLogin";
import Gallary from "../DialogeBox/Gallary";
import Cookies from "js-cookie";
import homeapi from "../api/homeapi";
import astrologer_profile_api, { astro_follow_api } from "../api/astroprofile";
import Chatfunction from "../function/Chatfunction";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
import Loder from "../Loder/Loder";
import d from "../../images/man.png";
import b from "../../images/private-key.png";
import c from "../../images/shield.png";

const AstrologerProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const auth = Cookies.get("auth");
  const [isloading, setisloading] = useState(false);
  const [astroid, setastroid] = useState("");
  const [AstroProfile, setAstroProfile] = useState([]);
  const [AstrologerList, setAstrologerList] = useState("");
  const [chatpopup, setchatpopup] = useState(false);
  const [Loginpopup, setLoginpopup] = useState(false);
  const [gallarypopup, setgallarypopup] = useState(false);
  const [gallaryfile, setgallaryfile] = useState("");
  const [callsection, setcallsection] = useState(false);
  const currency = Cookies.get("country");

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 1000);
    astrologerprofile();
    LiveAstroData();
  }, [id]);

  const LiveAstroData = async () => {
    setisloading(true);
    try {
      const res = await homeapi();
      if (res.data.status) {
        setAstrologerList(res?.data?.astrologer);
        setisloading(false);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network Error!" });
      setisloading(false);
    }
  };

  const chatpopupbox = (data) => {
    if (auth === "true" && auth) {
      return setchatpopup(!chatpopup);
    }
    setLoginpopup(true);
  };

  const callvrify = (data) => {
    if (auth === "true" && auth) {
      setastroid(data);
      return setcallsection(true);
    }
    setLoginpopup(true);
  };

  const follow_astro = (data) => {
    if (auth === "true" && auth) {
      follow_astro_api(data);
      return;
    }
    setLoginpopup(true);
  };

  const logindialogbox = () => {
    setLoginpopup(!Loginpopup);
  };

  const astrologerprofile = async () => {
    setisloading(true);
    let temp = {
      id: id,
      currency,
    };
    try {
      const res = await astrologer_profile_api(temp);
      if (res.data.status) {
        setAstroProfile(res.data.results);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) { }
  };

  const follow_astro_api = async (data) => {
    setisloading(true);
    const temp = {
      astro_id: data.id,
    };
    try {
      let res = await astro_follow_api(temp);
      if (res.data.status) {
        astrologerprofile();
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  const gallaryshow = (data) => {
    setgallaryfile(data);
    setgallarypopup(true);
  };

  const datasidebar = [
    {
      tittle: "Private & Confidential",
      icon: b,
    },
    {
      tittle: "Secured Payments",
      icon: c,
    },
    {
      tittle: "Verified Astrologers",
      icon: d,
    },
  ];

  return (
    <>
      <div className="homepage_padding">
        {/* <div className="free_kundli_banner p-5">
          <div className="container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h1 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  ASTROLOGER Profile
                </h1>
                <span className="header_banner pt-5">Get instant & accurate, Janam Kundli</span>
                <div className="home_banner_content mt-4" style={{ color: "#FFF" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare sed egestas iaculis rhoncus, velit.
                </div>
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} />
              </div>
            </div>
          </div>
        </div> */}

        <div className="astroprofile  mb-5">
          <div className="container mt-3 mb-2">
            <BreadcrumbSection tittle="Astrologer's Profile" />
            {AstroProfile.map((data, index) => (
              <div className="   mt-3 " key={index}>
                <div>
                  <div className="p-4">
                    {/* <p className="heading">About us</p> */}
                    <div className="row">
                      <div className="col-sm-12 col-md-4 col-lg-6 col-xl-4 text-center">
                        <Card className="astro-profile-section-left pb-3">
                          <div className="astro_data_data">
                            <img
                              src={data.profile_img ? data.profile_img : `https://eu.ui-avatars.com/api/?name=${data.name.substring(0, 12)}&size=230`}
                              alt=""
                            />
                          </div>
                          <div className="mt-2 mb-2">
                            {data.is_Follow == 0 ? (
                              <button type="button" onClick={() => follow_astro(data)} className="btn btn-secondary" style={{ padding: "3px 15px" }}>
                                Follow
                              </button>
                            ) : (
                              <button type="button" onClick={() => follow_astro(data)} className="btn btn-primary" style={{ padding: "3px 15px" }}>
                                Following
                              </button>
                            )}
                          </div>
                          <div>
                            <span className="astro_name" style={{ paddingTop: "0px" }}>
                              {data.name}
                            </span>
                            <br />
                            {data.skill.map((row, index) => (
                              <span key={index}>{row?.name + ","}</span>
                            ))}
                            <br />
                            {data.language.map((row, index) => (
                              <span key={index}>{row?.name + ","}</span>
                            ))}
                          </div>
                          <div>
                            {" "}
                            <div>
                              <div className="text-center d-flex" style={{ justifyContent: "center" }}>
                                <ReactStars
                                  style={{ justifyContent: "center" }}
                                  count={5}
                                  value={location?.state?.rating}
                                  size={20}
                                  activeColor="#FFB450"
                                  color="#ABABAB"
                                  isHalf={true}
                                  edit={false}
                                  classNames="star_class"
                                  emptyIcon={<AiFillStar />}
                                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                                  fullIcon={<AiFillStar />}
                                />
                              </div>
                            </div>
                            <div>
                              ({data?.avg_rat?.toFixed(1)} Rating) ,{data.follow_count} followers
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="btn d-flex" style={{ justifyContent: "center" }}>
                              {data.is_chat_online === "off" ? (
                                <button className="btn_chat_profile offline-status">
                                  <span>
                                    <AiOutlineMessage /> <span>Offline</span>
                                  </span>
                                </button>
                              ) : data.is_busy === 1 ? (
                                <button className="btn_chat_profile busy-status">
                                  <span>
                                    <AiOutlineMessage /> Busy
                                  </span>
                                </button>
                              ) : (
                                // <button
                                //   className="btn_chat_profile online-status"
                                //   style={{ width: "50%" }}
                                //   onClick={() => chatpopupbox(data)}
                                // >
                                //   <span>
                                //     <AiOutlineMessage /> Chat{" "}
                                //     {data.currency === "INR" ? "₹" : "$"}
                                //     {data.per_min_chat}
                                //     /min
                                //   </span>
                                // </button>
                                <Chatfunction astroID={data.id} astrodata={data} type="profile" />
                              )}
                            </div>
                            <div className="btn d-flex" style={{ justifyContent: "center" }}>
                              {data.is_voice_online === "off" ? (
                                <button className="btn_chat_profile offline-status">
                                  <span>
                                    <MdCall /> <span>Offline</span>
                                  </span>
                                </button>
                              ) : data.is_busy === 1 ? (
                                <button className="btn_chat_profile busy-status">
                                  <span>
                                    <MdCall /> Busy
                                  </span>
                                </button>
                              ) : (
                                <button className="btn_chat_profile online-status" onClick={() => callvrify(data)}>
                                  <span>
                                    <MdCall /> Call {data.currency === "INR" ? "₹" : "$"}
                                    {data.per_min_voice_call}/min
                                  </span>
                                </button>
                              )}
                            </div>
                          </div>
                        </Card>

                        <section className="mt-3">
                          {datasidebar.map((data, index) => (
                            <div>
                              <Card className="my-3 p-2">
                                <div className="verified-section-profile">
                                  <div className="">
                                    <img style={{ width: "80px" }} src={data.icon} />
                                  </div>
                                  <div className="mt-3">
                                    <h4 className="security_section_profile pb-2">{data.tittle}</h4>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          ))}
                        </section>
                      </div>
                      <div className="col-sm-12 col-md-8 col-lg-6 col-xl-8 ">
                        <Card className="about_section p-3">
                          <div>
                            <div className="mt-2" style={{ display: "flex", justifyContent: "flex-end" }}>
                              <div className="btn d-flex" style={{ justifyContent: "center" }}>
                                {data.is_chat_online === "off" ? (
                                  <button className="btn_chat_profile offline-status">
                                    <span>
                                      <AiOutlineMessage /> <span>Offline</span>
                                    </span>
                                  </button>
                                ) : data.is_busy === 1 ? (
                                  <button className="btn_chat_profile busy-status">
                                    <span>
                                      <AiOutlineMessage /> Busy
                                    </span>
                                  </button>
                                ) : (
                                  // <button
                                  //   className="btn_chat_profile online-status"
                                  //   style={{ width: "50%" }}
                                  //   onClick={() => chatpopupbox(data)}
                                  // >
                                  //   <span>
                                  //     <AiOutlineMessage /> Chat{" "}
                                  //     {data.currency === "INR" ? "₹" : "$"}
                                  //     {data.per_min_chat}
                                  //     /min
                                  //   </span>
                                  // </button>
                                  <Chatfunction astroID={data.id} astrodata={data} type="profile" />
                                )}
                              </div>
                              <div className="btn d-flex" style={{ justifyContent: "center" }}>
                                {data.is_voice_online === "off" ? (
                                  <button className="btn_chat_profile offline-status">
                                    <span>
                                      <MdCall /> <span>Offline</span>
                                    </span>
                                  </button>
                                ) : data.is_busy === 1 ? (
                                  <button className="btn_chat_profile busy-status">
                                    <span>
                                      <MdCall /> Busy
                                    </span>
                                  </button>
                                ) : (
                                  <button className="btn_chat_profile online-status" onClick={() => callvrify(data)}>
                                    <span>
                                      <MdCall /> Call {data.currency === "INR" ? "₹" : "$"}
                                      {data.per_min_voice_call}/min
                                    </span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="heading">About me</p>
                          <div className="about-me-text">{data.about}</div>
                          {data.galary.length > 0 ? (
                            <section className="gallary_section mb-3">
                              <div className="">
                                <p className="heading mt-2">Gallery</p>

                                <div className="gallery">
                                  {data.galary.map((data, i) => (
                                    <div className="gallery-item" key={i} style={{ cursor: "pointer" }}>
                                      {data?.file?.split(".")?.splice(-1)[0] == "jpg" && (
                                        <img className="gallery-image" src={data.file} alt="" onClick={() => gallaryshow(data)} />
                                      )}
                                      {data?.file?.split(".")?.splice(-1)[0] == "mp4" && (
                                        <video className="gallery-image" loop autoplay muted controls src={data.file} onClick={() => gallaryshow(data)}></video>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </section>
                          ) : (
                            ""
                          )}
                        </Card>
                        <section className="rating mt-3">
                          <div className="astrologer_rating mt-5 mb-4">
                            <div className="row">
                              <div className="col-md-6 col-lg-12 col-xl-12">
                                <Card className="p-3">
                                  <div>
                                    <div className="text-center" style={{ fontSize: "20px" }}>
                                      Rating
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col-md-5 col-lg-5 col-xl-5">
                                      <div className="rating_card">
                                        <div>
                                          <div>
                                            <h2>{data?.avg_rat?.toFixed(1)}</h2>
                                            <div>
                                              <ReactStars
                                                style={{ justifyContent: "center" }}
                                                count={data.avg_rat}
                                                size={24}
                                                activeColor="#eed90f"
                                                isHalf={true}
                                                edit={false}
                                                classNames="star_class"
                                              />

                                              <div className="">
                                                <i className="fa fa-user pr-1" aria-hidden="true"></i>
                                                {data.total_rating} total
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-7 col-lg-7 col-xl-7">
                                      <div className="row">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                          <span>
                                            <h5>5</h5>
                                          </span>
                                        </div>
                                        <div className="col-md-10 col-lg-10 col-xl-10 pt-2">
                                          <span className="progress">
                                            <span
                                              className="progress-bar"
                                              role="progressbar"
                                              style={{
                                                width: `${data?.rating5}%`,
                                                backgroundColor: "#3ed33e",
                                              }}
                                              aria-valuenow="25"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                          <span>
                                            <h5>4</h5>
                                          </span>
                                        </div>
                                        <div className="col-md-10 col-lg-10 col-xl-10 pt-2">
                                          <span className="progress">
                                            <span
                                              className="progress-bar"
                                              role="progressbar"
                                              style={{
                                                width: `${data?.rating4}%`,
                                                backgroundColor: "#2196f3",
                                              }}
                                              aria-valuenow="25"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                          <span>
                                            <h5>3</h5>
                                          </span>
                                        </div>
                                        <div className="col-md-10 col-lg-10 col-xl-10 pt-2">
                                          <span className="progress">
                                            <span
                                              className="progress-bar"
                                              role="progressbar"
                                              style={{
                                                width: `${data?.rating3}%`,
                                                backgroundColor: "#1ebed3",
                                              }}
                                              aria-valuenow="20"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                          <span>
                                            <h5>2</h5>
                                          </span>
                                        </div>
                                        <div className="col-md-10 col-lg-10 col-xl-10 pt-2">
                                          <span className="progress">
                                            <span
                                              className="progress-bar"
                                              role="progressbar"
                                              style={{
                                                width: `${data?.rating2}%`,
                                                backgroundColor: "#ed9410",
                                              }}
                                              aria-valuenow="25"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                          <span>
                                            <h5>1</h5>
                                          </span>
                                        </div>
                                        <div className="col-md-10 col-lg-10 col-xl-10 pt-2">
                                          <span className="progress">
                                            <span
                                              className="progress-bar"
                                              role="progressbar"
                                              style={{
                                                width: `${data?.rating1}%`,
                                                backgroundColor: "red",
                                              }}
                                              aria-valuenow="25"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              </div>

                              <div className="col-md-6 col-lg-12 col-xl-12 mt-3">
                                <Card className="p-3 astro_comment_section">
                                  {data.rating.length > 0
                                    ? data.rating.map((item, index) => (
                                      <div className="col-sm-12 col-md-6 col-lg-12 col-xl-12">
                                        <div className="outerCard ">
                                          <div
                                            className="main_card d-flex"
                                            style={{
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            <div className="card_box d-flex">
                                              <div className="pr-2">
                                                <div className="profile_pic">
                                                  <div className="picture_profile bg_dark_green_name" style={{ backgroundColor: "#a09e99" }}>
                                                    {item.name.slice(0, 1)}
                                                  </div>
                                                </div>
                                              </div>

                                              <div>
                                                <ReactStars
                                                  style={{
                                                    justifyContent: "center",
                                                  }}
                                                  count={5}
                                                  value={item.rating}
                                                  size={20}
                                                  activeColor="#FFB450"
                                                  color="#ABABAB"
                                                  isHalf={true}
                                                  edit={false}
                                                  classNames="star_class"
                                                  emptyIcon={<AiFillStar />}
                                                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                  fullIcon={<AiFillStar />}
                                                />

                                                <div className="">{item.Created_date.slice(0, 10)}</div>
                                                <p>{item?.review}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                    : " no Data"}
                                </Card>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <section className="container ourastrologer mt-3 mb-5">
          <OurAstrologerCrousal astro={AstrologerList} />
        </section>
      </div>
      <UserLogin open={Loginpopup} close={() => logindialogbox()} />
      <ProfileChat data={AstroProfile} open={chatpopup} close={() => chatpopupbox()} />
      <ProfileCall data={AstroProfile} open={callsection} close={() => setcallsection(!callsection)} astro={astroid} />
      <Gallary file={gallaryfile} open={gallarypopup} close={() => setgallarypopup(!gallarypopup)} />
      <Loder loading={isloading} />
    </>
  );
};

export default HOC(AstrologerProfile);
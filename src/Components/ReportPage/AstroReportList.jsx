import React, { useEffect, useContext, useState } from "react";
import HOC from "../../Common/HOC";
import a from "../../images/sign.png";
import { useNavigate } from "react-router-dom";
import "./AstroReportList.css";
import { Card } from "@material-ui/core";
import { notificationHandler } from "../utils/Notification";
import ReactStars from "react-rating-stars-component";
import UserLogin from "../DialogeBox/UserLogin";
import Cookies from "js-cookie";
import { AiOutlineMessage, AiFillStar } from "react-icons/ai";
import { FaFileSignature } from "react-icons/fa";
import AskQuestion from "../DialogeBox/AskQuestion";
import ListSkeleton, { FilterSkeleton } from "../skeleton/skeletoncard";
import astrologer_list_api, { category_list_api, language_list_api } from "../api/astrochat";
import dummy from "../../images/dummy.jpg";
import SEO from "../Seo/seo";
import DataNotFound from "../DataNotFound";
import { useLocation } from "react-router-dom";
import ReportForm from "../DialogeBox/ReportForm";
import { report_form_add_api } from "../api/notifyapi";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
import { get_profile_api } from "../api/authapi";
import RechargePopup2 from "../DialogeBox/RechargePopup2";
import { UserContext } from "../../App";
const AstroReportList = () => {
  const { state, dispatch } = useContext(UserContext);
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");
  const currency = Cookies.get("country");
  const location = useLocation();
  const navigate = useNavigate();
  const [Loginpopup, setLoginpopup] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [astrologerdataArry, setastrologerdataArry] = useState([]);
  const [rechargenow, setrechargenow] = useState(false);
  const [walletBalance, setwalletBalance] = useState("");
  const [report_price, setreport_price] = useState("");
  const [astroID, setastroID] = useState("");
  const [name, setname] = useState("");
  const [reportdialogbox, setreportdialogbox] = useState(false);
  console.log(location);
  console.log("state", state);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 1000);
    Astrologerdata();
  }, []);

  useEffect(() => {
    if (auth === "true") {
      get_profile();
    }
  }, []);

  const get_profile = async () => {
    setisloading(true);
    try {
      const res = await get_profile_api();
      if (res.data.status) {
        setwalletBalance(res.data.results_web.wallet);
        console.log("wallet", res.data.results_web.wallet);
        dispatch({
          type: "USER",
          payload: {
            ...state,
            results_web: res.data.results_web,
            wallet: res.data.results_web.wallet,
          },
        });
        setisloading(false);
        console.log("state", state);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const askfun = (data) => {
    setreport_price(data.report_price);
    setastroID(data.id);
    console.log(data);

    if (auth === "true" && auth) {
      get_profile();
      return setreportdialogbox(!reportdialogbox);
    }
    setLoginpopup(true);
  };

  const Astrologerdata = async () => {
    setisloading(true);
    try {
      let temp = {
        token: token,
        is_chat: "",
        currency,
        skill_id: "",
        language_id: "",
        is_voice_call: "",
        is_video_call: "",
        is_question: "",
        report_id: location.state.id,
        page: "1",
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setastrologerdataArry(res.data.results);
        setisloading(false);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      setisloading(false);
    }
  };

  const logindialogbox = () => {
    setLoginpopup(!Loginpopup);
  };

  const walletrecharge = () => {
    setrechargenow(!rechargenow);
  };

  const filterCategoryDataArr = astrologerdataArry.filter((event) => {
    return event.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
  });

  const report_form_add = async (name, gender, occupation, maritalstatus, comments, dob, pob, tob) => {
    if (walletBalance < parseInt(report_price)) {
      walletrecharge();
      setreportdialogbox(!reportdialogbox);
      return;
    }

    try {
      let temp = {
        astro_id: astroID,
        report_type: location.state.id,
        first_name: name,
        last_name: "",
        number: "",
        gender: gender,
        dob: dob,
        tob: tob,
        pob: pob,
        address: "",
        marital_status: maritalstatus,
        occupation: occupation,
        amount: report_price,
        any_comments: comments,
        ans_language: "hinde",
        is_payment_done: "YES",
      };

      const res = await report_form_add_api(temp);
      if (res.status) {
        notificationHandler({ type: "success", msg: res.data.message });
        setreportdialogbox(!reportdialogbox);
        get_profile();
        setisloading(false);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
      }
    } catch (error) {
      console.log(error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  return (
    <>
      <SEO
        title="Ask Report - Free Online Astrology Predictions by Best Astrologer"
        description="Rakshaa is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me"
        url="https://Rakshaa.com/static/media/Rakshaalogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding pb-5">
        {/* <div className="free_kundli_banner p-5">
          <div className="container chat_container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h1 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  ASK Report
                </h1>
                <span className="header_banner pt-5">Get instant & accurate, Janam Kundli</span>
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} alt="image" />
              </div>
            </div>
          </div>
        </div> */}

        <section>
          <div className="container">
            <div className="search_box_astromall_new mt-5">
              <input
                type="search"
                name="productSearch"
                id="productSearch"
                className="mat-autocomplete-trigger ng-valid ng-touched ng-dirty"
                placeholder="Let's find what you're looking for..."
                role="combobox"
                aria-expanded="false"
                aria-haspopup="true"
                onChange={(e) => setname(e.target.value)}
              />
              <i className="fa fa-search"></i>
            </div>
            <BreadcrumbSection tittle="Ask Report" />
            <div className="row">
              <div className="col-md-12">
                <div className="astro_card_new mt-5 mb-5">
                  {!isloading ? (
                    <div className="row">
                      {filterCategoryDataArr.length > 0 ? (
                        filterCategoryDataArr.map((data, index) => (
                          <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-3" key={index} style={{ paddingRight: "0" }}>
                            <Card className="Card_shadow card_div p-2">
                              <div className="astro-card-container">
                                <div
                                  id="card"
                                  onClick={() =>
                                    navigate(`/astrologer_profile/${data.id}`, {
                                      state: data,
                                    })
                                  }
                                >
                                  <div className="card_top">
                                    <div className="top_left">
                                      <div className="left">{data?.profile_img === "" ? <img src={dummy} /> : <img src={data?.profile_img} />}</div>
                                    </div>
                                    <div className="top_right">
                                      <div className="astro_detail">
                                        <div className="name">
                                          {data.name.substring(0, 12)}
                                          {data.name.length > 12 && "..."}
                                        </div>
                                        <div className="exp">{data?.experience} Yr Exp.</div>
                                      </div>
                                      <div className="prof">
                                        {data?.category.slice(0, 3).map((row, index) => (
                                          <span key={index}>{row?.name.substring(0, 40) + ","}</span>
                                        ))}
                                      </div>
                                      <div className="lang">
                                        {data?.language.slice(0, 4).map((row, index) => (
                                          <span key={index}>{row?.name + ", "}</span>
                                        ))}
                                      </div>
                                      <div className="star">
                                        <div className="star_container">
                                          <ReactStars
                                            style={{
                                              justifyContent: "center",
                                            }}
                                            count={5}
                                            value={data.rating}
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
                                        <div
                                          className="reviews_data"
                                          style={{
                                            color: "#ff0000",
                                            fontSize: "0.7rem",
                                          }}
                                        ></div>
                                        {/* {data.is_chat_online === "off" ? (
                                          <div
                                            style={{
                                              color: "#ff0000",
                                              fontSize: "0.7rem",
                                            }}
                                          ></div>
                                        ) : (
                                          <div
                                            style={{
                                              color: "#ff0000",
                                              fontSize: "0.7rem",
                                            }}
                                          >
                                            {data.is_busy === 1 ? <span>• ({data.watting_time} min waiting)</span> : ""}
                                          </div>
                                        )} */}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card_bottom">
                                    <div style={{ fontWeight: "500" }}>
                                      {data.currency === "INR" ? "₹" : "$"} {data?.report_price}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="btn astro-meet-btn-call">
                                <button
                                  className="btn_chat online-status"
                                  onClick={() => askfun(data)}
                                  // onClick={() => setreportdialogbox(!reportdialogbox)}
                                >
                                  <span>
                                    <FaFileSignature /> Ask Report
                                  </span>
                                </button>
                              </div>
                            </Card>
                          </div>
                        ))
                      ) : (
                        <DataNotFound />
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="d-flex">
                        <ListSkeleton listsToRender={2} />
                      </div>
                      <div className="d-flex">
                        <ListSkeleton listsToRender={2} />
                      </div>
                      <div className="d-flex">
                        <ListSkeleton listsToRender={2} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <UserLogin open={Loginpopup} close={() => logindialogbox()} />
      <RechargePopup2 open={rechargenow} walletBalance={walletBalance} price={report_price} close={() => walletrecharge()} />
      <ReportForm open={reportdialogbox} close={() => setreportdialogbox(!reportdialogbox)} onsubmit={report_form_add} />
    </>
  );
};

export default HOC(AstroReportList);

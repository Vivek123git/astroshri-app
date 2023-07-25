import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import a from "../../images/sign.png";
import b from "../../images/tick_icon.png";
import { useNavigate } from "react-router-dom";
import "./AskAstrologer.css";
import { Card } from "@material-ui/core";
import { notificationHandler } from "../utils/Notification";
import { getBaseUrl } from "../utils";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import UserLogin from "../../Components/DialogeBox/UserLogin";
import RechargePopup from "../DialogeBox/RechargePopup";
import Cookies from "js-cookie";
import { AiOutlineMessage, AiFillStar } from "react-icons/ai";
import AskQuestion from "../DialogeBox/AskQuestion";
import ListSkeleton, { FilterSkeleton } from "../skeleton/skeletoncard";
import astrologer_list_api, { category_list_api, language_list_api } from "../api/astrochat";
import dummy from "../../images/dummy.jpg";
import SEO from "../Seo/seo";
import { get_profile_api } from "../api/authapi";
import DataNotFound from "../DataNotFound";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
const AskAstrologer = () => {
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");
  const currency = Cookies.get("country");
  const navigate = useNavigate();
  const [Loginpopup, setLoginpopup] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [astrologerdataArry, setastrologerdataArry] = useState([]);
  const [CategoriesListArry, setCategoriesListArry] = useState([]);
  const [AstroLanguageListArry, setAstroLanguageListArry] = useState([]);
  const [rechargenow, setrechargenow] = useState(false);
  const [question, setquestion] = useState(false);
  const [astroID, setastroID] = useState("");
  const [gender, setgender] = useState("");
  const [sortby, setsortby] = useState("");
  const [All, setAll] = useState(false);
  const [search, setsearch] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  ////filter Arry
  const [categoryIdArry, setcategoryIdArry] = useState([]);
  const [AstroskillIdArry, setAstroskillIdArry] = useState([]);
  const [languageIdArry, setlanguageIdArry] = useState([]);

  useEffect(() => {
    category_list();
    language_list();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    Astrologerdata();
  }, []);

  const searchbykey = async (e) => {
    setsearch(e.target.search);
    // setisloading(true);
    try {
      let temp = {
        token: token,
        is_chat: "",
        skill_id: "",
        currency,
        language_id: "",
        search: e.target.value,
        is_voice_call: "",
        is_video_call: "",
        is_question: "on",
        page: "1",
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setastrologerdataArry(res.data.results);
        setisloading(false);
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

  const Astrologerdata = async () => {
    setisloading(true);
    setAll(true);
    try {
      let temp = {
        token: token,
        is_chat: "",
        currency,
        skill_id: "",
        language_id: "",
        search: search,
        is_voice_call: "",
        is_video_call: "",
        is_question: "on",
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

  const category_list = async () => {
    setisloading(true);
    try {
      const res = await category_list_api();
      if (res.data.status) {
        res.data.results.map((item) => {
          item.check = false;
        });
        setCategoriesListArry(res.data.results);
        setisloading(false);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const language_list = async () => {
    setisloading(true);
    try {
      const res = await language_list_api();
      if (res.data.status) {
        setAstroLanguageListArry(res.data.results);
        setisloading(false);
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

  const categoryId = (e, data, index) => {
    let i = index;
    CategoriesListArry.map((row, i) => {
      if (data === row) {
        if (e.target.checked) {
          categoryIdArry.push(row.id);
        } else {
          const index = categoryIdArry.indexOf(row.id);
          if (index > -1) {
            categoryIdArry.splice(index, 1);
          }
        }
      }
    });
    filterdatabyCategory();
  };

  const filterdatabyCategory = async () => {
    setAll(false);
    setisloading(true);
    try {
      let temp = {
        cat_id: categoryIdArry.toString(),
        skill_id: AstroskillIdArry.toString(),
        language_id: languageIdArry.toString(),
        is_chat: "",
        currency,
        is_voice_call: "",
        is_video_call: "",
        search: "",
        is_question: "on",
        page: "1",
        sort_val: sortby,
        gender: gender,
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
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const languageId = (e, data, index) => {
    AstroLanguageListArry.map((row, index) => {
      if (data === row) {
        if (e.target.checked) {
          languageIdArry.push(data.id);
        } else {
          let index = languageIdArry.indexOf(row.id);
          if (index > -1) {
            languageIdArry.splice(index, 1);
          }
        }
      }
    });

    languageIdfilter();
  };
  const languageIdfilter = async () => {
    setAll(false);
    setisloading(true);
    try {
      let temp = {
        cat_id: categoryIdArry.toString(),
        skill_id: AstroskillIdArry.toString(),
        language_id: languageIdArry.toString(),
        is_chat: "",
        currency,
        is_voice_call: "",
        is_video_call: "",
        is_question: "on",
        search: "",
        page: "1",
        sort_val: sortby,
        gender: gender,
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
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const logindialogbox = () => {
    setLoginpopup(!Loginpopup);
  };

  const clearFilter = () => {
    const arry = [];
    setlanguageIdArry([...arry]);
    setcategoryIdArry([...arry]);
    setgender("");
    setsortby("");
    Astrologerdata();
  };

  const walletrecharge = () => {
    setrechargenow(!rechargenow);
  };

  const askfun = (data) => {
    setastroID(data.id);
    if (auth === "true" && auth) {
      return setquestion(true);
    }
    setLoginpopup(true);
  };

  ///price,gender and experince filter api
  const sortingbyfilter = async (data) => {
    const gender = data.gender;
    const sortby = data.sortby;
    setisloading(true);
    try {
      let temp = {
        cat_id: categoryIdArry.toString(),
        skill_id: AstroskillIdArry.toString(),
        language_id: languageIdArry.toString(),
        is_chat: "",
        currency,
        is_voice_call: "",
        is_video_call: "",
        is_question: "on",
        search: "",
        page: "1",
        sort_val: sortby,
        gender: gender,
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setastrologerdataArry(res.data.results);
        console.log(res.data.results);
        setisloading(false);
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

  return (
    <>
      <SEO
        title="Ask with Astrologer - Free Online Astrology Predictions by Best Astrologer"
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
                  ASK WITH ASTROLOGER
                </h1>
                <span className="header_banner pt-5">Get instant & accurate, Janam Kundli</span>
              
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} alt="image" />
              </div>
            </div>
          </div>
        </div> */}
        <div className="responsive-filter">
          <div
            onClick={() => {
              if (activeTab === "filter") return setActiveTab("");
              setActiveTab("filter");
            }}
          >
            <FiFilter /> Filter
          </div>
          <div
            onClick={() => {
              if (activeTab === "search") return setActiveTab("");
              setActiveTab("search");
            }}
          >
            <IoSearchOutline /> Search
          </div>
        </div>
        <section>
          <div className="container">
            <div className={`search_box_astromall_new mt-5 ${activeTab !== "search" ? "" : "search-hidden"}`}>
              <input
                type="search"
                name="productSearch"
                id="productSearch"
                className="mat-autocomplete-trigger ng-valid ng-touched ng-dirty"
                placeholder="Let's find what you're looking for..."
                role="combobox"
                aria-expanded="false"
                aria-haspopup="true"
                onChange={(e) => searchbykey(e)}
              />
              <i className="fa fa-search"></i>
            </div>
            <BreadcrumbSection tittle="Ask to Astrologer" />
            <div className="row">
              <div className="col-md-3">
                <section className={`filter filter-section-left mt-5 ${activeTab !== "filter" ? "filter-hidden" : ""}`}>
                  <div className="">
                    <Card className="Card_shadow p-3">
                      <div className="d-flex justify-content-between">
                        <h5 className="productFilter_filterHeading">Skill</h5>
                        <h5 className="productFilter_filterHeading" onClick={() => clearFilter()} style={{ cursor: "pointer" }}>
                          Clear
                        </h5>
                      </div>

                      <div className="experties_catagories">
                        {/* <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            onClick={() => Astrologerdata()}
                            checked={All === true ? "checked" : ""}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            All
                          </label>
                        </div> */}
                        {CategoriesListArry && CategoriesListArry.length > 0 ? (
                          <div>
                            {CategoriesListArry.map((data, index) => (
                              <div className="form-check filter_categories_color" key={index}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={data?.name}
                                  value={data.checkbox}
                                  onClick={(e) => categoryId(e, data, index)}
                                  checked={categoryIdArry.includes(data.id)}
                                />
                                <label className="form-check-label" htmlFor={data?.name}>
                                  {data?.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ width: "100%" }}>
                            <FilterSkeleton listsToRender={1} width="300" />
                          </div>
                        )}
                      </div>

                      <div className="experties_catagories">
                        <div>
                          <h5 className="productFilter_filterHeading">Languages</h5>
                        </div>
                        {AstroLanguageListArry && AstroLanguageListArry.length > 0 ? (
                          <div>
                            {AstroLanguageListArry.map((data, index) => (
                              <div className="form-check " key={index}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={data.name}
                                  onClick={(e) => languageId(e, data, index)}
                                  checked={languageIdArry.includes(data.id)}
                                />
                                <label className="form-check-label" htmlFor={data.name}>
                                  {data.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ width: "100%" }}>
                            <FilterSkeleton listsToRender={1} width="300" />
                          </div>
                        )}
                      </div>

                      <div className="experties_catagories">
                        <div>
                          <h5 className="productFilter_filterHeading">Gender</h5>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value=""
                            id="Male"
                            onClick={(e) => {
                              sortingbyfilter({ gender: "Male", sortby });
                              setgender("Male");
                              setAll(false);
                            }}
                            checked={gender.includes("Male")}
                          />
                          <label className="form-check-label" htmlFor="Male">
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value=""
                            id="Female"
                            onClick={(e) => {
                              sortingbyfilter({ gender: "Female", sortby });
                              setgender("Female");
                              setAll(false);
                            }}
                            checked={gender.includes("Female")}
                          />
                          <label className="form-check-label" htmlFor="Female">
                            Female
                          </label>
                        </div>
                      </div>

                      <div className="experties_catagories">
                        <div>
                          <h5 className="productFilter_filterHeading">Sort by</h5>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="price"
                            value=""
                            id="flexCheckChecked"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "high_to_low_exp",
                              });
                              setsortby("high_to_low_exp");
                              setAll(false);
                            }}
                            checked={sortby == "high_to_low_exp"}
                          />
                          <label className="form-check-label" htmlFor="flexCheckChecked">
                            Experience : High to Low
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="price"
                            value=""
                            id="low_to_high_exp"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "low_to_high_exp",
                              });
                              setsortby("low_to_high_exp");
                              setAll(false);
                            }}
                            checked={sortby == "low_to_high_exp"}
                          />
                          <label className="form-check-label" htmlFor="low_to_high_exp">
                            Experience : Low to High
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="price"
                            value=""
                            id="high_to_low"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "high_to_low",
                              });
                              setsortby("high_to_low");
                              setAll(false);
                            }}
                            checked={sortby == "high_to_low"}
                          />
                          <label className="form-check-label" htmlFor="high_to_low">
                            Price : High to Low
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="price"
                            value=""
                            id="low_to_high"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "low_to_high",
                              });
                              setsortby("low_to_high");
                              setAll(false);
                            }}
                            checked={sortby == "low_to_high"}
                          />
                          <label className="form-check-label" htmlFor="low_to_high">
                            Price : Low to High
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="price"
                            value=""
                            id="high_to_low_rating"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "high_to_low_rating",
                              });
                              setsortby("high_to_low_rating");
                              setAll(false);
                            }}
                            checked={sortby == "high_to_low_rating"}
                          />
                          <label className="form-check-label" htmlFor="high_to_low_rating">
                            Rating : High to Low
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="price"
                            value=""
                            id="low_to_high_rating"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "low_to_high_rating",
                              });
                              setsortby("low_to_high_rating");
                              setAll(false);
                            }}
                            checked={sortby == "low_to_high_rating"}
                          />
                          <label className="form-check-label" htmlFor="low_to_high_rating">
                            Rating : Low to High
                          </label>
                        </div>
                      </div>
                    </Card>
                  </div>
                </section>
              </div>

              <div className="col-md-9">
                <div className="astro_card_new mt-5 mb-5">
                  {!isloading ? (
                    <div className="row">
                      {astrologerdataArry.length > 0 ? (
                        astrologerdataArry.map((data, index) => (
                          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3" key={index} style={{ paddingRight: "0" }}>
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
                                    {data.per_question_price_offer > 0 ? (
                                      <div style={{ fontWeight: "500" }}>
                                        <span
                                          style={{
                                            textDecoration: "line-through",
                                            color: "gray",
                                          }}
                                        >
                                          {data.currency === "INR" ? "₹" : "$"} {data?.per_question_price}
                                        </span>
                                        {data.currency === "INR" ? "₹" : "$"} {data?.per_question_price_offer} Only per Question
                                      </div>
                                    ) : (
                                      <div style={{ fontWeight: "500" }}>
                                        {data.currency === "INR" ? "₹" : "$"} {data?.per_question_price} Only per Question
                                      </div>
                                    )}

                                    {/* <div style={{ fontWeight: "500" }}>
                                  {currency === "INR" ? "₹" : "$"} {data?.per_min_chat} Only per Mint
                              </div> */}
                                  </div>
                                </div>
                              </div>
                              <div className="btn astro-meet-btn-call">
                                {data.is_voice_online === "off" ? (
                                  <button className="btn_chat offline-status">
                                    <span>
                                      <AiOutlineMessage /> <span>Offline</span>
                                    </span>
                                  </button>
                                ) : (
                                  <button className="btn_chat online-status" onClick={() => askfun(data)}>
                                    <span>
                                      <AiOutlineMessage /> Ask
                                    </span>
                                  </button>
                                )}
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
      <RechargePopup open={rechargenow} close={() => walletrecharge()} />
      <AskQuestion open={question} close={() => setquestion(!question)} astro={astroID} />
    </>
  );
};

export default HOC(AskAstrologer);

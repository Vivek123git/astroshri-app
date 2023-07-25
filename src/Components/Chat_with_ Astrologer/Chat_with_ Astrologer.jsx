import React, { useEffect, useState, useContext } from "react";
import HOC from "../../Common/HOC";
import a from "../../images/sign.png";
import { useNavigate } from "react-router-dom";
import { Card } from "@material-ui/core";
import { notificationHandler } from "../utils/Notification";
import ReactStars from "react-rating-stars-component";
import RechargePopup from "../DialogeBox/RechargePopup";
import "./Chat_with_ Astrologer.css";
import { AiOutlineMessage, AiFillStar } from "react-icons/ai";
import UserLogin from "../../Components/DialogeBox/UserLogin";
import AstroStatus from "../DialogeBox/AstroStatus";
import { UserContext } from "../../App";
import Cookies from "js-cookie";
import dummy from "../../images/dummy.jpg";
import SEO from "../Seo/seo";
import { get_profile_api } from "../api/authapi";
import astrologer_list_api, { call_initiate_api, call_initiate_status_api, category_list_api, language_list_api, notifyme_api } from "../api/astrochat";
import ListSkeleton, { FilterSkeleton } from "../skeleton/skeletoncard";
import Chatfunction from "../function/Chatfunction";
import DataNotFound from "../DataNotFound";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
import team1 from "../../images/team6.png";
import scrollLoaderGIF from "../../images/scrollLoaderGIF.gif";
//scroll
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const Chat_with_Astrologer = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [callendedId, setcallendedId] = useState("");
  const userID = Cookies.get("userID");
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");
  const currency = Cookies.get("country");
  const [isloading, setisloading] = useState(false);
  const [astroListLoading, setastroListLoading] = useState(true);
  const [astrologerdataArry, setastrologerdataArry] = useState([]);
  const [walletBalance, setwalletBalance] = useState("");
  const [CategoriesListArry, setCategoriesListArry] = useState([]);
  const [AstroLanguageListArry, setAstroLanguageListArry] = useState([]);
  const [Astrores, setAstrores] = useState(false);
  const [astrostatus, setastrostatus] = useState("initiate");
  const [rechargenow, setrechargenow] = useState(false);
  const [All, setAll] = useState(true);
  const [asrropricepopup, setasrropricepopup] = useState("");
  const [categoryIdArry, setcategoryIdArry] = useState([]);
  const [AstroskillIdArry, setAstroskillIdArry] = useState([]);
  const [languageIdArry, setlanguageIdArry] = useState([]);
  const [gender, setgender] = useState("");
  const [sortby, setsortby] = useState("");
  const [Loginpopup, setLoginpopup] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [search, setsearch] = useState("");

  // pagination
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [hasMore, sethasMore] = useState(true);

  useEffect(() => {
    if (auth === "true" && !userID) {
      setisloading(true);
    }
    if (auth === "true") {
      get_profile();
    }
    category_list();
    language_list();
  }, []);

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
    Astrologerdata();
  }, [page]);

  useEffect(() => {
    if (categoryIdArry.length === 0) setpage(1);
    if (AstroskillIdArry.length === 0) setpage(1);
    if (languageIdArry.length === 0) setpage(1);
  }, [categoryIdArry, AstroskillIdArry, languageIdArry]);

  const get_profile = async () => {
    setisloading(true);
    try {
      const res = await get_profile_api();
      if (res.data.status) {
        setwalletBalance(res.data.results_web.wallet);
        dispatch({
          type: "USER",
          payload: {
            ...state,
            results_web: res.data.results_web,
            wallet: res.data.results_web.wallet,
          },
        });
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

  const searchbykey = async (e) => {
    setsearch(e.target.search);
    // setisloading(true);
    setastroListLoading(true);
    try {
      let temp = {
        token: token,
        is_chat: "on",
        skill_id: "",
        currency,
        language_id: "",
        search: e.target.value,
        is_voice_call: "",
        is_video_call: "",
        is_question: "",
        page: page === 2 ? 1 : page,
        limit: limit,
      };
      const res = await astrologer_list_api(temp);
      setastrologerdataArry([]);
      if (res.data.status) {
        if (res.data.results.length === 0) sethasMore(false);
        setastrologerdataArry((arr) => arr.concat(res.data.results));
        setisloading(false);
        setastroListLoading(false);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
        setastroListLoading(false);
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
      setastroListLoading(false);
    }
  };

  const Astrologerdata = async () => {
    setAll(true);
    setisloading(true);
    // setastroListLoading(true);
    try {
      let temp = {
        token: token,
        is_chat: "on",
        currency,
        skill_id: "",
        language_id: "",
        search: search,
        is_voice_call: "",
        is_video_call: "",
        is_question: "",
        page: page === 2 ? 1 : page,
        limit: limit,
        cat_id: categoryIdArry.toString(),
        skill_id: AstroskillIdArry.toString(),
        language_id: languageIdArry.toString(),
        sort_val: sortby,
        gender: gender,
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        // setastrologerdataArry(res.data.results);
        if (res.data.results.length === 0) sethasMore(false);
        setastrologerdataArry((arr) => arr.concat(res.data.results));
        setisloading(false);
        setastroListLoading(false);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        setastroListLoading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      setisloading(false);
      setastroListLoading(false);
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
    setastroListLoading(true);
    try {
      let temp = {
        cat_id: categoryIdArry.toString(),
        skill_id: AstroskillIdArry.toString(),
        language_id: languageIdArry.toString(),
        is_chat: "on",
        currency,
        is_voice_call: "",
        is_video_call: "",
        search: "",
        sort_val: sortby,
        gender: gender,
        page: page,
        limit: limit,
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        if (res.data.results.length === 0) sethasMore(false);
        setastrologerdataArry(res.data.results);
        setisloading(false);
        setastroListLoading(false);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
        setastroListLoading(false);
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
      setastroListLoading(false);
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
    setastroListLoading(true);
    try {
      let temp = {
        cat_id: categoryIdArry.toString(),
        skill_id: AstroskillIdArry.toString(),
        language_id: languageIdArry.toString(),
        is_chat: "on",
        currency,
        is_voice_call: "",
        is_video_call: "",
        search: "",
        sort_val: sortby,
        gender: gender,
        page: page,
        limit: limit,
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        if (res.data.results.length === 0) sethasMore(false);
        setastrologerdataArry(res.data.results);
        setisloading(false);
        setastroListLoading(false);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        setastroListLoading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
      setastroListLoading(false);
    }
  };

  const logindialogbox = () => {
    setLoginpopup(!Loginpopup);
  };

  ///price,gender and experince filter api
  const sortingbyfilter = async (data) => {
    const gender = data.gender;
    const sortby = data.sortby;
    setisloading(true);
    setastroListLoading(true);
    try {
      let temp = {
        cat_id: categoryIdArry.toString(),
        skill_id: AstroskillIdArry.toString(),
        language_id: languageIdArry.toString(),
        is_chat: "on",
        currency,
        is_voice_call: "",
        is_video_call: "",
        search: "",
        sort_val: sortby,
        gender: gender,
        page: page,
        limit: limit,
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        if (res.data.results.length === 0) sethasMore(false);
        setastrologerdataArry(res.data.results);
        setisloading(false);
        setastroListLoading(false);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
        setastroListLoading(false);
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
      setastroListLoading(false);
    }
  };

  const user_notify = async (data) => {
    if (auth === "true") {
      const temp = {
        astro_id: data,
      };
      try {
        const res = await notifyme_api(temp);
        if (res.data.status) {
          notificationHandler({ type: "success", msg: res.data.message });
        } else {
          notificationHandler({ type: "success", msg: res.data.message });
          console.log("data response error:::", res);
        }
      } catch (error) {
        console.log("data response error:::", error);
        notificationHandler({ type: "danger", msg: error });
      }
    } else {
      setLoginpopup(!Loginpopup);
    }
  };
  const clearFilter = () => {
    const arry = [];
    setlanguageIdArry([...arry]);
    setcategoryIdArry([...arry]);
    setgender("");
    setsortby("");
    setastroListLoading(true);
    Astrologerdata();
  };
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        console.log(response.data.users);
        setPosts(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <SEO
        title="Chat with Astrologer - Free Online Astrology Predictions by Best Astrologer"
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
                  CHAT WITH ASTROLOGER
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
            <BreadcrumbSection tittle="Chat with Astrologer" />
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
                  {!astroListLoading ? (
                    <InfiniteScroll
                      dataLength={astrologerdataArry?.length}
                      next={() => setpage(page + 1)}
                      hasMore={hasMore}
                      loader={
                        astrologerdataArry?.length !== 0 &&
                        astrologerdataArry?.length > limit && (
                          <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
                            <img src={scrollLoaderGIF} style={{ height: "40px", width: "40px" }} alt="" />
                          </h4>
                        )
                      }
                      endMessage={
                        astrologerdataArry?.length !== 0 && (
                          <p style={{ textAlign: "center", marginTop: "1rem" }}>
                            <b>No more data found.</b>
                          </p>
                        )
                      }
                    >
                      <div className="row">
                        {posts.length > 0 ? (
                          <>
                            {posts.map((data, index) => (
                              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3" key={index} style={{ paddingRight: "0" }}>
                                <Card className="Card_shadow card_div p-2">
                                  <div className="astro-card-container">
                                    <div
                                      id="card"
                                      // onClick={(e) => {
                                      //   navigate(`/astrologer_profile/${data.id}`, {
                                      //     state: data,
                                      //   });
                                      // }}
                                    >
                                      <div className="card_top">
                                        <div className="top_left">
                                          <div className="left">
                                            <div className="left">
                                              <img src={dummy} />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="top_right">
                                          <div className="astro_detail">
                                            <div className="name">
                                              {data.firstName.substring(0, 12)}
                                              {data.firstName.length > 12 && "..."}
                                            </div>
                                            <div className="exp">7 Yr Exp.</div>
                                          </div>
                                          <div className="prof">
                                            <span>Card Reader ,Psychic Reader</span>
                                          </div>
                                          <div className="lang">
                                            <span>English,Hindi</span>
                                          </div>
                                          <div className="star">
                                            <div className="star_container">
                                              <ReactStars
                                                style={{ justifyContent: "center" }}
                                                count={5}
                                                value={5}
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
                                            >
                                              {/* {data.is_busy === 1 ? (
                                            <>
                                              ({data.watting_time}/min waiting)
                                            </>
                                          ) : (
                                            ""
                                          )} */}
                                            </div>
                                            {data.is_chat_online === "off" ? (
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
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="card_bottom">
                                        {data.per_min_chat_offer > 0 ? (
                                          <div style={{ fontWeight: "500" }}>
                                            <span
                                              style={{
                                                textDecoration: "line-through",
                                                color: "gray",
                                              }}
                                            >
                                              {data.currency === "INR" ? "₹" : "$"}
                                              {data?.per_min_chat}
                                            </span>
                                            {data.currency === "INR" ? "₹" : "$"} {data?.per_min_chat_offer}/min
                                          </div>
                                        ) : (
                                          <div style={{ fontWeight: "500" }}>₹ 20/min</div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="btn astro-meet-btn">
                                      {data.is_chat_online === "off" ? (
                                        <button className="btn_chat offline-status">
                                          <span>
                                            <AiOutlineMessage /> <span>Offline</span>
                                          </span>
                                        </button>
                                      ) : data.is_busy === 1 ? (
                                        <>
                                          <button className="btn_chat busy-status">
                                            <span>
                                              <AiOutlineMessage /> <span>Busy</span>
                                            </span>
                                          </button>
                                          <button className="btn_chat online-status mr-2" onClick={() => user_notify(data.id)}>
                                            <span>
                                              <AiOutlineMessage />
                                              <span>Notify</span>
                                            </span>
                                          </button>
                                        </>
                                      ) : (
                                        <Chatfunction astroID={data.id} astrodata={data} type="chat" />
                                      )}
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            ))}
                          </>
                        ) : (
                          <DataNotFound />
                        )}
                      </div>
                    </InfiniteScroll>
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
      <AstroStatus open={Astrores} status={astrostatus} channal={callendedId} close={() => setAstrores(!Astrores)} />
      <RechargePopup open={rechargenow} close={() => setrechargenow(!rechargenow)} walletBalance={walletBalance} price={asrropricepopup} />
    </>
  );
};

export default HOC(Chat_with_Astrologer);

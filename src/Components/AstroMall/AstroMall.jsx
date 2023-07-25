import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import "../FreeKundli/FreeKundli.css";
import "./AstroMall.css";
import "./Astroshopping.css";
import a from "../../images/c.gif";
import { notificationHandler } from "../utils/Notification";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Slider } from "@material-ui/core";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import UserLogin from "../../Components/DialogeBox/UserLogin";
import Cookies from "js-cookie";
import SEO from "../Seo/seo";
import homeapi from "../api/homeapi";
import { FilterSkeletonshop, ListSkeletonshop } from "../skeleton/skeletoncard";
import { wishlist_add_update_api } from "../api/wishlistapi";
import { product_category_list_api } from "../api/astromallapi";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";

const AstroMall = () => {
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");
  const [Loginpopup, setLoginpopup] = useState(false);
  const [isloading, setisloading] = useState(false);
  const currency = Cookies.get("country");
  const [productListArry, setproductListArry] = useState([]);
  const [allproductList, setallproductList] = useState([]);
  const [filterproduct, setfilterproduct] = useState([]);
  const [AstrologerList, setAstrologerList] = useState("");
  const [dualRangeValue, setDualRangeValue] = useState([0, 1000]);
  const [Active, setActive] = useState("");
  const [currentId, setcurrentId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  // useEffect(() => {
  //   LiveAstroData();
  //   product_category_list();
  // }, []);

  // const LiveAstroData = async () => {
  //   setisloading(true);
  //   try {
  //     const res = await homeapi();
  //     if (res.data.status) {
  //       setAstrologerList(res?.data?.astrologer);
  //     } else {
  //       console.log("data response error:::", res);
  //       notificationHandler({ type: "danger", msg: res.data.message });
  //     }
  //     setisloading(false);
  //   } catch (error) {
  //     console.log("data response error:::", error);
  //     notificationHandler({ type: "danger", msg: error });
  //     setisloading(false);
  //   }
  // };

  // const wishlist_add_update = (data) => {
  //   if (auth) {
  //     return add_update_wishlist(data);
  //   }
  //   setLoginpopup(true);
  // };
  // const add_update_wishlist = async (data) => {
  //   setisloading(true);
  //   let temp = {
  //     product_id: data.id,
  //   };
  //   try {
  //     const res = await wishlist_add_update_api(temp);
  //     if (res.data.status) {
  //       notificationHandler({ type: "success", msg: res.data.message });
  //       fetchProductFunc();
  //     } else {
  //       notificationHandler({ type: "danger", msg: res });
  //       console.log("data response error:::", res.data.message);
  //     }
  //   } catch (error) {
  //     notificationHandler({ type: "danger", msg: error });
  //     console.log("data response error:::", error);
  //   }
  // };

  // const product_category_list = async () => {
  //   setisloading(true);
  //   let config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  //   try {
  //     const res = await product_category_list_api(auth && config);
  //     if (res.data.status) {
  //       setproductListArry(res.data.results);
  //       setisloading(false);
  //       setcurrentId(res.data.results[0].id);
  //       firstProductFunc(res.data.results[0]);
  //     } else {
  //       console.log("data response error:::", res);
  //       notificationHandler({ type: "danger", msg: res.data.message });
  //     }
  //   } catch (error) {
  //     console.log("data response error:::", error);
  //     notificationHandler({ type: "danger", msg: error });
  //     setisloading(false);
  //   }
  // };

  // const handleChangeDual = (event, newValue) => {
  //   setDualRangeValue(newValue);
  //   if (allproductList) {
  //     let newList = allproductList.filter(
  //       (item) => item.price > newValue[0] && item.price < newValue[1]
  //     );
  //     setfilterproduct(newList);
  //   }
  // };

  // const logindialogbox = () => {
  //   setLoginpopup(!Loginpopup);
  // };

  // const firstProductFunc = (data) => {
  //   setisloading(true);
  //   setcurrentId(data.id);
  //   setActive(data.name);
  //   try {
  //     let url = getBaseUrl() + "web/product_list";
  //     let temp = {
  //       category_id: data.id,
  //     };
  //     let config = {
  //       headers: { Authorization: `Bearer ${token}` },
  //     };
  //     axios.post(url, temp, auth && config).then(
  //       (res) => {
  //         setallproductList(res.data.results);
  //         setfilterproduct(res.data.results);

  //         setisloading(false);
  //       },

  //       (error) => {
  //         console.log("data response error:::", error);
  //         setisloading(false);
  //         notificationHandler({ type: "danger", msg: error });
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchProductFunc = () => {
  //   setisloading(true);
  //   try {
  //     let url = getBaseUrl() + "web/product_list";
  //     let temp = {
  //       category_id: currentId,
  //     };
  //     let config = {
  //       headers: { Authorization: `Bearer ${token}` },
  //     };
  //     axios.post(url, temp, auth && config).then(
  //       (res) => {
  //         console.log("product List:::::", res.data.results);
  //         setallproductList(res.data.results);
  //         setfilterproduct(res.data.results);
  //         setisloading(false);
  //       },

  //       (error) => {
  //         console.log("data response error:::", error);
  //         setisloading(false);
  //         notificationHandler({ type: "danger", msg: error });
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const thridFunc = () => {
  //   if (currentId) {
  //     let url = getBaseUrl() + "web/product_list";
  //     setisloading(true);
  //     let temp = {
  //       category_id: currentId,
  //     };
  //     let config = {
  //       headers: { Authorization: `Bearer ${token}` },
  //     };
  //     axios.post(url, temp, auth && config).then(
  //       (res) => {
  //         console.log("product List:::::", res.data.results);
  //         setallproductList(res.data.results);
  //         setfilterproduct(res.data.results);
  //         setisloading(false);
  //       },

  //       (error) => {
  //         console.log("data response error:::", error);
  //         setisloading(false);
  //         notificationHandler({ type: "danger", msg: error });
  //       }
  //     );
  //   }
  // };

  // useEffect(() => {
  //   thridFunc();
  // }, [auth]);

  return (
    <>
      <SEO
        title="Astroshop - Free Online Astrology Predictions by Best Astrologer"
        description="Rakshaa is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me,Live Events,Free Kundli,Astroshop"
        url="https://Rakshaa.com/static/media/Rakshaalogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding" style={{ backgroundColor: "#fff" }}>
        {/* <div className="free_kundli_banner p-5">
          <div className="container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h1 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  Coming Soon.
                </h1>
             
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} />
              </div>
            </div>
          </div>
        </div> */}
        <div className="container">
          <BreadcrumbSection tittle="Astroshop" />
        </div>
        <div className="">
          <img className="coming-soon-page" src={a} />
        </div>

        {/* <section>
          <div className="shop_section mt-5">
            <div className="container">
              <div className="search_box_astromall_new">
                <input
                  type="search"
                  name="productSearch"
                  id="productSearch"
                  className="mat-autocomplete-trigger ng-valid ng-touched ng-dirty"
                  placeholder="Search..."
                  role="combobox"
                  defaultValue="Search..."
                />
                <i className="fa fa-search"></i>
              </div>

              <div className="row">
                <div className="col-md-3 col-xs-12">
                  <div className="filter_product">
                    <h3>Category</h3>
                    {productListArry && productListArry.length > 0 ? (
                      <div>
                        {productListArry.map((data, index) => (
                          <div
                            key={index}
                            className={`${
                              Active === data.name ? "active_class" : ""
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => firstProductFunc(data)}
                          >
                            <p> {data.name}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ width: "100%" }}>
                        <FilterSkeletonshop listsToRender={1} width="300" />
                      </div>
                    )}

                    <div>
                      <h3>Price</h3>

                      <Slider
                        getAriaLabel={() => "Price range"}
                        value={dualRangeValue}
                        onChange={handleChangeDual}
                        valueLabelDisplay="auto"
                        defaultValue={100}
                        min={0}
                        max={1000}
                        style={{ color: "#000" }}
                      />
                      <div
                        className="input"
                        style={{ justifyContent: "space-between" }}
                      >
                        <span>
                          min ₹{" "}
                          <input
                            className="number-input"
                            type="number"
                            min="0"
                            max="1000"
                            value={dualRangeValue[0]}
                          />
                        </span>
                        <div style={{ color: "lightgrey" }}> - </div>
                        <span>
                          max ₹{" "}
                          <input
                            className="number-input"
                            type="number"
                            min="0"
                            max="1000"
                            value={dualRangeValue[1]}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-9 col-xs-12">
                  <div className="row">
                    {filterproduct.length > 0 ? (
                      filterproduct.map((data, index) => (
                        <div
                          key={index}
                          className="col-12 col-sm-6 col-md-4 col-lg-4 col-product"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="product-item">
                            <div className="row-custom product-multiple-image">
                              <a className="item-wishlist-button item-wishlist-enable "></a>
                              <div
                                className="img-product-container"
                                onClick={() =>
                                  navigate(`/productdetail/${data.id}`)
                                }
                              >
                                <img
                                  src={data?.display_image}
                                  alt="Floral women sundress"
                                  className="img-fluid_c img-product ls-is-cached lazyloaded"
                                />
                              </div>
                            </div>
                            <div className="row-custom item-details p-2">
                              <div>
                                <h3 className="product-title">{data?.name}</h3>
                                <p className="product-user text-truncate"></p>
                              </div>
                            </div>
                            <div
                              className="item-meta d-flex p-2"
                              style={{ justifyContent: "space-between" }}
                            >
                              <div>
                                <span className="price">
                                  <span>₹</span>
                                  {data.price}
                                </span>
                              </div>
                              <div className="">
                                <button
                                  title="Wishlist"
                                  className="btn btn-wishlist"
                                  onClick={() => wishlist_add_update(data)}
                                >
                                  {data.is_favorite === "N" ? (
                                    <i
                                      className="fa fa-heart-o"
                                      style={{ fontSize: "27px" }}
                                      aria-hidden="true"
                                    ></i>
                                  ) : (
                                    <i
                                      className="fa fa-heart"
                                      style={{ fontSize: "27px", color: "red" }}
                                      aria-hidden="true"
                                    ></i>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="d-flex" style={{ width: "100%" }}>
                          <ListSkeletonshop listsToRender={1} width="300" />
                          <ListSkeletonshop listsToRender={1} width="300" />
                          <ListSkeletonshop listsToRender={1} width="300" />
                        </div>
                        <div className="d-flex" style={{ width: "100%" }}>
                          <ListSkeletonshop listsToRender={1} width="300" />
                          <ListSkeletonshop listsToRender={1} width="300" />
                          <ListSkeletonshop listsToRender={1} width="300" />
                        </div>
                        <div className="d-flex" style={{ width: "100%" }}>
                          <ListSkeletonshop listsToRender={1} width="300" />
                          <ListSkeletonshop listsToRender={1} width="300" />
                          <ListSkeletonshop listsToRender={1} width="300" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="live_astrobg_banner_crousal pb-3 mt-3 ">
          <div className="container ourastrologer">
            <OurAstrologerCrousal astro={AstrologerList} />
          </div>
        </section> */}
      </div>
      {/* <UserLogin open={Loginpopup} close={() => logindialogbox()} /> */}
    </>
  );
};

export default HOC(AstroMall);

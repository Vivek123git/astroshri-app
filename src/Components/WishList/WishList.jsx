import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import "../FreeKundli/FreeKundli.css";
import a from "../../images/sign.png";
import { notificationHandler } from "../utils/Notification";
import { useNavigate } from "react-router-dom";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import homeapi from "../api/homeapi";
import wish_list_api, { wishlist_add_update_api } from "../api/wishlistapi";
import Cookies from "js-cookie";
const WishList = () => {
  const [isloading, setisloading] = useState(false);
  const [filterproduct, setfilterproduct] = useState([]);
  const currency = Cookies.get("country");
  const [AstrologerList, setAstrologerList] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    wishlistproduct();
    LiveAstroData();
  }, []);

  const LiveAstroData = async () => {
    setisloading(true);
    try {
      const res = await homeapi();
      if (res.data.status) {
        setAstrologerList(res?.data?.astrologer);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const wishlistproduct = async () => {
    let temp = {};
    try {
      setisloading(true);
      const res = await wish_list_api(temp);
      if (res.data.status) {
        setfilterproduct(res.data.results);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };
  const wishlist_add_update = async (data) => {
    setisloading(true);
    let temp = {
      product_id: data.id,
    };
    try {
      const res = await wishlist_add_update_api(temp);
      if (res.data.status) {
        notificationHandler({ type: "success", msg: res.data.message });
        wishlistproduct();
      } else {
        notificationHandler({ type: "success", msg: res.data.message });
        console.log("data response error:::", res);
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      console.log("data response error:::", error);
    }
  };

  return (
    <>
      <div className="homepage_padding mb-4">
        <div className="free_kundli_banner p-5">
          <div className="container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h1 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  Astroshop
                </h1>
                <span className="header_banner pt-5">
                  Get instant & accurate, Janam Kundli
                </span>
                <div
                  className="home_banner_content mt-4"
                  style={{ color: "#FFF" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Ornare sed egestas iaculis rhoncus, velit.
                </div>
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} />
              </div>
            </div>
          </div>
        </div>
        <section>
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
                />
                <i className="fa fa-search"></i>
              </div>

              <div className="row">
                <div className="col-md-12 col-xs-12">
                  <div className="row">
                    {filterproduct.length > 0 ? (
                      filterproduct.map((data, index) => (
                        <div
                          className="col-12 col-sm-4 col-md-4 col-lg-3 col-product"
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
                                <div
                                  className="item-meta d-flex"
                                  style={{ justifyContent: "space-between" }}
                                >
                                  <div>
                                    {" "}
                                    <span className="price">
                                      <span>
                                        {currency === "INR" ? "₹" : "$"}
                                      </span>
                                      {data.price}
                                    </span>
                                  </div>
                                  <div className="p-2">
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
                                          style={{
                                            fontSize: "27px",
                                            color: "red",
                                          }}
                                          aria-hidden="true"
                                        ></i>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No Product Avalable </p>
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
        </section>
      </div>
    </>
  );
};

export default HOC(WishList);

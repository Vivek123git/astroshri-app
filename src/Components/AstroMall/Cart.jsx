import "./Cart.css";
import React, { useState, useEffect, useContext } from "react";
import HOC from "../../Common/HOC";
import { UserContext } from "../../App";
import { notificationHandler } from "../utils/Notification";
import { useNavigate } from "react-router-dom";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import Cookies from "js-cookie";
import homeapi from "../api/homeapi";
import cart_list_api, {
  add_to_cart_api,
  remove_cart_api,
  sub_to_cart_api,
} from "../api/cartitem";
const Cart = () => {
  const [AstrologerList, setAstrologerList] = useState("");
  const [isloading, setisloading] = useState(false);
  const currency = Cookies.get("country");
  const [itemdataArry, setitemdataArry] = useState([]);
  const [isupdate, setisupdate] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const [finalprice, setfinalprice] = useState({
    delivery_charges: "",
    gst: "",
    item_total: "",
    mrp: "",
    paying_amount: "",
    saving: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    LiveAstroData();
  }, []);
  useEffect(() => {
    cartitems();
  }, [isupdate]);

  const LiveAstroData = async () => {
    setisloading(true);
    try {
      const res = await homeapi();
      if (res.data.status) {
        setAstrologerList(res?.data?.astrologer);
      } else {
        console.log(res);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const cartitems = async () => {
    setisloading(true);
    let temp = {};

    try {
      const res = await cart_list_api(temp);
      if (res.data.status) {
        setitemdataArry(res.data.results);
        setfinalprice({
          delivery_charges: res.data.delivery_charges,
          gst: res.data.gst,
          item_total: res.data.item_total,
          mrp: res.data.mrp,
          paying_amount: res.data.paying_amount,
          saving: res.data.saving,
        });
        console.log("finalprice :::::", finalprice);
        dispatch({
          type: "USER",
          payload: { ...state, cartItemsLength: res.data.results.length },
        });
      } else {
        notificationHandler({ type: "success", msg: res.data.message });
        console.log(res);
      }
      setisupdate(false);
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const sub_to_cart = async (item) => {
    setisloading(true);
    try {
      let temp = {
        product_id: item.product_id,
      };
      const res = await sub_to_cart_api(temp);
      if (res.data.status) {
        setisupdate(true);
        notificationHandler({ type: "success", msg: res.data.message });
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

  const add_to_cart = async (item) => {
    setisloading(true);
    let temp = {
      product_id: item.product_id,
    };
    try {
      const res = await add_to_cart_api(temp);
      if (res.data.status) {
        setisupdate(true);
        notificationHandler({ type: "success", msg: res.data.message });
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

  const remove_cart = async (item) => {
    const itemId = item.product_id;
    try {
      setisloading(true);
      let temp = {
        product_id: itemId,
      };
      const res = await remove_cart_api(temp);
      if (res.data.status) {
        setisupdate(true);
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        console.log("data response error:::", res);
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  return (
    <>
      <div
        className="homepage_padding pb-5"
        style={{ borderTop: "2px solid #777" }}
      >
        <div className="container mt-4">
          <div id="cart_container">
            <>
              <div className="header">
                <div className="d-flex align-items-center">
                  <i
                    className="fa fa-arrow-left mr-2"
                    aria-hidden="true"
                    onClick={() => navigate(-1)}
                  ></i>
                  <h2>Cart Items</h2>
                </div>
                {itemdataArry.length > 0 ? (
                  itemdataArry.map((item) => (
                    <div id="cart-item">
                      <div className="image">
                        <img src={item.display_image} alt="pic" />
                      </div>

                      <div className="details">
                        <h6> {item.product_name} </h6>
                        <p className="desc"> {item.description} </p>
                        <p className="price">
                          Price: {currency === "INR" ? "₹" : "$"} {item.price}{" "}
                        </p>
                        <div>
                          <button
                            className="detail-btn"
                            onClick={() => remove_cart(item)}
                            style={{ background: "red" }}
                          >
                            Remove from Cart
                          </button>
                        </div>
                      </div>

                      <div className="quantity">
                        <button onClick={() => sub_to_cart(item)}>-</button>

                        <input
                          type="text"
                          value={item.qty}
                          name="quantity"
                          min="1"
                          max="10"
                        />
                        <button onClick={() => add_to_cart(item)}>+</button>
                      </div>

                      <div className="total">
                        <p className="price"> Total: {item.sum_price} </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Your Cart is Empty</div>
                )}
              </div>

              {itemdataArry.length > 0 && (
                <div className="item-details">
                  <div className="head"></div>
                  <div className="order-summery">
                    <div className="total">
                      <div>
                        <div>Total Items:</div>
                        <div>{finalprice.item_total}</div>
                      </div>

                      <div>
                        <div>Savings:</div>
                        <div>{finalprice.saving}</div>
                      </div>

                      <div>
                        <div>Estimated GST Charges:</div>
                        <div>{finalprice.gst}</div>
                      </div>

                      <div>
                        <div>Estimated Delivery Charges:</div>
                        <div>{finalprice.delivery_charges}</div>
                      </div>

                      <div>
                        <div style={{ color: "#000", fontWeight: "bold" }}>
                          Total Amount:
                        </div>
                        <div style={{ color: "#000", fontWeight: "bold" }}>
                          {finalprice.paying_amount}
                        </div>
                      </div>
                    </div>
                    <button
                      className="order-btn"
                      onClick={() =>
                        navigate("/useraddess", { state: finalprice })
                      }
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
        <section className="container ourastrologer mt-1 mb-4">
          <OurAstrologerCrousal astro={AstrologerList} />
        </section>
      </div>
    </>
  );
};

export default HOC(Cart);

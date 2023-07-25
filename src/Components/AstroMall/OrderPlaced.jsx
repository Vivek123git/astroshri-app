import React, { useState, useEffect, useContext } from "react";
import Header from "../../Common/Header/Header";
import Footer from "../../Common/Footer/Footer";
import "./Order.css";
import a from "../../images/Icons/googlePay.png";
import b from "../../images/Icons/paytm.png";
import c from "../../images/Icons/phonePe.png";
import d from "../../images/Icons/visa.png";
import e from "../../images/Icons/razorpay-logo.png";
import coupan from "../../images/Icons/coupan.png";
import Expand from "react-expand-animated";
import { useLocation, useNavigate } from "react-router-dom";
import { notificationHandler } from "../utils/Notification";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { UserContext } from "../../App";
import Cookies from "js-cookie";

const OrderPlaced = () => {
  const [expandbox, setexpandbox] = useState(false);
  const [paymentStatus, setpaymentStatus] = useState("offline");

  const [couponcode, setcouponcode] = useState("");
  const [finalprice, setfinalprice] = useState({
    delivery_charges: "",
    gst: "",
    item_total: "",
    mrp: "",
    paying_amount: "",
    saving: "",
  });
  const { state, dispatch } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const addressID = location.state._id;
  const token = Cookies.get("token");
  const [isUpdated, setisUpdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  let date = new Date().toLocaleDateString();
  const currentDate = new Date().toISOString().slice(0, 10);
  const paymentmode = (data) => {
    setpaymentStatus(data);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    cartitems();
  }, [isUpdated]);

  /// cart item
  const orderPlaced = () => {
    try {
      let url = getBaseUrl() + "user_api/order";
      setisloading(true);
      let temp = {
        address_id: addressID,
        coupan_code: "",
        coupan_amount: "",
        delivery_date: date,
        payment_mode: paymentStatus,
      };
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.post(url, temp, config).then(
        (res) => {
          notificationHandler({ type: "success", msg: res.data.message });
          cartitems();
          navigate("/OrderDetails");
          setisUpdated(true);
          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          notificationHandler({ type: "danger", msg: error });
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  /// cart item
  const cartitems = () => {
    try {
      let url = getBaseUrl() + "user_api/cart_list";
      setisloading(true);
      let temp = {};
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.post(url, temp, config).then(
        (res) => {
          setfinalprice({
            delivery_charges: res.data.delivery_charges,
            gst: res.data.gst,
            item_total: res.data.item_total,
            mrp: res.data.mrp,
            paying_amount: res.data.paying_amount,
            saving: res.data.saving,
          });

          setisloading(false);
          dispatch({
            type: "USER",
            payload: { ...state, cartItemsLength: res.data.results.length },
          });
          setisUpdated(true);
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          notificationHandler({ type: "danger", msg: error });
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  ///razorpay
  const proceeds = () => {
    if (finalprice.paying_amount !== "") {
      var options = {
        key: "rzp_live_uSVnuDQxqjx77r",
        amount: finalprice.paying_amount * 100,
        currency: "INR",
        name: "Rakshaa",
        description: "Transaction",
        first: "Transaction",
        image: "/images/Rakshaalogo.png",
        order_id: "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          orderPlaced();
          navigate("/OrderDetails");
        },

        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {});
      rzp1.open();
    } else {
      alert("Enter Valid Amount");
    }
  };

  /// coupan code
  const couponApply = () => {
    try {
      let url = getBaseUrl() + "user_api/coupan_list";
      setisloading(true);
      let temp = {
        coupan_code: couponcode,
        type: "Product",
      };
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.post(url, temp, config).then(
        (res) => {
          const start = res?.data?.results[0]?.start_date;
          const end = res?.data?.results[0]?.end_date;

          if (currentDate > start && currentDate < end) {
            if (res?.data?.results[0].minimum_order_price <= finalprice.paying_amount && couponcode === res?.data?.results[0]?.coupan_code) {
              const afterdiscount = finalprice?.paying_amount - res?.data?.results[0]?.coupan_discount;

              setfinalprice({ ...finalprice, paying_amount: afterdiscount });
              notificationHandler({
                type: "success",
                msg: "Coupon Apply Successfully",
              });
              setexpandbox(!expandbox);
              setcouponcode("");
            } else {
              notificationHandler({
                type: "danger",
                msg: "Amount should be more than 100 ",
              });
            }
          } else {
            notificationHandler({ type: "danger", msg: "Coupon is expire " });
          }
          setisloading(false);
          setisUpdated(true);
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
      setisloading(false);
    }
  };

  return (
    <div>
      <div className="homepage_padding mt-5">
        <Header />
      </div>
      <div className="iphone container mt-4 mb-4">
        <button className="arrow_back mb-2" onClick={() => navigate(-1)}>
          <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i> Back
        </button>
        <div className="delevery_addres">
          <div className="address_left">
            <div className="address_bg p-2">
              <h3 className="">
                <span className="number_add">1</span>
                <span className="delevry_heading">Payment</span>
              </h3>
            </div>
            <div className="pt-3">
              <h6>Payment Method</h6>
              <div className="row ">
                <div className="col-md-6">
                  <div className="form__radios">
                    {" "}
                    <div className="form__radio">
                      <label for="visa">
                        <img src={a} alt="gpay" /> G Pay Payment
                      </label>
                      <input checked id="visa" name="payment-method" type="radio" onClick={() => paymentmode("online")} />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form__radios">
                    {" "}
                    <div className="form__radio">
                      <label for="visa">
                        {" "}
                        <img className="mr-2" src={b} alt="gpay" />
                        Paytm Payment
                      </label>
                      <input checked id="visa" name="payment-method" type="radio" onClick={() => paymentmode("online")} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-6">
                  <div className="form__radios">
                    {" "}
                    <div className="form__radio">
                      <label for="visa">
                        <img src={c} alt="gpay" /> Phone Pay Payment
                      </label>
                      <input checked id="visa" name="payment-method" type="radio" onClick={() => paymentmode("online")} />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form__radios">
                    {" "}
                    <div className="form__radio">
                      <label for="visa">
                        <img src={d} alt="gpay" /> Visa Payment
                      </label>
                      <input checked id="visa" name="payment-method" type="radio" onClick={() => paymentmode("online")} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-6">
                  <div className="form__radios">
                    {" "}
                    <div className="form__radio">
                      <label for="visa">
                        <img src={e} alt="gpay" style={{ width: "20%" }} /> Razorpay Payment
                      </label>
                      <input checked id="visa" name="payment-method" type="radio" onClick={() => paymentmode("online")} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form__radios">
                    {" "}
                    <div className="form__radio">
                      <label for="visa">Cash On Delivery</label>
                      <input checked id="visa" name="payment-method" type="radio" onClick={() => paymentmode("offline")} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="address_bg  mt-4 p-2">
              <h3 className="">
                <span className="number_add">2</span>
                <span className="delevry_heading">Offer</span>
              </h3>
            </div>

            <div className="pt-3">
              <h6>Payment Method</h6>
              <div className="row">
                <div className="col-md-12" style={{ cursor: "pointer" }}>
                  <div className="form__radios">
                    <div className="form__radio" onClick={() => setexpandbox(!expandbox)}>
                      <label for="visa">
                        <img src={coupan} style={{ width: "7%", marginRight: "7px" }} alt="gpay" />
                        Apply Promocode
                      </label>
                      <span className="" style={{ color: "blue" }}>
                        Here
                      </span>
                    </div>
                  </div>
                  <Expand open={expandbox}>
                    <div className="row">
                      <div className="col-md-12 mt-2">
                        <input
                          type="text"
                          placeholder="Enter Coupon Code"
                          name="6 Digits Coupon Code "
                          className="form-control"
                          value={couponcode}
                          onChange={(e) => setcouponcode(e.target.value.trim())}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mt-2">
                        <button className="_2KpZ6l RLM7ES _3AWRsL mb-2" onClick={() => couponApply()}>
                          Apply Here
                        </button>
                      </div>
                    </div>
                  </Expand>
                </div>
              </div>
            </div>
          </div>
          <div className="address_right">
            <div className="right_order_price">
              <div className="product_details">
                <span>Price details</span>
              </div>
              <div className="product_details">
                <div className="d-flex" style={{ justifyContent: "space-between" }}>
                  <div>Total Items:</div>
                  <div>{finalprice.item_total}</div>
                </div>
              </div>
              <div className="product_details">
                <div className="d-flex" style={{ justifyContent: "space-between" }}>
                  <div>Savings:</div>
                  <div>{finalprice.saving}</div>
                </div>
              </div>
              <div className="product_details">
                <div className="d-flex" style={{ justifyContent: "space-between" }}>
                  <div>Estimated GST Charges:</div>
                  <div>{finalprice.gst}</div>
                </div>
              </div>
              <div className="product_details">
                <div className="d-flex" style={{ justifyContent: "space-between" }}>
                  <div>Estimated Delivery Charges:</div>
                  <div>{finalprice.delivery_charges}</div>
                </div>
              </div>
              <div className="d-flex" style={{ justifyContent: "space-between" }}>
                <div>
                  <h5>Total Payable</h5>
                </div>
                <h5>{finalprice.paying_amount}</h5>
              </div>
              <div className="row">
                <div className="col-md-12 mt-2">
                  {paymentStatus === "online" ? (
                    <button className="_2KpZ6l RLM7ES _3AWRsL mb-2" style={{ width: "100%" }} onClick={() => proceeds()}>
                      Place Order
                    </button>
                  ) : (
                    <button className="_2KpZ6l RLM7ES _3AWRsL mb-2" style={{ width: "100%" }} onClick={() => orderPlaced()}>
                      Place Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPlaced;

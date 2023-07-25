import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import HOC from "../../Common/HOC";
import a from "../../images/payment-banner.jpg";
import { notificationHandler } from "../utils/Notification";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import SEO from "../Seo/seo";
import { Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import b from "../../images/success.gif";
import c from "../../images/payment-failed.gif";
import coupan from "../../images/Icons/coupan.png";
import Expand from "react-expand-animated";
import { UserContext } from "../../App";
import Cookies from "js-cookie";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";

const Payment = () => {
  const { state, dispatch } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentsuccess, setpaymentsuccess] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  const [discountamount, setdiscountamount] = useState("");
  const currency = Cookies.get("country");
  const [status, setstatus] = useState();
  const currentDate = new Date().toISOString().slice(0, 10);
  const [userProfile, setuserProfile] = useState("");
  const [coupan_list_Arry, setcoupan_list_Arry] = useState([]);
  // const amount = location.state.amount;
  const [amount, setamount] = useState(location.state.amount);
  const gst = ((amount / 100) * 18).toFixed(2);
  const offerprice = (amount / 100) * Number(location.state.offer);
  console.log(offerprice);
  const [gstamount, setgstamount] = useState((Number(amount) + Number(gst)).toFixed(2));
  // const gstamount = (Number(amount) + Number(gst)).toFixed(2);
  const token = Cookies.get("token");
  const [expandbox, setexpandbox] = useState(false);
  const [couponcode, setcouponcode] = useState("");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    coupan_list_api();
    userDetail();
  }, []);

  const userDetail = () => {
    let url = getBaseUrl() + "user_api/get_profile";
    // setisloading(true);
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(url, config)
      .then(
        (res) => {
          console.log("data user detaail:::", res.data.results);
          setuserProfile(res.data.results);
          dispatch({
            type: "USER",
            payload: {
              ...state,
              results_web: res.data.results_web,
              wallet: res.data.results_web.wallet,
            },
          });
          localStorage.setItem("userid", res.data.results_web._id);
        },

        (error) => {
          console.log("data response error:::", error);
          notificationHandler({ type: "danger", msg: error });
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
      });
  };

  ////Payment success

  const onsuccess = (id) => {
    let url = getBaseUrl() + "user_api/user_wallet_add";
    let temp = {
      amount: gstamount,
      coupan_code: couponcode,
      profit_amount: offerprice,
      wallet_amount: amount,
      transaction_id: id,
      offer_id: location.state.offerId,
    };
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(url, temp, config)
      .then(
        (res) => {
          setTimeout(() => {
            setpaymentsuccess(false);
            navigate("/add_wallet");
          }, 5000);
          dispatch({
            type: "USER",
            payload: {
              ...state,
              wallet: res.data.wallet,
            },
          });
          setpaymentsuccess(true);
          userDetail();
        },

        (error) => {
          console.log("data response error:::", error);
          // setisloading(false);
          notificationHandler({ type: "danger", msg: error });
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        notificationHandler({ type: "danger", msg: e });
        // setisloading(false);
      });
  };

  const proceeds = () => {
    if (amount !== "") {
      var options = {
        key: process.env.REACT_APP_RZP_LIVE_KEY,
        amount: currency === "INR" ? gstamount * 100 : amount * 100,
        currency: currency,
        name: "Rakshaa",
        description: "Transaction",
        first: "Transaction",
        image: "https://Rakshaa.com/static/media/Rakshaalogo.f965aa0eb4f9ff946091.png",
        order_id: "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          onsuccess(response.razorpay_payment_id);
          console.log(response.razorpay_payment_id);
          console.log(response.razorpay_order_id);
          console.log(response.razorpay_signature);
          setstatus(true);
          // alert(response.data.response.signatureIsValid);
          console.log(response);
        },
        prefill: {
          name: userProfile?.name,
          email: userProfile?.email,
          contact: userProfile?.number,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#ff6f00",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        setTimeout(() => {
          setpaymentsuccess(false);
          navigate("/add_wallet");
        }, 3000);
        //   SendpaymentData("Payment Not Successfull");
        // alert(response.error.code);
        setstatus(false);
        setpaymentsuccess(true);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);

        console.log(response);
      });
      rzp1.open();
    } else {
      alert("Enter Valid Amount");
    }
  };

  /// coupan code
  const couponApply = (data) => {
    setcouponcode(data);
    try {
      let url = getBaseUrl() + "user_api/coupan_list";
      setisloading(true);
      let temp = {
        coupan_code: data,
        type: "Wallet",
      };
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.post(url, temp, config).then(
        (res) => {
          console.log(res?.data?.results[0]?.coupan_code);
          console.log(res);

          const { coupan_code, coupan_discount, minimum_order_price, user_coupan_user_count, per_user_use, discount_type, discount_amount_up_to } =
            res.data.results[0];

          if (data !== coupan_code) {
            return alert(res.data.message);
          }
          if (Number(user_coupan_user_count) >= Number(per_user_use)) {
            return alert(res.data.message);
          }
          console.log("dfdf", gstamount | 0, Number(minimum_order_price));
          if ((gstamount | 0) < Number(minimum_order_price)) {
            return alert(`Order is less than minimum order price i.e ${minimum_order_price}`);
          }
          if (discount_type === "Fixed") {
            const total_amount = coupan_discount;
            console.log(total_amount);
            setdiscountamount(total_amount);
          }
          if (discount_type === "Percentage") {
            const discount_amount = Math.trunc(gstamount) * coupan_discount * 0.01;
            let total_amount = null;
            if (discount_amount >= discount_amount_up_to) {
              total_amount = discount_amount_up_to;
              setdiscountamount(total_amount);
              console.log(total_amount);
            } else total_amount = discount_amount;
            setdiscountamount(total_amount);
            console.log(total_amount);
          }
          setexpandbox(!expandbox);
          window.scrollTo({
            top: 400,
            behavior: "smooth",
          });
          setisloading(false);
          setisUpdated(true);
        },

        (error) => {
          console.log("data response error:::", error);
          notificationHandler({ type: "danger", msg: "Invalid Coupon " });
          setisloading(false);
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Invalid Coupon " });
      setisloading(false);
    }
  };

  const coupan_list_api = () => {
    try {
      let url = getBaseUrl() + "user_api/coupan_list";
      let temp = {
        coupan_code: "",
        type: "Wallet",
      };
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.post(url, temp, config).then((res) => {
        if (res.data.status) {
          setcoupan_list_Arry(res.data.results);
        }
        console.log(res.data.results);
      });
    } catch (error) {}
  };

  return (
    <>
      <SEO
        title="Astroshop - Free Online Astrology Predictions by Best Astrologer"
        description="Rakshaa is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me,Live Events,Free Kundli,Astroshop"
        url="https://Rakshaa.com/static/media/Rakshaalogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding">
        <div className="container">
          <BreadcrumbSection tittle="Payment" />
        </div>

        <div className="container Card_shadow p-3 mt-5 mb-5">
          <div className="p-2">
            <div className="text-center" style={{ fontSize: "24px", fontWeight: 600 }}>
              Payment Details
            </div>
          </div>
          <div className="mt-4">
            <table className="table table-bordered table_payment">
              <tbody>
                <tr>
                  <td>Total Amount</td>
                  <td className="right_align">
                    <span id="ContentPlaceHolder1_lblAmount">
                      {" "}
                      {currency === "INR" ? "₹" : "$"} {amount}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>GST@18%</td>
                  <td className="right_align">
                    <span id="ContentPlaceHolder1_LblTax">
                      {currency === "INR" ? "₹" : "$"} {currency === "INR" ? gst : "0"}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong className="GrayColor">Total Payable Amount</strong>
                  </td>
                  <td className="right_align">
                    <strong className="GrayColor">
                      <span id="ContentPlaceHolder1_lblAmountTotal">
                        {currency === "INR" ? "₹" : "$"}
                        {currency === "INR" ? gstamount : amount}
                      </span>
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <section className="discount_offer mb-3">
            <div className="row">
              <div className="col-md-12" style={{ cursor: "pointer" }}>
                <div className="form__radios">
                  <div className="form__radio" onClick={() => setexpandbox(!expandbox)}>
                    <label for="visa">
                      <img src={coupan} style={{ width: "7%", marginRight: "7px" }} alt="gpay" />
                      You will get {location.state.offer}% EXTRA {currency === "INR" ? "₹" : "$"} {offerprice} cashback in wallet after recharge
                    </label>
                  </div>
                </div>
                <div>
                  {discountamount === "" ? (
                    ""
                  ) : (
                    <span>
                      You will get {currency === "INR" ? "₹" : "$"}
                      50% EXTRA ₹ 250.0 cashback in wallet after recharge
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* <section className="discount_offer mb-3">
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
                <div>
                  {discountamount === "" ? (
                    ""
                  ) : (
                    <span>
                      You will get {currency === "INR" ? "₹" : "$"} {discountamount} Extra on the wallet recharge
                    </span>
                  )}
                </div>
                <Expand open={expandbox}>
                  {coupan_list_Arry.map((data, index) => (
                    <div className="Card_shadow mt-3 p-3">
                      <h5>Astro@push</h5>
                      <p>
                        Get {data?.coupan_discount}% off up to {currency === "INR" ? "₹" : "$"} {data?.discount_amount_up_to} Vailid on amount{" "}
                        {data?.minimum_order_price} or more
                      </p>
                      <div className="coupon_code_list">
                        <div>
                          <p className="coupon_code_style">{data?.coupan_code}</p>
                        </div>
                        <div>
                          {data.per_user_use == data.user_coupan_user_count ? (
                            <button disabled className="_2KpZ6l RLM7ES  mb-2">
                              Apply Here
                            </button>
                          ) : (
                            <button className="_2KpZ6l RLM7ES _3AWRsL mb-2" onClick={() => couponApply(data.coupan_code)}>
                              Apply Here
                            </button>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="amount_save" style={{ fontSize: "14px" }}>
                          You will save {data?.coupan_discount}% off up to {currency === "INR" ? "₹" : "$"}
                          {data?.discount_amount_up_to} with this code
                        </p>
                      </div>
                    </div>
                  ))}
                </Expand>
              </div>
            </div>
          </section> */}

          <div className="pay_now_btn mt-1 mb-3 " style={{ justifyContent: "center" }}>
            <button onClick={() => proceeds()} type="button" className="btn " style={{ color: "#fff" }}>
              Pay Now
            </button>
          </div>
        </div>
      </div>

      <Dialog open={paymentsuccess} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={100} onClose={() => setpaymentsuccess(!paymentsuccess)}>
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">Status</span>
          <span className="float-right icon_color" onClick={() => setpaymentsuccess(!paymentsuccess)}>
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          {status === true ? <img className="suceess_rp" src={b} alt="" /> : <img className="suceess_rp" src={c} alt="" />}
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </>
  );
};

export default HOC(Payment);

import React, { useState, useEffect } from "react";
import HOC from "../../Common/HOC";
import s from "./wallet.module.css";
import { useNavigate } from "react-router-dom";
import { get_profile_api } from "../api/authapi";
import Cookies from "js-cookie";
import Wallet_amount_list_api from "../api/payment";
import Loder from "../Loder/Loder";
import UserLogin from "../DialogeBox/UserLogin";
import SEO from "../Seo/seo";
const AddtoWallet = () => {
  const [balance, setbalance] = useState("");
  const [isloading, setisloading] = useState(false);
  const currency = Cookies.get("country");
  const auth = Cookies.get("auth");
  const [loginPopup, setloginPopup] = useState(false);
  const [amountArry, setamountArry] = useState([]);
  const [offerprice, setofferprice] = useState("");
  const [offerId, setofferId] = useState("");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    get_profile();
    wallet_amount_list();
  }, []);

  const wallet_amount_list = async () => {
    setisloading(true);
    try {
      let temp = {
        currency: currency,
      };
      const res = await Wallet_amount_list_api(temp);
      if (res.data.status) {
        console.log(res?.data?.results);
        setamountArry(res?.data?.results);
      } else {
        console.log("data response error:::", res);
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      setisloading(false);
    }
  };

  const get_profile = async () => {
    try {
      const res = await get_profile_api();
      if (res.data.status) {
        setbalance(res.data.results_web.wallet);
      } else {
        console.log("data response error:::", res);
      }
    } catch (error) {
      console.log("data response error:::", error);
    }
  };

  const [amount, setamount] = useState("");
  const navigate = useNavigate();
  const processRecharge = () => {
    if (auth === "undefined" || auth === undefined) {
      setloginPopup(true);
      return;
    }

    if (amount < 1) {
      return alert("Please add more than 1 ruppess ");
    }
    navigate("/payment", { state: { amount: amount, offer: offerprice, offerId: offerId } });
  };

  return (
    <>
      <SEO
        title="Astroshop - Free Online Astrology Predictions by Best Astrologer"
        description="Rakshaa is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me,Live Events,Free Kundli,Astroshop"
        url="https://Rakshaa.com/static/media/Rakshaalogo.f965aa0eb4f9ff946091.png"
      />
      <div className="Contact_Page_padding">
        <div className="wallet_bg">
          <div className="container">
            <div className="">
              <h2 className="heading_money_wallet text-center">Add Money to Wallet</h2>

              {!balance ? (
                <div className="text-center mb-5" style={{ color: "green" }}>
                  Available balance: {currency === "INR" ? "₹" : "$"}0
                </div>
              ) : (
                <div className="text-center mb-5" style={{ color: "green" }}>
                  Available balance: {currency === "INR" ? "₹" : "$"}
                  {balance}
                </div>
              )}
            </div>
            <div>
              <div className={`row ${s["padding_right_left"]}`}>
                {amountArry.map((data, index) => (
                  <div class="col-md-6 col-sm-4 col-xl-4">
                    <span
                      class={s["rupees_wallet"]}
                      onClick={() => {
                        setamount(data.amount);
                        setofferprice(data.offer);
                        setofferId(data._id);
                      }}
                    >
                      <div class={s["ribbon"]}>{data.offer ? <span>{data?.offer}% extra</span> : ""}</div>
                      <span>
                        {currency === "INR" ? "₹" : "$"}
                        {data.amount}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className={s["amount_field"]}>
              <h2>Topup Wallet</h2>
              <input
                className={s["amount_input"]}
                type="text"
                value={amount}
                onChange={(e) => setamount(e.target.value)}
                placeholder={`${currency === "INR" ? "₹ Enter Amount" : "$ Enter Amount"}`}
              />
              <div
                className={s["procced_recharge"]}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className="" style={{ marginBlock: "3rem" }} onClick={() => processRecharge()}>
                  <span className={s["add-wallet-button-submit"]}>Proceed to Recharge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loder loading={isloading} />
      <UserLogin open={loginPopup} close={() => setloginPopup(!loginPopup)} />
    </>
  );
};

export default HOC(AddtoWallet);

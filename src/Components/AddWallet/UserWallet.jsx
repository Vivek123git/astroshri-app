import React, { useState, useEffect } from "react";
import HOC from "../../Common/HOC";
import "./Transactions.css";
import { useNavigate } from "react-router-dom";
import { notificationHandler } from "../utils/Notification";
import Loder from "../Loder/Loder";
import b from "../../images/money-bag.png";
import Cookies from "js-cookie";
import { Avatar } from "@mui/material";
import { get_profile_api } from "../api/authapi";

const Transactions = () => {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const currency = Cookies.get("country");
  const [userdataArry, setuserdataArry] = useState({
    name: "",
    email: "",
    number: "",
    wallete: "",
    dob: "",
    image: "",
    tob: "",
    pob: "",
  });

  useEffect(() => {
    uerDetail();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  ////api integration get user
  const uerDetail = async () => {
    setisloading(true);
    try {
      const res = await get_profile_api();
      if (res.data.status) {
        setuserdataArry({
          name: res.data.results_web.name,
          email: res.data.results_web.email,
          number: res.data.results_web.number,
          wallete: res.data.results_web.wallet,
          dob: res.data.results_web.dob,
          image: res.data.results_web.profile_img,
          pob: res.data.results_web.pob,
          tob: res.data.results_web.tob,
        });
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

  return (
    <>
      <section id="section" style={{ borderTop: "2px solid #777" }}>
        <div className="col-md-12">
          <div className="astro_card_new mt-5 mb-5">
            <div className="row">
              <div class="container">
                <div class="row d-flex justify-content-center">
                  <div class="col-md-12">
                    <div class="wallete_card_detail p-3 py-4">
                      <div class="text-center">
                        {userdataArry.image === "" ? (
                          <div className="d-flex justify-content-center">
                            <Avatar />
                          </div>
                        ) : (
                          <img
                            src={userdataArry.image}
                            width="100px"
                            height="100px"
                            class="rounded-circle"
                          />
                        )}
                      </div>
                      <div>
                        {" "}
                        <i class="fa-solid fa-wallet"></i>
                      </div>
                      <div class="text-center mt-3">
                        <h5 class="mt-2 mb-0">{userdataArry.name}</h5>
                        <span>{userdataArry.pob}</span>

                        <ul class="social-list">
                          <li>
                            <img src={b} />
                            <p>Balance</p>
                            <p>
                              {" "}
                              {currency === "INR" ? "₹" : "$"}
                              {userdataArry.wallete}
                            </p>
                          </li>
                        </ul>

                        <div class="buttons">
                          <button
                            class="btn btn-outline-primary px-4"
                            onClick={() => navigate("/add_wallet")}
                          >
                            Wallet Recharge
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Loder loading={isloading} />
    </>
  );
};

export default HOC(Transactions);

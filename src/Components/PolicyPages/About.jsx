import React, { useState, useEffect } from "react";
import HOC from "../../Common/HOC";
import "./PolicyPages.css";
import { getBaseUrl } from "../../Components/utils";
import axios from "axios";
import a from "../../images/ABOUT_US.png";

const About = () => {
  const [isloading, setisloading] = useState(false);
  const [aboutAs, setaboutAs] = useState("");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    policydata();
  }, []);
  /////api integration policy
  const policydata = () => {
    let url = getBaseUrl() + "web/setting";
    setisloading(true);
    let config = {
      //   headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(url, config)
      .then(
        (res) => {
          console.log("privacy", res.data.results.about_us);
          setaboutAs(res.data.results.about_us);
          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        setisloading(false);
      });
  };

  return (
    <>
      <div className="">
        {/* <section style={{ width: "100%" }}>
          <img src={a} style={{ width: "100%" }} />
        </section> */}
        <section class="about_privacy">
          <div class="container content_fit_div">
            <div>
              <div style={{ textAlign: "left" }}>
                <p dangerouslySetInnerHTML={{ __html: aboutAs }}></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HOC(About);

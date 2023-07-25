import React, { useState, useEffect } from "react";
import HOC from "../../Common/HOC";
import "./PolicyPages.css";
import { getBaseUrl } from "../../Components/utils";
import axios from "axios";
import a from "../../images/Contact.jpg";
import { notificationHandler } from "../utils/Notification";
import { blankValidator, emailValidator } from "../utils/Validation";

const initialErrState = {
  name: false,
  email: false,
  phone: false,
  address: false,
  msg: false,
};

const ContactUs = () => {
  const [error, setError] = useState(initialErrState);
  const [isloading, setisloading] = useState(false);
  const [contactdata, setcontactdata] = useState("");
  const [contactinfo, setcontactinfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    msg: "",
  });
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
          console.log("privacy", res.data.results.contact_us);
          setcontactdata(res.data.results.contact_us);
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

  const submit = (e) => {
    setError(initialErrState);
    setcontactinfo({ ...contactinfo, [e.target.name]: e.target.value });
  };
  console.log(contactinfo);

  const enquirynow = () => {
    if (!blankValidator(contactinfo.name)) {
      setError({ ...error, name: true });
      return;
    }
    if (!blankValidator(contactinfo.email)) {
      setError({ ...error, email: true });
      return;
    }
    if (!emailValidator(contactinfo.email)) {
      alert("Email is not valid");
      return;
    }
    if (!blankValidator(contactinfo.phone)) {
      setError({ ...error, phone: true });
      return;
    }

    let url = getBaseUrl() + "web/add_Contact_us";
    setisloading(true);
    let temp = {
      name: contactinfo.name,
      email: contactinfo.email,
      phone: contactinfo.phone,
      address: contactinfo.address,
      message: contactinfo.msg,
    };
    let config = {
      //   headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(url, temp, config)
      .then(
        (res) => {
          notificationHandler({ type: "success", msg: res.data.message });
          setcontactinfo({
            name: "",
            email: "",
            phone: "",
            address: "",
            msg: "",
          });

          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error);
          notificationHandler({ type: "danger", msg: error });
          setisloading(false);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        notificationHandler({ type: "danger", msg: e });
        setisloading(false);
      });
  };

  return (
    <>
      <div className="">
        <section style={{ width: "100%" }}>
          <img src={a} style={{ width: "100%" }} />
        </section>
        <section class="mt-4">
          <div class="container">
            <div className="contact_infodata">
              <div>
                <div style={{ textAlign: "left" }}>
                  <p dangerouslySetInnerHTML={{ __html: contactdata }}></p>
                </div>
              </div>
            </div>
            <section className="contact_card">
              <div className="section-title">
                <h3>We’re here 24x7 for you</h3>

                <p className="contact-page-content">
                  No matter what it’s about, you can get in touch with the right Rakshaa support team and we’ll be glad to help.
                </p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      autocomplete="off"
                      name="name"
                      id="name"
                      required=""
                      class="form-control"
                      placeholder="Your Name"
                      maxlength="25"
                      value={contactinfo.name}
                      onChange={(e) => submit(e)}
                    />
                    {error.name ? <div className="text-danger ml-1">Name is Required.</div> : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="form-group">
                    <input
                      type="email"
                      autocomplete="off"
                      name="email"
                      id="name"
                      required=""
                      class="form-control"
                      value={contactinfo.email}
                      placeholder="Your Email"
                      maxlength="25"
                      onChange={(e) => submit(e)}
                    />
                    {error.email ? <div className="text-danger ml-1">Email is Required.</div> : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="form-group">
                    <input
                      type="number"
                      autocomplete="off"
                      name="phone"
                      id="name"
                      required=""
                      class="form-control"
                      placeholder="Your Phone"
                      value={contactinfo.phone}
                      maxlength="15"
                      onChange={(e) => submit(e)}
                    />
                    {error.phone ? <div className="text-danger ml-1">Enter Phone no.</div> : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      autocomplete="off"
                      name="address"
                      id="name"
                      required=""
                      class="form-control"
                      placeholder="Your Address"
                      value={contactinfo.address}
                      maxlength="25"
                      onChange={(e) => submit(e)}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div class="form-group">
                    <textarea
                      type="text"
                      autocomplete="off"
                      name="msg"
                      id="name"
                      required=""
                      class="form-control"
                      value={contactinfo.msg}
                      placeholder="Your Message"
                      style={{ minHeight: "150px", maxHeight: "150px" }}
                      onChange={(e) => submit(e)}
                    />
                  </div>
                </div>
                <button onClick={() => enquirynow()} type="button" style={{ width: "30%" }} className="btn get_otp_btn_userprofile">
                  Submit
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default HOC(ContactUs);

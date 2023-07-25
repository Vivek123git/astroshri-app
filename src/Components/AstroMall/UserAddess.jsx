import React, { useState, useEffect } from "react";
import "./UserAddress.css";
import Expand from "react-expand-animated";
import Header from "../../Common/Header/Header";
import Footer from "../../Common/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { notificationHandler } from "../utils/Notification";
import { getBaseUrl } from "../utils";
import axios from "axios";
import user_address_api from "../api/address";
const UserAddess = () => {
  const [value, setvalue] = useState("");
  const [expandbox, setexpandbox] = useState(false);
  const token = document?.cookie
    ?.split(";")
    .find((item) => item.match("token"))
    ?.split("=")[1];
  const [isUpdated, setisUpdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [alladresslist, setalladresslist] = useState([]);
  const [finalprice, setfinalprice] = useState({
    delivery_charges: "",
    gst: "",
    item_total: "",
    mrp: "",
    paying_amount: "",
    saving: "",
  });
  const navigate = useNavigate();
  const [addAddress, setaddAddress] = useState({
    name: "",
    phone: "",
    bulding_name: "",
    flatno: "",
    address: "",
    landmark: "",
    pincode: "",
  });
  useEffect(() => {
    user_address();
  }, [isUpdated]);
  useEffect(() => {
    cartitems();
  }, []);

  const datachecked = (data) => {
    setvalue(data._id);
    console.log(data._id);
  };

  const useraddress = (e) => {
    console.log("data::::", e.target.name);
    setaddAddress({ ...addAddress, [e.target.name]: e.target.value });
  };

  /// get user_address address
  const user_address = async () => {
    setisloading(true);
    let temp = {
      key: "list",
    };
    try {
      const res = await user_address_api(temp);
      if (res.data.result) {
        setalladresslist(res.data.address_list);
        setvalue(res.data.address_list[0]._id);
        setisUpdated(false);
        setisloading(false);
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

  /// cart item
  const adddetails = () => {
    try {
      let url = getBaseUrl() + "user_api/user_address";
      setisloading(true);
      let temp = {
        location: "",
        building_name: addAddress.bulding_name,
        pincode: addAddress.pincode,
        address: addAddress.address,
        address: addAddress.address,
        landmark: addAddress.landmark,
        flat_no: addAddress.flatno,
        address_type: "",
        is_default: "",
        contact_person_name: addAddress.name,
        contact_person_mobile: addAddress.phone,
        key: "add",
      };
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.post(url, temp, config).then(
        (res) => {
          setaddAddress({
            name: "",
            phone: "",
            bulding_name: "",
            flatno: "",
            address: "",
            landmark: "",
            pincode: "",
          });

          setisUpdated(true);
          setexpandbox(false);
          notificationHandler({ type: "success", msg: res.data.message });
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
          // notificationHandler({ type: "success", msg: res.data.message });
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
  const addressSelect = (data) => {
    console.log(data._id);
    navigate("/order", { state: data });
  };

  const addressdelete = (data) => {
    const deleteId = data._id;
    console.log("wdnjwq", data);
    try {
      let url = getBaseUrl() + "user_api/user_address_delete";
      setisloading(true);
      let temp = {
        id: deleteId,
      };
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.post(url, temp, config).then(
        (res) => {
          console.log("address delete :::::", res);
          setisUpdated(true);
          notificationHandler({ type: "success", msg: res.data.message });
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

  return (
    <>
      <div className="homepage_padding mt-5">
        <Header />
      </div>
      <div className="container mt-4 mb-4">
        <span onClick={() => navigate(-1)}>
          {" "}
          <button className="arrow_back mb-2">
            <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i> Back
          </button>
        </span>
        <div className="delevery_addres">
          <div className="address_left">
            <div className="address_bg p-2">
              <h3 className="">
                <span className="number_add">1</span>
                <span className="delevry_heading">Delivery Address</span>
              </h3>
            </div>
            <div className="pt-3">
              {alladresslist.map((data, index) => (
                <div
                  className="form-check mb-2"
                  style={{ borderBottom: "1px solid #878787" }}
                >
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    {" "}
                    <div>
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        id="radio1"
                        name="optradio"
                        checked={value === data?._id ? "checked" : ""}
                        value={data?._id}
                        onClick={(e) => datachecked(data)}
                      />
                      {data?.contact_person_name}
                      <label
                        className="form-check-label user_home"
                        for="radio1"
                      >
                        {data?.address_type}{" "}
                        <span>{data?.contact_person_mobile}</span>
                      </label>
                    </div>
                    <div>
                      <i
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => addressdelete(data)}
                        className="fa fa-trash-o"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                  <div className="mb-3">
                    Address-{data?.building_name} {data?.flat_no}{" "}
                    {data?.address} {data?.location} Landmark-{data?.landmark}{" "}
                    Pincode-{data?.pincode}{" "}
                  </div>
                  {value === data?._id ? (
                    <div>
                      <button
                        onClick={() => addressSelect(data)}
                        className="_2KpZ6l RLM7ES _3AWRsL mb-2"
                      >
                        Deliver Here
                      </button>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
            <div>
              <div className="address_bg p-2">
                <h3
                  className=""
                  onClick={() => setexpandbox(!expandbox)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="number_add">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </span>
                  <span className="delevry_heading">Add a new address</span>
                </h3>
              </div>
              <Expand open={expandbox}>
                <div className="row">
                  <div className="col-md-6 mt-2">
                    <input
                      type="text"
                      placeholder="name"
                      name="name"
                      className="form-control"
                      value={addAddress.name}
                      onChange={(e) => useraddress(e)}
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <input
                      type="number"
                      placeholder="phone no"
                      name="phone"
                      className="form-control"
                      value={addAddress.phone}
                      onChange={(e) => useraddress(e)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-2">
                    <input
                      type="text"
                      placeholder="Building name"
                      name="bulding_name"
                      className="form-control"
                      value={addAddress.bulding_name}
                      onChange={(e) => useraddress(e)}
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <input
                      type="number"
                      placeholder="flat no"
                      name="flatno"
                      className="form-control"
                      value={addAddress.flatno}
                      onChange={(e) => useraddress(e)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <textarea
                      type="text"
                      placeholder="address"
                      name="address"
                      className="form-control"
                      value={addAddress.address}
                      onChange={(e) => useraddress(e)}
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <input
                      type="text"
                      placeholder="landmark"
                      name="landmark"
                      className="form-control"
                      value={addAddress.landmark}
                      onChange={(e) => useraddress(e)}
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <input
                      type="number"
                      placeholder="Pin Code"
                      name="pincode"
                      className="form-control"
                      value={addAddress.pincode}
                      onChange={(e) => useraddress(e)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <button
                      className="_2KpZ6l RLM7ES _3AWRsL mb-2"
                      onClick={() => adddetails()}
                    >
                      Save And Deliver Here
                    </button>
                  </div>
                </div>
              </Expand>
            </div>
          </div>

          <div className="address_right" style={{ padding: "18px" }}>
            <div className="product_details">
              <span>Price details</span>
            </div>
            <div className="product_details">
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>Total Items:</div>
                <div>{finalprice.item_total}</div>
              </div>
            </div>
            <div className="product_details">
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>Savings:</div>
                <div>{finalprice.saving}</div>
              </div>
            </div>
            <div className="product_details">
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>Estimated GST Charges:</div>
                <div>
                  <div>{finalprice.gst}</div>
                </div>
              </div>
            </div>
            <div className="product_details">
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>Estimated Delivery Charges:</div>
                <div>
                  <div>{finalprice.delivery_charges}</div>
                </div>
              </div>
            </div>
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div>
                <h5>Total Payable</h5>
              </div>
              <div>
                <h4>{finalprice.paying_amount}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserAddess;

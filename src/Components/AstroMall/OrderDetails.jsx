import React, { useState, useEffect, useContext } from "react";
import HOC from "../../Common/HOC";
import { notificationHandler } from "../utils/Notification";
import "./Cart.css";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import Expand from "react-expand-animated";
import Cookies from "js-cookie";
import homeapi from "../api/homeapi";
import order_list_api, { order_update_api } from "../api/orderlistapi";
import { ListSkeleton2 } from "../skeleton/skeletoncard";

const OrderDetails = () => {
  const [AstrologerList, setAstrologerList] = useState("");
  const [isloading, setisloading] = useState(false);
  const [orderDetails, setorderDetails] = useState([]);
  const [expandbox, setexpandbox] = useState(false);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    order_list();
    LiveAstroData();
  }, []);

  /// top astrologer list
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

  /// order_list api
  const order_list = async () => {
    setisloading(true);
    let temp = {};
    try {
      const res = await order_list_api(temp);
      if (res.data.status) {
        res.data.results.map((item) => {
          item.show = false;
        });
        setorderDetails(res.data.results);
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

  const ProductDetails = (item, index) => {
    console.log(item, index);

    orderDetails.map((data) => {
      if (item === data) {
        data.show = !data.show;
      }
    });
    setexpandbox(!expandbox);
  };

  const order_update = async (data, index) => {
    let temp = {
      id: data.id,
    };
    try {
      const res = await order_update_api(temp);
      orderDetails[index].status = "CANCEL";

      if (res.data.status) {
        setorderDetails([...orderDetails], orderDetails[index]);
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "success", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
    }
  };

  return (
    <>
      <div
        className="homepage_padding pb-5"
        style={{ borderTop: "2px solid #777" }}
      >
        <div className="container mt-4">
          <div>
            <>
              <div className="OrderDetails">
                <div className="">
                  <h2>My Orders</h2>
                </div>
                {!isloading ? (
                  <div>
                    {orderDetails.length >= 0
                      ? orderDetails.map((item, index) => (
                          <div>
                            <div id="cart-item" style={{ width: "100%" }}>
                              <div className="image">
                                <img src={item?.image} alt="pic" />
                              </div>
                              <div className="details">
                                <h6> {item?.product_name} </h6>
                                <p className="desc"> {item?.description} </p>
                                <p className="price">
                                  Payment Mode: {item?.payment_method}{" "}
                                </p>
                                <p className="price">
                                  Address: {item?.address}{" "}
                                </p>
                                <p className="price">
                                  {" "}
                                  Total: {item.total_amount}{" "}
                                </p>
                                {item.status === "CANCEL" ? (
                                  <p className="price ">
                                    Status:{" "}
                                    <span className="text-danger">
                                      {item.status}
                                    </span>{" "}
                                  </p>
                                ) : (
                                  <p className="price">
                                    Status:{" "}
                                    <span className="text-success">
                                      {item.status}
                                    </span>{" "}
                                  </p>
                                )}
                              </div>

                              <div className="quantity">
                                <input
                                  type="text"
                                  value={item.no_of_items}
                                  name="quantity"
                                  min="1"
                                  max="10"
                                />
                              </div>
                              <div className="total">
                                <p
                                  className="price"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => ProductDetails(item, index)}
                                >
                                  View All{" "}
                                </p>
                              </div>
                              <div className="total">
                                {item.status === "PLACED" ? (
                                  <div>
                                    <p
                                      className="price text-danger"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => order_update(item, index)}
                                    >
                                      {" "}
                                      Cancel{" "}
                                    </p>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>

                            <Expand open={item.show}>
                              <h6>More Details</h6>
                              {item?.order_items?.map((item) => (
                                <div
                                  id="cart-item"
                                  style={{
                                    width: "100%",
                                    border: "1px solid #1e77f6",
                                  }}
                                >
                                  <div className="image">
                                    <img src={item?.image} alt="pic" />
                                  </div>
                                  <div className="details">
                                    <h6> {item?.product_name} </h6>
                                    <p className="desc">
                                      {" "}
                                      {item?.description}{" "}
                                    </p>
                                    <p className="price">
                                      Product Id: {item?.productID}{" "}
                                    </p>
                                    <p className="price">
                                      Status: {item?.status}{" "}
                                    </p>
                                    <p className="price">
                                      {" "}
                                      Price: {item.net_price}{" "}
                                    </p>
                                  </div>
                                  <div className="quantity"></div>

                                  <div className="total">
                                    <p
                                      className="price"
                                      style={{ cursor: "pointer" }}
                                    >
                                      Order Id: {item.orderID}{" "}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </Expand>
                          </div>
                        ))
                      : "No data"}
                  </div>
                ) : (
                  <ListSkeleton2 />
                )}
              </div>
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

export default HOC(OrderDetails);

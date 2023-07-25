import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HOC from "../../Common/HOC";
import { notificationHandler } from "../utils/Notification";
import { useNavigate } from "react-router-dom";
import notifications_list_api, { notifications_drop_api } from "../api/notifyapi";
import "./Notify.css";
import { Avatar } from "@material-ui/core";
import getRelativeTimeFromNow from "../../helper/getRelativeTimeFromNow";
import DataNotFound from "../DataNotFound";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
const Notify = () => {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [notificationArry, setnotificationArry] = useState([]);
  const [isUpdate, setisUpdate] = useState(false);

  useEffect(() => {
    notification();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [isUpdate]);

  const notification = async () => {
    setisloading(true);
    let temp = {
      type: "",
      page: "1",
    };
    try {
      const res = await notifications_list_api(temp);
      if (res.data.status) {
        setnotificationArry(res?.data?.results);
        setisUpdate(false);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const messagedelete = async (data) => {
    setisloading(true);
    let temp = {
      id: data,
    };
    try {
      const res = await notifications_drop_api(temp);
      if (res.data.status) {
        setisUpdate(true);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };
  const relativeTime = getRelativeTimeFromNow(new Date());
  console.log(relativeTime);
  return (
    <>
      <section class="section">
        <div class="container">
          <div className="mb-4">
            <BreadcrumbSection tittle="Notifications" />
          </div>
          {/* <h3 class="m-b-50 heading-line">
            Notifications <i class="fa fa-bell text-muted"></i>
          </h3> */}

          <div class="notification-ui_dd-content">
            {notificationArry.length > 0 ? (
              notificationArry.map((data, index) => (
                <div class={`notification-list ${data.is_seen === "0" ? "notification-list--unread" : ""}`}>
                  <div class="notification-list_content">
                    <div class="notification-list_img">
                      {data.image == "" ? (
                        <Avatar
                          style={{
                            width: "50px",
                            height: "50px",
                            marginRight: "6px",
                          }}
                        />
                      ) : (
                        <img src={data?.image} alt="image" />
                      )}
                    </div>
                    <div class="notification-list_detail">
                      <p>{data?.title}</p>
                      <p class="text-muted">{data?.text}</p>
                      <p class="text-muted">
                        <small>{data?.Created_date}</small>
                      </p>
                    </div>
                  </div>
                  <div class="notification-list_feature-img" style={{ cursor: "pointer" }} onClick={() => messagedelete(data.id)}>
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </div>
                </div>
              ))
            ) : (
              <DataNotFound />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(Notify);

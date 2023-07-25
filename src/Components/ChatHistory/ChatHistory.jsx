import React, { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import "./ChatHistory.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import moment from "moment/moment";
import ReactStars from "react-rating-stars-component";
import { AiFillStar } from "react-icons/ai";
const ChatHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const {
    channel_id,
    user_id,
    user_image,
    astro_name,
    astro_profile_img,
    total_amount,
    ratings,
  } = location.state;
  console.log(location.state);
  useEffect(() => {
    if (!channel_id) return;
    if (total_amount == 0 && "0") {
      return;
    }

    const db = getDatabase();
    const chatListRef = ref(
      db,
      `Group/${channel_id}/${channel_id.split("_").slice(0, 2).join("/")}`
    );
    onValue(chatListRef, (snapshot) => {
      const data = snapshot.val();
      setChats(data);
      console.log(data);
    });
  }, [channel_id]);
  return (
    <div>
      <div id="chat_container">
        <div className="chat_box">
          <div className="chat_header">
            <div className="header_icon" onClick={() => navigate(-1)}>
              <MdOutlineArrowBackIosNew />
            </div>
            <div className="astro_name" style={{ marginRight: "auto" }}>
              <span className="astro_profile_pic">
                <img src={astro_profile_img} alt="Astro Image" />
              </span>
              {astro_name}
            </div>
            {/* <div className="end_chat_btn">End</div> */}
          </div>
          <div className="chat_messages">
            <div id="chat" className="msg_container">
              {chats &&
                Object.keys(chats).map((key, i) => (
                  <div>
                    <div
                      // className="single_msg"
                      className={`single_msg ${
                        chats[key].from === user_id ? "me" : "other"
                      }`}
                    >
                      <div className="msg_text">
                        <p>{chats[key].message}</p>
                        <div className="msg_time">
                          {moment(chats[key].date_time).format("LT")}
                        </div>
                      </div>
                      <span className="msg_img">
                        <img
                          src={`${
                            chats[key].from === user_id
                              ? user_image
                              : astro_profile_img
                          }`}
                          alt="img"
                          style={{ height: "2.5rem", width: "2.5rem" }}
                        />
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="chat-bottom-input-box">
              <div className="chat-history-rating">
                <ReactStars
                  style={{ justifyContent: "center" }}
                  count={5}
                  value={ratings}
                  size={30}
                  activeColor="#FFB450"
                  color="#ABABAB"
                  isHalf={true}
                  edit={false}
                  classNames="star_class"
                  emptyIcon={<AiFillStar />}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<AiFillStar />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;

import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserChat.css";
import HOC from "../../Common/HOC";
import UserRating from "../DialogeBox/UserRating";
import { getDatabase, ref, push, set, get, onChildAdded, onValue, chatListRef, child, update } from "firebase/database";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";

import moment from "moment";
import { doc, collection, onSnapshot, Timestamp } from "firebase/firestore";
import { UserContext } from "../../App";
// React icons
import { RiSendPlaneLine } from "react-icons/ri";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { getBaseUrl } from "../utils";
import axios from "axios";
import Cookies from "js-cookie";
import { IoSend } from "react-icons/io5";
function UserChat() {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  const [userName, setuserName] = useState();
  const [userimage, setuserimage] = useState();
  const [rating, setrating] = useState(false);
  const [isupdate, setisupdate] = useState(false);
  const [timeStamp, setTimeStamp] = useState();
  const [astrochatended, setastrochatended] = useState(false);
  const [channel_id, setchannel_id] = useState(false);
  const [chatended, setchatended] = useState(false);
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");
  const currency = Cookies.get("country");
  useEffect(() => {
    setTimeStamp(Date.now());
  }, []);

  const location = useLocation();
  console.log(location);
  const astroimg =
    (location?.state?.astroData && location?.state?.astroData?.profile_img) || "https://idronline.org/wp-content/themes/wphidr/images/person-dummy.jpg";
  const astroId = location?.state?.astroData && location?.state?.astroData?.id;
  const astroo = location?.state?.astroData && location?.state?.astroData?.name;
  const userID = Cookies.get("userID");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);
  const [messages, setMessages] = useState([]);

  const { m_birthplace, gender_m, name_m, time_m, date_m } = location?.state?.userfirstMsg;

  const db = getDatabase();
  useEffect(() => {
    setchannel_id(location.state.channel_id);
  }, [location]);
  let chatListRef = ref(db, `Group/${location.state.fb_channel_id}/${astroId}/${userID}`);
  const updateHeight = () => {
    const el = document.getElementById("chat");
    if (el) {
      el.scrollTop = el.scrollHeight + "20";
    }
  };

  useEffect(() => {
    onValue(chatListRef, (data) => {
      setMessages([]);
      Object.values(data.val()).map((data) => {
        setMessages((msg) => [...msg, data]);
      });
    });
  }, [onValue]);

  const jjj = () => {
    onValue(chatListRef, (data) => {
      setMessages([]);
      Object.values(data.val()).map((data) => {
        setMessages((msg) => [...msg, data]);
      });
    });
  };

  useEffect(() => {
    callInitiateStatus(channel_id);
  }, []);

  const firstMsg = () => {
    const db = getDatabase();
    let msgData =
      location?.state?.userfirstMsg &&
      `Name: ${name_m} , DOB: ${date_m ? date_m : "__/__/____"},Time: ${time_m ? time_m : "--/--/--"}, Place: ${m_birthplace ? m_birthplace : "_______"}  `;
    const newPostKey = push(child(ref(db), "groups")).key;

    const postData = {
      date: "",
      date_time: Date.now(),
      from: userID,
      mRecipientOrSenderStatus: 0,
      message: msgData,
      message_id: newPostKey,
      name: userName,
      time: "",
      to: astroId,
      type: "text",
    };

    const updates = {};

    updates["/Group/" + `/${location.state.fb_channel_id}/` + `/${userID}/` + `/${astroId}/` + newPostKey] = postData;

    update(ref(db), updates);

    updates["/Group/" + `/${location.state.fb_channel_id}/` + `/${astroId}/` + `/${userID}/` + newPostKey] = postData;

    update(ref(db), updates);

    setIsUpdate(true);

    updateHeight();
    jjj();
  };

  useEffect(() => {
    updateHeight();
  }, [messages]);

  const filteredHomes = chats.filter((x) => (x.from === userID && x.to === astroId) || (x.from === astroId && x.to === userID));

  const sendChat = (e) => {
    if (msg.trim() === "") {
      setMsg("");
      return;
    }
    const db = getDatabase();

    const newPostKey = push(child(ref(db), "groups")).key;

    const postData = {
      date: "",
      date_time: Date.now(),
      from: userID,
      mRecipientOrSenderStatus: 0,
      message: msg,
      message_id: newPostKey,
      name: userName,
      time: "",
      to: astroId,
      type: "text",
    };

    const updates = {};

    updates["/Group/" + `/${location.state.fb_channel_id}/` + `/${userID}/` + `/${astroId}/` + newPostKey] = postData;

    update(ref(db), updates);

    updates["/Group/" + `/${location.state.fb_channel_id}/` + `/${astroId}/` + `/${userID}/` + newPostKey] = postData;

    console.log(postData);

    update(ref(db), updates);

    setIsUpdate(true);
    setMsg("");
    updateHeight();
    jjj();
  };

  useEffect(() => {
    if (userName) {
      setTimeout(() => {
        document.getElementById("first").click();
      }, 1000);
    }
  }, [userName]);

  useEffect(() => {
    uerDetail();
  }, []);

  const uerDetail = () => {
    let url = getBaseUrl() + "user_api/get_profile";

    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(url, config)
      .then(
        (res) => {
          setuserName(res.data.results.name);
          setuserimage(res?.data?.results?.profile_img || "https://idronline.org/wp-content/themes/wphidr/images/person-dummy.jpg");
        },

        (error) => {
          console.log("data response error:::", error);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
      });
  };

  const callInitiateStatus = () => {
    let url = getBaseUrl() + "user_api/call_initiate_status";
    let temp = {
      channel_id: location.state.channel_id,
    };
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(url, temp, config)
      .then(
        (res) => {
          console.log("ddddd>>>>", res);
          if (res.data.results.status === "accept_astro") {
            setTimeout(() => {
              console.log("call status");
              callInitiateStatus(channel_id);
            }, 2000);
          }
          if (res.data.results.status === "end_astro") {
            setastrochatended(true);
          }
          if (res.data.results.status === "disconnect_user") {
            setastrochatended(true);
          }
        },

        (error) => {
          console.log("data response error:::", error);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
      });
  };

  const cc = () => {
    setchatended(!chatended);
  };
  const ccc = () => {
    setastrochatended(!astrochatended);
  };

  const endChat = () => {
    setchatended(true);
  };

  const chatendddd = () => {
    let url = getBaseUrl() + "/user_api/call_status_update";
    let temp = {
      channel_id: location.state.channel_id,
      status: "end_user",
    };
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(url, temp, config)
      .then(
        (res) => {
          callInitiateStatus();
          if (res.data.status === true) {
            setchatended(false);
            setrating(true);
          }
        },

        (error) => {
          console.log("data response error:::", error);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
      });
  };
  const astrooooo = () => {
    callInitiateStatus(channel_id);
    setrating(true);
  };

  return (
    <>
      <div id="chat_container">
        <div className="chat_box">
          <div className="chat_header">
            <div className="header_icon" onClick={() => endChat()}>
              <MdOutlineArrowBackIosNew />
            </div>
            <div className="astro_name" style={{ marginRight: "auto" }}>
              <span className="astro_profile_pic">
                <img src={astroimg} alt="Astro Image" />
              </span>
              {astroo}
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => endChat()} className="end_chat_btn">
              End
            </div>
          </div>

          {userName ? (
            <div className="chat_messages">
              <div id="chat" className="msg_container">
                {messages.map((c, i) => (
                  <div>
                    <div className={`single_msg ${c.from === userID ? "me" : "other"}`}>
                      <div className="msg_text">
                        <p>{c.message}</p>
                        <div className="msg_time">{moment(c.date_time).format("LT")}</div>
                      </div>
                      <span className="msg_img">
                        <img src={`${c.from === userID ? userimage : astroimg}`} alt="img" style={{ height: "2.5rem", width: "2.5rem" }} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="chat-bottom-input-box">
                <input
                  spellCheck="false"
                  className="btm_input"
                  type="text"
                  onInput={(e) => setMsg(e.target.value)}
                  value={msg}
                  placeholder="Enter your chat"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendChat();
                    }
                  }}
                />
                <div className="send-chat-btn" onClick={() => sendChat()}>
                  <IoSend />
                </div>
              </div>

              <input type="hidden" id="first" onClick={() => firstMsg()} />
            </div>
          ) : (
            <p>Connecting...</p>
          )}
        </div>
      </div>

      <Dialog open={chatended} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth={100} onClose={() => cc()}>
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">End Chat</span>

          <span className="float-right icon_color" onClick={() => cc()}>
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <div>
                <div className="">
                  <p>Are you sure, you want to End Chat?</p>
                </div>
              </div>
              <button type="submit" className="get_otp_btn mt-4" onClick={() => chatendddd()}>
                Ok
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>

      <Dialog open={astrochatended} aria-labelledby="form-dialog-title" maxWidth="xs" onClose={() => ccc()}>
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">Astro</span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <div>
                <div className="">
                  <p>Astro ended</p>
                </div>
              </div>
              <button type="submit" className="get_otp_btn mt-4" onClick={() => astrooooo()}>
                Ok
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>

      <UserRating open={rating} channelId={channel_id} close={() => setrating(!rating)} type="chat" />
    </>
  );
}

export default UserChat;

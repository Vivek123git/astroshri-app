import React, { useState, useContext, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import { BiDollar } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgLogIn } from "react-icons/cg";
import { Badge } from "@material-ui/core";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { UserContext } from "../../App";
import "./Header.css";
import UserLogin from "../../Components/DialogeBox/UserLogin";
import support from "../../images/Icons/support_image.png";
import Cookies from "js-cookie";
import { Avatar } from "@material-ui/core";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { IoWalletOutline, IoWalletSharp } from "react-icons/io5";
import { BiRupee } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import location_api from "../../Components/api/location";
import Header1 from "./Header1";

const Header = () => {
  const [Sidebar, setSidebar] = useState(false);
  const [Loginpopup, setLoginpopup] = useState(false);
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  const currency = Cookies.get("country");

  const setLoadingnewside = () => {
    document.getElementById("mySidenav").style.width = "250px";
    setSidebar(true);
  };

  /*function to close a sidebar */
  const Closesidebar = () => {
    document.getElementById("mySidenav").style.width = "0px";
    setSidebar(false);
  };
  const logindialogbox = () => {
    setLoginpopup(!Loginpopup);
  };

  const data = localStorage.getItem("userphoto");
  const auth = Cookies.get("auth");

  const logoutfunction = () => {
    localStorage.removeItem("userphoto");
    Cookies.remove("auth");
    Cookies.remove("token");
    Cookies.remove("country");
    user_location_api();
    navigate("/");
  };

  const user_location_api = async () => {
    const res = await location_api();
    const country = res.data.country;
    if (country == "India") {
      Cookies.set("country", "INR", { secure: true }, { sameSite: "strict" }, { expires: 365 });
    } else {
      Cookies.set("country", "USD", { secure: true }, { sameSite: "strict" }, { expires: 365 });
    }
  };

  return (
    <>
      <div className="topheader">
        <AppBar position="fixed" className="MainHeader">
          <Toolbar className="header_padding">
            <div className="main_logo" style={{ display: "flex", alignItems: "center", gap: "0.1rem" }} onClick={() => navigate("/")}>
              <div className="header_log bhavishyaguru-logo-res py-2">
                <img src={logo} style={{ width: "50px", width: "50px" }} alt="" />
              </div>
            </div>
            <div className="header_grow" />
            <div className="">
              <div className="header_links">
                {auth === "true" ? (
                  <span className="header_link_color header_fontSize">
                    <span onClick={() => navigate("/add_wallet")}>
                      {currency === "INR" ? (
                        <span className="header_currency">
                          <IoWalletSharp size={23} />
                          <span style={{ fontSize: "16px" }}> Wallet:</span>
                          <span>
                            <BiRupee size={18} />
                            {state?.wallet}
                          </span>
                        </span>
                      ) : (
                        <span className="header_currency">
                          <IoWalletSharp size={23} /> Wallet:
                          <BiDollar size={18} />
                          {state?.wallet}
                        </span>
                      )}
                    </span>
                  </span>
                ) : (
                  ""
                )}

                {auth === "true" ? (
                  <span className="header_link_color header_fontSize" onClick={() => navigate("/notify")} style={{ paddingLeft: "7px" }}>
                    {state?.notification === "0" ? (
                      <Badge style={{ fontSize: "1.5rem", marginTop: "-0.3rem" }} color="primary" overlap="rectangular">
                        <IoIosNotifications />
                      </Badge>
                    ) : (
                      <Badge badgeContent={state?.notification} style={{ fontSize: "1.5rem", marginTop: "-0.3rem" }} color="primary" overlap="rectangular">
                        <IoIosNotifications size={28} />
                      </Badge>
                    )}
                  </span>
                ) : (
                  ""
                )}

                {auth === "true" ? (
                  <span className="header_link_color header_fontSize" onClick={() => navigate("/astroshop")} style={{ paddingLeft: 0 }}>
                    <Badge style={{ fontSize: "1.5rem", marginTop: "-0.3rem" }} color="primary" overlap="rectangular">
                      <AiOutlineShoppingCart />
                    </Badge>
                  </span>
                ) : (
                  ""
                )}

                {auth === "true" ? (
                  <span className="">
                    <div className="dropdown">
                      <div className="">
                        {data === "" ? (
                          <Avatar alt="img" src="" style={{ height: "32px", width: "32px" }} />
                        ) : (
                          <img
                            src={data}
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                            alt="img"
                          />
                        )}
                      </div>

                      <div className="dropdown-content menu_hover">
                        <a className="submenu" onClick={() => navigate("/userprofile")}>
                          My Profile
                        </a>

                        <a className="submenu" onClick={() => navigate("/transactions")}>
                          Order History
                        </a>

                        <a className="submenu" onClick={() => navigate("/add_wallet")}>
                          My Wallet {currency === "INR" ? <BiRupee size={18} /> : <BiDollar size={18} />}
                          {state?.wallet}
                        </a>

                        <a className="submenu" onClick={() => logoutfunction()}>
                          Logout
                        </a>
                      </div>
                    </div>
                  </span>
                ) : (
                  <span
                    className="header_link_color header_fontSize header_login_btn"
                    //  onClick={logindialogbox}
                  >
                    <i className="fa fa-user mr-1" style={{ color: "#fff", fontSize: "26px" }} aria-hidden="true"></i>
                    Login
                  </span>
                )}
              </div>
            </div>

            <div className="mobile_Burger_Menu">
              <span className="d-flex" style={{ marginInline: "auto", alignItems: "baseline", gap: "1rem" }}>
                <span className="icons-color logout_Pointer_cursor subbort_img  text-right mt-1">
                  <a className="" target="_blank" style={{ color: "rgb(37,211,102)" }}>
                    <IoLogoWhatsapp size={23} />
                  </a>
                </span>

                <span className="logout_Pointer_cursor subbort_img  text-right mt-1">
                  {auth === "true" ? (
                    <span className="icons-color">
                      <IoWalletOutline size={23} onClick={() => navigate("/add_wallet")} />
                    </span>
                  ) : (
                    <span className="icons-color">
                      <IoWalletOutline size={23} onClick={logindialogbox} />
                    </span>
                  )}
                </span>
                <span className="logout_Pointer_cursor subbort_img  text-right mt-1">
                  {auth === "true" ? (
                    <span className="">
                      <div className="">
                        {data === "" ? (
                          <i className="fa fa-user-circle-o" style={{ color: "#000", height: "30px", width: "30px" }} aria-hidden="true"></i>
                        ) : (
                          <>
                            <div className="dropdown">
                              <img
                                src={data}
                                style={{
                                  height: "30px",
                                  width: "30px",
                                  borderRadius: "50%",
                                }}
                                alt="img"
                              />

                              <div className="dropdown-content dropdown-content_mobile menu_hover" style={{ textAlign: "left" }}>
                                <a className="" onClick={() => navigate("/userprofile")}>
                                  My Profile
                                </a>
                                <a className="submenu" onClick={() => navigate("/transactions")}>
                                  Order History
                                </a>

                                <a className="submenu" onClick={() => navigate("/add_wallet")}>
                                  My Wallet
                                </a>
                                <a className="submenu" onClick={() => logoutfunction()}>
                                  Logout
                                </a>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </span>
                  ) : (
                    <span className="icons-color" onClick={logindialogbox}>
                      <CgLogIn size={23} />
                    </span>
                  )}
                </span>
              </span>
              <span className="logout_Pointer_cursor hamburg_left  mr-3 text-right mt-2" onClick={!Sidebar ? setLoadingnewside : Closesidebar}>
                <GiHamburgerMenu size={23} />
              </span>

              <div id="mySidenav" className="sidenav">
                <div className="cross_icon_style">
                  <i
                    className="fa fa-times cursor"
                    onClick={() => {
                      document.getElementById("mySidenav").style.width = "0px";
                      setSidebar(false);
                    }}
                  ></i>
                </div>

                {auth === "true" ? (
                  <span className="">
                    <div className="dropdown">
                      <div className="">
                        {data === "" ? (
                          <i className="fa fa-user-circle-o" style={{ color: "#000", fontSize: "26px" }} aria-hidden="true"></i>
                        ) : (
                          <div>
                            <img
                              src={data}
                              style={{
                                height: "60px",
                                width: "60px",
                                borderRadius: "50%",
                                margin: "auto",
                              }}
                              alt="img"
                            />
                          </div>
                        )}
                      </div>

                      <div className="dropdown-content_sidebar">
                        <a className="" onClick={() => navigate("/userprofile")}>
                          Profile
                        </a>
                        <a className="" onClick={() => navigate("/transactions")}>
                          Transaction History
                        </a>

                        <a className="submenu" onClick={() => navigate("/add_wallet")}>
                          Wallet Recharge
                        </a>

                        <a className="submenu" onClick={() => logoutfunction()}>
                          Logout
                        </a>
                      </div>
                    </div>
                  </span>
                ) : (
                  <span className="header_link_color header_fontSize" onClick={logindialogbox}>
                    <Avatar alt="img" src="" />
                  </span>
                )}

                <span className="logout_Pointer_cursor sidebar_box_style" onClick={() => navigate("/")}>
                  Home
                </span>
                <span className="logout_Pointer_cursor sidebar_box_style" onClick={() => navigate("/chat-with-astrologer")}>
                  Chat With Astrologers
                </span>
                <span className="logout_Pointer_cursor sidebar_box_style" onClick={() => navigate("/talk-to-astrologer")}>
                  Talk to Astrologer
                </span>
                <span className="logout_Pointer_cursor sidebar_box_style" onClick={() => navigate("/freekundli")}>
                  Free Kundli
                </span>
                <span className="logout_Pointer_cursor sidebar_box_style" onClick={() => navigate("/live_astrologer ")}>
                  Live Events
                </span>

                <span className="logout_Pointer_cursor sidebar_box_style" onClick={() => navigate("/horoscope/daily-horoscope")}>
                  Horoscopes
                </span>

                <span className="logout_Pointer_cursor sidebar_box_style" onClick={() => navigate("/astroshop")}>
                  Astroshop
                </span>

                <span className="logout_Pointer_cursor sidebar_box_style" onClick={() => navigate("/numerology")}>
                  Numerology
                </span>

                <span className="logout_Pointer_cursor sidebar_box_style" onClick={() => navigate("/panchang")}>
                  Today Panchang
                </span>
                <span className="logout_Pointer_cursor sidebar_box_style" onClick={() => navigate("/matchmaking")}>
                  Kundli Matching
                </span>
                <span className="logout_Pointer_cursor sidebar_box_style" onClick={() => navigate("/blog")}>
                  Blog
                </span>

                {auth === "true" ? (
                  <span className="logout_Pointer_cursor sidebar_box_style" onClick={() => logoutfunction()}>
                    Logout
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Toolbar>
          <Header1 />
        </AppBar>
      </div>
      <UserLogin open={Loginpopup} close={() => logindialogbox()} />
    </>
  );
};

export default Header;

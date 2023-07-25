import React, { useState } from "react";
import './Header.css'
import s from "./Header1.module.css";
import logo from "../../images/logo.webp";
import { useNavigate } from "react-router-dom";
import { Col, Dropdown } from "react-bootstrap";

const Header1 = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPoojaDropdown, setShowPoojaDropdown] = useState(false);
  return (
    <div>
      <div className={s["header-section"]}>
        <div className={s["header-layout"]}>
          <div className={s["header-layout-right-side"]}>
            <div className={s["flex_use_with_justify"]}>
              <div
                onClick={() => navigate("/")}
                className={`${
                  window.location.pathname == "/"
                    ? s["navLinksactive"]
                    : s["navLinks"]
                }`}
              >
                <a className="nav-link">HOME</a>
              </div>
              <div
                onClick={() => navigate("/chat-with-astrologer")}
                className={`${
                  window.location.pathname == "/chat-with-astrologer"
                    ? s["navLinksactive"]
                    : s["navLinks"]
                }`}
              >
                <a className="nav-link">CHAT WITH ASTROLOGER</a>
              </div>
              <div
                onClick={() => navigate("/talk-to-astrologer")}
                className={`${
                  window.location.pathname == "/talk-to-astrologer"
                    ? s["navLinksactive"]
                    : s["navLinks"]
                }`}
              >
                <a className="nav-link">TALK TO ASTROLOGER</a>
              </div>
              <div
                onClick={() => navigate("/horoscope/daily-horoscope")}
                className={`${
                  window.location.pathname == "/horoscope/daily-horoscope"
                    ? s["navLinksactive"]
                    : s["navLinks"]
                }`}
              >
                <a className="nav-link">HOROSCOPES</a>
              </div>
              <div
                onClick={() => navigate("/matchmaking")}
                className={`${
                  window.location.pathname == "/matchmaking"
                    ? `${s["navLinksactive"]} ${s["tab-kundli"]}`
                    : `${s["navLinks"]} ${s["tab-kundli"]}`
                }`}
              >
                <a className="nav-link">KUNDLI MATCHING</a>
              </div>
              <div
                onClick={() => navigate("/numerology")}
                className={`${
                  window.location.pathname == "/numerology"
                    ? s["navLinksactive"]
                    : s["navLinks"]
                }`}
              >
                <a className="nav-link">NUMEROLOGY</a>
              </div>
              <div
                onClick={() => navigate("/panchang")}
                className={`${
                  window.location.pathname == "/panchang"
                    ? s["navLinksactive"]
                    : s["navLinks"]
                }`}
              >
                <a className="nav-link">PANCHANG</a>
              </div>
              <div
                className={`${
                  window.location.pathname == "#"
                    ? s["navLinksactive"]
                    : s["navLinks"]
                }`}
              >
                <a className="nav-link" onMouseLeave={() => setShowDropdown(false)}
                    onMouseOver={() => setShowDropdown(true)}>
                  <Dropdown >
                    <Dropdown.Toggle
                      className="nav-link .nav-link.dropdown-toggle"
                      id="dropdown-basic"
                    >
                      SERVICES
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      show={showDropdown}
                      onMouseOver={() => setShowDropdown(true)}
                    >
                      <Dropdown.Item href="#/action-1">COURSES</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        ASTROLOGER JOIN US
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        KUNDALI REPORT
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-4">
                        MATCHMAKING REPORT
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-5">VARSHFAL</Dropdown.Item>
                      <Dropdown
                        onMouseLeave={() => setShowPoojaDropdown(false)}
                        onMouseOver={() => setShowPoojaDropdown(true)}
                      >
                        <Dropdown.Toggle
                          className="nav-link nested-dropdown"
                          id="nested-dropdown-basic"
                        >
                          PERSONALISED POOJA
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          show={showPoojaDropdown}
                          onMouseOver={() => setShowPoojaDropdown(true)}
                        >
                          <Dropdown.Item href="#/action-6">
                            POOJA ACTION 1
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-7">
                            POOJA ACTION 2
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-7">
                            POOJA ACTION 3
                          </Dropdown.Item>
                          {/* Add more nested dropdown items as needed */}
                        </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown.Item href="#/action-4">
                        HEALING
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-4">
                        AURA SCAN
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-4">
                        GEM STONES
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-4">
                       CRYSTALS
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-4">
                        YANTRAS
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-4">
                        MONEY SPRAY
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </a>
              </div>
              <div
                onClick={() => navigate("/blog")}
                className={`${
                  window.location.pathname == "/blog"
                    ? s["navLinksactive"]
                    : s["navLinks"]
                }`}
              >
                <a className="nav-link">BLOG</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header1;

import React from "react";
import { NavLink, NavNavLink } from "react-router-dom";
import "./Header/Header.css";

const HeaderBottom = () => {
  return (
    <>
      <div>
        <div className="content_padding-header">
          <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <div className="navbar-brand" href="#">
                <NavLink className="nav-NavLink" to="/">
                  <img src="images/unnamed.png" alt="" className="img-fluid" />
                </NavLink>
              </div>
              <div className="collapse navbar-collapse  justify-content-between align-items-center" id="collapsibleNavbar">
                <ul className="navbar-nav  nav_class  w-100 " style={{ justifyContent: "space-between" }}>
                  <li className="nav-item dropdown backcolor">
                    <NavLink className={`${window.location.pathname == "/" ? "dropdown-item active" : "dropdown-item"}`} to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className={`${window.location.pathname == "/chat-with-astrologer" ? "dropdown-item active" : "dropdown-item"}`}
                      to="/chat-with-astrologer"
                    >
                      Chat with Astrologer
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className={`${window.location.pathname == "/talk-to-astrologer" ? "dropdown-item active" : "dropdown-item"}`}
                      to="/talk-to-astrologer"
                    >
                      Talk to Astrologer
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink className={`${window.location.pathname == "/freekundli" ? "dropdown-item active" : "dropdown-item"}`} to="/freekundli">
                      {" "}
                      Free Kundli
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className={`${window.location.pathname == "/horoscope/daily-horoscope" ? "dropdown-item active" : "dropdown-item"}`}
                      to="/horoscope/daily-horoscope"
                    >
                      Horoscopes
                    </NavLink>
                  </li>

                  <li className="nav-item dropdown">
                    <NavLink className={`${window.location.pathname == "/matchmaking" ? "dropdown-item active" : "dropdown-item"}`} to="/matchmaking">
                      Kundli Matching
                    </NavLink>
                  </li>

                  <li className="nav-item dropdown moreNavBtn">
                    <div className={`${window.location.pathname == "#" ? "dropdown-item active" : "dropdown-item"}`}>More ￬</div>
                    <ul className="moreNavList">
                      <li className="nav-item dropdown">
                        <NavLink
                          className={`${window.location.pathname == "/astroshop" ? "dropdown-item active" : "dropdown-item"}`}
                          to="/astroshop"
                          style={{ margin: "4px 0px" }}
                        >
                          Astroshop
                        </NavLink>
                      </li>

                      <li className="nav-item dropdown">
                        <NavLink
                          className={`${window.location.pathname == "numerology" ? "dropdown-item active" : "dropdown-item"}`}
                          style={{ marginTop: "0px" }}
                          to="/numerology"
                        >
                          Numerology
                        </NavLink>
                      </li>

                      <li className="nav-item dropdown">
                        <NavLink
                          className={`${window.location.pathname == "panchang" ? "dropdown-item active" : "dropdown-item"}`}
                          to="/panchang"
                          style={{ margin: "4px 0px" }}
                        >
                          Panchang
                        </NavLink>
                      </li>
                      <li className="nav-item dropdown">
                        <NavLink
                          className={`${window.location.pathname == "panchang" ? "dropdown-item active" : "dropdown-item"}`}
                          to="/panchang"
                          style={{ margin: "4px 0px" }}
                        >
                          Services
                        </NavLink>
                      </li>
                      <li className="nav-item dropdown">
                        <NavLink
                          className={`${window.location.pathname == "/blog" ? "dropdown-item active" : "dropdown-item"}`}
                          to="/blog"
                          style={{ margin: "4px 0px" }}
                        >
                          Blog
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HeaderBottom;

// import React from "react";
// import { NavLink } from "react-router-dom";

// const HeaderBottom = () => {
//   return (
//     <>
//       <div class="menutop">
//         <div class="menu main" id="">
//           <ul id="menu" class="menu_ul90">
//             <li>
//               <NavLink className={`${window.location.pathname == "/" ? "active-menu" : ""}`} to="/" title="Home">
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 className={`${window.location.pathname == "/chat-with-astrologer" ? "active-menu" : ""}`}
//                 to="/chat-with-astrologer"
//                 title="Consult Astrologers"
//               >
//                 Chat with Astrologer
//               </NavLink>
//             </li>
//             <li>
//               <NavLink className={`${window.location.pathname == "/talk-to-astrologer" ? "active-menu" : ""}`} to="/talk-to-astrologer" title="Horoscope">
//                 Talk to Astrologer
//               </NavLink>
//             </li>
//             <li style={{ position: "relative", textAlign: "center" }}>
//               <NavLink
//                 className={`${window.location.pathname == "/horoscope/daily-horoscope" ? "active-menu" : ""}`}
//                 to="/horoscope/daily-horoscope"
//                 title="Horoscope"
//               >
//                 Horoscope
//               </NavLink>
//             </li>
//             <li style={{ position: "relative", textAlign: "center" }} class="menu_hide_23">
//               <NavLink className={`${window.location.pathname == "/numerology" ? "active-menu" : ""}`} to="/numerology" title="Numerology">
//                 Numerology
//               </NavLink>
//             </li>
//             <li class="menu_hide_23">
//               <NavLink className={`${window.location.pathname == "/freekundli" ? "active-menu" : ""}`} to="/freekundli" title="Tarot">
//                 Free Kundli
//               </NavLink>
//             </li>

//             <li>
//               <NavLink className={`${window.location.pathname == "/panchang" ? "active-menu" : ""}`} to="/panchang" title="Panchang">
//                 Panchang
//               </NavLink>
//             </li>
//             <li>
//               <NavLink className={`${window.location.pathname == "/matchmaking" ? "active-menu" : ""}`} to="/matchmaking" title="Kundli">
//                 Kundli Matching
//               </NavLink>
//             </li>

//             <li>
//               <NavLink className={`${window.location.pathname == "/blog" ? "active-menu" : ""}`} to="/blog" title="Blog">
//                 Blog
//               </NavLink>
//             </li>
//             <li>
//               <a>More ￬</a>
//               <ul class="hidden large_menu">
//                 <li>
//                   <a href="/kundli/kundli-matching" id="matchmakingtopmenu">
//                     <i class="icon-layers fa-fw"></i>Matchmaking
//                   </a>
//                 </li>
//                 <li>
//                   {" "}
//                   <a href="/wedding">
//                     <i class="icon-layers fa-fw"></i>Marriage
//                   </a>{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <a href="/zodiac-signs">
//                     <i class="icon-layers fa-fw"></i>Zodiac Signs
//                   </a>{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <a href="/baby-names">
//                     <i class="icon-layers fa-fw"></i>Baby Names
//                   </a>{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <a href="/planet">
//                     <i class="icon-layers fa-fw"></i>Planet
//                   </a>{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <a href="/vastu">
//                     <i class="icon-layers fa-fw"></i>Vastu
//                   </a>{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <a href="/alphabet">
//                     <i class="icon-layers fa-fw"></i>Alphabet Horoscope
//                   </a>{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <a href="/remedies">
//                     <i class="icon-layers fa-fw"></i>Remedies
//                   </a>{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <a href="/palmreading">
//                     <i class="icon-layers fa-fw"></i>Palm Reading
//                   </a>{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <a href="/chineseastrology">
//                     <i class="icon-layers fa-fw"></i>Chinese Astrology
//                   </a>{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <a href="/spirituality">
//                     <i class="icon-layers fa-fw"></i>Spirituality
//                   </a>{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <a href="/festival">
//                     <i class="icon-layers fa-fw"></i>Festival
//                   </a>{" "}
//                 </li>
//                 <li>
//                   <a href="/indianastrology">
//                     <i class="icon-layers fa-fw"></i>Vedic Astrology
//                   </a>
//                 </li>

//                 <li>
//                   <a href="/mobileapps">
//                     <i class="icon-layers fa-fw"></i>Astroyogi Mobile Apps
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/video" title="Videos">
//                     Videos
//                   </a>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HeaderBottom;

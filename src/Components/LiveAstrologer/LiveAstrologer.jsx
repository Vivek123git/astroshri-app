import React, { useEffect, useState } from "react";
import banner from "../../images/sign.png";
import HOC from "../../Common/HOC";
import "./LiveAstrologer.css";
import sign from "../../images/sign.png";
import a from "../../images/c.gif";
import b from "../../images/pooja_icon.jpg";
import c from "../../images/remove_bg_phone.gif";
import d from "../../images/playBtn.webp";
import { notificationHandler } from "../utils/Notification";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import SEO from "../Seo/seo";
import Cookies from "js-cookie";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";

const LiveAstrologer = () => {
  const [liveastrologerArry, setliveastrologerArry] = useState([]);
  const [isUpdated, setisUpdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  const token = Cookies.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // liveAstrologer();
  }, []);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  ///api integration get liveastrologer
  // const liveAstrologer = () => {
  //   try {
  //     let url = getBaseUrl() + "web/live_astro_list";
  //     setisloading(true);
  //     let config = {
  //       headers: { Authorization: `Bearer ${token}` },
  //     };

  //     axios
  //       .get(url, config)
  //       .then(
  //         (res) => {
  //           setliveastrologerArry(res.data.results);
  //           setisloading(false);
  //         },

  //         (error) => {
  //           console.log("data response error:::", error);
  //           setisloading(false);
  //           notificationHandler({ type: "danger", msg: error });
  //         }
  //       )
  //       .catch((e) => {
  //         console.log("data response error:::", e);
  //         notificationHandler({ type: "danger", msg: e });
  //         setisloading(false);
  //       });
  //   } catch (error) {
  //     console.log("data response error:::", error);
  //     notificationHandler({ type: "danger", msg: error });
  //     setisloading(false);
  //   }
  // };

  // const ListSkeleton = ({ listsToRender }) => {
  //   return (
  //     <>
  //       {Array(listsToRender)
  //         .fill(1)
  //         .map((card, index) => (
  //           <div
  //             style={{ width: "40%", margin: "5px", borderRadius: "20px" }}
  //             key={index}
  //           >
  //             <Skeleton variant="rectangular" width="100%">
  //               <div style={{ paddingTop: "100%" }} />
  //             </Skeleton>
  //             <Skeleton />
  //             <Skeleton />
  //           </div>
  //         ))}
  //     </>
  //   );
  // };
  return (
    <>
      <SEO
        title="Live Events - Free Online Astrology Predictions by Best Astrologer"
        description="Rakshaa is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me,Live Events,Free Kundli"
        url="https://Rakshaa.com/static/media/Rakshaalogo.f965aa0eb4f9ff946091.png"
      />
      <div>
        <div className="homepage_padding" style={{ backgroundColor: "#fff" }}>
          {/* <div className="free_kundli_banner p-5">
            <div className="container">
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div className="freekundli_content" style={{ width: "50%" }}>
                  <h1 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  Coming Soon.
                  </h1>
                 
                </div>
                <div className="sing_image" id="myDIV">
                  <img src={sign} />
                </div>
              </div>
            </div>
          </div> */}
          <div className="container">
            <BreadcrumbSection tittle="Live at Rakshaa" />
          </div>
          <div className="">
            <img className="coming-soon-page" src={a} />
          </div>

          {/* <section className="mt-5 mb-5">
            <div className="container">
              <div className="search_box_astromall_new mt-5">
                <input
                  type="search"
                  name="productSearch"
                  id="productSearch"
                  className="mat-autocomplete-trigger ng-valid ng-touched ng-dirty"
                  placeholder="Let's find what you're looking for..."
                  role="combobox"
                  aria-expanded="false"
                  aria-haspopup="true"
                  // onChange={(e) => searchbykey(e)}
                />
                <i className="fa fa-search"></i>
              </div>

              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "block",
                }}
                className="text-center"
                style={{ justifyContent: "center" }}
              >
                <Tabs
                  orientation="horizontal"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: "divider" }}
                  style={{ justifyContent: "center" }}
                  indicatorColor="primary"
                >
                  <Tab label="Ongoing" {...a11yProps(0)} />
                  <Tab label="UpComing" {...a11yProps(1)} />
                </Tabs>

                <TabPanel value={value} index={0}>
                  {liveastrologerArry && liveastrologerArry.length > 0 ? (
                    <div className="row">
                      {liveastrologerArry.map((data, index) => (
                        <div
                          className="col-md-3 col-sm-6 mb-2 mb-2 pb-4"
                          style={{ cursor: "pointer" }}
                          key={index}
                          // onClick={() => navigate("/agora", { state: "id" })}
                        >
                          <div className="mainDivList">
                            <div className="liveList">
                              <img src={data.profile_img} />
                            </div>
                            <div className="astroimage_data">
                              <div className="live_astro_name pl-2 pt-2">
                                {data.name}
                              </div>
                            </div>
                            <div className="trucaller_img">
                              <img
                                style={{ height: "90px", width: "90px" }}
                                src={c}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="d-flex mb-5">
                      <ListSkeleton listsToRender={3} />
                    </div>
                  )}
                </TabPanel>
              </Box>
            </div>
          </section> */}
        </div>
      </div>
    </>
  );
};

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

export default HOC(LiveAstrologer);

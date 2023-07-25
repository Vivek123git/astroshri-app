import React, { useEffect, useState, useContext } from "react";
import HOC from "../../Common/HOC";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./ProductDetail.css";
import { notificationHandler } from "../utils/Notification";
import { getBaseUrl } from "../utils";
import axios from "axios";
//tab pannel
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { UserContext } from "../../App";
import UserLogin from "../../Components/DialogeBox/UserLogin";
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton, FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import Cookies from "js-cookie";
const ProductDetails = (props) => {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [productdetailArry, setproductdetailArry] = useState([]);
  const [moerproduct, setmoerproduct] = useState([]);
  const currency = Cookies.get("country");
  const [AstrologerList, setAstrologerList] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [Loginpopup, setLoginpopup] = useState(false);
  const [catogoryId, setcatogoryId] = useState("");
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");
  const { id } = useParams();
  const [imageset, setimageset] = useState(null);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    LiveAstroData();
    productdetail();
    productList();
    if (!id) {
      navigate(-1);
    }
  }, [id]);

  /// top astrologer list
  const LiveAstroData = () => {
    let url = getBaseUrl() + "web/home_data";
    setisloading(true);
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(url, config)
      .then(
        (res) => {
          setAstrologerList(res?.data?.astrologer);
          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error.response.status);
          console.log("data response error:::", error.response);

          setisloading(false);
          notificationHandler({ type: "danger", msg: error });
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        notificationHandler({ type: "danger", msg: e });
        setisloading(false);
      });
  };

  ///api integration get astrologer Profile
  const productdetail = () => {
    try {
      if (auth === "true") {
        let url = getBaseUrl() + "web/product_list";
        setisloading(true);
        let temp = {
          category_id: "",
          id: id,
        };
        let config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        axios.post(url, temp, config).then(
          (res) => {
            console.log("product detail varient:::::", res);
            setproductdetailArry(res.data.results);
            setimageset(res.data.results[0].display_image);
            productList(res.data.results[0].category_id);
            setcatogoryId(res.data.results[0].category_id);

            setisloading(false);
          },

          (error) => {
            console.log("data response error:::", error);
            setisloading(false);
            notificationHandler({ type: "danger", msg: error });
          }
        );
        return;
      } else {
        let url = getBaseUrl() + "web/product_list";
        setisloading(true);
        let temp = {
          category_id: "",
          id: id,
        };
        let config = {
          // headers: { Authorization: `Bearer ${token}` }
        };
        axios.post(url, temp, config).then(
          (res) => {
            setproductdetailArry(res.data.results);
            productList(res.data.results[0].category_id);
            setcatogoryId(res.data.results[0].category_id);

            console.log("product detail varient:::::", res);

            setisloading(false);
          },

          (error) => {
            console.log("data response error:::", error);
            setisloading(false);
            notificationHandler({ type: "danger", msg: error });
          }
        );
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  /////api integration get product

  const productList = (category_id) => {
    console.log("product detail varient:::::", category_id);
    try {
      if (auth === "true") {
        let url = getBaseUrl() + "web/product_list";
        setisloading(true);

        let temp = {
          category_id: category_id,
        };
        let config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        axios.post(url, temp, config).then(
          (res) => {
            console.log("productList :::", res);
            setmoerproduct(res.data.results);
            setisloading(false);
          },

          (error) => {
            console.log("data response error:::", error);
            setisloading(false);
            notificationHandler({ type: "danger", msg: error });
          }
        );
        return;
      } else {
        let url = getBaseUrl() + "web/product_list";
        setisloading(true);

        let temp = {
          category_id: category_id,
        };
        let config = {
          // headers: { Authorization: `Bearer ${token}` }
        };
        axios.post(url, temp, config).then(
          (res) => {
            console.log("productList :::", res);
            setmoerproduct(res.data.results);
            setisloading(false);
          },

          (error) => {
            console.log("data response error:::", error);
            setisloading(false);
            notificationHandler({ type: "danger", msg: error });
          }
        );
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  ///add to cart
  const addtocart = () => {
    try {
      if (auth === "true") {
        let url = getBaseUrl() + "user_api/add_to_cart";
        setisloading(true);
        let temp = {
          product_id: id,
        };
        let config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        axios.post(url, temp, config).then(
          (res) => {
            console.log("add to cart :::::", res.data);
            notificationHandler({ type: "success", msg: res.data.message });
            dispatch({
              type: "USER",
              payload: { ...state, cartItemsLength: res.data.item_count },
            });
            setisloading(false);
          },

          (error) => {
            console.log("data response error:::", error);
            setisloading(false);
            notificationHandler({ type: "danger", msg: error });
          }
        );
        return;
      }
      setLoginpopup(true);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };
  const logindialogbox = () => {
    setLoginpopup(!Loginpopup);
  };

  const wishlist = async (idd) => {
    try {
      if (auth === "true") {
        let url = getBaseUrl() + "user_api/wishlist_add_update";
        setisloading(true);
        let temp = {
          product_id: idd.id,
        };
        let config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        axios.post(url, temp, config).then(
          (res) => {
            console.log(res);
            notificationHandler({ type: "success", msg: res.data.message });
            // wishlistproduct()
            // setisloading(false);
            productdetail();
          },

          (error) => {
            console.log("data response error:::", error.response.status);
            console.log("data response error:::", error.response);

            setisloading(false);
            notificationHandler({ type: "danger", msg: error });
          }
        );
        return;
      } else {
        setLoginpopup(true);
      }
    } catch (error) {}
  };

  const shareUrl = `https://Rakshaa.com/productdetail/${id}`;
  const [copied, setCopied] = useState(false);
  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

  const imagesetfun = (row) => {
    setimageset(row.image);
  };

  const relatedproduct = (data) => {
    setimageset(data.image);
    navigate(`/productdetail/${data.id}`);
  };

  return (
    <>
      <div className="homepage_padding mt-3" style={{ borderTop: "2px solid #777" }}>
        <div className="astroprofile mt-5 mb-5">
          <div className="card_section">
            <main className="container">
              <div className="row">
                <div className="col-1 side_product_img">
                  <div className="left-column">
                    {productdetailArry.map((data, index) => (
                      <div className="mb-2">
                        {productdetailArry[0]?.product_img.length > 0
                          ? productdetailArry[0]?.product_img.map((row) => (
                              <img
                                style={{ width: "100%", cursor: "pointer" }}
                                data-image="black"
                                className="mb-3"
                                src={row?.image}
                                onClick={() => imagesetfun(row)}
                                alt=""
                              />
                            ))
                          : ""}
                      </div>
                    ))}
                  </div>
                </div>
                {productdetailArry.length === 0 && <>No Data</>}
                {productdetailArry.map((data, index) => (
                  <div className="col-11">
                    <div className="right-column">
                      <img className="responsive_img" data-image="black" src={imageset || productdetailArry[0].display_image} alt="" />

                      <div className="product-description p-3">
                        <span>{data?.category_name}</span>
                        <h1>{data?.name}</h1>
                        <div className="product-configuration">
                          <div className="cable-config">
                            <span>Cable configuration</span>

                            <div className="product-description">
                              <div>
                                <div>100% Original Products</div>
                                <div>Pay on delivery might be available</div>
                                <div>Try & Buy might be available</div>
                                <div>Bank Offer5% Cashback on Flipkart Axis Bank Card</div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className="" style={{ fontWeight: "900" }}>
                                Price {currency === "INR" ? "₹" : "$"} {data?.price}
                              </div>
                              {/* //share */}

                              <div className="product-card-actions p-2">
                                <div className="dropdown">
                                  <div className="">
                                    <i className="fa fa-share" aria-hidden="true"></i>
                                  </div>
                                  <div
                                    className="dropdown-content "
                                    style={{
                                      minWidth: "0px",
                                      left: "34px",
                                      top: "0px",
                                    }}
                                  >
                                    <FacebookShareButton url={shareUrl} quote="Demo" className="Demo__some-network__share-button">
                                      <FacebookIcon />
                                    </FacebookShareButton>
                                    <br />
                                    <WhatsappShareButton url={shareUrl} quote="Demo" className="Demo__some-network__share-button">
                                      <WhatsappIcon />
                                    </WhatsappShareButton>
                                    <br />
                                    <TwitterShareButton url={shareUrl} quote="Demo" className="Demo__some-network__share-button">
                                      <TwitterIcon />
                                    </TwitterShareButton>{" "}
                                    <br />
                                    <button onClick={copy} className={`${!copied ? "Copylink" : "Copied"}`}>
                                      {!copied ? "Copy link" : "Copied!"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <button title="Wishlist" className="btn btn-wishlist" onClick={() => wishlist(data)}>
                                {data.is_favorite === "N" ? (
                                  <i className="fa fa-heart-o" style={{ fontSize: "27px" }} aria-hidden="true"></i>
                                ) : (
                                  <i className="fa fa-heart" style={{ fontSize: "27px", color: "red" }} aria-hidden="true"></i>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="product-price">
                          <button className="add_to_cart" onClick={() => addtocart()}>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>

          <section className="container tabs mt-5 mb-5 pb-5">
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "block",
              }}
            >
              <Tabs
                orientation="horizontal"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
                indicatorColor="primary"
              >
                <Tab label="Description" {...a11yProps(0)} />
                <Tab label="Additional Information" {...a11yProps(1)} />
                <Tab label="Reviews (0)" {...a11yProps(3)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                {productdetailArry.map((data, index) => (
                  <p dangerouslySetInnerHTML={{ __html: data?.details }}></p>
                ))}
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3}>
                Item Four
              </TabPanel>
            </Box>
          </section>

          <section className="container">
            <div className="pl-3 mb-3">
              <h3>Related Products</h3>
            </div>
            <div className="col-12">
              <div className="row">
                {moerproduct.length > 0 ? (
                  moerproduct.map((data, index) => (
                    <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-product">
                      <div className="product-item">
                        <div className="row-custom product-multiple-image" style={{ cursor: "pointer" }} onClick={() => relatedproduct(data)}>
                          <a className="item-wishlist-button item-wishlist-enable "></a>
                          <div className="img-product-container p-2">
                            <img
                              src={data?.display_image}
                              height="200px"
                              alt="Floral women sundress"
                              className="img-fluid_c img-product ls-is-cached lazyloaded"
                            />
                          </div>
                        </div>
                        <div className="row-custom item-details p-2">
                          <h3 className="product-title" style={{ cursor: "pointer" }} onClick={() => relatedproduct(data)}>
                            {data?.name}
                          </h3>
                          <p className="product-user text-truncate"></p>
                          <div className="item-meta">
                            <span
                              className=""
                              dangerouslySetInnerHTML={{
                                __html: data?.benefits.substring(0, 55) + "...",
                              }}
                            ></span>
                          </div>
                          <div className="item-meta d-flex" style={{ justifyContent: "space-between" }}>
                            <div className="price">
                              <span>{currency === "INR" ? "₹" : "$"}</span>
                              {data?.price}
                            </div>
                            <button title="Wishlist" className="btn btn-wishlist" onClick={() => wishlist(data)}>
                              {data.is_favorite === "N" ? (
                                <i className="fa fa-heart-o" style={{ fontSize: "27px" }} aria-hidden="true"></i>
                              ) : (
                                <i className="fa fa-heart" style={{ fontSize: "27px", color: "red" }} aria-hidden="true"></i>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No Product Avalable </p>
                )}
              </div>
            </div>
          </section>
          <section className="container ourastrologer mt-3 mb-5">
            <OurAstrologerCrousal astro={AstrologerList} />
          </section>
        </div>
      </div>
      <UserLogin open={Loginpopup} close={() => logindialogbox()} />
    </>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default HOC(ProductDetails);

import React, { useState, useEffect } from "react";
import HOC from "../../Common/HOC";
import a from "../../images/sign.png";
import { notificationHandler } from "../utils/Notification";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Blog.css";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import homeapi from "../api/homeapi";
import { latest_blog_api } from "../api/blogapi";
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton, FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";
import Cookies from "js-cookie";
//SEO
import SEO from "../Seo/seo";
import Loder from "../Loder/Loder";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
const BlogDetails = () => {
  const [isloading, setisloading] = useState(false);
  const [blogdetail, setblogdetail] = useState([]);
  const location = useLocation();
  const [BlogListArry, setBlogListArry] = useState([]);
  const [seotitle, setseotitle] = useState("Rakshaa");
  const [seoimage, setseoimage] = useState("https://Rakshaa.com/static/media/Rakshaalogo.f965aa0eb4f9ff946091.png");
  const token = Cookies.get("token");
  const [latestblogArry, setlatestblogArry] = useState([]);
  const [AstrologerList, setAstrologerList] = useState("");
  const navigate = useNavigate();
  console.log(location?.state?.categoryid);
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    LatestblogData();
    blogdetailspage();
    LiveAstroData();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    blogdetailspage();
  }, [id]);

  const shareUrl = `https://Rakshaa.com/blogdetails/${id}`;

  ///api integration get Related  Blog Detail
  useEffect(() => {
    blogsection();
  }, []);
  const blogsection = () => {
    try {
      let url = getBaseUrl() + `web/blog_list?category_id=${location?.state?.categoryid}&id=`;
      setisloading(true);
      let config = {
        headers: { Authorization: `Bearer ${token}` },
        // params: `category_id=${location.state}`,
      };
      axios.get(url, config).then(
        (res) => {
          console.log(res.data.results);
          setseotitle(res?.data?.results[0]?.title);
          setseoimage(res.data.results[0].img);
          setBlogListArry(res.data.results);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
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

  ///api integration get Blog Detail
  const blogdetailspage = () => {
    try {
      let url = getBaseUrl() + "web/blog_list?category_id=";
      setisloading(true);
      let config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { id: id },
      };

      axios.get(url, config).then(
        (res) => {
          setblogdetail(res.data.results);
          setseotitle(res.data.results[0].title);
          setseoimage(res.data.results[0].img);
          console.log(res);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
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

  ///api integration get Blog Detail
  const LatestblogData = async () => {
    try {
      setisloading(true);
      const res = await latest_blog_api();
      if (res.data.status) {
        setlatestblogArry(res?.data?.results);
        setisloading(false);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        notificationHandler({ type: "danger", msg: res?.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  /// top astrologer list
  const LiveAstroData = async () => {
    try {
      setisloading(true);
      const res = await homeapi();
      if (res.data.status) {
        setAstrologerList(res?.data?.astrologer);
        setisloading(false);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  return (
    <>
      <SEO
        title={`${seotitle}-Rakshaa`}
        description="Rakshaa is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me,Live Events,Free Kundli"
        url={seoimage}
      />
      <div className="">
        <div className="container mt-4 mb-2">
          <BreadcrumbSection tittle="Rakshaa Blog" />
          {blogdetail.map((data, index) => (
            <div className="div_shadow mt-4" key={index}>
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <div className="data_blog d-flex">
                    <h1 className="blog_title_main" style={{ textTransform: "capitalize", color: "#000" }}>
                      {data?.title}
                    </h1>
                  </div>
                  <div className="">
                    <img className="blog_detail_img" src={data.img} />

                    <p
                      className="resonsive_image mt-3"
                      dangerouslySetInnerHTML={{
                        __html: data?.description,
                      }}
                    ></p>
                    <div className="share-icons-react mb-3">
                      <div>
                        <FacebookShareButton round url={shareUrl} quote="Demo" className="Demo__some-network__share-button">
                          <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                      </div>
                      <div>
                        <WhatsappShareButton url={shareUrl} quote="Demo" className="Demo__some-network__share-button">
                          <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>
                      </div>
                      <div>
                        <TwitterShareButton url={shareUrl} quote="Demo" className="Demo__some-network__share-button">
                          <TwitterIcon size={40} round={true} />
                        </TwitterShareButton>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="col-md-12 col-sm-12 d-block ">
                      <div>
                        <h4 className="blog-section-related">Related BLOGS</h4>
                      </div>
                    </div>

                    <div className="row">
                      {BlogListArry.length > 0
                        ? BlogListArry?.map((data, index) => (
                            <div
                              className="col-md-6 col-lg-6 col-xl-"
                              key={index}
                              style={{ cursor: "pointer" }}
                              onClick={() => navigate(`/blogdetails/${data.id}`)}
                            >
                              <div className="blog_box_content m-2 " style={{ height: "auto" }}>
                                <div className="blog_section_image">
                                  <img src={data.img} alt="blog" />
                                </div>
                                <div className="p-2 " style={{ textAlign: "left" }}>
                                  <h5>{data?.title.substring(0, 30) + ""}</h5>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: data?.description.substring(0, 100) + "...",
                                    }}
                                  ></span>
                                </div>
                                <div className="d-flex p-2" style={{ justifyContent: "space-between" }}>
                                  <div className="" style={{ color: "#777" }}>
                                    Rakshaa
                                  </div>
                                  <div style={{ color: "#777" }}>{data?.Created_date.substring(0, 10)}</div>
                                </div>
                              </div>
                            </div>
                          ))
                        : "No Data found"}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4">
                  <section className="">
                    <div className="">
                      <h4 className="blog-section-related">Latest Blogs</h4>
                    </div>

                    <div class="col-12">
                      {latestblogArry?.slice(0, 10).map((data, index) => (
                        <div
                          class="tbl-container post-item-small"
                          key={index}
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/blogdetails/${data.id}`)}
                        >
                          <div class="tbl-cell">
                            <div class="image">
                              <img className="image-img-blog" style={{ width: "100%" }} src={data.img} alt="blog" loading="" />
                            </div>
                          </div>
                          <div class="tbl-cell right">
                            <h3 class="title">{data?.title.slice(0, 50) + "..."}</h3>
                            <p class="small-post-meta">
                              <span> Rakshaa</span>
                              <span>{data?.Created_date.substring(0, 10)}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          ))}
        </div>
        <section className="container ourastrologer mt-1 mb-4">
          <OurAstrologerCrousal astro={AstrologerList} />
        </section>
      </div>
      <Loder loading={isloading} />
    </>
  );
};

export default HOC(BlogDetails);

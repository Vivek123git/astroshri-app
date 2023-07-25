import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import a from "../../images/sign.png";
import "./Blog.css";
import { notificationHandler } from "../utils/Notification";
import { useNavigate } from "react-router-dom";
//tab pannel
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Skeleton } from "@mui/material";
//SEO
import SEO from "../Seo/seo";
import blogapi, { blog_list_api, get_blogapi } from "../api/blogapi";
import DataNotFound from "../DataNotFound";
const Blog = () => {
  const [isloading, setisloading] = useState(false);
  const [BlogAllCategories, setBlogAllCategories] = useState([]);
  const [CategoriesId, setCategoriesId] = useState("");
  const [active, setactive] = useState(0);
  const [name, setname] = useState("");
  const [BlogListArry, setBlogListArry] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 530,
      behavior: "smooth",
    });
    // blogsection();
  }, []);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    blogcategories();
  }, []);

  ///blog catogries
  const blogcategories = async () => {
    setisloading(true);
    try {
      const res = await blogapi();
      if (res?.data?.status) {
        setBlogAllCategories(res?.data?.results);
        setCategoriesId(res?.data?.results[0]?.id);
        const ID = res?.data?.results[0]?.id;

        if (!ID == undefined) {
          return;
        }
        blogsection(ID);
        setisloading(false);
      } else {
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  ///api integration get Blog Detail
  const blogsection = async (id) => {
    setactive(0);
    setisloading(true);
    try {
      const res = await blog_list_api();
      if (res.data.status) {
        setBlogListArry(res?.data?.results);
        setisloading(false);
      } else {
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };
  const filterCategoryDataArr = BlogListArry.filter((event) => {
    return event.title.toLowerCase().indexOf(name.toLowerCase()) !== -1;
  });

  const blogdata = async (data, index) => {
    setactive(index + 1);
    setCategoriesId(data.id);
    setisloading(true);
    try {
      const res = await get_blogapi(data?.id);
      if (res.data.status) {
        setBlogListArry(res.data.results);
        setisloading(false);
      } else {
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
        console.log("data response error:::", res);
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  const styles = {
    root: {
      padding: "0px",
    },
  };

  const ListSkeleton = ({ listsToRender }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, index) => (
            <div style={{ width: "40%", margin: "5px" }} key={index}>
              <Skeleton variant="rectangular" width="100%">
                <div style={{ paddingTop: "87%" }} />
              </Skeleton>
              <Box sx={{ display: "block", marginTop: "2px" }}>
                <Skeleton variant="rectangular" width="100%" height={22} />
              </Box>
              <Skeleton />
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <SEO
        title="Blog - Free Online Astrology Predictions by Best Astrologer"
        description="Rakshaa is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me"
        url="https://Rakshaa.com/static/media/Rakshaalogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding">
        <div className="blog_banner p-5">
          <div className="container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h2 className="banner_heading pt-4" style={{ color: "#FFF", textTransform: "uppercase" }}>
                  Rakshaa Blog
                </h2>
                <span className="header_banner pt-5">Read Our Latest Blog</span>
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <section className="blog container mt-2 mb-2">
            <div className="blogcard">
              <div className="ourastologer_content text-center">
                <h2 className="blog_sec pb-2 mt-5">What’s new on the blog</h2>
              </div>
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
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
                <i className="fa fa-search"></i>
              </div>

              <Box
                sx={{
                  flexGrow: 1,
                  width: "100%",
                  bgcolor: "background.paper",
                  display: "block",
                }}
                className="text-center"
                style={styles.root}
              >
                <Tabs
                  // orientation="horizontal"
                  // centered={true}
                  indicatorColor="primary"
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab
                    // key={index}
                    label="All"
                    // style={styles.root}
                    {...a11yProps(0)}
                    onClick={() => blogsection(CategoriesId)}
                    indicatorColor="primary"
                    // style={{ minWidth: "50%" }}
                    variant="fullWidth"
                  />
                  {BlogAllCategories.map((data, index) => (
                    <Tab
                      key={index}
                      label={data.name}
                      // style={styles.root}
                      {...a11yProps(active)}
                      onClick={() => blogdata(data, index)}
                      indicatorColor="primary"
                      // style={{ minWidth: "50%" }}
                      variant="fullWidth"
                    />
                  ))}
                </Tabs>

                <TabPanel value={value} index={active} style={styles.root}>
                  {!isloading ? (
                    <div className="row">
                      {filterCategoryDataArr.length > 0 ? (
                        filterCategoryDataArr?.map((data, index) => (
                          <div
                            className="col-md-6 col-lg-6 col-xl-4"
                            key={index}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(`/blogdetails/${data.id}`, {
                                state: {
                                  categoryid: CategoriesId,
                                },
                              })
                            }
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
                      ) : (
                        <DataNotFound />
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="d-flex" style={{ width: "100%" }}>
                        <ListSkeleton listsToRender={1} width="200" />
                        <ListSkeleton listsToRender={1} width="200" />
                        <ListSkeleton listsToRender={1} width="200" />
                        <ListSkeleton listsToRender={1} width="200" />
                      </div>
                      <div className="d-flex" style={{ width: "100%" }}>
                        <ListSkeleton listsToRender={1} width="200" />
                        <ListSkeleton listsToRender={1} width="200" />
                        <ListSkeleton listsToRender={1} width="200" />
                        <ListSkeleton listsToRender={1} width="200" />
                      </div>
                      <div className="d-flex" style={{ width: "100%" }}>
                        <ListSkeleton listsToRender={1} width="200" />
                        <ListSkeleton listsToRender={1} width="200" />
                        <ListSkeleton listsToRender={1} width="200" />
                        <ListSkeleton listsToRender={1} width="200" />
                      </div>
                    </>
                  )}
                </TabPanel>
              </Box>
            </div>
          </section>
        </div>
      </div>
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

export default HOC(Blog);

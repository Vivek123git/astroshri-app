import React, { useEffect, useState } from "react";
import report_type_api from "../api/report";
import { notificationHandler } from "../utils/Notification";
import a from "../../images/sign.png";
import HOC from "../../Common/HOC";
import Cookies from "js-cookie";
import DataNotFound from "../DataNotFound";
import { useNavigate } from "react-router-dom";
const ReportList = () => {
  const [isloading, setisloading] = useState(false);
  const [reportListArry, setreportListArry] = useState([]);
  const [name, setname] = useState("");
  const currency = Cookies.get("country");
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 530,
        behavior: "smooth",
      });
    }, 1000);
    get_reportList();
  }, []);

  const get_reportList = async () => {
    setisloading(true);
    try {
      let temp = {
        currency: currency,
      };
      const res = await report_type_api(temp);
      if (res.data.status) {
        setreportListArry(res.data.results);
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

  const filterCategoryDataArr = reportListArry.filter((event) => {
    return event.type.toLowerCase().indexOf(name.toLowerCase()) !== -1;
  });

  return (
    <div>
      {" "}
      <div className="homepage_padding pb-5">
        <div className="free_kundli_banner p-5">
          <div className="container chat_container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h1 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  Report List
                </h1>
                <span className="header_banner pt-5">Get instant & accurate, Janam Kundli</span>
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} alt="image" />
              </div>
            </div>
          </div>
        </div>
        <section className="report_section">
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
                onChange={(e) => setname(e.target.value)}
              />
              <i className="fa fa-search"></i>
            </div>
            <div className="row">
              {filterCategoryDataArr.length > 0 ? (
                filterCategoryDataArr.map((data, i) => (
                  <div className="col-md-6 col-lg-6 col-xl-4" style={{ cursor: "pointer" }} onClick={() => navigate("/astro-report-list", { state: data })}>
                    <div className="blog_box_content m-2 ">
                      <div className="blog_section_image">
                        <img src={data.banner} alt="blog" />
                      </div>
                      <div className="p-2">
                        <h5>{data.type}</h5>
                        <span className="">{data.description.slice(0, 120) + "..."}</span>
                      </div>
                      <div className="d-flex p-2" style={{ justifyContent: "space-between" }}>
                        <div className="" style={{ color: "#777" }}>
                          Price starts at {data.country === "INR" ? "₹" : "$"} {data.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <DataNotFound />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HOC(ReportList);

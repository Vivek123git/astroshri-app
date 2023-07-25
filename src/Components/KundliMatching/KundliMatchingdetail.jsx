import React, { useState, useEffect } from "react";
import a from "../../images/sign.png";
import HOC from "../../Common/HOC";
import "./kundlimatchingdetail.css";
import { useLocation } from "react-router-dom";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import { notificationHandler } from "../utils/Notification";
import homeapi from "../api/homeapi";
const KundliMatchingdetail = () => {
  const location = useLocation();
  const [AstrologerList, setAstrologerList] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [matchingdetail, setmatchingdetail] = useState({
    m_name: "",
    f_name: "",
    match_birth_detail_male: "",
    match_birth_details_female: "",
    match_astro_details_male: "",
    match_astro_details_female: "",
    match_planet_details_male: [],
    match_planet_details_female: [],
    match_ashtakoot_points: "",
    match_dashakoot_points: "",
    match_manglik_report_male: "",
    match_manglik_report_female: "",
    match_manglik_report_conclusion: "",
  });

  useEffect(() => {
    setmatchingdetail({
      m_name: location.state.m_name,
      f_name: location.state.f_name,
      match_birth_detail_male: location?.state?.data?.match_birth_details?.male_astro_details,
      match_birth_details_female: location?.state?.data?.match_birth_details?.female_astro_details,
      match_astro_details_male: location?.state?.data?.match_astro_details?.male_astro_details,
      match_astro_details_female: location?.state?.data?.match_astro_details?.female_astro_details,
      match_planet_details_male: location?.state?.data?.match_planet_details?.male_planet_details,

      match_planet_details_female: location?.state?.data?.match_planet_details?.female_planet_details,
      match_ashtakoot_points: location?.state?.data?.match_ashtakoot_points,
      match_dashakoot_points: location?.state?.data?.match_dashakoot_points,
      match_manglik_report_male: location?.state?.data?.match_manglik_report.male,
      match_manglik_report_female: location?.state?.data?.match_manglik_report.female,
      match_manglik_report_conclusion: location?.state?.data?.match_manglik_report.conclusion,
    });
  }, [location]);
  console.log(location.state.m_name);
  console.log("matchingdetail", matchingdetail.match_manglik_report_male.is_present);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    LiveAstroData();
  }, []);

  const LiveAstroData = async () => {
    setisloading(true);
    try {
      const res = await homeapi();
      if (res.data.status) {
        setAstrologerList(res?.data?.astrologer);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error });
      setisloading(false);
    }
  };

  return (
    <>
      <div className="homepage_padding">
        <div className="free_kundli_banner p-5">
          <div className="container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h2 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  KUNDLI MATCHING
                </h2>
                <span className="header_banner pt-5">Get instant & accurate, Janam Kundli</span>
                {/* <div
                  className="home_banner_content mt-4"
                  style={{ color: "#FFF" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Ornare sed egestas iaculis rhoncus, velit.
                </div> */}
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} />
              </div>
            </div>
          </div>
        </div>

        <section className="container userdetail mt-4">
          <div className="birthdetail">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <section className="">
                  <h5 className="birthdetail_heading">Astro Details</h5>
                  <table className="table table-striped">
                    <thead>
                      <th>Attribute</th>
                      <th>Male</th>
                      <th> Female</th>
                    </thead>

                    <tbody>
                      <tr>
                        <th scope="row">Ascendant</th>
                        <td>{matchingdetail.match_astro_details_male?.ascendant}</td>
                        <td>{matchingdetail.match_astro_details_female.ascendant}</td>
                      </tr>
                      <tr>
                        <th scope="row">Varna</th>
                        <td>{matchingdetail.match_astro_details_male?.Varna}</td>
                        <td>{matchingdetail.match_astro_details_female.Varna}</td>
                      </tr>
                      <tr>
                        <th scope="row">Vashya</th>
                        <td>{matchingdetail.match_astro_details_male?.Vashya}</td>
                        <td>{matchingdetail.match_astro_details_female.Vashya}</td>
                      </tr>
                      <tr>
                        <th scope="row">Yoni</th>
                        <td>{matchingdetail.match_astro_details_male?.Yoni}</td>
                        <td>{matchingdetail.match_astro_details_female.Yoni}</td>
                      </tr>
                      <tr>
                        <th scope="row">Gan</th>
                        <td>{matchingdetail.match_astro_details_male?.Gan}</td>
                        <td>{matchingdetail.match_astro_details_female.Gan}</td>
                      </tr>
                      <tr>
                        <th scope="row">Nadi</th>
                        <td>{matchingdetail.match_astro_details_male?.Nadi}</td>
                        <td>{matchingdetail.match_astro_details_female.Nadi}</td>
                      </tr>
                      <tr>
                        <th scope="row">SignLord</th>
                        <td>{matchingdetail?.match_astro_details_male?.SignLord}</td>
                        <td>{matchingdetail?.match_astro_details_female?.SignLord}</td>
                      </tr>

                      <tr>
                        <th scope="row">Sign</th>
                        <td>{matchingdetail?.match_astro_details_male?.sign}</td>
                        <td>{matchingdetail?.match_astro_details_female?.sign}</td>
                      </tr>

                      <tr>
                        <th scope="row">Naksahtra</th>
                        <td>{matchingdetail?.match_astro_details_male?.Naksahtra}</td>
                        <td>{matchingdetail?.match_astro_details_female?.Naksahtra}</td>
                      </tr>

                      <tr>
                        <th scope="row">NaksahtraLord</th>
                        <td>{matchingdetail?.match_astro_details_male?.NaksahtraLord}</td>
                        <td>{matchingdetail?.match_astro_details_female?.NaksahtraLord}</td>
                      </tr>

                      <tr>
                        <th scope="row">Charan</th>
                        <td>{matchingdetail?.match_astro_details_male?.Charan}</td>
                        <td>{matchingdetail?.match_astro_details_female?.Charan}</td>
                      </tr>

                      <tr>
                        <th scope="row">Yog</th>
                        <td>{matchingdetail?.match_astro_details_male?.Yog}</td>
                        <td>{matchingdetail?.match_astro_details_female?.Yog}</td>
                      </tr>

                      <tr>
                        <th scope="row">Karan</th>
                        <td>{matchingdetail?.match_astro_details_male?.Karan}</td>
                        <td>{matchingdetail?.match_astro_details_female?.Karan}</td>
                      </tr>

                      <tr>
                        <th scope="row">Tithi</th>
                        <td>{matchingdetail?.match_astro_details_male?.Tithi}</td>
                        <td>{matchingdetail?.match_astro_details_female?.Tithi}</td>
                      </tr>
                      <tr>
                        <th scope="row">Yunja</th>
                        <td>{matchingdetail?.match_astro_details_male?.yunja}</td>
                        <td>{matchingdetail?.match_astro_details_female?.yunja}</td>
                      </tr>
                      <tr>
                        <th scope="row">Tatva</th>
                        <td>{matchingdetail?.match_astro_details_male?.tatva}</td>
                        <td>{matchingdetail?.match_astro_details_female?.tatva}</td>
                      </tr>
                      <tr>
                        <th scope="row">Name Alphabet</th>
                        <td>{matchingdetail?.match_astro_details_male?.name_alphabet}</td>
                        <td>{matchingdetail?.match_astro_details_female?.name_alphabet}</td>
                      </tr>
                      <tr>
                        <th scope="row">Paya</th>
                        <td>{matchingdetail?.match_astro_details_male?.paya}</td>
                        <td>{matchingdetail?.match_astro_details_female?.paya}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>

                <section className="mt-3 pt-5">
                  <h5 className="birthdetail_heading">Dashakoot</h5>
                  <table className="table table-striped">
                    <thead>
                      <th>Attribute</th>
                      <th>Male/Female</th>
                      <th>Matching Points</th>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Dina</th>
                        <td>
                          {matchingdetail.match_dashakoot_points?.dina?.male_koot_attribute}/
                          {matchingdetail.match_dashakoot_points?.dina?.female_koot_attribute}
                        </td>
                        <td>
                          {matchingdetail.match_dashakoot_points?.dina?.received_points}/{matchingdetail.match_dashakoot_points?.dina?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Gana</th>
                        <td>
                          {matchingdetail.match_dashakoot_points?.gana?.male_koot_attribute}/
                          {matchingdetail.match_dashakoot_points?.gana?.female_koot_attribute}
                        </td>
                        <td>
                          {matchingdetail.match_dashakoot_points?.gana?.received_points}/{matchingdetail.match_dashakoot_points?.dina?.total_points}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Yoni</th>
                        <td>
                          {matchingdetail.match_dashakoot_points?.yoni?.male_koot_attribute}/
                          {matchingdetail.match_dashakoot_points?.yoni?.female_koot_attribute}
                        </td>
                        <td>
                          {matchingdetail.match_dashakoot_points?.yoni?.received_points}/{matchingdetail.match_dashakoot_points?.yoni?.total_points}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Rashi</th>
                        <td>
                          {matchingdetail.match_dashakoot_points?.rashi?.male_koot_attribute}/
                          {matchingdetail.match_dashakoot_points?.rashi?.female_koot_attribute}
                        </td>
                        <td>
                          {matchingdetail.match_dashakoot_points?.rashi?.received_points}/{matchingdetail.match_dashakoot_points?.rashi?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Rasyadhipati</th>
                        <td>
                          {matchingdetail.match_dashakoot_points?.rasyadhipati?.male_koot_attribute}/
                          {matchingdetail.match_dashakoot_points?.rasyadhipati?.female_koot_attribute}
                        </td>
                        <td>
                          {matchingdetail.match_dashakoot_points?.rasyadhipati?.received_points}/
                          {matchingdetail.match_dashakoot_points?.rasyadhipati?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Rajju</th>
                        <td>
                          {matchingdetail.match_dashakoot_points?.rajju?.male_koot_attribute}/
                          {matchingdetail.match_dashakoot_points?.rajju?.female_koot_attribute}
                        </td>
                        <td>
                          {matchingdetail.match_dashakoot_points?.rajju?.received_points}/{matchingdetail.match_dashakoot_points?.rajju?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Vedha</th>
                        <td>
                          {matchingdetail.match_dashakoot_points?.vedha?.male_koot_attribute}/
                          {matchingdetail.match_dashakoot_points?.vedha?.female_koot_attribute}
                        </td>
                        <td>
                          {matchingdetail.match_dashakoot_points?.vedha?.received_points}/{matchingdetail.match_dashakoot_points?.vedha?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Vashya</th>
                        <td>
                          {matchingdetail.match_dashakoot_points?.vashya?.male_koot_attribute}/
                          {matchingdetail.match_dashakoot_points?.vashya?.female_koot_attribute}
                        </td>
                        <td>
                          {matchingdetail.match_dashakoot_points?.vashya?.received_points}/{matchingdetail.match_dashakoot_points?.vashya?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Mahendra</th>
                        <td>
                          {matchingdetail.match_dashakoot_points?.mahendra?.male_koot_attribute}/
                          {matchingdetail.match_dashakoot_points?.mahendra?.female_koot_attribute}
                        </td>
                        <td>
                          {matchingdetail.match_dashakoot_points?.mahendra?.received_points}/{matchingdetail.match_dashakoot_points?.mahendra?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">StreeDeergha</th>
                        <td>
                          {matchingdetail.match_dashakoot_points?.streeDeergha?.male_koot_attribute}/
                          {matchingdetail.match_dashakoot_points?.streeDeergha?.female_koot_attribute}
                        </td>
                        <td>
                          {matchingdetail.match_dashakoot_points?.streeDeergha?.received_points}/
                          {matchingdetail.match_dashakoot_points?.streeDeergha?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Total</th>
                        <td></td>
                        <th scope="row">
                          {matchingdetail.match_dashakoot_points?.total?.received_points}/{matchingdetail.match_dashakoot_points?.total?.total_points}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <h5 className="birthdetail_heading">Birth Details</h5>
                <table className="table table-striped">
                  <thead>
                    <th>Attribute</th>
                    <th>Male</th>
                    <th> Female</th>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Name</th>
                      <td>{matchingdetail.m_name}</td>
                      <td>{matchingdetail.f_name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Day</th>
                      <td>{matchingdetail.match_birth_detail_male?.day}</td>
                      <td>{matchingdetail.match_birth_details_female.day}</td>
                    </tr>
                    <tr>
                      <th scope="row">Month</th>
                      <td>{matchingdetail.match_birth_detail_male?.month}</td>
                      <td>{matchingdetail.match_birth_details_female.month}</td>
                    </tr>
                    <tr>
                      <th scope="row">Year</th>
                      <td>{matchingdetail.match_birth_detail_male?.year}</td>
                      <td>{matchingdetail.match_birth_details_female.year}</td>
                    </tr>

                    <tr>
                      <th scope="row">Hour</th>
                      <td>{matchingdetail.match_birth_detail_male?.hour !== 0 ? matchingdetail.match_birth_detail_male?.hour : "12AM"}</td>
                      <td>{matchingdetail.match_birth_details_female.hour !== 0 ? matchingdetail.match_birth_details_female.hour : "12AM"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Minute</th>
                      <td>{matchingdetail.match_birth_detail_male?.minute}</td>
                      <td>{matchingdetail.match_birth_details_female.minute}</td>
                    </tr>
                    <tr>
                      <th scope="row">Gender</th>
                      <td>{matchingdetail.match_birth_detail_male?.gender}</td>
                      <td>{matchingdetail.match_birth_details_female.gender}</td>
                    </tr>

                    <tr>
                      <th scope="row">Latitude</th>
                      <td>{matchingdetail.match_birth_detail_male?.latitude}</td>
                      <td>{matchingdetail.match_birth_details_female.latitude}</td>
                    </tr>
                    <tr>
                      <th scope="row">Timezone</th>
                      <td>{matchingdetail.match_birth_detail_male?.timezone}</td>
                      <td>{matchingdetail.match_birth_details_female.timezone}</td>
                    </tr>
                    <tr>
                      <th scope="row">Ayanamsha</th>
                      <td>{matchingdetail.match_birth_detail_male?.ayanamsha}</td>
                      <td>{matchingdetail.match_birth_details_female.ayanamsha}</td>
                    </tr>
                    <tr>
                      <th scope="row">Sunrise</th>
                      <td>{matchingdetail.match_birth_detail_male?.sunrise}</td>
                      <td>{matchingdetail.match_birth_details_female.sunrise}</td>
                    </tr>
                    <tr>
                      <th scope="row">Sunset</th>
                      <td>{matchingdetail.match_birth_detail_male?.sunset}</td>
                      <td>{matchingdetail.match_birth_details_female.sunset}</td>
                    </tr>
                  </tbody>
                </table>

                <section className="mt-3 pt-5">
                  <h5 className="birthdetail_heading">Ashtakoot</h5>
                  <table className="table table-striped">
                    <thead>
                      <th>Attribute</th>
                      <th>Description</th>
                      <th>Matching Points</th>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Varna</th>
                        <td>{matchingdetail.match_ashtakoot_points?.bhakut?.description?.split(" / ")[2]}</td>
                        <td>
                          {matchingdetail.match_ashtakoot_points?.varna?.received_points}/{matchingdetail.match_ashtakoot_points?.varna?.total_points}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Vashya</th>
                        <td>{matchingdetail.match_ashtakoot_points?.bhakut?.description?.split(" / ")[1]}</td>
                        <td>
                          {matchingdetail.match_ashtakoot_points?.vashya?.received_points}/{matchingdetail.match_ashtakoot_points?.vashya?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Tara</th>
                        <td>{matchingdetail.match_ashtakoot_points?.tara?.description?.split(" - ")[2]}</td>
                        <td>
                          {matchingdetail.match_ashtakoot_points?.tara?.received_points}/{matchingdetail.match_ashtakoot_points?.tara?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Yoni</th>
                        <td>{matchingdetail.match_ashtakoot_points?.yoni?.description}</td>
                        <td>
                          {matchingdetail.match_ashtakoot_points?.yoni?.received_points}/{matchingdetail.match_ashtakoot_points?.yoni?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Maitri</th>
                        <td>{matchingdetail.match_ashtakoot_points?.maitri?.description}</td>
                        <td>
                          {matchingdetail.match_ashtakoot_points?.maitri?.received_points}/{matchingdetail.match_ashtakoot_points?.maitri?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Gan</th>
                        <td>{matchingdetail.match_ashtakoot_points?.gan?.description}</td>
                        <td>
                          {matchingdetail.match_ashtakoot_points?.gan?.received_points}/{matchingdetail.match_ashtakoot_points?.gan?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Bhakut</th>
                        <td>{matchingdetail.match_ashtakoot_points?.bhakut?.description?.split(" / ")[2]}</td>
                        <td>
                          {matchingdetail.match_ashtakoot_points?.bhakut?.received_points}/{matchingdetail.match_ashtakoot_points?.bhakut?.total_points}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Nadi</th>
                        <td>{matchingdetail.match_ashtakoot_points?.nadi?.description}</td>
                        <td>
                          {matchingdetail.match_ashtakoot_points?.nadi?.received_points}/{matchingdetail.match_ashtakoot_points?.nadi?.total_points}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Total</th>
                        <td></td>
                        <th scope="row">
                          {matchingdetail.match_ashtakoot_points?.total?.received_points}/{matchingdetail.match_ashtakoot_points?.total?.total_points}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="container mb-5">
          <h3 className="manglik_heading">Manglik Analysis</h3>

          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
              <div className="manglik_report d-flex" style={{ justifyContent: "space-around" }}>
                <div class="male_report_manglik">
                  <div class="report_manglik_status ">{matchingdetail.match_manglik_report_male.is_present == true ? "Yes" : "No"}</div>
                  <div class="name_report_manglik">{matchingdetail?.m_name}</div>
                </div>
                <div class="female_report_manglik">
                  <div class="report_manglik_status ">{matchingdetail.match_manglik_report_female.is_present == true ? "Yes" : "No"}</div>
                  <div class="name_report_manglik">{matchingdetail?.f_name}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">{matchingdetail?.match_manglik_report_conclusion?.report}</div>
          </div>
          {/* <h6 className="mt-5"> (Male) Manglik Report</h6>
          <p>{matchingdetail.match_manglik_report_male?.manglik_report}</p>
          <h6 className="mt-2"> (Female) Manglik Report</h6>
          <p>{matchingdetail.match_manglik_report_female?.manglik_report}</p> */}
        </section>

        <section className="container ourastrologer mt-1 mb-4">
          <OurAstrologerCrousal astro={AstrologerList} />
        </section>
      </div>
    </>
  );
};

export default HOC(KundliMatchingdetail);

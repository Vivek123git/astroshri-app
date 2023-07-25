import React, { useState, useEffect } from 'react'
import HOC from '../../Common/HOC'
import a from "../../images/sign.png"
import { useLocation } from 'react-router-dom'
import Crousal from '../Crousal/Crousal'
import { notificationHandler } from "../utils/Notification";
import { getBaseUrl } from "../utils"
import axios from "axios";
import OurAstrologerCrousal from '../Crousal/OurAstrologerCrousal'

const DailyHoroscopeResult = (props) => {
    const [AstrologerList, setAstrologerList] = useState("")
    // const token = localStorage.getItem("token")
    const auth = (document?.cookie?.split(";").find((item) => item.match("auth"))?.split("=")[1])
    const token = (document?.cookie?.split(";").find((item) => item.match("token"))?.split("=")[1])
    const [isUpdated, setisUpdated] = useState(false)
    const [isloading, setisloading] = useState(false)
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [])
    const [todayrashi, settodayrashi] = useState({ health: "", emotions: "", combinedResult: "" })
    const location = useLocation()
    console.log("props::::", location.state)
    const type = location.state
    const Rashi = location.state;

    console.log(type, Rashi)
    console.log("jatin", todayrashi)

    useEffect(() => {
        getrashiData()
        LiveAstroData()
    }, [])

    const getrashiData = () => {
        let url = `https://api.prod.astrotalk.in/AstroTalk/horoscope3/get?type=DAILY&zodiac=${Rashi}`;
        let temp = {
            type: type,
            zodiac: Rashi,
        };

        axios
            .get(url, temp)
            .then(
                (res) => {
                    console.log("data student Data:::", res.data);
                    settodayrashi({ health: res.data.data.health, emotions: res.data.data.health, combinedResult: res.data.data.combinedResult })
                    settodayrashi(...todayrashi)
                    // setisUpdated(!isUpdated);
                    // setisloading(false);
                },

                (error) => {
                    console.log("data response error:::", error);
                    // setisloading(false);
                    //showNotificationMsz(error, "danger");
                }
            )
            .catch((e) => {
                console.log("data response error:::", e);
                //showNotificationMsz(e, "danger");
                // setisloading(false);
            });
    };


    /// top astrologer list
    const LiveAstroData = () => {
        let url = getBaseUrl() + "web/home_data";
        setisloading(true);
        let config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios
            .get(url, config)
            .then(
                (res) => {
                    setAstrologerList(res?.data?.astrologer)
                    setisloading(false);
                },

                (error) => {
                    console.log("data response error:::", error.response.status);
                    console.log("data response error:::", error.response);

                    setisloading(false);
                    notificationHandler({ type: 'danger', msg: error })
                }
            )
            .catch((e) => {
                console.log("data response error:::", e);
                notificationHandler({ type: 'danger', msg: e })
                setisloading(false);
            });
    };
    //document.getElementById("demo").innerHTML = todayrashi.combinedResult;

    return (
        <>

            <div className='homepage_padding pb-5'>
                <div className='free_kundli_banner p-5'>
                    <div className="container">
                        <div className='d-flex' style={{ justifyContent: "space-between" }}>
                            <div className='sing_image'><img src={a} /></div>
                            <div className='freekundli_content'>
                                <h1 className='banner_heading' style={{ color: "#FFF" }}>({Rashi})Daily Horoscope</h1>
                                <span className='pt-5' style={{ color: "#FFF" }}>Shop Best Online Astrology Products
                                    And Services</span>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="dailyhoroscope">

                    <div className="container mt-3 mb-5">

                        <div>
                            <h2 className='text-center mt-3 mb-4'>({Rashi}) Daily Horoscope<span></span></h2>
                            <p>{todayrashi.health}</p>
                            <p className='mt-3' id="demo" dangerouslySetInnerHTML={{ __html: todayrashi.combinedResult }} ></p>
                        </div>

                    </div>
                </section>
                <section className='container ourastrologer mt-1 mb-4'>
                    <OurAstrologerCrousal astro={AstrologerList} />
                </section>
            </div>
        </>
    )
}

export default HOC(DailyHoroscopeResult)
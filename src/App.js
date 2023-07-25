import "./App.css";
import React, { createContext, useReducer, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/HomePage/HomePage";
import FreeKundli from "./Components/FreeKundli/FreeKundli";
import KundliMatching from "./Components/KundliMatching/KundliMatching";
import Chat_with_Astrologer from "./Components/Chat_with_ Astrologer/Chat_with_ Astrologer";
import Blog from "./Components/Blog/Blog";
import DailyHoroscope from "./Components/DailyHoroscope/DailyHoroscope";
import DailyHoroscopeResult from "./Components/DailyHoroscope/DailyHoroscopeResult";
import AstroMall from "./Components/AstroMall/AstroMall";
import LiveAstrologer from "./Components/LiveAstrologer/LiveAstrologer";
import AddWallet from "./Components/AddWallet/AddWallet";
import Payment from "./Components/AddWallet/Payment";
import Transactions from "./Components/AddWallet/Transactions";
import AstrologerProfile from "./Components/Chat_with_ Astrologer/AstrologerProfile";
import Signup from "./Components/Signup/Signup";
import UserProfile from "./Components/UserProfile/UserProfile";
import { NotificationParent } from "../src/Components/utils/Notification";
import UserChat from "./Components/Chat_with_ Astrologer/UserChat";
import Call_with_Astrologer from "./Components/Call_with_Astrologer/Call_with_Astrologer";
import ProductDetails from "./Components/AstroMall/ProductDetails";
import BlogDetails from "./Components/Blog/BlogDetails";
import AskAstrologer from "./Components/AskAstrologer/AskAstrologer";
import Cart from "./Components/AstroMall/Cart";
import { reducer, initialState } from "./reducer/UserReducer";
import UserAddess from "./Components/AstroMall/UserAddess";
import OrderPlaced from "./Components/AstroMall/OrderPlaced";
import OrderDetails from "./Components/AstroMall/OrderDetails";
import Protected from "./Components/utils/ProtectedRoute";
import Errorpage from "./Components/Errorpage";
import WishList from "./Components/WishList/WishList";
import Freekundlidetail from "./Components/FreeKundli/Freekundlidetail";
import Notify from "./Components/Notify/Notify";
import PartnerSlider from "./Components/Crousal/PartnerSlider";
import About from "./Components/PolicyPages/About";
import PrivacyPolicy from "./Components/PolicyPages/PrivacyPolicy";
import TermsConditions from "./Components/PolicyPages/TermsConditions";
import ContactUs from "./Components/PolicyPages/ContactUs";
import UserWallet from "./Components/AddWallet/UserWallet";
import { get_profile_api } from "./Components/api/authapi";
import Cookies from "js-cookie";
import location_api from "./Components/api/location";
import KundliMatchingdetail from "./Components/KundliMatching/KundliMatchingdetail";
import Panchang from "./Components/Panchang/Panchang";
import Numerology from "./Components/Numerology/Numerology";
import ChatHistory from "./Components/ChatHistory/ChatHistory";
import Chatfunction from "./Components/function/Chatfunction";
import ReportList from "./Components/ReportPage/ReportList";
import AstroReportList from "./Components/ReportPage/AstroReportList";
import { ga1, ga2 } from "./googleAnalytics";
import AstroSignup from "./Components/Astrosignup/AstroSignup";
import InfinityScrollCom from "./InfinityScroll";
import RufundPolicy from "./Components/PolicyPages/RufundPolicy";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = Cookies.get("auth");
  console.log(auth);
  useEffect(() => {
    if (auth === "true") {
      userDetail();
    }
    if (auth === "undefined" || auth === undefined) {
      user_location_api();
    }
  }, []);

  const userDetail = async () => {
    try {
      const res = await get_profile_api();
      dispatch({
        type: "USER",
        payload: {
          ...state,
          results_web: res.data.results_web,
          wallet: res.data.results_web.wallet,
          notification: res.data.notifications,
          cartItemsLength: res.data.item_total,
        },
      });
      Cookies.set("userID", res.data.results_web._id, { secure: true }, { sameSite: "strict" }, { expires: 365 });
    } catch (error) {
      console.log("data response error:::", error);
    }
  };

  const user_location_api = async () => {
    const res = await location_api();
    const country = res.data.country;
    if (res.data.status == "success") {
      if (country == "India") {
        Cookies.set("country", "INR", { secure: true }, { sameSite: "strict" }, { expires: 365 });
      } else {
        Cookies.set("country", "USD", { secure: true }, { sameSite: "strict" }, { expires: 365 });
      }
    } else {
      Cookies.set("country", "INR", { secure: true }, { sameSite: "strict" }, { expires: 365 });
    }
  };

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <NotificationParent timeout={6500} />
        <Routes>
          <Route path="/chatfunction" element={<Chatfunction />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/PartnerSlider" element={<PartnerSlider />}></Route>
          <Route path="/freekundli" element={<FreeKundli />}></Route>
          <Route path="/matchmaking" element={<KundliMatching />}></Route>
          <Route path="/chat-with-astrologer" element={<Chat_with_Astrologer />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/horoscope/daily-horoscope" element={<DailyHoroscope />}></Route>
          <Route path="/daily_horoscope_result" element={<DailyHoroscopeResult />}></Route>
          <Route path="/astroshop" element={<AstroMall />}></Route>
          <Route path="/productdetail/:id" element={<ProductDetails />}></Route>
          <Route path="/live_astrologer" element={<LiveAstrologer />}></Route>
          <Route path="/astrologer_profile" element={<AstrologerProfile />}></Route>
          <Route path="/astrologer_profile/:id" element={<AstrologerProfile />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/talk-to-astrologer" element={<Call_with_Astrologer />}></Route>
          <Route path="/blogdetails/:id" element={<BlogDetails />}></Route>
          <Route path="/askastrologer" element={<AskAstrologer />}></Route>
          <Route path="/kundlidetail" element={<Freekundlidetail />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/privacypolicy" element={<PrivacyPolicy />}></Route>
          <Route path="/terms" element={<TermsConditions />}></Route>
          <Route path="/refund-and-cancellation-policy" element={<RufundPolicy />}></Route>
          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/numerology" element={<Numerology />}></Route>
          <Route path="/panchang" element={<Panchang />}></Route>
          <Route path="/reportlist" element={<ReportList />}></Route>
          <Route path="/astro-report-list" element={<AstroReportList />}></Route>
          {/* Protected Routes */}
          <Route
            path="/add_wallet"
            element={
              // <Protected>
              <AddWallet />
              // </Protected>
            }
          ></Route>
          <Route
            path="/user_wallet"
            element={
              <Protected>
                <UserWallet />
              </Protected>
            }
          ></Route>
          <Route
            path="/payment"
            element={
              <Protected>
                <Payment />
              </Protected>
            }
          ></Route>
          <Route
            path="/chat_history"
            element={
              <Protected>
                <ChatHistory />
              </Protected>
            }
          ></Route>
          <Route
            path="/userprofile"
            element={
              <Protected>
                <UserProfile />
              </Protected>
            }
          ></Route>
          <Route
            path="/chat"
            element={
              <Protected>
                <UserChat />
              </Protected>
            }
          ></Route>

          <Route
            path="/cart"
            element={
              <Protected>
                <Cart />
              </Protected>
            }
          ></Route>
          <Route
            path="/transactions"
            element={
              <Protected>
                <Transactions />
              </Protected>
            }
          ></Route>
          <Route
            path="/useraddess"
            element={
              <Protected>
                <UserAddess />
              </Protected>
            }
          ></Route>
          <Route
            path="/Order"
            element={
              <Protected>
                <OrderPlaced />
              </Protected>
            }
          ></Route>
          <Route
            path="/OrderDetails"
            element={
              <Protected>
                <OrderDetails />
              </Protected>
            }
          ></Route>
          <Route
            path="/wishlist"
            element={
              <Protected>
                <WishList />
              </Protected>
            }
          ></Route>
          <Route
            path="/notify"
            element={
              <Protected>
                <Notify />
              </Protected>
            }
          ></Route>
          <Route
            path="/match-making-details"
            element={
              // <Protected>
              <KundliMatchingdetail />
              // </Protected>
            }
          ></Route>
          <Route path="/astrosignup" element={<AstroSignup />}></Route>
          {/* 404 page error */}
          <Route path="/scroll" element={<InfinityScrollCom />}></Route>
          <Route path="*" element={<Errorpage />}></Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;

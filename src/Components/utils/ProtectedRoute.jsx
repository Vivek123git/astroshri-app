import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ProtectedDialog from "../utils/ProtectedDialog";
import Cookies from "js-cookie";
const Protected = ({ children }) => {
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [Loginpopup, setLoginpopup] = useState(false);
  const logindialogbox = () => {
    setLoginpopup(!Loginpopup);
  };

  // console.log(auth)
  if (auth === "true") {
    // console.log(auth)
    return children;
  }
  return <ProtectedDialog open={true} />;

  // <Navigate to="/" replace />;
};

export default Protected;

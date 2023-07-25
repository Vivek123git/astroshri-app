import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const report_type = getBaseUrl() + "web/report_type";

const report_type_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.post(report_type, data);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default report_type_api;

import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const report_list = getBaseUrl() + "user_api/report_list";

const reportlist = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.post(report_list, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default reportlist;

import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const notifications_list = getBaseUrl() + "user_api/notifications_list";
const notifications_drop = getBaseUrl() + "user_api/notifications_drop";
const report_form_add = getBaseUrl() + "user_api/report_form_add";

export const report_form_add_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.post(report_form_add, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const notifications_drop_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.post(notifications_drop, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const notifications_list_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.post(notifications_list, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default notifications_list_api;

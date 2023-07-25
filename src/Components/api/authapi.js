import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const check_user_number = getBaseUrl() + "user_api/check_user_number";
const otp_register = getBaseUrl() + "user_api/otp_register_process";
const user_register = getBaseUrl() + "user_api/user_register";
const user_status = getBaseUrl() + "user_api/login";
const get_profile = getBaseUrl() + "user_api/get_profile";

export const get_profile_api = async () => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.get(get_profile, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const user_status_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };

    return await axios.post(user_status, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const user_register_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };

    return await axios.post(user_register, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const otp_register_process = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };

    return await axios.post(otp_register, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const authapi = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };

    return await axios.post(check_user_number, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default authapi;

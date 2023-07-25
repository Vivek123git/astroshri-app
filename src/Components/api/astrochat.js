import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const astrologer_list = getBaseUrl() + "web/astrologer_list";
const notifyme = getBaseUrl() + "user_api/notifyme";
const category_list = getBaseUrl() + "web/category_list";
const language_list = getBaseUrl() + "web/language_list";
const call_initiate = getBaseUrl() + "user_api/call_initiate";
const call_initiate_status = getBaseUrl() + "user_api/call_initiate_status";

export const notifyme_api = async (data) => {
  console.log("notify", data);
  try {
    return await axios.post(notifyme, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const call_initiate_status_api = async (data) => {
  try {
    return await axios.post(call_initiate_status, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const call_initiate_api = async (data) => {
  try {
    return await axios.post(call_initiate, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const language_list_api = async (data) => {
  try {
    return await axios.get(language_list, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const category_list_api = async (data) => {
  try {
    return await axios.get(category_list, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const astrologer_list_api = async (data) => {
  try {
    return await axios.post(astrologer_list, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default astrologer_list_api;

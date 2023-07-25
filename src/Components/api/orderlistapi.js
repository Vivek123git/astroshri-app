import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const order_list = getBaseUrl() + "user_api/order_list";
const order_update = getBaseUrl() + "user_api/order_update";

export const order_update_api = async (data) => {
  try {
    return await axios.post(order_update, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const order_list_api = async (data) => {
  try {
    return await axios.post(order_list, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default order_list_api;

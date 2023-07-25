import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const home_data = getBaseUrl() + "web/home_data";

const product_category_list = getBaseUrl() + "web/product_category_list";
const product_list = getBaseUrl() + "web/product_list";

export const product_list_api = async (data) => {
  console.log(data);
  try {
    return await axios.post(product_list, data);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const product_category_list_api = async (data) => {
  try {
    return await axios.get(product_category_list, data);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const homeapi = async () => {
  try {
    return await axios.get(home_data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default homeapi;

import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const cart_list = getBaseUrl() + "user_api/cart_list";
const sub_to_cart = getBaseUrl() + "user_api/sub_to_cart";
const add_to_cart = getBaseUrl() + "user_api/add_to_cart";
const remove_cart = getBaseUrl() + "user_api/remove_cart";

export const remove_cart_api = async (data) => {
  try {
    return await axios.post(remove_cart, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const add_to_cart_api = async (data) => {
  try {
    return await axios.post(add_to_cart, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const sub_to_cart_api = async (data) => {
  try {
    return await axios.post(sub_to_cart, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const cart_list_api = async (data) => {
  try {
    return await axios.post(cart_list, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default cart_list_api;

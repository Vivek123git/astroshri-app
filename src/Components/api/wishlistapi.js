import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const wish_list = getBaseUrl() + "user_api/wish_list";
const wishlist_add_update = getBaseUrl() + "user_api/wishlist_add_update";

export const wishlist_add_update_api = async (data) => {
  try {
    return await axios.post(wishlist_add_update, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const wish_list_api = async (data) => {
  try {
    return await axios.post(wish_list, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default wish_list_api;

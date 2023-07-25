import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const user_address = getBaseUrl() + "user_api/user_address";

const user_address_api = async (data) => {
  console.log(data);
  try {
    return await axios.post(user_address, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default user_address_api;

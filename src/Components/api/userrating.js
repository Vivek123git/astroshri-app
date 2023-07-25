import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const add_rating = getBaseUrl() + "user_api/add_rating";

const userrating_api = async (data) => {
  console.log(data);
  try {
    return await axios.post(add_rating, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default userrating_api;

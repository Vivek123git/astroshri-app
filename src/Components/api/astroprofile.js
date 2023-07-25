import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const astrologer_profile = getBaseUrl() + "web/astrologer_profile";
const follow_astro = getBaseUrl() + "user_api/follow_astro";

export const astro_follow_api = async (data) => {
  try {
    return await axios.post(follow_astro, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const astrologer_profile_api = async (data) => {
  try {
    return await axios.post(astrologer_profile, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default astrologer_profile_api;

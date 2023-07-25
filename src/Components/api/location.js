import React from "react";
import axios from "axios";

const userip = "http://ip-api.com/json";

const location_api = async () => {
  try {
    return await axios.get(userip);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const get_palces = async (place) => {
  // return console.log(place);

  try {
    let config = {
      method: "post",
      url: "https://admin.astropush.com/user_api/geo_place",
      data: { place },
    };

    let res = axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const get_latLong = async (place) => {
  // return console.log(place);

  try {
    let config = {
      method: "post",
      url: "https://admin.astropush.com/user_api/geocode",
      data: { place },
    };

    let res = axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default location_api;

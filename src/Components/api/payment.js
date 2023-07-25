import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const Wallet_amount_list = getBaseUrl() + "web/Wallet_amount_list";

const Wallet_amount_list_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.post(Wallet_amount_list, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default Wallet_amount_list_api;

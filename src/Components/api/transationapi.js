import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const call_list = getBaseUrl() + "user_api/call_list";
const user_question = getBaseUrl() + "user_api/user_question";
const transaction = getBaseUrl() + "user_api/transaction";

export const transaction_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.post(transaction, data, config);
  } catch (error) {
    console.log(error);
  }
};

export const user_question_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.post(user_question, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const call_list_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.post(call_list, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default call_list_api;

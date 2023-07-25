import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const blogcategory_list = getBaseUrl() + "web/blogcategory_list";
const latest_blog = getBaseUrl() + "web/blog_list?category_id=";
const blog_list = getBaseUrl() + "web/blog_list";

const blogapi = async () => {
  try {
    return await axios.get(blogcategory_list, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//all blog details api
export const blog_list_api = async () => {
  try {
    return await axios.get(blog_list, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        params: "",
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

//blog details api
export const latest_blog_api = async () => {
  try {
    return await axios.get(latest_blog, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        params: "",
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const get_blogapi = async (id) => {
  try {
    return await axios.get(getBaseUrl() + `web/blog_list?category_id=${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default blogapi;

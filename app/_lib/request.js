import axios from "axios";
import { apiResult } from "@/app/_models/result";

//todo
const request = axios.create({
  //   baseURL: lingyinConfig.baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器：加 token
request.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("wx_login_state")
        : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：统一处理错误
request.interceptors.response.use(
  (response) => {
    // 合并默认结构，避免字段 undefined
    const result = {
      ...apiResult,
      ...response.data,
    };
    return result.msg;
  },
  (error) => {
    if (error.response) {
      console.error("请求失败:", error.response.status, error.response.data);
    } else {
      console.error("请求异常:", error.message);
    }
    return Promise.reject(error);
  }
);

export default request;

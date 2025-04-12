/** @type {import('next').NextConfig} */
import { CDN_URL, DEV_URL } from "./config.mjs";

let assetPrefix = DEV_URL;

if (process.env.ELT_ENV === "package") {
  assetPrefix = CDN_URL;
}

const nextConfig = {
  // output: "export", // 导出静态文件，不使用静态模式，还是使用网络请求访问
  assetPrefix,
  // images: { unoptimized: true },
  env: {
    ELT_ENV: process.env.ELT_ENV, // 这样前端可以访问
  },
};

export default nextConfig;

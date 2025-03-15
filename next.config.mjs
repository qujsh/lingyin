/** @type {import('next').NextConfig} */
import { CDN_URL, LOCAL_URL, DEV_URL } from "./config.mjs";

let assetPrefix = CDN_URL;
if (process.env.NODE_ENV === "development") {
  assetPrefix = DEV_URL;
} else if (process.env.ELT_ENV === "package") {
  assetPrefix = LOCAL_URL;
}

const nextConfig = {
  output: "export", // 导出静态文件
  assetPrefix,
  images: { unoptimized: true },
  env: {
    ELT_ENV: process.env.ELT_ENV, // 这样前端可以访问
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
import { CDN_URL, LOCAL_URL } from "./config.mjs";

const isProd = process.env.NODE_ENV === "production";
const isPackage = process.env.ELT_ENV === "package";

const nextConfig = {
  output: "export", // 导出静态文件
  assetPrefix: isPackage || !isProd ? LOCAL_URL : CDN_URL, // 设置为空字符串，表示资源从根路径加载
  images: { unoptimized: true },
};

export default nextConfig;

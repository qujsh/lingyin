/** @type {import('next').NextConfig} */
import lingyinConfig from "./config.mjs";

const nextConfig = {
  // output: "export", // 导出静态文件，不使用静态模式，还是使用网络请求访问
  // images: { unoptimized: true },
  //环境变量
  env: {
    ELT_ENV: process.env.ELT_ENV, // 这样前端可以访问
    DOMAIN: lingyinConfig.domain,
    SECRET_KEY: lingyinConfig.key, // ase的16位程度加密
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
import lingyinConfig from "./config.mjs";

import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 package.json 并解析版本号
const packageJson = JSON.parse(
  readFileSync(path.join(__dirname, "package.json"), "utf-8")
);

const nextConfig = {
  // output: "export", // 导出静态文件，不使用静态模式，还是使用网络请求访问
  // images: { unoptimized: true },
  //环境变量
  env: {
    ELT_ENV: process.env.ELT_ENV, // 这样前端可以访问
    DOMAIN: lingyinConfig.domain,
    SECRET_KEY: lingyinConfig.key, // ase的16位程度加密
    APP_VERSION: packageJson.version,
  },
};

export default nextConfig;

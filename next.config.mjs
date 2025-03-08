/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 导出静态文件
  assetPrefix: "", // 设置为空字符串，表示资源从根路径加载
  images: { unoptimized: true },
};

export default nextConfig;

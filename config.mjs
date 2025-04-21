// config.js 做统一环境变量处理
const CDN_URL = "https://lingyin.tos-cn-shanghai.volces.com";
const DEV_URL = "";
let assetPrefix = DEV_URL;
let online = false;
if (process.env.ELT_ENV === "package") {
  assetPrefix = CDN_URL + "/public";
  online = true;
}

//还涉及到 ase的16位程度加密
const DOMAIN = "www.nextvoice.cn";
let localDomain = "http://localhost:8080";
if (process.env.ELT_ENV === "package") {
  localDomain = "https://" + DOMAIN + "/api";
}

const lingyinConfig = {
  domain: DOMAIN,
  assetPrefix, //cdn 静态域名前缀
  online,
  requestUrls: {
    ws: localDomain + "/ws", //请求用户信息
    wxwebUserInfo: localDomain + "/wxweb/userInfo", //请求用户信息
    wxwebLogoutUser: localDomain + "/wxweb/logoutUser", //退出登录
  },
};

export default lingyinConfig;

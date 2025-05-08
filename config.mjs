// config.js 做统一环境变量处理
// const CDN_URL = "https://lingyin.tos-cn-shanghai.volces.com";
let assetPrefix = "";

//还涉及到 ase的16位程度加密
const SECRET_KEY = "www.nextvoice.cn";

const DOMAIN = "https://nextvoice.cn";
let localDomain = "http://localhost:8080";
if (process.env.ELT_ENV === "package") {
  localDomain = DOMAIN + "/api";
}

const lingyinConfig = {
  domain: DOMAIN,
  key: SECRET_KEY,
  assetPrefix, //cdn 静态域名前缀
  requestUrls: {
    ws: localDomain + "/ws", //ws连接
    wxwebUserInfo: localDomain + "/wxweb/userInfo", //请求用户信息
    wxwebLogoutUser: localDomain + "/wxweb/logoutUser", //退出登录
  },
};

export default lingyinConfig;

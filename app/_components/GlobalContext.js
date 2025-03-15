"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CDN_URL, LOCAL_URL, DEV_URL } from "@/config.mjs";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  //域名前缀
  const [assetPrefix, setAssetPrefix] = useState(LOCAL_URL);
  //是否为线上网页上版本，比如线上网页版本不适用的功能
  const [online, setOnline] = useState(false);

  useEffect(() => {
    // 根据环境选择路径
    let assetPrefix = CDN_URL;
    setOnline(true);
    if (process.env.NODE_ENV === "development") {
      assetPrefix = DEV_URL;

      setOnline(false);
    } else if (process.env.ELT_ENV === "package") {
      assetPrefix = LOCAL_URL;
    }
    setAssetPrefix(assetPrefix);
  }, []);

  return (
    <GlobalContext.Provider value={{ assetPrefix, online }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

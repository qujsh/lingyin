"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CDN_URL, LOCAL_URL } from "@/config.mjs";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [assetPrefix, setAssetPrefix] = useState(LOCAL_URL);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const isProd = process.env.NODE_ENV === "production";
    const isPackage = process.env.ELT_ENV === "package";

    // 根据环境选择路径
    if (isPackage || !isProd) {
      setAssetPrefix(LOCAL_URL);
      setOnline(false);
    } else {
      setAssetPrefix(CDN_URL);
      setOnline(true);
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ assetPrefix, online }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

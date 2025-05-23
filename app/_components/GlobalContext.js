"use client";

import { createContext, useContext, useState, useEffect } from "react";
import lingyinConfig from "@/config.mjs";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  //域名前缀
  const [assetPrefix, setAssetPrefix] = useState(lingyinConfig.assetPrefix);
  //是否为线上网页上版本，比如线上网页版本不适用的功能
  const [requestUrls, setRequestUrls] = useState(lingyinConfig.requestUrls);
  const [userInfo, setUserInfo] = useState(null);
  const [connected, setConnected] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        assetPrefix,
        requestUrls,
        userInfo,
        setUserInfo,
        connected,
        setConnected,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

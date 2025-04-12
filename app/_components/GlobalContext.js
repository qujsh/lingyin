"use client";

import {createContext, useContext, useState, useEffect} from "react";
import {CDN_URL, DEV_URL} from "@/config.mjs";

const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    //域名前缀
    const [assetPrefix, setAssetPrefix] = useState(DEV_URL);
    //是否为线上网页上版本，比如线上网页版本不适用的功能
    const [online, setOnline] = useState(false);

    useEffect(() => {
        // 根据环境选择路径
        let assetPrefix = DEV_URL;
        let online = false;

        if (process.env.ELT_ENV === "package") {
            //cdn 存储在 /public 文件夹下
            assetPrefix = CDN_URL + "/public";
            online = true;
        }
        setAssetPrefix(assetPrefix);
        setOnline(online);
    }, []);

    return (
        <GlobalContext.Provider value={{assetPrefix, online}}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);

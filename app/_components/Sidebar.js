"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/app/_components/GlobalContext";

const Sidebar = () => {
  const { assetPrefix } = useGlobalContext(); // 获取全局的 assetPrefix

  // const [selected, setSelected] = useState("首页");

  return (
    <div className="h-screen text-[oklch(0.274_0.006_286.033)] bg-[#f9f9f9] opacity-75 flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        {/* <h2 className="text-lg  font-bold ">侧边栏</h2> */}
        <Image
          src={`${assetPrefix}/search.svg`}
          alt="Icon"
          width={28}
          height={28}
        />

        <div className="flex gap-2">
          <Image
            src={`${assetPrefix}/add-file.svg`}
            alt="Icon"
            width={32}
            height={32}
          />

          {/* https://www.svgrepo.com/vectors/sidebar/2 */}
          <Image
            src={`${assetPrefix}/sidebar-close.svg`}
            alt="Icon"
            width={30}
            height={30}
          />
        </div>
      </div>

      {/* {["首页", "控制面板", "设置"].map((item) => (
        <li
          key={item}
          className={`py-2 cursor-pointer hover:bg-[#ececec] ${
            selected === item ? "bg-[#e3e3e3]" : ""
          }`}
          onClick={() => setSelected(item)}
        >
          {item}
        </li>
      ))} */}

      <div className="flex flex-col text-sm mt-5 first:mt-0">
        <div className="relative mt-5 first:mt-0 last:mb-5">
          <div className="sticky top-0">
            <span className="inline-block px-2 text-xs font-semibold text-ellipsis overflow-hidden break-all pt-3 pb-2">
              默认入口
            </span>
          </div>
          <ul>
            <li
              className="rounded-lg text-sm hover:bg-[#ececec] active:opacity-90 aria-selected:bg-[#e3e3e3] cursor-pointer"
              role="option"
              aria-selected="true"
            >
              <Link href="/chat" className="flex w-full h-9 items-center px-2">
                短文本入口
              </Link>
            </li>
          </ul>
        </div>

        <div className="relative mt-5 first:mt-0 last:mb-5">
          <div className="sticky top-0">
            <span className="inline-block px-2 text-xs font-semibold text-ellipsis overflow-hidden break-all pt-3 pb-2">
              回收箱
            </span>
          </div>
          <ul>
            <li
              className="flex items-center rounded-lg text-sm px-2 py-1 h-9 hover:bg-[#ececec] active:opacity-90 aria-selected:bg-[#e3e3e3] cursor-pointer"
              role="option"
              aria-selected="true"
            >
              <span>短文本</span>
            </li>
            <li
              className="flex items-center rounded-lg text-sm px-2 py-1 h-9 hover:bg-[#ececec] active:opacity-90 aria-selected:bg-[#e3e3e3] cursor-pointer"
              role="option"
              aria-selected="false"
            >
              会话1
            </li>
            <li
              className="flex items-center rounded-lg text-sm px-2 py-1 h-9 hover:bg-[#ececec] aria-selected:bg-[#e3e3e3] cursor-pointer"
              role="option"
              aria-selected="false"
            >
              会话2
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

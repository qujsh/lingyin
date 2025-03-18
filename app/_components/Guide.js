"use client";

import { useState } from "react";
import Image from "next/image";
import { useGlobalContext } from "@/app/_components/GlobalContext";

export default function App() {
  const { assetPrefix } = useGlobalContext(); // 获取全局的 assetPrefix

  return (
    <div className="p-6 h-full bg-white/50 shadow-[0_3rem_6rem_rgba(0,0,0,0.1)]">
      <div className="m-4 mt-8">
        <h2 className="text-2xl font-bold">欢迎使用凌音小助手</h2>
      </div>
      <div className="flex">
        <div className="w-3/5 ml-8 pr-6">
          <ul>
            <li>
              <h3 className="text-xl mb-4 mt-4">一：功能项</h3>
              <ul>
                <li className="leading-loose tracking-wider">
                  <span className="text-lg">01.&nbsp;</span>
                  <span>从手机侧向电脑侧做跨系统、跨应用的文本输入；</span>
                  <div className="pl-6 mt-1 text-sm leading-loose">
                    <div className="flex ">
                      <span>&nbsp;a.&nbsp;</span>
                      <span>
                        举例：
                        <span className="bg-[rgba(255,248,151)] ">
                          在微信的“凌音助手”服务号做语音输入
                        </span>
                        ，可以在电脑的飞书、word、钉钉或其他应用上将文本输出。
                      </span>
                    </div>
                  </div>
                  <div className="pl-6 mt-1 text-sm leading-loose">
                    <div className="flex">
                      <span>&nbsp;b.&nbsp;</span>
                      <span>解释说明：</span>
                    </div>
                    <ul className="pl-4 text-sm leading-loose">
                      <li className="flex">
                        <span className="inline-block w-4">i.&nbsp;</span>
                        <span>
                          当前版本只支持
                          <span className="bg-[rgba(255,248,151)] ">
                            微信侧输入
                          </span>
                          ，并且需要
                          <span className="bg-[rgba(255,248,151)] ">
                            在电脑端也安装“凌音助手”
                          </span>
                          且微信扫描登录后才能使用（使用了微信做权限控制）。
                        </span>
                      </li>
                      <li className="flex">
                        <span className="inline-block w-4">ii.&nbsp;</span>
                        <span>
                          因为程序是
                          <span className="bg-[rgba(255,248,151)] ">
                            模拟了键盘按键
                          </span>
                          实现功能，所以会需要
                          <span className="bg-[rgba(255,248,151)] ">
                            获取部分电脑权限
                          </span>
                          。mac电脑权限控制在：“隐私与安全”-“辅助功能”；windows电脑暂未调试。
                        </span>
                      </li>
                      <li className="flex">
                        <span className="inline-block w-4">ⅲ.&nbsp;</span>
                        <span>
                          跨端输入文本的功能需要
                          <span className="bg-[rgba(255,248,151)] ">
                            联网使用
                          </span>
                          ，所以请保证使用时有联网，体现效果为“连接服务”按钮可点击。
                        </span>
                      </li>
                      <li className="flex">
                        <span className="inline-block w-4">ⅳ.&nbsp;</span>
                        <span>
                          因为是直接将文本输入到目标应用的指定位置，所以使用时请先打开目标应用，
                          <span className="bg-[rgba(255,248,151)] ">
                            在目标应用可以输入文本的位置先点击一次
                          </span>
                          ，出现可输入的光标闪烁效果，后续会在当前位置插入文本。
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="w-2/5 mt-4">
          <Image
            src={`${assetPrefix}/process.svg`}
            alt="Icon"
            width={50}
            height={50}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

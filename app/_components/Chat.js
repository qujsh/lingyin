"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useGlobalContext } from "@/app/_components/GlobalContext";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Textarea, Button } from "@heroui/react";
import { MacScrollbar } from "mac-scrollbar";

import "../styles/chat.css";
import "mac-scrollbar/dist/mac-scrollbar.css";

export default function App() {
  const { assetPrefix } = useGlobalContext(); // 获取全局的 assetPrefix

  // const scrollRef = useRef(null);
  // const [isScrolling, setIsScrolling] = useState(false);

  //
  // todo wait to remove
  //  useEffect(() => {
  //   const el = scrollRef.current;
  //   let timeoutId;

  //   const handleScroll = () => {
  //     // 每次滚动清除之前的定时器
  //     if (timeoutId) clearTimeout(timeoutId);
  //     // 设置滚动状态
  //     setIsScrolling(true);
  //     // 1秒后视为滚动停止，移除 class
  //     timeoutId = setTimeout(() => {
  //       setIsScrolling(false);
  //     }, 1000);
  //   };

  //   if (el) {
  //     el.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     if (el) {
  //       el.removeEventListener("scroll", handleScroll);
  //     }
  //     if (timeoutId) clearTimeout(timeoutId);
  //   };
  // }, []);

  const messages = [
    // "这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息这是一条文本信息",
    "这是一条文本信息",
    "这是一条文本信息",
    "这是一条文本信息",
    "这是一条文本信息",
    "这是一条文本信息",
    "这是一条文本信息",
    "这是一条文本信息",
    "这是一条文本信息",
    "这是一条文本信息",
  ];

  return (
    <div className="pt-6 px-8 w-full flex-1 h-full bg-[#f9f9f9]/30 relative">
      {/* todo wait to remove ref={scrollRef} */}
      {/* scrollable ${isScrolling ? "scrolling" : ""} */}

      <div
        className={`
        text-base mx-auto bg-[#f9f9f9]/40 px-8 py-16  rounded-tl-lg rounded-tr-lg shadow-[0_3rem_6rem_rgba(0,0,0,0.1)] h-[calc(100vh-5.5rem)]
        `}
      >
        <MacScrollbar
          minThumbSize="1"
          thumbStyle={(horizontal) => ({
            backgroundColor: "rgba(0, 0, 0, 0.15)",
          })}
          // style={{ height: "88%" }}
          className="h-[calc(100vh-17rem)]"
        >
          <div className=" grid grid-cols-[1fr_auto] gap-y-4 mx-10 mt-6 leading-relaxed ">
            <div className="contents ">
              <div
                key="p1"
                className="row-start-1 col-start-1  
              border-b border-gray-300  outline-none
              py-3"
                contentEditable={true}
                suppressContentEditableWarning
              >
                <div className="border-l-2 border-gray-300 pl-2  ">
                  <div>做测试</div>
                </div>
              </div>

              <div
                key="p2"
                className="row-start-2 col-start-1 
                           border-b border-gray-300  outline-none 
              py-3"
                contentEditable={true}
                suppressContentEditableWarning
              >
                <div className="border-l-2 border-gray-300 pl-2  ">
                  <div>
                    这是段文字一段文字 这是段文字一段文字 这是段文字一段文字
                    这是段文字一段文字 这是段文字一段文字 这是段文字一段文字
                    这是段文字一段文字 这是段文字一段文字 这是段文字一段文字
                    这是段文字一段文字 这是段文字一段文字 这是段文字一段文字
                  </div>
                </div>
                <div className="relative">
                  <Textarea
                    className="mt-2 "
                    label=""
                    defaultValue="这是段文字一段文字 这是段文字一段文字 这是段文字一段文字
                这是段文字一段文字 这是段文字一段文字 这是段文字一段文字
                这是段文字一段文字 这是段文字一段文字 这是段文字一段文字
                这是段文字一段文字 这是段文字一段文字 这是段文字一段文字"
                    isReadOnly={true}
                    isDisabled={true}
                    radius="sm"
                    style={{ marginRight: "2rem", letterSpacing: "0.05rem" }}
                  />
                  <div className="absolute bottom-0 right-0 flex flex-col ">
                    <button className=" group flex items-center text-xs font-bold text-primary-300 flex-grow px-1 transition-colors  hover:underline">
                      <span className="">使用</span>
                    </button>
                    <button className=" group flex items-center text-xs font-bold text-primary-300 flex-grow px-1 transition-colors  hover:underline">
                      <span className="">拒绝</span>
                    </button>
                  </div>
                </div>
                <div>
                  <blockquote
                    className="border-l-4 border-[#eb4c89] bg-[#fbe6ed]  mt-2 pl-4 text-[#929393] italic "
                    contentEditable={false}
                  >
                    This is a reference example that shows how to implement
                    reference effects in HeroUI.
                  </blockquote>
                </div>
              </div>
              <div
                key="p3"
                className="row-start-3 col-start-1 border-b border-gray-300 py-3 outline-none "
                contentEditable={true}
                suppressContentEditableWarning
              >
                <div className="border-l-2 border-gray-300 pl-2  ">
                  <div>
                    这是段文字一段文字 这是段文字一段文字 这是段文字一段文字
                    这是段文字一段文字 这是段文字一段文字 这是段文字一段文字
                    这是段文字一段文字 这是段文字一段文字 这是段文字一段文字
                    这是段文字一段文字 这是段文字一段文字 这是段文字一段文字
                  </div>
                </div>
              </div>
              <div
                key="p4"
                className="row-start-4 col-start-1  
              border-b border-gray-300  outline-none 
              py-3"
                contentEditable={true}
                suppressContentEditableWarning
              >
                <div className="border-l-2 border-gray-300 pl-2  ">
                  <div className="text-container">
                    <div className="word">
                      <span className="pinyin">zhè</span>
                      <span className="chinese">这</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">shì</span>
                      <span className="chinese">是</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">yī</span>
                      <span className="chinese">一</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">duàn</span>
                      <span className="chinese">段</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">dài</span>
                      <span className="chinese">待</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">fān</span>
                      <span className="chinese">翻</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">yì</span>
                      <span className="chinese">译</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">wéi</span>
                      <span className="chinese">为</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">pīn</span>
                      <span className="chinese">拼</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">yīn</span>
                      <span className="chinese">音</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">zhè</span>
                      <span className="chinese">这</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">shì</span>
                      <span className="chinese">是</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">yī</span>
                      <span className="chinese">一</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">duàn</span>
                      <span className="chinese">段</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">dài</span>
                      <span className="chinese">待</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">fān</span>
                      <span className="chinese">翻</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">yì</span>
                      <span className="chinese">译</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">wéi</span>
                      <span className="chinese">为</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">pīn</span>
                      <span className="chinese">拼</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">yīn</span>
                      <span className="chinese">音</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">zhè</span>
                      <span className="chinese">这</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">shì</span>
                      <span className="chinese">是</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">yī</span>
                      <span className="chinese">一</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">duàn</span>
                      <span className="chinese">段</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">dài</span>
                      <span className="chinese">待</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">fān</span>
                      <span className="chinese">翻</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">yì</span>
                      <span className="chinese">译</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">wéi</span>
                      <span className="chinese">为</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">pīn</span>
                      <span className="chinese">拼</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">yīn</span>
                      <span className="chinese">音</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">zhè</span>
                      <span className="chinese">这</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">shì</span>
                      <span className="chinese">是</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">yī</span>
                      <span className="chinese">一</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">duàn</span>
                      <span className="chinese">段</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">dài</span>
                      <span className="chinese">待</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">fān</span>
                      <span className="chinese">翻</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">yì</span>
                      <span className="chinese">译</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">wéi</span>
                      <span className="chinese">为</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">pīn</span>
                      <span className="chinese">拼</span>
                    </div>
                    <div className="word">
                      <span className="pinyin">yīn</span>
                      <span className="chinese">音</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                key="p5"
                className="row-start-5 col-start-1  
              border-b border-gray-300  outline-none
              py-3"
                contentEditable={true}
                suppressContentEditableWarning
              >
                <div>做测试</div>
              </div>
              <div
                key="p6"
                className="row-start-6 col-start-1  
              border-b border-gray-300  outline-none
              py-3 mb-3"
                contentEditable={true}
                suppressContentEditableWarning
              >
                <div>做测试</div>
              </div>
            </div>

            <div className="contents ">
              <div
                key="b1"
                className="flex items-center border-b border-gray-300
              py-3 pl-4 pr-2 "
              >
                <button className="group flex items-center uppercase text-xs font-bold text-primary-300 flex-grow px-1 transition-colors  hover:underline">
                  <span className="">删除</span>
                </button>
              </div>

              <div
                key="b2"
                className="flex  flex-col border-b border-gray-300 py-3 pl-4 pr-2"
              >
                <div className="w-full flex gap-0.5">
                  <Button
                    className="px-[0.3rem] py-[0.6rem] min-w-0 h-0 "
                    color="success"
                    size="sm"
                    radius="lg"
                    variant="solid"
                    style={{
                      backgroundColor: "#51cf66",
                      fontSize: "0.6rem",
                      fontWeight: "400",
                      color: "#333",
                    }}
                  >
                    标点修正
                  </Button>
                  <Button
                    className="px-[0.3rem] py-[0.6rem] min-w-0 h-0 "
                    color="success"
                    size="sm"
                    radius="lg"
                    variant="solid"
                    style={{
                      backgroundColor: "#94d82d",
                      fontSize: "0.6rem",
                      fontWeight: "400",
                      color: "#333",
                    }}
                  >
                    拼音
                  </Button>
                  <Button
                    className="px-[0.3rem] py-[0.6rem] min-w-0 h-0 "
                    color="success"
                    size="sm"
                    radius="lg"
                    variant="solid"
                    style={{
                      backgroundColor: "#ffd43b",
                      fontSize: "0.6rem",
                      fontWeight: "400",
                      color: "#333",
                    }}
                  >
                    中文
                  </Button>
                </div>

                <div className="w-full flex flex-grow ">
                  <button className="group flex items-center uppercase text-xs font-bold text-primary-300 flex-grow px-1 transition-colors  hover:underline underline-offset-2 ">
                    <span className="">删除</span>
                  </button>
                  <button className="group flex items-center uppercase text-xs font-bold text-primary-300 flex-grow px-1 transition-colors  hover:underline underline-offset-2 ">
                    <span className="">翻译</span>
                  </button>
                  <button className="group flex items-center uppercase text-xs font-bold text-primary-300 flex-grow px-1 transition-colors  hover:underline underline-offset-2 ">
                    <span className="">版本</span>
                  </button>
                </div>
              </div>
              <div
                key="b3"
                className="flex items-center border-b border-gray-300 py-3 pl-4 pr-2"
              >
                <button className="group flex items-center uppercase text-xs font-bold text-primary-300 flex-grow px-1 transition-colors  hover:underline">
                  <span className="">删除</span>
                </button>
                <button className="group flex items-center uppercase text-xs font-bold text-primary-300 flex-grow px-1 transition-colors  hover:underline">
                  <span className="">删除</span>
                </button>
                <button className="group flex items-center uppercase text-xs font-bold text-primary-300 flex-grow px-1 transition-colors  hover:underline">
                  <span className="">删除</span>
                </button>
              </div>
              <div
                key="b4"
                className="flex items-center border-b border-gray-300
              py-3 pl-4 pr-2 "
              >
                <button className="group flex items-center uppercase text-xs font-bold text-primary-300 flex-grow px-1 transition-colors  hover:underline">
                  <span className="">删除</span>
                </button>
              </div>
              <div
                key="b5"
                className="flex items-center border-b border-gray-300
              py-3 pl-4 pr-2 "
              >
                <button className="group flex items-center uppercase text-xs font-bold text-primary-300 flex-grow px-1 transition-colors  hover:underline">
                  <span className="">删除</span>
                </button>
              </div>
              <div
                key="b6"
                className="flex items-center border-b border-gray-300
              py-3 pl-4 pr-2 mb-3"
              >
                <button className="group flex items-center uppercase text-xs font-bold text-primary-300 flex-grow px-1 transition-colors  hover:underline">
                  <span className="">删除</span>
                </button>
              </div>
            </div>
          </div>
        </MacScrollbar>
      </div>
      <div
        id="chat-textarea"
        className="absolute w-[82%] bottom-0 left-1/2 transform -translate-x-1/2 mb-4"
      >
        <Textarea
          className=""
          label=""
          placeholder="输入新文本（上述页面普通文本可直接编辑，停止编辑3秒后自动保存）"
          style={{ marginBottom: "2rem" }}
        />
        <div className="absolute bottom-0 h-8 w-full flex justify-end items-center">
          <div className="mr-4 mb-4">
            <button className="bg-black text-white text-sm px-4 py-2 flex items-center gap-2 rounded-3xl hover:bg-gray-700 transition">
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* todo wait to remove {messages.map((message, index) => (
          <div
            key={index}
            className="mx-auto w-full min-w-[65%] flex flex-1 text-base gap-4 md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]
"
          >
            <p>{message}</p>
          </div>
        ))} */
}

{
  /* <div className="fixed bottom-0 right-0  w-full flex flex-col gap-2 max-w-[240px]">
        <Textarea
          className="max-w-xs"
          label="Description"
          placeholder="Enter your description"
        />
        <p className="text-default-500 text-small">Textarea value: x</p>
      </div> */
}

//       <div className="fixed bottom-0 left-0  bg-white border-t border-gray-300 p-4 shadow-md">
//         <div className="max-w-2xl mx-auto flex items-center space-x-2">
//           {/* 输入框 */}
//           <div className="relative flex-1">
//             <textarea
//               className="w-full p-3 border border-gray-300 rounded-lg resize-none outline-none focus:ring-2 focus:ring-blue-500"
//               rows={1}
//               placeholder="输入你的消息..."
//               // value={}
//               // onChange={(e) => setMessage(e.target.value)}
//             />
//           </div>

//           {/* 发送按钮 */}
//           <button
//             className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//             onClick={() => alert(`发送消息: message`)}
//           >
//             <div>发送</div>
//           </button>
//         </div>
//       </div>

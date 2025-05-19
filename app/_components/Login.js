"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ConnectingDots from "@/app/_components/ConnectingDots";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  useDraggable,
  Image as HeroImage,
  Link,
} from "@heroui/react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useGlobalContext } from "@/app/_components/GlobalContext";
import { v4 as uuidv4 } from "uuid";
import { encrypt, decrypt } from "@/app/_lib/aesUtil";
import request from "@/app/_lib/request";
import { wxwebUserInfo } from "@/app/_models/user/userInfo";

/* svg 来源： https://undraw.co/search/computer */
export default function App({ buttonRef }) {
  const {
    assetPrefix,
    requestUrls,
    userInfo,
    setUserInfo,
    connected,
    setConnected,
  } = useGlobalContext(); // 获取全局的 assetPrefix

  const arm64dmgUrl =
    "https://github.com/qujsh/lingyin/releases/download/v" +
    process.env.APP_VERSION +
    "/lingyin-" +
    process.env.APP_VERSION +
    "-arm64.dmg";

  const x64dmgUrl =
    "https://github.com/qujsh/lingyin/releases/download/v" +
    process.env.APP_VERSION +
    "/lingyin-" +
    process.env.APP_VERSION +
    "-x64.dmg";

  const x64exeUrl =
    "https://github.com/qujsh/lingyin/releases/download/v" +
    process.env.APP_VERSION +
    "/lingyin-" +
    process.env.APP_VERSION +
    "-x64.exe";

  const [username, setUsername] = useState("");
  const [stompClient, setStompClient] = useState(null);

  function connectWs(event) {
    if (connected) {
      return;
    }

    const client = new Client({
      webSocketFactory: () =>
        // 服务器 WebSocket 地址
        new SockJS(requestUrls.ws + "?t=" + new Date().getTime()),
      debug: (str) => {
        if (process.env.NODE_ENV === "development") {
          console.log("debug", str);
        }
      },

      // ✅ 自动重连设置
      reconnectDelay: 5000, // 断线后每 5 秒尝试重连一次
      heartbeatIncoming: 0, // 服务端不发心跳
      heartbeatOutgoing: 10000, //客户端每 10 秒发一次心跳

      onConnect: () => {
        setConnected(true);

        // 确保 window.electron 存在，并调用 simulateInit，用来开启系统的操作权限
        if (window.electron) {
          window.electron.simulateInit();
        } else {
          console.error("electron object is not available");
        }

        // 发送用户加入信息
        client.publish({
          destination: "/app/chat.addUser",
          body: JSON.stringify({ sender: username, type: "JOIN" }),
        });

        // 订阅私人消息
        client.subscribe(`/user/${username}/queue/messages`, (message) => {
          console.log("Private message received:", message.body);

          // 确保 window.electron 存在，并调用 simulatePaste
          if (window.electron) {
            const body = JSON.parse(message.body);
            window.electron.simulatePaste(body.content);
          } else {
            console.error("electron object is not available");
          }
        });
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame);
      },
      onWebSocketClose: (event) => {
        console.warn("WebSocket closed:", event);
        // 断开连接，等待重连
        setConnected(false);
      },
    });

    client.activate();
    setStompClient(client);
  }

  function disconnectWs(Event) {
    const isBoolean = typeof Event === "boolean";
    const check = isBoolean ? Event : false;

    if (stompClient && stompClient.active) {
      // 主动断开连接，禁止重连
      stompClient.deactivate();
      setStompClient(null);
      setConnected(false);
    }

    if (check) return;

    // 确保 window.electron 存在，并调用 simulateInit，用来开启系统的操作权限
    if (window.electron) {
      window.electron.simulateClose();
    } else {
      console.error("electron object is not available");
    }
  }

  useEffect(() => {
    if (!connected) return;

    if (window.electron) {
      const interval = setInterval(async () => {
        const res = await window.electron.simulateCheck();

        //true 关闭定时，false 断开连接，undefined 啥也不干
        if (res) {
          clearInterval(interval);

          //添加成功后主动关闭弹窗
          if (window.electron) {
            window.electron.simulateClose();
          }
        } else if (res === false) {
          disconnectWs(true);
        }
      }, 3000); // 每 3 秒调用一次
      return () => clearInterval(interval);
    } else {
      console.error("electron object is not available");
    }
  }, [stompClient, connected]);

  // 发送消息 todo
  // function sendMessage() {
  //   if (stompClient && stompClient.connected) {
  //     const chatMessage = {
  //       sender: username,
  //       content: "Hello from Next.js!",
  //       type: "CHAT",
  //     };

  //     stompClient.publish({
  //       destination: "/app/chat.sendMessage",
  //       body: JSON.stringify(chatMessage),
  //     });

  //     console.log("📤 消息已发送:", chatMessage);
  //   } else {
  //     console.error("❌ WebSocket 未连接");
  //   }
  // }

  //微信登录二维码
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const [modalPlacement, setModalPlacement] = useState("auto");
  const [state, setState] = useState("");

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const wxLoginState = localStorage.getItem("wx_login_state");
    if (wxLoginState == null) {
      //表示未登录过
      const state = uuidv4();
      setState(state);
      localStorage.setItem("wx_login_state", encrypt(state));
    } else {
      setState(decrypt(wxLoginState));
      //获取远程用户数据
      request
        .get(requestUrls.wxwebUserInfo, {
          params: {
            state: wxLoginState,
          },
        })
        .then((data) => {
          const userInfo = {
            ...wxwebUserInfo,
            ...data,
          };
          //更新全局用户信息
          setUserInfo(userInfo);
          //ws的连接名
          setUsername(userInfo?.unionId || "");
        })
        .catch((err) => {
          console.error("获取用户信息失败", err);
        });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadScript(
        "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
      )
        .then(() => {
          const obj = new window.WxLogin({
            id: "wx-qrcode",
            appid: "wxe0e6ad32a9a8bd02",
            scope: "snsapi_login",
            redirect_uri: encodeURIComponent(
              process.env.DOMAIN + "/api/wxweb/callback"
            ),
            state: state,
            style: "black",
            onReady: function (isReady) {
              console.log(isReady);
            },
          });
        })
        .catch((err) => {
          console.error("微信登录脚本加载失败", err);
        });
    }
  }, [isOpen, state]);

  return (
    <div className=" p-6 h-full bg-white/80 shadow-[0_3rem_6rem_rgba(0,0,0,0.1)]">
      <div className="grid place-items-center translate-y-1/2">
        <div className="w-3/5">
          <Image
            src={`${assetPrefix}/team.svg`}
            alt="Icon"
            width={50}
            height={50}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {(!userInfo || userInfo.id <= 0) && (
          <Button
            onPress={onOpen}
            ref={buttonRef}
            className="translate-y-10 w-1/6 rounded-full bt-color "
          >
            微信登录
          </Button>
        )}

        {userInfo?.id > 0 && !connected && (
          <Button
            onPress={(e) => connectWs(e)}
            {...(!window.electron ? { isDisabled: true } : {})}
            className="translate-y-10 w-1/6 rounded-full bt-color "
          >
            连接服务
          </Button>
        )}

        {connected && (
          <Button
            onPress={disconnectWs}
            className="translate-y-10 w-1/6 rounded-full bt-color mt-4"
          >
            断开连接
          </Button>
        )}
      </div>

      {process.env.ELT_ENV !== "package" && (
        <div className="flex flex-col space-y-2 translate-y-full mx-4">
          <div>
            <p>Apple Silicon下载地址：</p>
            <Link
              href={arm64dmgUrl}
              download
              underline="always"
              className="text-sm"
            >
              {arm64dmgUrl}
            </Link>
          </div>
          <div>
            <p>Intel Mac下载地址：</p>

            <Link
              href={x64dmgUrl}
              download
              underline="always"
              className="text-sm"
            >
              {x64dmgUrl}
            </Link>
          </div>
          <div>
            <p>Windows x64下载地址：</p>

            <Link
              href={x64exeUrl}
              download
              underline="always"
              className="text-sm"
            >
              {x64exeUrl}
            </Link>
            <p className="text-xs leading-normal">
              {/* svg来源： https://fontawesome.com/start */}
              <span className="inline-flex mr-1">
                <svg
                  className="inline align-middle relative top-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="12"
                  height="12"
                  fill="currentColor"
                >
                  <path d="M480 256A224 224 0 1 0 32 256a224 224 0 1 0 448 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm168.7-86.2c6.5-24.6 28.7-41.8 54.2-41.8l57.1 0c35.5 0 64 29 64 64.3c0 24-13.4 46.2-34.9 57.2L272 268.3l0 19.7c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-29.5c0-6 3.4-11.5 8.7-14.3l45.8-23.4c10.7-5.4 17.5-16.6 17.5-28.7c0-17.8-14.4-32.3-32-32.3l-57.1 0c-10.9 0-20.5 7.4-23.2 17.9l-.2 .7c-2.2 8.5-11 13.7-19.5 11.4s-13.7-11-11.4-19.5l.2-.7zM232 352a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </span>
              windows版本未添加代码签名证书（49美元/月），在安装时弹出的SmartScreen阻止弹窗上点击“更多信息-仍要运行”后正常运行
            </p>
          </div>
        </div>
      )}

      <Modal
        ref={targetRef}
        placement={modalPlacement}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                &nbsp;
              </ModalHeader>
              <ModalBody className="flex justify-center items-center h-full">
                <div id="wx-qrcode" className="mb-8"></div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

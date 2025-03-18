"use client";

import { useState } from "react";
import Image from "next/image";
import ConnectingDots from "@/app/_components/ConnectingDots";
import { Button } from "@heroui/react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useGlobalContext } from "@/app/_components/GlobalContext";

/* svg 来源： https://undraw.co/search/computer */
export default function App() {
  const { assetPrefix, online } = useGlobalContext(); // 获取全局的 assetPrefix

  const [username, setUsername] = useState(
    // "user" + Math.floor(Math.random() * 1000)
    "qujsh"
  );
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);

  function connectWs(event) {
    console.log(event);

    if (connected) {
      alert("已经连接");
      return;
    }

    const socket = new SockJS("http://localhost:8080/ws"); // 服务器 WebSocket 地址
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected to WebSocket");
        setConnected(true);

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
    });

    client.activate();
    setStompClient(client);
  }

  // 发送消息
  function sendMessage() {
    if (stompClient && stompClient.connected) {
      const chatMessage = {
        sender: username,
        content: "Hello from Next.js!",
        type: "CHAT",
      };

      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });

      console.log("📤 消息已发送:", chatMessage);
    } else {
      console.error("❌ WebSocket 未连接");
    }
  }

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

        <Button
          onPress={(e) => connectWs(e)}
          {...(online ? { isDisabled: true } : {})}
          className="translate-y-10 w-1/6 rounded-full bt-color "
        >
          连接服务
        </Button>

        {/* {connected && ( */}
        <Button
          onPress={sendMessage}
          isDisabled
          className="translate-y-10 w-1/6 rounded-full bt-color mt-4"
        >
          发送消息
        </Button>
        {/* )} */}
      </div>
    </div>
  );
}

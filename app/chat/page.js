"use client";

// import Navbar from "@/app/_components/Navbar";
import Chat from "@/app/_components/Chat";
import Login from "@/app/_components/Login";
// import Sidebar from "@/app/_components/Sidebar";
import { HeroUIProvider } from "@heroui/react";

export default function Home() {
  // return <HeroUIProvider>hello</HeroUIProvider>;
  return (
    <div className="flex flex-1 w-full h-full">
      {/* Guide: 占65%的宽度 */}
      <div className="flex-shrink-0 w-[65%] h-full">
        <Chat />
      </div>

      {/* Login: 占35%的宽度 */}
      <div className="flex-shrink-0 w-[35%] h-full">
        <Login />
      </div>
    </div>
  );
}

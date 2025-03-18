"use client";

import Navbar from "@/app/_components/Navbar";
import Guide from "@/app/_components/Guide";
import Login from "@/app/_components/Login";
import Sidebar from "@/app/_components/Sidebar";
import { HeroUIProvider } from "@heroui/react";

export default function Home() {
  // return <HeroUIProvider>hello</HeroUIProvider>;
  return (
    <div className="flex h-screen">
      {/* Sidebar: 固定宽度260px */}
      <div className="w-[260px] h-full ">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col h-full">
        {/* Navbar */}
        <Navbar className="w-full" />

        <div className="flex flex-1 w-full h-full">
          {/* Guide: 占65%的宽度 */}
          <div className="flex-shrink-0 w-[65%] h-full">
            <Guide />
          </div>

          {/* Login: 占35%的宽度 */}
          <div className="flex-shrink-0 w-[35%] h-full">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

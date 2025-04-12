// import Image from "next/image";
import "./styles/globals.css";
import Navbar from "@/app/_components/Navbar";
// import Guide from "@/app/_components/Guide";
// import Login from "@/app/_components/Login";
import Sidebar from "@/app/_components/Sidebar";
import { GlobalProvider } from "@/app/_components/GlobalContext";
import Script from "next/script";

export const metadata = {
  title: "凌音 | 感受语音的助力",
  description: "跨系统、跨应用、跨端的语言交流和记录工具",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Noto+Sans+SC:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>
        <main className="flex   h-screen ">
          {/* bg-[url('https://qujsh.cn/river.jpg')] */}
          <div className="absolute inset-0 -z-10 w-full h-screen bg-[url('/river.jpg')] bg-cover bg-top bg-no-repeat opacity-25"></div>

          <GlobalProvider>
            <div className="flex flex-1 h-screen">
              {/* Sidebar: 固定宽度260px */}
              <div className="w-[260px] h-full ">
                <Sidebar />
              </div>

              {/* Main Content */}
              <div className="flex flex-1 flex-col h-full">
                {/* Navbar */}
                <Navbar className="w-full" />

                {children}
              </div>
            </div>
          </GlobalProvider>
        </main>
      </body>
    </html>
  );
}

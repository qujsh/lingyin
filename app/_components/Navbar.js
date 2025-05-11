"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Chip,
} from "@heroui/react";
import Image from "next/image";
import { useGlobalContext } from "@/app/_components/GlobalContext";

import "../styles/navbar.css";
import request from "../_lib/request";

export default function App({ onLoginClick }) {
  const {
    assetPrefix,
    requestUrls,
    userInfo,
    setUserInfo,
    setWxLoginState,
    connected,
  } = useGlobalContext(); // 获取全局的 assetPrefix

  const handleLogout = () => {
    const wxLoginState = localStorage.getItem("wx_login_state");

    request
      .delete(requestUrls.wxwebLogoutUser, {
        params: {
          state: wxLoginState,
        },
      })
      .then((data) => {
        if (data) {
          localStorage.removeItem("wx_login_state");
          //更新全局用户信息
          setUserInfo(null);
        }
      })
      .catch((err) => {
        console.error("退出登录失败", err);
      });
  };

  return (
    <Navbar
      id="main-navbar"
      className="flex justify-between items-center bg-white/60 shadow-[0_3rem_6rem_rgba(0,0,0,0.1)]"
      isBlurred={false}
    >
      <NavbarBrand className="flex items-center space-x-2">
        <Image
          src={`${assetPrefix}/logo.png`}
          alt="Logo"
          width={36}
          height={36}
        />

        <p className="font-bold text-inherit">凌音</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end" className="flex justify-end ">
        {(!userInfo || userInfo.id <= 0) && (
          <Chip
            color="default"
            size="sm"
            radius="lg"
            variant="dot"
            className="bt-color "
          >
            未登录
          </Chip>
        )}

        {userInfo?.id > 0 && !connected && (
          <Chip
            color="default"
            size="sm"
            radius="lg"
            variant="dot"
            className="bt-color "
          >
            未连接
          </Chip>
        )}

        {userInfo?.id > 0 && connected && (
          <Chip
            color="success"
            size="sm"
            radius="lg"
            variant="dot"
            className="bt-color "
          >
            已连接
          </Chip>
        )}

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="default"
              name="Jason Hughes"
              size="sm"
              src={
                userInfo?.headimg || "https://cdn.auth0.com/avatars/default.png"
              }
              onClick={() => {
                if (!userInfo || userInfo.id <= 0) {
                  onLoginClick();
                }
              }}
            />
          </DropdownTrigger>

          {userInfo?.id > 0 && (
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="h-14"
                textValue={`你好，${userInfo?.nickname ?? ""}`}
              >
                你好，{userInfo?.nickname}
              </DropdownItem>
              <DropdownItem
                key="logout"
                textValue="退出登录"
                onClick={handleLogout}
              >
                <div className="flex items-center gap-x-2">
                  <Image
                    src={`${assetPrefix}/logout.svg`}
                    alt="Icon"
                    width={25}
                    height={25}
                  />
                  <span>退出登录</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

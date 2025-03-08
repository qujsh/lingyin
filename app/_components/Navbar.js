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

import "../styles/Navbar.css";

export default function App() {
  const { assetPrefix } = useGlobalContext(); // 获取全局的 assetPrefix

  return (
    <Navbar
      id="main-navbar"
      className="flex justify-between items-center bg-white/60 shadow-[0_3rem_6rem_rgba(0,0,0,0.1)]"
      isBlurred={false}
    >
      <NavbarBrand className="flex items-center space-x-2">
        <Image
          src={`${assetPrefix}/favicon.ico`}
          alt="Logo"
          width={36}
          height={36}
        />

        <p className="font-bold text-inherit">灵音</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end" className="flex justify-end ">
        <Chip
          color="default"
          size="sm"
          radius="lg"
          variant="dot"
          className="bt-color "
        >
          未连接
        </Chip>
        <Chip
          color="success"
          size="sm"
          radius="lg"
          variant="dot"
          className="bt-color "
        >
          已连接
        </Chip>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="default"
              name="Jason Hughes"
              size="sm"
              src="https://cdn.auth0.com/avatars/default.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

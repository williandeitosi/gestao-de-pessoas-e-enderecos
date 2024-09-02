"use client";

import { useState, ChangeEvent } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Avatar from "../assets/images/avatar.png";
import { destroyCookie } from "nookies";

export default function Navbar() {
  const [search, setSearch] = useState<string>("");
  const { theme, setTheme } = useTheme();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDeleteCookie = () => {
    destroyCookie(null, "token");
    window.location.href = "/login";
  };

  const handleProfileClick = () => {
    window.location.href = "/user-config";
  };

  return (
    <nav className="flex justify-center items-center bg-zinc-900 text-white p-4 shadow-lg col-span-full row-span-1">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center h-16 bg-zinc-900 cursor-pointer">
          <MapPinIcon className="h-12 w-12 text-yellow-300" />
          <span className="ml-2 text-2xl font-semibold">E-gest</span>
        </div>
        <div className="flex items-center rounded-lg bg-zinc-700 px-2 py-1 w-1/3">
          <MagnifyingGlassIcon className="h-5 w-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by full name, cep or more..."
            className="bg-transparent ml-2 outline-none w-full"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-zinc-700"
          >
            {theme === "dark" ? (
              <SunIcon className="h-7 w-7" />
            ) : (
              <MoonIcon className="h-7 w-7" />
            )}
          </button>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <Image
                  src={Avatar}
                  alt="Avatar"
                  className="rounded-full hover:bg-zinc-700 cursor-pointer"
                  width={56}
                  height={56}
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-50"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 divide-opacity-10 rounded-md bg-zinc-800 bg-opacity-75  shadow-lg ring-1 ring-white ring-opacity-10 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleProfileClick}
                        className={`${
                          active ? "bg-zinc-500 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <UserIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                        Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-zinc-500 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <Cog6ToothIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Settings
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleDeleteCookie}
                        className={`${
                          active ? "bg-zinc-500 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <ArrowRightOnRectangleIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

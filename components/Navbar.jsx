/* eslint-disable @next/next/no-img-element */
import {
  BellIcon,
  ChatAlt2Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  MenuIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import React, { useEffect } from "react";
import { useContextState } from "../contexts/ContextProvider";
import {
  AddOverlay,
  ChatOverlay,
  NotificationOverlay,
  ProfileOverlay,
} from "./utilities";
import Charvatar from "./utilities/Charvatar";
import NavButton from "./utilities/NavButton";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Navbar = ({ user }) => {
  const {
    setIsSidebarOpen,
    isClicked,
    handleClick,
    screenSize,
    setScreenSize,
    handleClose,
  } = useContextState();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (screenSize <= 900) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [screenSize, setIsSidebarOpen]);

  return (
    <div className="flex justify-between items-center py-2 px-2">
      <NavButton
        icon={<MenuIcon className="w-6 h-6" />}
        customFunc={() => setIsSidebarOpen((previousState) => !previousState)}
      />

      <div className="flex space-x-3">
        <NavButton
          icon={<PlusCircleIcon className="w-6 h-6" />}
          color={"#03C9D7"}
          customFunc={() => handleClick("addOverlay")}
        />

        <NavButton
          icon={<BellIcon className="w-6 h-6" />}
          dotColor={"orange"}
          color={"#03C9D7"}
          customFunc={() => handleClick("notificationOverlay")}
        />

        <NavButton
          icon={<ChatAlt2Icon className="w-6 h-6" />}
          dotColor={"blue"}
          color={"#03C9D7"}
          customFunc={() => handleClick("chatOverlay")}
        />

        <div
          className="flex space-x-1 items-center px-3 py-1 hover:bg-white 
          rounded-full outline-none cursor-pointer"
          onClick={() => {
            if (isClicked.profileOverlay) {
              handleClose("profileOverlay");
            } else {
              handleClick("profileOverlay");
            }
          }}
        >
          {user?.avatar ? (
            <img
              src={`user?.avatar`}
              className="w-8 h-8 rounded-full"
              alt={user?.avatar}
            />
          ) : (
            <Charvatar
              width={35}
              height={35}
              text={user?.name}
              fontSize={14}
              color="#ffffff"
            />
          )}
          <p className="hidden md:inline-block text-sm text-gray-400">
            Hi,{" "}
            <span className="font-bold">
              {user?.name.split(" ")[0]} {" ."}
              {user?.name.split(" ")[1].charAt(0)}
            </span>
          </p>
          {isClicked.profileOverlay ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {/* <Menu.Items className="absolute bg-white w-full md:w-1/5 rounded shadow-xl p-2 h-fit md:right-5 top-14">
              <Menu.Item>
                <div className="flex items-start gap-2  border-b-2 border-b-slate-100 pb-3">
                  <div className="w-auto">
                    {user?.avatar ? (
                      <img
                        src={user?.avatar}
                        className="w-9 h-9 rounded"
                        alt="User profile"
                      />
                    ) : (
                      <Charvatar
                        text={user?.name}
                        width={70}
                        height={70}
                        fontSize={"20px"}
                        color="#ffffff"
                        borderRadius="5px"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-0">
                    <p className="font-semibold text-md">{user?.name}</p>
                    <p className="text-xs text-gray-400 font-semibold">
                      {user?.email}
                    </p>
                    {user?.companyName && (
                      <p className="font-semibold text-xs text-gray-400">
                        {user?.companyName}
                      </p>
                    )}
                  </div>
                </div>
              </Menu.Item>

              <Menu.Item>
                <Link href="/projects/create/">
                  <div className="flex items-center gap-2 border-b border-b-slate-100 pb-3 mt-3">
                    <div className="items-center bg-slate-50 p-1 rounded">
                      <UserIcon className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col gap-0">
                      <p className="text-sm font-semibold">My Profile</p>
                      <small className="font-semibold text-xs text-gray-400">
                        Account Settings
                      </small>
                    </div>
                  </div>
                </Link>
              </Menu.Item>

              <Menu.Item>
                <div className="flex items-center gap-2  border-b border-b-slate-100 pb-3 mt-3">
                  <div className=" bg-cyan-50 items-center p-1 rounded">
                    <BellIcon className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm font-semibold">Notifications</p>
                    <small className="font-semibold text-xs text-gray-400">
                      Read & unread notifications
                    </small>
                  </div>
                </div>
              </Menu.Item>

              <Menu.Item>
                <div className="flex items-center gap-2  border-b border-b-slate-100 pb-3">
                  <div className="bg-blue-50 items-center p-1 rounded">
                    <ChatIcon className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm font-semibold">My Inbox</p>
                    <small className="font-semibold text-xs text-gray-400">
                      Read & unread messages
                    </small>
                  </div>
                </div>
              </Menu.Item>

              <Menu.Item>
                <div
                  className="flex items-center gap-2  border-b border-b-slate-100 pb-3 cursor-pointer"
                  onClick={() => signOut()}
                >
                  <div className="bg-red-50 items-center p-1 rounded">
                    <LogoutIcon className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm font-semibold text-red-300">Logout</p>
                    <small className="font-semibold text-xs text-gray-400">
                      Exit app
                    </small>
                  </div>
                </div>
              </Menu.Item>
            </Menu.Items>
          </Menu> */}

        {/* {isClicked.addOverlay && <AddOverlay />}
        {isClicked.notificationOverlay && <NotificationOverlay />}
        {isClicked.chatOverlay && <ChatOverlay />}
        {isClicked.profileOverlay && (
          <ProfileOverlay
            user={user}
            closeOverlay={() => handleClose("profileOverlay")}
          />
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
